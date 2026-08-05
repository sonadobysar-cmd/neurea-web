import { NextResponse } from "next/server";
import { brand } from "@/data/content";
import type { ContactPayload } from "@/lib/contact-client";

const MAX_FIELD_LENGTH = 4_000;

function clean(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Neplatná data." }, { status: 400 });
  }

  if (clean(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 80);
  const intent = clean(payload.intent, 160);
  const message = clean(payload.message);
  const source = payload.source === "configurator" ? "Konfigurátor" : "Homepage";

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Doplňte prosím jméno, platný e-mail a zprávu." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "E-mailové odesílání zatím není nastavené." },
      { status: 503 },
    );
  }

  const configuration = payload.configuration
    ? `<h2>Konfigurace</h2><pre>${escapeHtml(
        JSON.stringify(payload.configuration, null, 2).slice(0, 20_000),
      )}</pre>`
    : "";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        `${brand.name} <onboarding@resend.dev>`,
      to: [to],
      reply_to: email,
      subject: `${source}: ${intent || "nová poptávka"}`,
      html: `
        <h1>Nová poptávka – ${escapeHtml(source)}</h1>
        <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || "neuveden")}</p>
        <p><strong>Záměr:</strong> ${escapeHtml(intent || "neuveden")}</p>
        <h2>Zpráva</h2>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        ${configuration}
      `,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Poptávku se nepodařilo odeslat." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
