import type { CalendarEntry } from "@/lib/bookings/types";

export type GoogleCalendarOption = {
  id: string;
  summary: string;
  primary: boolean;
  accessRole: string;
  backgroundColor: string | null;
  selected: boolean;
  canWrite: boolean;
};

export type GoogleCalendarDashboard = {
  configured: boolean;
  connected: boolean;
  email: string | null;
  calendars: GoogleCalendarOption[];
  selectedCalendarIds: string[];
  destinationCalendarId: string | null;
  connectedAt: string | null;
  lastError: string | null;
  entries: CalendarEntry[];
};

export type GoogleBusyInterval = {
  startAt: string;
  endAt: string;
};

export type GoogleSyncResult = {
  attempted: boolean;
  synced: boolean;
  error?: string;
};
