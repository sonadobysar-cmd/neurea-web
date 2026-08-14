import "server-only";

import { randomUUID } from "crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import {
  DEFAULT_BOOKING_WORKING_HOURS,
  isWithinBookingWorkingHours,
  normalizeBookingWorkingHours,
  parseBookingWorkingHours,
} from "./schedule";
import type {
  BookingDashboard,
  BookingStatus,
  BookingWorkingHours,
  CalendarEntry,
} from "./types";

type DbRow = {
  id: string;
  entry_type: "booking" | "block";
  status: BookingStatus;
  start_at: string | Date;
  end_at: string | Date;
  title: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  event_type: string | null;
  location: string | null;
  guest_count: number | string | null;
  message: string | null;
  admin_note: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  reviewed_at: string | Date | null;
  notification_sent_at: string | Date | null;
};

let schemaReady: Promise<void> | null = null;

function databaseUrl(): string | null {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.NEON_DATABASE_URL?.trim() ||
    null
  );
}

function connection(): NeonQueryFunction<false, false> {
  const url = databaseUrl();
  if (!url) throw new Error("BOOKING_DATABASE_NOT_CONFIGURED");
  return neon(url);
}

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    const sql = connection();
    await sql`
      CREATE TABLE IF NOT EXISTS robin_calendar_entries (
        id uuid PRIMARY KEY,
        entry_type text NOT NULL CHECK (entry_type IN ('booking', 'block')),
        status text NOT NULL CHECK (status IN ('pending', 'approved', 'declined', 'cancelled')),
        start_at timestamptz NOT NULL,
        end_at timestamptz NOT NULL,
        title text NOT NULL,
        customer_name text,
        customer_email text,
        customer_phone text,
        event_type text,
        location text,
        guest_count integer,
        message text,
        admin_note text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        reviewed_at timestamptz,
        notification_sent_at timestamptz,
        CHECK (end_at > start_at),
        CHECK (
          entry_type = 'block' OR
          (customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL)
        )
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS robin_calendar_entries_start_idx
      ON robin_calendar_entries (start_at)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS robin_calendar_entries_status_idx
      ON robin_calendar_entries (status, created_at DESC)
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS robin_booking_settings (
        id text PRIMARY KEY CHECK (id = 'default'),
        working_hours jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    const defaultHours = JSON.stringify(DEFAULT_BOOKING_WORKING_HOURS);
    await sql`
      INSERT INTO robin_booking_settings (id, working_hours)
      VALUES ('default', ${defaultHours}::jsonb)
      ON CONFLICT (id) DO NOTHING
    `;
    await sql`
      DO $$
      BEGIN
        LOCK TABLE robin_calendar_entries IN ACCESS EXCLUSIVE MODE;
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'robin_calendar_entries_no_overlap'
        ) THEN
          ALTER TABLE robin_calendar_entries
          ADD CONSTRAINT robin_calendar_entries_no_overlap
          EXCLUDE USING gist (tstzrange(start_at, end_at, '[)') WITH &&)
          WHERE (status IN ('pending', 'approved'));
        END IF;
      END $$
    `;
  })().catch((error) => {
    schemaReady = null;
    throw error;
  });
  return schemaReady;
}

function iso(value: string | Date | null): string | null {
  if (value === null) return null;
  return new Date(value).toISOString();
}

function mapRow(row: DbRow): CalendarEntry {
  return {
    id: row.id,
    entryType: row.entry_type,
    status: row.status,
    startAt: iso(row.start_at)!,
    endAt: iso(row.end_at)!,
    title: row.title,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    eventType: row.event_type,
    location: row.location,
    guestCount: row.guest_count === null ? null : Number(row.guest_count),
    message: row.message,
    adminNote: row.admin_note,
    createdAt: iso(row.created_at)!,
    updatedAt: iso(row.updated_at)!,
    reviewedAt: iso(row.reviewed_at),
    notificationSentAt: iso(row.notification_sent_at),
  };
}

export function isBookingDatabaseConfigured(): boolean {
  return Boolean(databaseUrl());
}

export function isOverlapError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { code?: string; constraint?: string; message?: string };
  return (
    candidate.code === "23P01" ||
    candidate.constraint === "robin_calendar_entries_no_overlap" ||
    candidate.message?.includes("robin_calendar_entries_no_overlap") === true
  );
}

export function isWorkingHoursError(error: unknown): boolean {
  return error instanceof Error && error.message === "BOOKING_OUTSIDE_WORKING_HOURS";
}

export async function readBookingWorkingHours(): Promise<BookingWorkingHours> {
  if (!isBookingDatabaseConfigured()) return normalizeBookingWorkingHours(null);
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    SELECT working_hours
    FROM robin_booking_settings
    WHERE id = 'default'
    LIMIT 1
  `;
  return normalizeBookingWorkingHours((rows[0] as { working_hours?: unknown } | undefined)?.working_hours);
}

export async function saveBookingWorkingHours(value: unknown): Promise<BookingWorkingHours> {
  const workingHours = parseBookingWorkingHours(value);
  if (!workingHours) throw new Error("INVALID_WORKING_HOURS");
  await ensureSchema();
  const sql = connection();
  const encoded = JSON.stringify(workingHours);
  await sql`
    INSERT INTO robin_booking_settings (id, working_hours, updated_at)
    VALUES ('default', ${encoded}::jsonb, now())
    ON CONFLICT (id) DO UPDATE
    SET working_hours = EXCLUDED.working_hours, updated_at = now()
  `;
  return workingHours;
}

