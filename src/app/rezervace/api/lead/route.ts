import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const TO_EMAIL = site.email.toLowerCase();

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

function resolveResendFrom(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "NEUREA <onboarding@resend.dev>"
  );
}

function adminLeadPlain(interestLabel: string, interest: string, nameClean: string, emailClean: string): string {
  return [
    interestLabel,
    "",
    `Zdroj: rezervace.neurea.cz · interest=${interest}`,
    "",
    `Jméno: ${nameClean}`,
    `E-mail: ${emailClean}`,
  ].join("\n");
}

async function resendSend(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Jen interní notifikace na info@ — potvrzení klientovi je na stránce (modální okno). */
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

  const b = body as Record<string, unknown>;
  const { name, email, interest } = b;

  const hp = typeof b.neurea_hp === "string" ? b.neurea_hp.trim() : "";
  const legacyWebsite = typeof b.website === "string" ? b.website.trim() : "";
  if (hp.length > 0 || legacyWebsite.length > 0) {
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

  const from = resolveResendFrom();

  const adminHtml = `
    <p style="font-size:18px;margin:0 0 16px 0;"><strong>${escapeHtml(interestLabel)}</strong></p>
    <p style="margin:0 0 12px 0;"><strong>Zdroj:</strong> rezervace.neurea.cz · interest=<code>${escapeHtml(interest)}</code></p>
    <p style="margin:0;"><strong>Jméno:</strong> ${escapeHtml(nameClean)}<br/>
    <strong>E-mail:</strong> ${escapeHtml(emailClean)}</p>
  `;
  const adminPlain = adminLeadPlain(interestLabel, interest, nameClean, emailClean);

  const adminRes = await resendSend(apiKey, {
    from,
    to: [TO_EMAIL],
    reply_to: emailClean,
    subject: `${subjectPrefix(interest)} Rezervace landing: ${nameClean}`,
    html: adminHtml,
    text: adminPlain,
  });

  if (!adminRes.ok) {
    console.error("[rezervace/lead] Resend:", adminRes.status, adminRes.body);
    return NextResponse.json(
      { ok: false, error: "Odeslání se nepovedlo. Zkuste to prosím znovu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
