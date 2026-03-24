import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { Booking } from "@/lib/bookingStore";
import { sendBookingConfirmationEmail } from "@/lib/email/sendBookingConfirmation";
import { markBookingPaidBySessionId, markConfirmationEmailSent } from "@/lib/bookingStore";

function toNumber(value: string | null | undefined, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parsePaymentOption(value: string | null | undefined): Booking["paymentOption"] {
  if (value === "deposit_500" || value === "deposit_1000" || value === "full") {
    return value;
  }
  return "full";
}

function buildBookingFromStripeSession(session: Stripe.Checkout.Session): Booking | null {
  const email = session.customer_email?.trim() || session.customer_details?.email?.trim() || "";
  if (!email) return null;

  const metadata = session.metadata || {};
  const now = new Date().toISOString();

  return {
    id: metadata.bookingId || session.id || `stripe_${Date.now()}`,
    serviceId: metadata.serviceId || "unknown",
    serviceName: metadata.serviceName || "Rezervace",
    durationMin: toNumber(metadata.durationMin, 0),
    servicePriceCzk: toNumber(metadata.chargedAmountCzk, 0),
    paymentOption: parsePaymentOption(metadata.paymentOption),
    chargedAmountCzk: toNumber(metadata.chargedAmountCzk, 0),
    date: metadata.date || now.slice(0, 10),
    time: metadata.time || "00:00",
    clientName: metadata.clientName || session.customer_details?.name || "Klient",
    clientEmail: email,
    clientPhone: "",
    notes: "",
    status: "paid",
    stripeSessionId: session.id || undefined,
    createdAt: now,
    paidAt: now,
  };
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook není nakonfigurovaný (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET)." },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2025-02-24.acacia" });
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Chybí stripe-signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Neplatný webhook podpis." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid" && session.id) {
      const booking = await markBookingPaidBySessionId(session.id);
      const bookingForEmail = booking ?? buildBookingFromStripeSession(session);

      if (bookingForEmail && !booking?.confirmationEmailSent) {
        try {
          const sent = await sendBookingConfirmationEmail(bookingForEmail);
          if (sent && booking) {
            await markConfirmationEmailSent(booking.id);
          }
        } catch (e) {
          console.error("sendBookingConfirmationEmail:", e);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}