export async function createBooking(input: {
  startAt: Date;
  endAt: Date;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  location: string;
  guestCount: number | null;
  message: string;
}): Promise<CalendarEntry> {
  await ensureSchema();
  const sql = connection();
  const settings = await sql`
    SELECT working_hours
    FROM robin_booking_settings
    WHERE id = 'default'
    LIMIT 1
  `;
  const workingHours = normalizeBookingWorkingHours(
    (settings[0] as { working_hours?: unknown } | undefined)?.working_hours,
  );
  if (!isWithinBookingWorkingHours(workingHours, input.startAt, input.endAt)) {
    throw new Error("BOOKING_OUTSIDE_WORKING_HOURS");
  }
  const id = randomUUID();
  const rows = await sql`
    INSERT INTO robin_calendar_entries (
      id, entry_type, status, start_at, end_at, title,
      customer_name, customer_email, customer_phone, event_type,
      location, guest_count, message
    ) VALUES (
      ${id}, 'booking', 'pending', ${input.startAt.toISOString()}, ${input.endAt.toISOString()},
      ${`${input.eventType} — ${input.name}`}, ${input.name}, ${input.email}, ${input.phone},
      ${input.eventType}, ${input.location}, ${input.guestCount}, ${input.message || null}
    )
    RETURNING *
  `;
  return mapRow(rows[0] as DbRow);
}

export async function markNotificationSent(id: string): Promise<void> {
  await ensureSchema();
  const sql = connection();
  await sql`
    UPDATE robin_calendar_entries
    SET notification_sent_at = now(), updated_at = now()
    WHERE id = ${id}
  `;
}

export async function readBusyIntervals(from: Date, to: Date) {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    SELECT start_at, end_at
    FROM robin_calendar_entries
    WHERE status IN ('pending', 'approved')
      AND start_at < ${to.toISOString()}
      AND end_at > ${from.toISOString()}
    ORDER BY start_at ASC
  `;
  return (rows as Array<{ start_at: string | Date; end_at: string | Date }>).map((row) => ({
    startAt: iso(row.start_at)!,
    endAt: iso(row.end_at)!,
  }));
}

export async function readBookingDashboard(): Promise<BookingDashboard> {
  if (!isBookingDatabaseConfigured()) {
    return {
      configured: false,
      pendingCount: 0,
      entries: [],
      workingHours: normalizeBookingWorkingHours(null),
    };
  }
  try {
    await ensureSchema();
    const sql = connection();
    const [rows, settings] = await Promise.all([
      sql`
        SELECT *
        FROM robin_calendar_entries
        WHERE end_at > now() - interval '14 days'
        ORDER BY
          CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
          start_at ASC
        LIMIT 300
      `,
      sql`
        SELECT working_hours
        FROM robin_booking_settings
        WHERE id = 'default'
        LIMIT 1
      `,
    ]);
    const entries = (rows as DbRow[]).map(mapRow);
    return {
      configured: true,
      pendingCount: entries.filter((entry) => entry.status === "pending").length,
      entries,
      workingHours: normalizeBookingWorkingHours(
        (settings[0] as { working_hours?: unknown } | undefined)?.working_hours,
      ),
    };
  } catch (error) {
    console.error("[robin/bookings] dashboard failed", error);
    return {
      configured: true,
      pendingCount: 0,
      entries: [],
      workingHours: normalizeBookingWorkingHours(null),
      error: "Kalendář se nepodařilo načíst.",
    };
  }
}

export async function getEntry(id: string): Promise<CalendarEntry | null> {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`SELECT * FROM robin_calendar_entries WHERE id = ${id} LIMIT 1`;
  return rows[0] ? mapRow(rows[0] as DbRow) : null;
}

export async function reviewBooking(
  id: string,
  status: "approved" | "declined" | "cancelled",
  adminNote: string,
): Promise<CalendarEntry | null> {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    UPDATE robin_calendar_entries
    SET status = ${status}, admin_note = ${adminNote || null}, reviewed_at = now(), updated_at = now()
    WHERE id = ${id} AND entry_type = 'booking' AND status = 'pending'
    RETURNING *
  `;
  return rows[0] ? mapRow(rows[0] as DbRow) : null;
}

export async function createCalendarBlock(input: {
  title: string;
  startAt: Date;
  endAt: Date;
  note: string;
}): Promise<CalendarEntry> {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    INSERT INTO robin_calendar_entries (
      id, entry_type, status, start_at, end_at, title, admin_note, reviewed_at
    ) VALUES (
      ${randomUUID()}, 'block', 'approved', ${input.startAt.toISOString()},
      ${input.endAt.toISOString()}, ${input.title}, ${input.note || null}, now()
    )
    RETURNING *
  `;
  return mapRow(rows[0] as DbRow);
}

export async function cancelCalendarEntry(id: string): Promise<CalendarEntry | null> {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    UPDATE robin_calendar_entries
    SET status = 'cancelled', reviewed_at = now(), updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ? mapRow(rows[0] as DbRow) : null;
}
