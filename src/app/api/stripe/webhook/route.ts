import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { markBookingPaidBySessionId } from "@/lib/bookingStore";

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
      await markBookingPaidBySessionId(session.id);
    }
  }

  return NextResponse.json({ received: true });
}

