import Stripe from "stripe";
import { markBookingPaidBySessionId } from "@/lib/bookingStore";

export function getStripeServerClient() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return new Stripe(secret, { apiVersion: "2025-02-24.acacia" });
}

export async function syncBookingPaymentFromSessionId(sessionId: string) {
  const stripe = getStripeServerClient();
  if (!stripe) return null;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status === "paid") {
    return markBookingPaidBySessionId(session.id);
  }
  return null;
}

