import type { Booking } from "@/lib/bookingStore";
import { buildReminderEmailHtml } from "@/lib/email/reminderEmailHtml";
import { site } from "@/lib/site";

export async function sendReminderEmail(booking: Booking): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY není nastaven — připomínkový e-mail se neodešle.");
    return false;
  }

  const from = process.env.EMAIL_FROM?.trim() || `NEUREA <onboarding@resend.dev>`;
  const subject = `Připomínka: zítra u nás — ${booking.serviceName} · ${site.name}`;

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
      html: buildReminderEmailHtml(booking),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend reminder error:", res.status, text);
    return false;
  }

  return true;
}
