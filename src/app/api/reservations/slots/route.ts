import { NextResponse } from "next/server";
import { getAvailableSlotsForDate } from "@/lib/slots";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const durationParam = searchParams.get("duration");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Neplatné datum." }, { status: 400 });
  }

  const durationMin = Number(durationParam);
  if (!Number.isFinite(durationMin) || durationMin < 30 || durationMin > 180) {
    return NextResponse.json({ error: "Neplatná délka sezení." }, { status: 400 });
  }

  const slots = await getAvailableSlotsForDate(date, durationMin);
  return NextResponse.json({ slots });
}

