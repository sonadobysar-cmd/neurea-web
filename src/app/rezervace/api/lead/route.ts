import { NextResponse } from "next/server";

const TO_EMAIL = "info@neurea.cz";

const INTEREST_LABELS: Record<string, string> = {
  studie: "Testovací studie zdarma (formulář vlevo)",
  seznam: "Rezervační seznam (formulář vpravo)",
};

function subjectPrefix(interest: string): string {
  if (interest === "studie") return "[STUDIE]";
  if (interest === "seznam") return "[SEZNAM]";
  return "[REZERVACE]";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("interest" in body)
  ) {
    return NextResponse.json({ ok: false, error: "Chybí údaje." }, { status: 400 });
  }

  const { name, email, interest, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ ok: false, error: "Vyplňte jméno." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "Vyplňte platný e-mail." }, { status: 400 });
  }
  if (typeof interest !== "string" || !(interest in INTEREST_LABELS)) {
    return NextResponse.json({ ok: false, error: "Neplatný typ zájmu." }, { status: 400 });
  }

  const nameClean = name.trim();
  const emailClean = email.trim().toLowerCase();
  const interestLabel = INTEREST_LABELS[interest];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[rezervace/lead] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Odeslání e-mailu není nakonfigurováno." },
      { status: 503 },
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "Neurea rezervace <onboarding@resend.dev>";

  const html = `
    <p style="font-size:18px;margin:0 0 16px 0;"><strong>${escapeHtml(interestLabel)}</strong></p>
    <p style="margin:0 0 12px 0;"><strong>Zdroj:</strong> rezervace.neurea.cz · interest=<code>${escapeHtml(interest)}</code></p>
    <p style="margin:0;"><strong>Jméno:</strong> ${escapeHtml(nameClean)}<br/>
    <strong>E-mail:</strong> ${escapeHtml(emailClean)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO_EMAIL],
      reply_to: emailClean,
      subject: `${subjectPrefix(interest)} Rezervace landing: ${nameClean}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[rezervace/lead] Resend error:", res.status, text);
    return NextResponse.json(
      { ok: false, error: "Odeslání se nepovedlo. Zkuste to prosím znovu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
