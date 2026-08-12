import { NextResponse } from "next/server";
import { readSiteContent } from "@/lib/cms/store";
import { escapeEmailHtml, resolveEmailFrom } from "@/lib/email";
import { getClientIp, isSameOrigin } from "@/lib/request";
import { turnstileError, verifyTurnstile } from "@/lib/turnstile";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function sanitizeSubjectPart(s: string): string {
  return s.replace(/[\r\n\u0000-\u001f]/g, " ").trim().slice(0, 80);
}

function resolveToEmail(candidate: string): string | null {
  const pinned = process.env.CONTACT_TO_EMAIL?.trim();
  if (pinned && EMAIL_RE.test(pinned)) return pinned;
  const email = candidate.trim();
  if (!EMAIL_RE.test(email)) return null;
  if (email.includes(",") || email.includes(";")) return null;
  return email;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 403 });
  }
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Příliš mnoho odeslání. Zkuste to prosím za chvíli." },
      { status: 429 },
    );
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 32_000) {
    return NextResponse.json({ ok: false, error: "Požadavek je příliš velký." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Chybí údaje." }, { status: 400 });
  }

  const name = "name" in body ? String(body.name ?? "").trim().slice(0, MAX_NAME) : "";
  const email = "email" in body ? String(body.email ?? "").trim().slice(0, MAX_EMAIL) : "";
  const phone = "phone" in body ? String(body.phone ?? "").trim().slice(0, MAX_PHONE) : "";
  const message = "message" in body ? String(body.message ?? "").trim().slice(0, MAX_MESSAGE) : "";
  const website = "website" in body ? String(body.website ?? "").trim() : "";
  const turnstileToken =
    "turnstileToken" in body ? String(body.turnstileToken ?? "").trim() : "";
  const consent =
    "consent" in body &&
    (body.consent === true || body.consent === "true" || body.consent === "1" || body.consent === 1);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Pro odeslání je potřeba souhlas se zpracováním údajů." },
      { status: 400 },
    );
  }

  const turnstile = await verifyTurnstile({
    token: turnstileToken,
    ip,
    expectedAction: "contact",
    expectedHostname: new URL(request.url).hostname,
  });
  if (!turnstile.ok) {
    const error = turnstileError(turnstile);
    return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
  }

  if (!name) {
    return NextResponse.json({ ok: false, error: "Zadejte jméno." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Zadejte platný e-mail." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "Zadejte platné telefonní číslo." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const site = await readSiteContent();
  const fallbackEmail = resolveToEmail(site.contact.email) || "kouzlimesrobinem@email.cz";

  if (!apiKey) {
    console.error("[robin/contact] RESEND_API_KEY missing");
    return NextResponse.json(
      {
        ok: false,
        error: `Formulář je dočasně nedostupný. Napište prosím na ${fallbackEmail} nebo volejte ${site.contact.phoneDisplay}.`,
      },
      { status: 503 },
    );
  }

  const TO_EMAIL = resolveToEmail(site.contact.email);
  if (!TO_EMAIL) {
    return NextResponse.json(
      { ok: false, error: "Formulář je dočasně nedostupný." },
      { status: 503 },
    );
  }

  const plain = [
    "Nová zpráva z webu Kouzlíme s Robinem",
    "",
    `Jméno: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone}`,
    "",
    message || "(bez poznámky)",
  ].join("\n");

  const html = `
    <h2>Nová zpráva z webu Kouzlíme s Robinem</h2>
    <p><strong>Jméno:</strong> ${escapeEmailHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeEmailHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeEmailHtml(phone)}</p>
    <p><strong>Poznámka:</strong></p>
    <p>${escapeEmailHtml(message || "(bez poznámky)").replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resolveEmailFrom(),
      to: [TO_EMAIL],
      reply_to: email,
      subject: `[Kouzlíme s Robinem] Zpráva od ${sanitizeSubjectPart(name)}`,
      text: plain,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[robin/contact] Resend failed", res.status, text);
    return NextResponse.json(
      { ok: false, error: "Odeslání se nepovedlo. Zkuste to prosím znovu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
