import "server-only";

import { getSiteUrl } from "@/lib/siteUrl";

export function escapeEmailHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function resolveEmailFrom(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Kouzlíme s Robinem <onboarding@resend.dev>"
  );
}

export function resolveRobinEmail(fallback?: string): string | null {
  const candidate = process.env.CONTACT_TO_EMAIL?.trim() || fallback?.trim() || "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : null;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
  idempotencyKey,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  idempotencyKey: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: resolveEmailFrom(),
        to: [to],
        reply_to: replyTo,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return true;
    console.error("[robin/email] Resend failed", response.status, await response.text());
    return false;
  } catch (error) {
    console.error("[robin/email] Resend unavailable", error);
    return false;
  }
}

export function adminUrl(): string {
  return `${getSiteUrl()}/admin#rezervace-admin`;
}
