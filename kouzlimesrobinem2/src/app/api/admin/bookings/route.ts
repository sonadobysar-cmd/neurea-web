import { NextResponse } from "next/server";
import { formatBookingRange } from "@/lib/bookings/format";
import {
  cancelCalendarEntry,
  createCalendarBlock,
  getEntry,
  isBookingDatabaseConfigured,
  isOverlapError,
  markNotificationSent,
  readBookingDashboard,
  reviewBooking,
} from "@/lib/bookings/store";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readSiteContent } from "@/lib/cms/store";
import { adminUrl, escapeEmailHtml, resolveRobinEmail, sendEmail } from "@/lib/email";
import { isSameOrigin } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function authorized(request: Request) {
  return isSameOrigin(request) && (await isAdminAuthenticated());
}

function unavailable() {
  return NextResponse.json(
    { ok: false, error: "Rezervační databáze ještě není připojená." },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  if (!(await authorized(request))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json(await readBookingDashboard());
}

export async function POST(request: Request) {
  if (!(await authorized(request))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isBookingDatabaseConfigured()) return unavailable();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  const title = String(body.title ?? "").trim().slice(0, 160);
  const note = String(body.note ?? "").trim().slice(0, 2000);
  const startAt = new Date(String(body.startAt ?? ""));
  const endAt = new Date(String(body.endAt ?? ""));
  const duration = endAt.getTime() - startAt.getTime();
  if (
    !title ||
    Number.isNaN(startAt.getTime()) ||
    Number.isNaN(endAt.getTime()) ||
    duration < 15 * 60_000 ||
    duration > 14 * 24 * 60 * 60_000
  ) {
    return NextResponse.json({ ok: false, error: "Vyplňte název a platný termín." }, { status: 400 });
  }
  try {
    const entry = await createCalendarBlock({ title, note, startAt, endAt });
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    if (isOverlapError(error)) {
      return NextResponse.json(
        { ok: false, error: "Tento čas se překrývá s jinou rezervací nebo blokací." },
        { status: 409 },
      );
    }
    console.error("[robin/admin-bookings] block failed", error);
    return NextResponse.json({ ok: false, error: "Termín se nepodařilo zablokovat." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!(await authorized(request))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isBookingDatabaseConfigured()) return unavailable();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = String(body?.id ?? "");
  const status = String(body?.status ?? "");
  const adminNote = String(body?.adminNote ?? "").trim().slice(0, 2000);
  if (UUID_RE.test(id) && body?.action === "notify-robin") {
    const entry = await getEntry(id);
    if (!entry || entry.entryType !== "booking") {
      return NextResponse.json({ ok: false, error: "Rezervace nebyla nalezena." }, { status: 404 });
    }
    const site = await readSiteContent();
    const robinEmail = resolveRobinEmail(site.contact.email);
    if (!robinEmail) return NextResponse.json({ ok: false, error: "Chybí Robinův e-mail." }, { status: 503 });
    const bookingRange = formatBookingRange(entry);
    const sent = await sendEmail({
      to: robinEmail,
      replyTo: entry.customerEmail ?? undefined,
      idempotencyKey: `booking-${entry.id}-robin-v1`,
      subject: `[Rezervace čeká] ${entry.eventType ?? "Akce"} — ${entry.customerName ?? "klient"}`,
      text: `Žádost čeká na schválení.\n\nTermín: ${bookingRange}\nKlient: ${entry.customerName}\nMísto: ${entry.location}\nTelefon: ${entry.customerPhone}\n\n${adminUrl()}`,
      html: `<h2>Žádost čeká na schválení</h2><p><strong>Termín:</strong> ${escapeEmailHtml(bookingRange)}</p><p><strong>Klient:</strong> ${escapeEmailHtml(entry.customerName ?? "")}</p><p><strong>Místo:</strong> ${escapeEmailHtml(entry.location ?? "")}</p><p><a href="${adminUrl()}">Otevřít administraci</a></p>`,
    });
    if (!sent) {
      return NextResponse.json({ ok: false, error: "E-mail se nepodařilo odeslat." }, { status: 502 });
    }
    await markNotificationSent(entry.id);
    return NextResponse.json({ ok: true, entry: { ...entry, notificationSentAt: new Date().toISOString() } });
  }
  if (!UUID_RE.test(id) || (status !== "approved" && status !== "declined")) {
    return NextResponse.json({ ok: false, error: "Neplatná změna." }, { status: 400 });
  }

  try {
    const entry = await reviewBooking(id, status, adminNote);
    if (!entry) return NextResponse.json({ ok: false, error: "Rezervace nebyla nalezena." }, { status: 404 });

    let emailSent = true;
    if (entry.customerEmail) {
      const range = formatBookingRange(entry);
      const approved = status === "approved";
      const subject = approved
        ? "Robin potvrdil váš termín"
        : "Robin se ozývá k vašemu termínu";
      const noteText = adminNote ? `\n\nRobinova poznámka: ${adminNote}` : "";
      emailSent = await sendEmail({
        to: entry.customerEmail,
        idempotencyKey: `booking-${entry.id}-customer-${status}-v1`,
        subject,
        text: approved
          ? `Skvělá zpráva — Robin potvrdil termín ${range}.${noteText}`
          : `Termín ${range} bohužel nebyl potvrzen.${noteText}\n\nOdpovězte na tento e-mail nebo pošlete novou žádost s jiným termínem.`,
        html: approved
          ? `<h2>Termín je potvrzený</h2><p>Skvělá zpráva — Robin potvrdil termín <strong>${escapeEmailHtml(range)}</strong>.</p>${adminNote ? `<p><strong>Robinova poznámka:</strong><br>${escapeEmailHtml(adminNote).replace(/\n/g, "<br>")}</p>` : ""}`
          : `<h2>K vašemu termínu</h2><p>Termín <strong>${escapeEmailHtml(range)}</strong> bohužel nebyl potvrzen.</p>${adminNote ? `<p><strong>Robinova poznámka:</strong><br>${escapeEmailHtml(adminNote).replace(/\n/g, "<br>")}</p>` : ""}<p>Odpovězte na tento e-mail nebo pošlete novou žádost s jiným termínem.</p>`,
      });
    }
    return NextResponse.json({ ok: true, entry, emailSent });
  } catch (error) {
    console.error("[robin/admin-bookings] review failed", error);
    return NextResponse.json({ ok: false, error: "Změnu se nepodařilo uložit." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!(await authorized(request))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isBookingDatabaseConfigured()) return unavailable();
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Neplatná položka." }, { status: 400 });
  }
  const entry = await cancelCalendarEntry(id);
  if (!entry) return NextResponse.json({ ok: false, error: "Položka nebyla nalezena." }, { status: 404 });
  let emailSent = true;
  if (entry.entryType === "booking" && entry.customerEmail) {
    const bookingRange = formatBookingRange(entry);
    emailSent = await sendEmail({
      to: entry.customerEmail,
      idempotencyKey: `booking-${entry.id}-customer-cancelled-v1`,
      subject: "Změna potvrzeného termínu s Robinem",
      text: `Termín ${bookingRange} byl zrušen. Robin vás bude případně kontaktovat ohledně náhradního termínu.`,
      html: `<h2>Změna termínu</h2><p>Termín <strong>${escapeEmailHtml(bookingRange)}</strong> byl zrušen. Robin vás bude případně kontaktovat ohledně náhradního termínu.</p>`,
    });
  }
  return NextResponse.json({ ok: true, entry, emailSent });
}
