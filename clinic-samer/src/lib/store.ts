import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR =
  process.env.VERCEL || process.env.NODE_ENV === "production"
    ? path.join("/tmp", "clinic-samer-data")
    : path.join(process.cwd(), "data");

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  locale: string;
  status: ReviewStatus;
  createdAt: string;
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  note: string;
  locale: string;
  status: "new" | "confirmed" | "cancelled";
  createdAt: string;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const full = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(full, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T) {
  await ensureDataDir();
  const full = path.join(DATA_DIR, file);
  await fs.writeFile(full, JSON.stringify(data, null, 2), "utf8");
}

export async function listReviews(opts?: {
  status?: ReviewStatus;
}): Promise<Review[]> {
  const all = await readJson<Review[]>("reviews.json", []);
  const filtered = opts?.status
    ? all.filter((r) => r.status === opts.status)
    : all;
  return filtered.sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export async function createReview(input: {
  name: string;
  rating: number;
  text: string;
  locale: string;
}): Promise<Review> {
  const all = await readJson<Review[]>("reviews.json", []);
  const review: Review = {
    id: randomUUID(),
    name: input.name.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    text: input.text.trim(),
    locale: input.locale,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  all.unshift(review);
  await writeJson("reviews.json", all);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review | null> {
  const all = await readJson<Review[]>("reviews.json", []);
  const idx = all.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], status };
  await writeJson("reviews.json", all);
  return all[idx];
}

export async function listBookings(): Promise<Booking[]> {
  const all = await readJson<Booking[]>("bookings.json", []);
  return all.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createBooking(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  note: string;
  locale: string;
}): Promise<Booking> {
  const all = await readJson<Booking[]>("bookings.json", []);
  const booking: Booking = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    service: input.service,
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
    note: input.note.trim(),
    locale: input.locale,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  all.unshift(booking);
  await writeJson("bookings.json", all);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  const all = await readJson<Booking[]>("bookings.json", []);
  const idx = all.findIndex((b) => b.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], status };
  await writeJson("bookings.json", all);
  return all[idx];
}
