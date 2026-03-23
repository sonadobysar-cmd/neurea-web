import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getChargeAmountCzk, getServiceById, type PaymentOption } from "@/lib/bookingConfig";
import { attachStripeSession, createBooking, isSlotAvailable } from "@/lib/bookingStore";
import { site } from "@/lib/site";

type CheckoutPayload = {
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  paymentOption: PaymentOption;
};

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe není nakonfigurován. Nastavte STRIPE_SECRET_KEY v .env.local." },
      { status: 503 },
    );
  }

  const body = (await req.json()) as CheckoutPayload;
  const service = getServiceById(body.serviceId);
  if (!service) return NextResponse.json({ error: "Neplatná služba." }, { status: 400 });

  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    return NextResponse.json({ error: "Neplatné datum." }, { status: 400 });
  }
  if (!/^\d{2}:\d{2}$/.test(body.time)) {
    return NextResponse.json({ error: "Neplatný čas." }, { status: 400 });
  }
  if (!body.clientName?.trim() || !body.clientEmail?.trim() || !body.clientPhone?.trim()) {
    return NextResponse.json({ error: "Vyplňte jméno, e-mail a telefon." }, { status: 400 });
  }

  const slotAvailable = await isSlotAvailable(body.date, body.time, service.durationMin);
  if (!slotAvailable) {
    return NextResponse.json({ error: "Tento termín je mezitím obsazený. Vyberte prosím jiný." }, { status: 409 });
  }

  const chargedAmountCzk = getChargeAmountCzk(service.priceCzk, body.paymentOption);

  const booking = await createBooking({
    serviceId: service.id,
    serviceName: service.name,
    durationMin: service.durationMin,
    servicePriceCzk: service.priceCzk,
    paymentOption: body.paymentOption,
    chargedAmountCzk,
    date: body.date,
    time: body.time,
    clientName: body.clientName.trim(),
    clientEmail: body.clientEmail.trim(),
    clientPhone: body.clientPhone.trim(),
    notes: body.notes?.trim() || "",
  });

  const stripe = new Stripe(secret, { apiVersion: "2025-02-24.acacia" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/rezervace/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/rezervace`,
      customer_email: booking.clientEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: site.stripeCurrency,
            unit_amount: chargedAmountCzk * 100,
            product_data: {
              name: `${booking.serviceName} — ${site.name}`,
              description:
                booking.paymentOption === "test_10"
                  ? `TEST 10 Kč — ${booking.date} ${booking.time} (${booking.durationMin} min)`
                  : `${booking.date} ${booking.time} (${booking.durationMin} min)`,
            },
          },
        },
      ],
      metadata: {
        bookingId: booking.id,
        serviceId: booking.serviceId,
        paymentOption: booking.paymentOption,
      },
    });

    if (!session.url || !session.id) {
      return NextResponse.json({ error: "Nepodařilo se vytvořit platební session." }, { status: 500 });
    }

    await attachStripeSession(booking.id, session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chyba při vytváření platby." }, { status: 500 });
  }
}

