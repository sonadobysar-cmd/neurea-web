import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createBooking, listBookings, updateBookingStatus } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await listBookings());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const preferredDate = String(body.preferredDate || "").trim();
    const preferredTime = String(body.preferredTime || "").trim();
    const note = String(body.note || "").trim();
    const locale = String(body.locale || "cs");

    if (!name || !email || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const booking = await createBooking({
      name,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      note,
      locale,
    });

    return NextResponse.json({ ok: true, id: booking.id });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const id = String(body.id || "");
  const status = body.status as "new" | "confirmed" | "cancelled";
  if (!id || !["new", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const updated = await updateBookingStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
