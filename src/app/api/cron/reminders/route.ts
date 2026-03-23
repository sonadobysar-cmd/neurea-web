import { NextResponse } from "next/server";
import {
  listBookingsNeedingReminderForDate,
  markReminderEmailSent,
} from "@/lib/bookingStore";
import { sendReminderEmail } from "@/lib/email/sendReminderEmail";
import { getTomorrowYmdPrague } from "@/lib/pragueDate";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function notConfigured() {
  return NextResponse.json(
    { error: "CRON_SECRET není nastaven v prostředí." },
    { status: 503 },
  );
}

function verifyCron(req: Request): "ok" | "missing_secret" | "bad_auth" {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return "missing_secret";
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) return "bad_auth";
  return "ok";
}

/**
 * Jednou denně (Vercel Cron) — odešle e-mail klientům, jejichž termín je „zítra“ v Europe/Prague.
 * Zabezpečení: Authorization: Bearer CRON_SECRET
 */
export async function GET(req: Request) {
  const v = verifyCron(req);
  if (v === "missing_secret") return notConfigured();
  if (v === "bad_auth") return unauthorized();

  const tomorrow = getTomorrowYmdPrague();
  const bookings = await listBookingsNeedingReminderForDate(tomorrow);

  const results: { id: string; ok: boolean }[] = [];

  for (const booking of bookings) {
    try {
      const sent = await sendReminderEmail(booking);
      if (sent) {
        await markReminderEmailSent(booking.id);
      }
      results.push({ id: booking.id, ok: sent });
    } catch (e) {
      console.error("reminder send:", booking.id, e);
      results.push({ id: booking.id, ok: false });
    }
  }

  return NextResponse.json({
    serviceDate: tomorrow,
    count: bookings.length,
    results,
  });
}

export async function POST(req: Request) {
  return GET(req);
}
