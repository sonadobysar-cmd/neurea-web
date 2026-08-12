import type { CalendarEntry } from "./types";

const dateTime = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const time = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatBookingRange(entry: Pick<CalendarEntry, "startAt" | "endAt">): string {
  return `${dateTime.format(new Date(entry.startAt))}–${time.format(new Date(entry.endAt))}`;
}
