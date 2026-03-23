import type { Booking } from "@/lib/bookingStore";
import { buildBookingConfirmationHtml } from "@/lib/email/bookingConfirmationHtml";
import { site } from "@/lib/site";

/**
 * Odeslání HTML potvrzení přes Resend (https://resend.com).
 * Vyžaduje RESEND_API_KEY a ověřený odesílatel (nebo výchozí Resend sandbox).
 */
export async function sendBookingConfirmationEmail(booking: Booking): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY není nastaven — potvrzovací e-mail se neodešle.");
    return false;
  }

  const from = process.env.EMAIL_FROM?.trim() || `NEUREA <onboarding@resend.dev>`;
  const subject = `Potvrzení rezervace — ${booking.serviceName} · ${site.name}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [booking.clientEmail],
      reply_to: site.email,
      subject,
      html: buildBookingConfirmationHtml(booking),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", res.status, text);
    return false;
  }

  return true;
}
