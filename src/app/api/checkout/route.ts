import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/lib/site";

export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe není nakonfigurován. Nastavte STRIPE_SECRET_KEY v .env.local." },
      { status: 503 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const stripe = new Stripe(secret, {
    apiVersion: "2025-02-24.acacia",
  });

  /** 1000 Kč — Stripe pro CZK používá haléře (1 Kč = 100) */
  const amountHalere = site.depositCzk * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/rezervace/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/rezervace`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: site.stripeCurrency,
            unit_amount: amountHalere,
            product_data: {
              name: `Záloha na rezervaci — ${site.name}`,
              description: `Záloha ${site.depositCzk} Kč. Odpočítává se od ceny sezení dle obchodních podmínek.`,
            },
          },
        },
      ],
      customer_email: undefined,
      metadata: {
        type: "deposit",
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Nepodařilo se vytvořit platební session." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Chyba při vytváření platby." }, { status: 500 });
  }
}
