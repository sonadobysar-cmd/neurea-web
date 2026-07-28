import { NextResponse } from "next/server";
import { createReview, listReviews } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const reviews = await listReviews({ status: "approved" });
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const text = String(body.text || "").trim();
    const rating = Number(body.rating);
    const locale = String(body.locale || "cs");

    if (!name || text.length < 12 || !rating) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    // Always pending — approval is invisible to the client.
    const review = await createReview({ name, text, rating, locale });
    return NextResponse.json({
      ok: true,
      id: review.id,
    });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
