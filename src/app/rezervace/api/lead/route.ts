import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const TO_EMAIL = site.email;

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

/** Stejná priorita jako u `sendBookingConfirmationEmail` — ověřený odesílatel v Resend. */
function resolveResendFrom(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "NEUREA <onboarding@resend.dev>"
  );
}

function clientLeadSubject(interest: string): string {
  if (interest === "studie") return "Potvrzení přihlášky do studie — NEUREA Brno";
  if (interest === "seznam") return "Potvrzení zájmu o rezervační seznam — NEUREA Brno";
  return "Potvrzení — NEUREA Brno";
}

function clientLeadHtml(interest: string, nameClean: string): string {
  const name = escapeHtml(nameClean);
  if (interest === "studie") {
    return `
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">Dobrý den, ${name},</p>
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">děkujeme za přihlášení do <strong>testovací studie</strong> na rezervace.neurea.cz. Váš zájem jsme zaznamenali.</p>
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">Brzy vás budeme kontaktovat na tento e-mail s dalšími informacemi.</p>
<p style="margin:0;font-size:14px;line-height:1.5;color:#555;">NEUREA · Brno · <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>
    `.trim();
  }
  return `
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">Dobrý den, ${name},</p>
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">děkujeme za zájem o <strong>rezervační seznam</strong> na rezervace.neurea.cz. Vaše údaje jsme uložili.</p>
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.5;">Až budeme připraveni, dáme vám vědět mezi prvními.</p>
<p style="margin:0;font-size:14px;line-height:1.5;color:#555;">NEUREA · Brno · <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>
  `.trim();
}

function clientLeadPlain(interest: string, nameClean: string): string {
  if (interest === "studie") {
    return [
      `Dobrý den, ${nameClean},`,
      "",
      "děkujeme za přihlášení do testovací studie na rezervace.neurea.cz. Váš zájem jsme zaznamenali.",
      "",
      "Brzy vás budeme kontaktovat na tento e-mail s dalšími informacemi.",
      "",
      `NEUREA · Brno · ${site.email}`,
    ].join("\n");
  }
  return [
    `Dobrý den, ${nameClean},`,
    "",
    "děkujeme za zájem o rezervační seznam na rezervace.neurea.cz. Vaše údaje jsme uložili.",
    "",
    "Až budeme připraveni, dáme vám vědět mezi prvními.",
    "",
    `NEUREA · Brno · ${site.email}`,
  ].join("\n");
}

function adminLeadPlain(
  interestLabel: string,
  interest: string,
  nameClean: string,
  emailClean: string,
): string {
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
    return NextResponse.json({ ok: true, clientEmailSent: true });
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
    console.error("[rezervace/lead] Resend admin:", adminRes.status, adminRes.body);
    return NextResponse.json(
      { ok: false, error: "Odeslání se nepovedlo. Zkuste to prosím znovu." },
      { status: 502 },
    );
  }

  const clientSubject = clientLeadSubject(interest);
  const clientHtml = clientLeadHtml(interest, nameClean);
  const clientPlain = clientLeadPlain(interest, nameClean);

  const clientPayloadFull = {
    from,
    to: [emailClean],
    reply_to: TO_EMAIL,
    subject: clientSubject,
    html: clientHtml,
    text: clientPlain,
  };

  let clientRes = await resendSend(apiKey, clientPayloadFull);
  if (!clientRes.ok) {
    console.warn("[rezervace/lead] klient 1. pokus:", clientRes.status, clientRes.body);
    await new Promise((r) => setTimeout(r, 450));
    /** Druhý pokus bez reply_to (některá API pravidla / DMARC to umí ovlivnit). */
    clientRes = await resendSend(apiKey, {
      from,
      to: [emailClean],
      subject: clientSubject,
      html: clientHtml,
      text: clientPlain,
    });
  }

  if (!clientRes.ok) {
    console.error("[rezervace/lead] Resend klient po 2 pokusech:", clientRes.status, clientRes.body);
    return NextResponse.json({ ok: true, clientEmailSent: false });
  }

  return NextResponse.json({ ok: true, clientEmailSent: true });
}
