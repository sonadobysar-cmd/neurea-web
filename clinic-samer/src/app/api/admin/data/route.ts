import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listBookings, listReviews } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const [reviews, bookings] = await Promise.all([
    listReviews(),
    listBookings(),
  ]);
  return NextResponse.json({ reviews, bookings });
}
