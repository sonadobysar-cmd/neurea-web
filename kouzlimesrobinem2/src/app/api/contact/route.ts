import { NextResponse } from "next/server";

const TO_EMAIL = "kouzlimesrobinem@email.cz";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

type RateEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateEntry>();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveFrom(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Kouzlíme s Robinem <onboarding@resend.dev>"
  );
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Příliš mnoho odeslání. Zkuste to prosím za chvíli." },
      { status: 429 },
    );
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

  const name = "name" in body ? String(body.name ?? "").trim() : "";
  const email = "email" in body ? String(body.email ?? "").trim() : "";
  const phone = "phone" in body ? String(body.phone ?? "").trim() : "";
  const message = "message" in body ? String(body.message ?? "").trim() : "";
  const website = "website" in body ? String(body.website ?? "").trim() : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json({ ok: false, error: "Zadejte jméno." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Zadejte platný e-mail." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "Zadejte platné telefonní číslo." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[robin/contact] RESEND_API_KEY missing");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Formulář je dočasně nedostupný. Napište prosím na kouzlimesrobinem@email.cz nebo volejte 775 950 328.",
      },
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
    <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Poznámka:</strong></p>
    <p>${escapeHtml(message || "(bez poznámky)").replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resolveFrom(),
      to: [TO_EMAIL],
      reply_to: email,
      subject: `[Kouzlíme s Robinem] Zpráva od ${name}`,
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
