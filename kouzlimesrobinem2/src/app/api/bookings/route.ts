import { createHash } from "crypto";
import { NextResponse } from "next/server";
import {
  createBooking,
  isBookingDatabaseConfigured,
  isOverlapError,
  isWorkingHoursError,
  markNotificationSent,
} from "@/lib/bookings/store";
import { formatBookingRange } from "@/lib/bookings/format";
import { adminUrl, escapeEmailHtml, resolveRobinEmail, sendEmail } from "@/lib/email";
import { readSiteContent } from "@/lib/cms/store";
import { getClientIp, isSameOrigin } from "@/lib/request";
import { turnstileError, verifyTurnstile } from "@/lib/turnstile";
import {
  GoogleCalendarUnavailableError,
  hasGoogleCalendarConflict,
} from "@/lib/google-calendar/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EVENT_TYPES = new Set([
  "Narozeninová oslava",
  "Škola nebo školka",
  "Veřejná akce",
  "Firemní akce",
  "Svatba",
  "Jiná akce",
]);
const RATE_LIMIT_MAX = 4;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string): boolean {
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || now > current.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

function textField(body: Record<string, unknown>, key: string, max: number): string {
  return String(body[key] ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 403 });
  }
  const ip = getClientIp(request);
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Příliš mnoho pokusů. Zkuste to prosím za chvíli." },
      { status: 429 },
    );
  }
  if (!isBookingDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Online rezervace se právě dokončuje. Napište prosím Robinovi." },
      { status: 503 },
    );
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 24_000) {
    return NextResponse.json({ ok: false, error: "Požadavek je příliš velký." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  if (textField(body, "website", 200)) return NextResponse.json({ ok: true });

  const name = textField(body, "name", 120).replace(/[\r\n\u0000-\u001f]/g, " ");
  const email = textField(body, "email", 254).toLowerCase();
  const phone = textField(body, "phone", 30).replace(/[\r\n\u0000-\u001f]/g, " ");
  const eventType = textField(body, "eventType", 80);
  const location = textField(body, "location", 180).replace(/[\r\n\u0000-\u001f]/g, " ");
  const message = textField(body, "message", 3000);
  const guestsRaw = Number(body.guestCount);
  const guestCount = Number.isInteger(guestsRaw) && guestsRaw > 0 && guestsRaw <= 100_000 ? guestsRaw : null;
  const startAt = new Date(String(body.startAt ?? ""));
  const endAt = new Date(String(body.endAt ?? ""));
  const consent = body.consent === true || body.consent === "true" || body.consent === 1;

  if (!name) return NextResponse.json({ ok: false, error: "Zadejte jméno." }, { status: 400 });
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Zadejte platný e-mail." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "Zadejte platný telefon." }, { status: 400 });
  }
  if (!EVENT_TYPES.has(eventType)) {
    return NextResponse.json({ ok: false, error: "Vyberte typ akce." }, { status: 400 });
  }
  if (!location) {
    return NextResponse.json({ ok: false, error: "Zadejte místo konání." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Pro odeslání je potřeba souhlas se zpracováním údajů." },
      { status: 400 },
    );
  }
  const duration = endAt.getTime() - startAt.getTime();
  if (
    Number.isNaN(startAt.getTime()) ||
    Number.isNaN(endAt.getTime()) ||
    startAt.getTime() < Date.now() + 2 * 60 * 60_000 ||
    startAt.getTime() > Date.now() + 2 * 365 * 24 * 60 * 60_000 ||
    duration < 30 * 60_000 ||
    duration > 24 * 60 * 60_000
  ) {
    return NextResponse.json(
      { ok: false, error: "Vyberte platný budoucí termín a délku akce." },
      { status: 400 },
    );
  }

  const turnstile = await verifyTurnstile({
    token: textField(body, "turnstileToken", 4096),
    ip,
    expectedAction: "booking",
    expectedHostname: new URL(request.url).hostname,
  });
  if (!turnstile.ok) {
    const error = turnstileError(turnstile);
    return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
  }

  try {
    if (await hasGoogleCalendarConflict(startAt, endAt)) {
      return NextResponse.json(
        { ok: false, error: "Tento čas už má Robin obsazený v kalendáři. Vyberte prosím jiný." },
        { status: 409 },
      );
    }
  } catch (error) {
    if (error instanceof GoogleCalendarUnavailableError) {
      return NextResponse.json(
        { ok: false, error: "Robinův kalendář se právě nepodařilo ověřit. Zkuste to prosím za chvíli." },
        { status: 503 },
      );
    }
    console.error("[robin/bookings] Google conflict check failed", error);
    return NextResponse.json(
      { ok: false, error: "Robinův kalendář se právě nepodařilo ověřit. Zkuste to prosím za chvíli." },
      { status: 503 },
    );
  }

  try {
    const entry = await createBooking({
      startAt,
      endAt,
      name,
      email,
      phone,
      eventType,
      location,
      guestCount,
      message,
    });
    const site = await readSiteContent();
    const robinEmail = resolveRobinEmail(site.contact.email);
    const range = formatBookingRange(entry);
    const details = [
      `Termín: ${range}`,
      `Typ akce: ${eventType}`,
      `Místo: ${location}`,
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone}`,
      guestCount ? `Počet hostů: ${guestCount}` : null,
      message ? `Poznámka: ${message}` : null,
    ].filter(Boolean).join("\n");

    let robinNotified = false;
    if (robinEmail) {
      robinNotified = await sendEmail({
        to: robinEmail,
        replyTo: email,
        idempotencyKey: `booking-${entry.id}-robin-v1`,
        subject: `[Rezervace čeká] ${eventType} — ${name}`,
        text: `Nová žádost o termín čeká na schválení.\n\n${details}\n\nSchválit nebo zamítnout: ${adminUrl()}`,
        html: `<h2>Nová žádost čeká na schválení</h2><p><strong>Termín:</strong> ${escapeEmailHtml(range)}</p><p><strong>Akce:</strong> ${escapeEmailHtml(eventType)}</p><p><strong>Místo:</strong> ${escapeEmailHtml(location)}</p><p><strong>Klient:</strong> ${escapeEmailHtml(name)} · <a href="mailto:${escapeEmailHtml(email)}">${escapeEmailHtml(email)}</a> · ${escapeEmailHtml(phone)}</p>${guestCount ? `<p><strong>Počet hostů:</strong> ${guestCount}</p>` : ""}${message ? `<p><strong>Poznámka:</strong><br>${escapeEmailHtml(message).replace(/\n/g, "<br>")}</p>` : ""}<p><a href="${adminUrl()}">Otevřít schválení v administraci</a></p>`,
      });
      if (robinNotified) {
        await markNotificationSent(entry.id).catch((error) => {
          console.error("[robin/bookings] notification marker failed", error);
        });
      }
    }

    await sendEmail({
      to: email,
      idempotencyKey: `booking-${entry.id}-customer-received-v1`,
      subject: "Robin přijal vaši žádost o termín",
      text: `Děkujeme, žádost jsme přijali. Termín ${range} zatím není potvrzený. Robin jej zkontroluje a pošle vám potvrzení e-mailem.`,
      html: `<h2>Děkujeme, žádost jsme přijali</h2><p>Termín <strong>${escapeEmailHtml(range)}</strong> zatím není potvrzený. Robin jej zkontroluje a pošle vám potvrzení e-mailem.</p>`,
    });

    return NextResponse.json({ ok: true, pending: true, robinNotified });
  } catch (error) {
    if (isWorkingHoursError(error)) {
      return NextResponse.json(
        { ok: false, error: "Tento čas je mimo Robinovu objednávací dobu. Vyberte prosím jiný termín." },
        { status: 409 },
      );
    }
    if (isOverlapError(error)) {
      return NextResponse.json(
        { ok: false, error: "Tento čas už je obsazený nebo čeká na schválení. Vyberte prosím jiný." },
        { status: 409 },
      );
    }
    console.error("[robin/bookings] create failed", error);
    return NextResponse.json(
      { ok: false, error: "Žádost se nepodařilo uložit. Zkuste to prosím znovu." },
      { status: 503 },
    );
  }
}
