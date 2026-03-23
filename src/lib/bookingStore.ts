import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { PaymentOption } from "@/lib/bookingConfig";

export type BookingStatus = "pending_payment" | "paid" | "cancelled";

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  durationMin: number;
  servicePriceCzk: number;
  paymentOption: PaymentOption;
  chargedAmountCzk: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  status: BookingStatus;
  stripeSessionId?: string;
  createdAt: string;
  paidAt?: string;
};

const DATA_DIR = process.env.BOOKINGS_DATA_DIR || "/tmp/neurea";
const DATA_FILE = path.join(DATA_DIR, "bookings.json");
const PENDING_TTL_MS = 20 * 60 * 1000;

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAllUnsafe(): Promise<Booking[]> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Booking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAllUnsafe(bookings: Booking[]) {
  await ensureDataFile();
  await writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function listBookings() {
  return readAllUnsafe();
}

export async function createBooking(
  input: Omit<Booking, "id" | "status" | "createdAt" | "paidAt" | "stripeSessionId">,
) {
  const bookings = await readAllUnsafe();
  const booking: Booking = {
    ...input,
    id: randomUUID(),
    status: "pending_payment",
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  await writeAllUnsafe(bookings);
  return booking;
}

export async function attachStripeSession(bookingId: string, stripeSessionId: string) {
  const bookings = await readAllUnsafe();
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx === -1) return null;
  bookings[idx].stripeSessionId = stripeSessionId;
  await writeAllUnsafe(bookings);
  return bookings[idx];
}

export async function markBookingPaidBySessionId(stripeSessionId: string) {
  const bookings = await readAllUnsafe();
  const idx = bookings.findIndex((b) => b.stripeSessionId === stripeSessionId);
  if (idx === -1) return null;
  bookings[idx].status = "paid";
  bookings[idx].paidAt = new Date().toISOString();
  await writeAllUnsafe(bookings);
  return bookings[idx];
}

export async function isSlotAvailable(date: string, time: string, durationMin: number) {
  const bookings = await readAllUnsafe();
  const slotStart = toMinutes(time);
  const slotEnd = slotStart + durationMin;
  const nowMs = Date.now();

  const relevant = bookings.filter((b) => {
    if (b.date !== date) return false;
    if (b.status === "paid") return true;
    if (b.status === "pending_payment") {
      return nowMs - new Date(b.createdAt).getTime() < PENDING_TTL_MS;
    }
    return false;
  });

  return !relevant.some((b) => {
    const bStart = toMinutes(b.time);
    const bEnd = bStart + b.durationMin;
    return slotStart < bEnd && slotEnd > bStart;
  });
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((v) => Number(v));
  return h * 60 + m;
}

