import type { BookingWorkingDay, BookingWorkingHours } from "./types";

const TIME_RE = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const PRAGUE_PARTS = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Prague",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export const DEFAULT_BOOKING_WORKING_HOURS: BookingWorkingHours = {
  timezone: "Europe/Prague",
  days: [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({
    weekday,
    enabled: true,
    start: "07:00",
    end: "23:00",
  })),
};

export function timeToMinutes(value: string): number {
  if (!TIME_RE.test(value)) return Number.NaN;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function copyDefaults(): BookingWorkingHours {
  return {
    timezone: "Europe/Prague",
    days: DEFAULT_BOOKING_WORKING_HOURS.days.map((day) => ({ ...day })),
  };
}

export function parseBookingWorkingHours(value: unknown): BookingWorkingHours | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { timezone?: unknown; days?: unknown };
  if (candidate.timezone !== "Europe/Prague" || !Array.isArray(candidate.days) || candidate.days.length !== 7) {
    return null;
  }

  const seen = new Set<number>();
  const days: BookingWorkingDay[] = [];
  for (const raw of candidate.days) {
    if (!raw || typeof raw !== "object") return null;
    const day = raw as Partial<BookingWorkingDay>;
    if (
      !Number.isInteger(day.weekday) ||
      day.weekday! < 0 ||
      day.weekday! > 6 ||
      seen.has(day.weekday!) ||
      typeof day.enabled !== "boolean" ||
      typeof day.start !== "string" ||
      typeof day.end !== "string" ||
      !TIME_RE.test(day.start) ||
      !TIME_RE.test(day.end) ||
      (day.enabled && timeToMinutes(day.end) <= timeToMinutes(day.start))
    ) {
      return null;
    }
    seen.add(day.weekday!);
    days.push({
      weekday: day.weekday!,
      enabled: day.enabled,
      start: day.start,
      end: day.end,
    });
  }

  return {
    timezone: "Europe/Prague",
    days: days.sort((a, b) => a.weekday - b.weekday),
  };
}

export function normalizeBookingWorkingHours(value: unknown): BookingWorkingHours {
  return parseBookingWorkingHours(value) ?? copyDefaults();
}

export function weekdayForDateKey(key: string): number {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function workingDayForDateKey(hours: BookingWorkingHours, key: string): BookingWorkingDay {
  return hours.days.find((day) => day.weekday === weekdayForDateKey(key)) ?? copyDefaults().days[0];
}

function localParts(value: Date) {
  const parts = Object.fromEntries(
    PRAGUE_PARTS.formatToParts(value)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<string, number>;
  const key = `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
  return {
    key,
    minutes: parts.hour * 60 + parts.minute + parts.second / 60 + value.getUTCMilliseconds() / 60_000,
  };
}

export function isWithinBookingWorkingHours(
  hours: BookingWorkingHours,
  startAt: Date,
  endAt: Date,
): boolean {
  const start = localParts(startAt);
  const end = localParts(endAt);
  if (start.key !== end.key) return false;
  const day = workingDayForDateKey(hours, start.key);
  if (!day.enabled) return false;
  return start.minutes >= timeToMinutes(day.start) && end.minutes <= timeToMinutes(day.end);
}
