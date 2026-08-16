import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { CalendarEntry } from "@/lib/bookings/types";
import { getSiteUrl } from "@/lib/siteUrl";
import type {
  GoogleBusyInterval,
  GoogleCalendarDashboard,
  GoogleCalendarOption,
  GoogleSyncResult,
} from "./types";

const CONNECTION_ID = "default";
const GOOGLE_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/calendar.calendarlist.readonly",
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.events.freebusy",
  "https://www.googleapis.com/auth/calendar.events.owned",
];

type ConnectionRow = {
  google_email: string;
  encrypted_refresh_token: string;
  selected_calendar_ids: unknown;
  destination_calendar_id: string | null;
  connected_at: string | Date;
  updated_at: string | Date;
  last_error: string | null;
};

type LinkRow = {
  entry_id: string;
  calendar_id: string;
  event_id: string;
  html_link: string | null;
};

type GoogleCalendarListItem = {
  id?: string;
  summary?: string;
  summaryOverride?: string;
  primary?: boolean;
  accessRole?: string;
  backgroundColor?: string;
  deleted?: boolean;
};

type GoogleCalendarListResponse = {
  items?: GoogleCalendarListItem[];
  nextPageToken?: string;
};

type GoogleEvent = {
  id?: string;
  status?: string;
  summary?: string;
  location?: string;
  description?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  transparency?: string;
  start?: { dateTime?: string; date?: string; timeZone?: string };
  end?: { dateTime?: string; date?: string; timeZone?: string };
  attendees?: Array<{ self?: boolean; responseStatus?: string }>;
  extendedProperties?: { private?: Record<string, string> };
};

type GoogleEventsResponse = {
  items?: GoogleEvent[];
  nextPageToken?: string;
};

type OAuthTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  error?: string;
  error_description?: string;
};

type AccessTokenCache = {
  token: string;
  expiresAt: number;
};

let schemaReady: Promise<void> | null = null;
let tokenCache: AccessTokenCache | null = null;

export class GoogleCalendarUnavailableError extends Error {
  constructor(message = "GOOGLE_CALENDAR_UNAVAILABLE") {
    super(message);
    this.name = "GoogleCalendarUnavailableError";
  }
}

class GoogleApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GoogleApiError";
    this.status = status;
  }
}

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
  if (!url) throw new Error("GOOGLE_CALENDAR_DATABASE_NOT_CONFIGURED");
  return neon(url);
}

function clientId(): string | null {
  return process.env.GOOGLE_CALENDAR_CLIENT_ID?.trim() || null;
}

function clientSecret(): string | null {
  return process.env.GOOGLE_CALENDAR_CLIENT_SECRET?.trim() || null;
}

function encryptionSecret(): string | null {
  return (
    process.env.GOOGLE_CALENDAR_ENCRYPTION_KEY?.trim() ||
    process.env.ADMIN_SECRET?.trim() ||
    null
  );
}

function encryptionKey(): Buffer {
  const secret = encryptionSecret();
  if (!secret) throw new Error("GOOGLE_CALENDAR_ENCRYPTION_NOT_CONFIGURED");
  return createHash("sha256")
    .update(`kouzlimesrobinem/google-calendar/v1/${secret}`)
    .digest();
}

function encrypt(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ["v1", iv.toString("base64url"), tag.toString("base64url"), encrypted.toString("base64url")].join(".");
}

function decrypt(value: string): string {
  const [version, ivRaw, tagRaw, encryptedRaw] = value.split(".");
  if (version !== "v1" || !ivRaw || !tagRaw || !encryptedRaw) {
    throw new Error("INVALID_GOOGLE_CALENDAR_TOKEN");
  }
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(ivRaw, "base64url"));
  decipher.setAuthTag(Buffer.from(tagRaw, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedRaw, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    const sql = connection();
    await sql`
      CREATE TABLE IF NOT EXISTS robin_google_calendar_connection (
        id text PRIMARY KEY CHECK (id = 'default'),
        google_email text NOT NULL,
        encrypted_refresh_token text NOT NULL,
        selected_calendar_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
        destination_calendar_id text,
        connected_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        last_error text
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS robin_google_calendar_links (
        entry_id uuid PRIMARY KEY,
        calendar_id text NOT NULL,
        event_id text NOT NULL,
        html_link text,
        last_synced_at timestamptz NOT NULL DEFAULT now(),
        last_error text
      )
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS robin_google_calendar_event_idx
      ON robin_google_calendar_links (calendar_id, event_id)
    `;
  })().catch((error) => {
    schemaReady = null;
    throw error;
  });
  return schemaReady;
}

function iso(value: string | Date): string {
  return new Date(value).toISOString();
}

function selectedIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string" && item.length <= 1024))];
}

async function readConnection(): Promise<ConnectionRow | null> {
  if (!isGoogleCalendarConfigured()) return null;
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    SELECT google_email, encrypted_refresh_token, selected_calendar_ids,
      destination_calendar_id, connected_at, updated_at, last_error
    FROM robin_google_calendar_connection
    WHERE id = ${CONNECTION_ID}
    LIMIT 1
  `;
  return (rows[0] as ConnectionRow | undefined) ?? null;
}

async function saveLastError(message: string | null): Promise<void> {
  if (!isGoogleCalendarConfigured()) return;
  try {
    await ensureSchema();
    const sql = connection();
    await sql`
      UPDATE robin_google_calendar_connection
      SET last_error = ${message}, updated_at = now()
      WHERE id = ${CONNECTION_ID}
    `;
  } catch (error) {
    console.error("[robin/google-calendar] failed to store integration status", error);
  }
}

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(databaseUrl() && clientId() && clientSecret() && encryptionSecret());
}

export function googleOAuthRedirectUri(): string {
  return `${getSiteUrl()}/api/admin/google-calendar/callback`;
}

export function googleOAuthUrl(state: string): string {
  const id = clientId();
  if (!id) throw new Error("GOOGLE_CALENDAR_OAUTH_NOT_CONFIGURED");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", id);
  url.searchParams.set("redirect_uri", googleOAuthRedirectUri());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("state", state);
  return url.toString();
}

async function tokenRequest(values: Record<string, string>): Promise<OAuthTokenResponse> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(values),
    cache: "no-store",
  });
  const body = (await response.json().catch(() => ({}))) as OAuthTokenResponse;
  if (!response.ok || !body.access_token) {
    throw new GoogleApiError(response.status, body.error_description || body.error || "Google OAuth selhal.");
  }
  return body;
}

async function refreshAccessToken(row: ConnectionRow, force = false): Promise<string> {
  if (!force && tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;
  const id = clientId();
  const secret = clientSecret();
  if (!id || !secret) throw new GoogleCalendarUnavailableError();
  let refreshToken: string;
  try {
    refreshToken = decrypt(row.encrypted_refresh_token);
  } catch (error) {
    await saveLastError("Uložené připojení nelze přečíst. Připojte Google účet znovu.");
    throw new GoogleCalendarUnavailableError();
  }
  try {
    const response = await tokenRequest({
      client_id: id,
      client_secret: secret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });
    tokenCache = {
      token: response.access_token!,
      expiresAt: Date.now() + Math.max(60, response.expires_in ?? 3600) * 1000,
    };
    return tokenCache.token;
  } catch (error) {
    await saveLastError("Google účet vyžaduje nové připojení.");
    throw new GoogleCalendarUnavailableError();
  }
}

async function googleFetch<T>(
  row: ConnectionRow,
  path: string,
  init?: RequestInit,
  retry = true,
): Promise<T> {
  const token = await refreshAccessToken(row, !retry);
  const response = await fetch(`https://www.googleapis.com${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (response.status === 401 && retry) {
    tokenCache = null;
    return googleFetch<T>(row, path, init, false);
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new GoogleApiError(response.status, body.error?.message || `Google API ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

async function listCalendarsWithToken(accessToken: string): Promise<GoogleCalendarListItem[]> {
  const items: GoogleCalendarListItem[] = [];
  let pageToken = "";
  do {
    const url = new URL("https://www.googleapis.com/calendar/v3/users/me/calendarList");
    url.searchParams.set("maxResults", "250");
    url.searchParams.set("showDeleted", "false");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) throw new GoogleApiError(response.status, "Seznam kalendářů se nepodařilo načíst.");
    const body = (await response.json()) as GoogleCalendarListResponse;
    items.push(...(body.items ?? []));
    pageToken = body.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

async function listCalendars(row: ConnectionRow): Promise<GoogleCalendarListItem[]> {
  const items: GoogleCalendarListItem[] = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({ maxResults: "250", showDeleted: "false" });
    if (pageToken) params.set("pageToken", pageToken);
    const body = await googleFetch<GoogleCalendarListResponse>(
      row,
      `/calendar/v3/users/me/calendarList?${params}`,
    );
    items.push(...(body.items ?? []));
    pageToken = body.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

function calendarOptions(items: GoogleCalendarListItem[], selected: string[]): GoogleCalendarOption[] {
  const selectedSet = new Set(selected);
  return items
    .filter((item): item is GoogleCalendarListItem & { id: string } => Boolean(item.id && !item.deleted))
    .map((item) => ({
      id: item.id,
      summary: item.summaryOverride || item.summary || "Kalendář bez názvu",
      primary: item.primary === true,
      accessRole: item.accessRole || "reader",
      backgroundColor: item.backgroundColor || null,
      selected: selectedSet.has(item.id),
      canWrite: item.accessRole === "owner",
    }))
    .sort((a, b) => Number(b.primary) - Number(a.primary) || a.summary.localeCompare(b.summary, "cs"));
}

export async function exchangeGoogleAuthorizationCode(code: string): Promise<void> {
  const id = clientId();
  const secret = clientSecret();
  if (!id || !secret || !databaseUrl() || !encryptionSecret()) {
    throw new Error("GOOGLE_CALENDAR_OAUTH_NOT_CONFIGURED");
  }
  const token = await tokenRequest({
    client_id: id,
    client_secret: secret,
    code,
    grant_type: "authorization_code",
    redirect_uri: googleOAuthRedirectUri(),
  });
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` },
    cache: "no-store",
  });
  const user = (await userResponse.json().catch(() => ({}))) as { email?: string };
  if (!userResponse.ok || !user.email) throw new Error("GOOGLE_CALENDAR_EMAIL_UNAVAILABLE");

  await ensureSchema();
  const existing = await readConnection();
  const refreshToken = token.refresh_token ||
    (existing?.google_email === user.email ? decrypt(existing.encrypted_refresh_token) : null);
  if (!refreshToken) throw new Error("GOOGLE_CALENDAR_REFRESH_TOKEN_MISSING");

  const calendars = await listCalendarsWithToken(token.access_token!);
  const primary = calendars.find((calendar) => calendar.primary && calendar.id) ||
    calendars.find((calendar) => calendar.accessRole === "owner" && calendar.id);
  if (!primary?.id) throw new Error("GOOGLE_CALENDAR_PRIMARY_MISSING");

  const sql = connection();
  const initialSelected = JSON.stringify([primary.id]);
  if (existing && existing.google_email !== user.email) {
    await sql`DELETE FROM robin_google_calendar_links`;
  }
  await sql`
    INSERT INTO robin_google_calendar_connection (
      id, google_email, encrypted_refresh_token, selected_calendar_ids,
      destination_calendar_id, connected_at, updated_at, last_error
    ) VALUES (
      ${CONNECTION_ID}, ${user.email}, ${encrypt(refreshToken)}, ${initialSelected}::jsonb,
      ${primary.id}, now(), now(), NULL
    )
    ON CONFLICT (id) DO UPDATE SET
      google_email = EXCLUDED.google_email,
      encrypted_refresh_token = EXCLUDED.encrypted_refresh_token,
      selected_calendar_ids = CASE
        WHEN robin_google_calendar_connection.google_email = EXCLUDED.google_email
          THEN robin_google_calendar_connection.selected_calendar_ids
        ELSE EXCLUDED.selected_calendar_ids
      END,
      destination_calendar_id = CASE
        WHEN robin_google_calendar_connection.google_email = EXCLUDED.google_email
          THEN COALESCE(robin_google_calendar_connection.destination_calendar_id, EXCLUDED.destination_calendar_id)
        ELSE EXCLUDED.destination_calendar_id
      END,
      connected_at = now(),
      updated_at = now(),
      last_error = NULL
  `;
  tokenCache = {
    token: token.access_token!,
    expiresAt: Date.now() + Math.max(60, token.expires_in ?? 3600) * 1000,
  };
}

function pragueInstant(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  const target = Date.UTC(year, month - 1, day);
  let guess = target;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  for (let iteration = 0; iteration < 3; iteration += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(guess))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)]),
    );
    const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    guess += target - represented;
  }
  return new Date(guess);
}

function eventRange(event: GoogleEvent): { startAt: string; endAt: string } | null {
  const start = event.start?.dateTime
    ? new Date(event.start.dateTime)
    : event.start?.date
      ? pragueInstant(event.start.date)
      : null;
  const end = event.end?.dateTime
    ? new Date(event.end.dateTime)
    : event.end?.date
      ? pragueInstant(event.end.date)
      : null;
  if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return null;
  return { startAt: start.toISOString(), endAt: end.toISOString() };
}

function isBlockingEvent(event: GoogleEvent): boolean {
  if (event.status === "cancelled" || event.transparency === "transparent") return false;
  if (event.attendees?.some((attendee) => attendee.self && attendee.responseStatus === "declined")) return false;
  return true;
}

async function listCalendarEvents(
  row: ConnectionRow,
  calendar: GoogleCalendarOption,
  from: Date,
  to: Date,
): Promise<CalendarEntry[]> {
  const events: GoogleEvent[] = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      showDeleted: "false",
      maxResults: "2500",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const body = await googleFetch<GoogleEventsResponse>(
      row,
      `/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?${params}`,
    );
    events.push(...(body.items ?? []));
    pageToken = body.nextPageToken ?? "";
  } while (pageToken);

  return events.flatMap((event): CalendarEntry[] => {
    if (!event.id || !isBlockingEvent(event)) return [];
    if (event.extendedProperties?.private?.robinEntryId) return [];
    const eventTimes = eventRange(event);
    if (!eventTimes) return [];
    const fingerprint = createHash("sha256").update(`${calendar.id}\0${event.id}`).digest("hex").slice(0, 32);
    return [{
      id: `google-${fingerprint}`,
      entryType: "google",
      status: "approved",
      startAt: eventTimes.startAt,
      endAt: eventTimes.endAt,
      title: event.summary?.trim() || "Obsazený termín",
      customerName: null,
      customerEmail: null,
      customerPhone: null,
      eventType: null,
      location: event.location?.trim() || null,
      guestCount: null,
      message: null,
      adminNote: null,
      createdAt: event.created ? new Date(event.created).toISOString() : eventTimes.startAt,
      updatedAt: event.updated ? new Date(event.updated).toISOString() : eventTimes.startAt,
      reviewedAt: null,
      notificationSentAt: null,
      sourceLabel: calendar.summary,
      externalUrl: event.htmlLink || null,
    }];
  });
}

async function freeBusyEntries(
  row: ConnectionRow,
  calendar: GoogleCalendarOption,
  from: Date,
  to: Date,
): Promise<CalendarEntry[]> {
  const body = await googleFetch<{
    calendars?: Record<string, { busy?: Array<{ start?: string; end?: string }>; errors?: unknown[] }>;
  }>(row, "/calendar/v3/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      timeZone: "Europe/Prague",
      items: [{ id: calendar.id }],
    }),
  });
  return (body.calendars?.[calendar.id]?.busy ?? []).flatMap((busy, index): CalendarEntry[] => {
    const start = new Date(busy.start ?? "");
    const end = new Date(busy.end ?? "");
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return [];
    const fingerprint = createHash("sha256")
      .update(`${calendar.id}\0${busy.start}\0${busy.end}\0${index}`)
      .digest("hex")
      .slice(0, 32);
    return [{
      id: `google-${fingerprint}`,
      entryType: "google",
      status: "approved",
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      title: "Obsazený termín",
      customerName: null,
      customerEmail: null,
      customerPhone: null,
      eventType: null,
      location: null,
      guestCount: null,
      message: null,
      adminNote: null,
      createdAt: start.toISOString(),
      updatedAt: start.toISOString(),
      reviewedAt: null,
      notificationSentAt: null,
      sourceLabel: calendar.summary,
      externalUrl: null,
    }];
  });
}

async function readExternalEntries(
  row: ConnectionRow,
  calendars: GoogleCalendarOption[],
  from: Date,
  to: Date,
): Promise<CalendarEntry[]> {
  const selected = calendars.filter((calendar) => calendar.selected);
  const groups = await Promise.all(
    selected.map((calendar) =>
      calendar.accessRole === "freeBusyReader"
        ? freeBusyEntries(row, calendar, from, to)
        : listCalendarEvents(row, calendar, from, to),
    ),
  );
  return groups.flat().sort((a, b) => a.startAt.localeCompare(b.startAt));
}

function emptyDashboard(configured: boolean): GoogleCalendarDashboard {
  return {
    configured,
    connected: false,
    email: null,
    calendars: [],
    selectedCalendarIds: [],
    destinationCalendarId: null,
    connectedAt: null,
    lastError: null,
    entries: [],
  };
}

export async function readGoogleCalendarDashboard(from: Date, to: Date): Promise<GoogleCalendarDashboard> {
  if (!isGoogleCalendarConfigured()) return emptyDashboard(false);
  const row = await readConnection();
  if (!row) return emptyDashboard(true);
  const selected = selectedIds(row.selected_calendar_ids);
  try {
    const rawCalendars = await listCalendars(row);
    const calendars = calendarOptions(rawCalendars, selected);
    const entries = await readExternalEntries(row, calendars, from, to);
    if (row.last_error) void saveLastError(null);
    return {
      configured: true,
      connected: true,
      email: row.google_email,
      calendars,
      selectedCalendarIds: selected,
      destinationCalendarId: row.destination_calendar_id,
      connectedAt: iso(row.connected_at),
      lastError: null,
      entries,
    };
  } catch (error) {
    console.error("[robin/google-calendar] dashboard sync failed", error);
    const message = "Události z Googlu se nepodařilo načíst. Zkuste účet znovu připojit.";
    void saveLastError(message);
    return {
      configured: true,
      connected: true,
      email: row.google_email,
      calendars: [],
      selectedCalendarIds: selected,
      destinationCalendarId: row.destination_calendar_id,
      connectedAt: iso(row.connected_at),
      lastError: message,
      entries: [],
    };
  }
}

export async function readGoogleCalendarSettingsDashboard(): Promise<GoogleCalendarDashboard> {
  if (!isGoogleCalendarConfigured()) return emptyDashboard(false);
  const row = await readConnection();
  if (!row) return emptyDashboard(true);
  const selected = selectedIds(row.selected_calendar_ids);
  try {
    const calendars = calendarOptions(await listCalendars(row), selected);
    if (row.last_error) void saveLastError(null);
    return {
      configured: true,
      connected: true,
      email: row.google_email,
      calendars,
      selectedCalendarIds: selected,
      destinationCalendarId: row.destination_calendar_id,
      connectedAt: iso(row.connected_at),
      lastError: null,
      entries: [],
    };
  } catch (error) {
    console.error("[robin/google-calendar] settings sync failed", error);
    const message = "Seznam Google kalendářů se nepodařilo načíst. Připojte účet znovu.";
    void saveLastError(message);
    return {
      configured: true,
      connected: true,
      email: row.google_email,
      calendars: [],
      selectedCalendarIds: selected,
      destinationCalendarId: row.destination_calendar_id,
      connectedAt: iso(row.connected_at),
      lastError: message,
      entries: [],
    };
  }
}

export async function readGoogleBusyIntervals(from: Date, to: Date): Promise<GoogleBusyInterval[]> {
  if (!isGoogleCalendarConfigured()) return [];
  const row = await readConnection();
  if (!row) return [];
  try {
    const calendars = calendarOptions(await listCalendars(row), selectedIds(row.selected_calendar_ids));
    const entries = await readExternalEntries(row, calendars, from, to);
    return entries.map((entry) => ({ startAt: entry.startAt, endAt: entry.endAt }));
  } catch (error) {
    console.error("[robin/google-calendar] availability sync failed", error);
    void saveLastError("Obsazenost z Google Kalendáře se nepodařilo ověřit.");
    throw new GoogleCalendarUnavailableError();
  }
}

export async function hasGoogleCalendarConflict(startAt: Date, endAt: Date): Promise<boolean> {
  const intervals = await readGoogleBusyIntervals(startAt, endAt);
  return intervals.some(
    (item) => new Date(item.startAt).getTime() < endAt.getTime() && new Date(item.endAt).getTime() > startAt.getTime(),
  );
}

export async function saveGoogleCalendarSettings(
  requestedIds: string[],
  requestedDestination: string,
): Promise<void> {
  const row = await readConnection();
  if (!row) throw new Error("GOOGLE_CALENDAR_NOT_CONNECTED");
  const calendars = calendarOptions(await listCalendars(row), []);
  const allowed = new Set(calendars.map((calendar) => calendar.id));
  const selected = [...new Set(requestedIds)].filter((id) => allowed.has(id)).slice(0, 50);
  const destination = calendars.find(
    (calendar) => calendar.id === requestedDestination && calendar.canWrite,
  );
  if (!destination) throw new Error("INVALID_GOOGLE_DESTINATION");
  if (!selected.includes(destination.id)) selected.push(destination.id);
  if (!selected.length) throw new Error("NO_GOOGLE_CALENDARS_SELECTED");
  await ensureSchema();
  const sql = connection();
  const encoded = JSON.stringify(selected);
  await sql`
    UPDATE robin_google_calendar_connection
    SET selected_calendar_ids = ${encoded}::jsonb,
      destination_calendar_id = ${destination.id},
      updated_at = now(),
      last_error = NULL
    WHERE id = ${CONNECTION_ID}
  `;
}

export async function disconnectGoogleCalendar(): Promise<void> {
  const row = await readConnection();
  if (!row) return;
  try {
    const token = decrypt(row.encrypted_refresh_token);
    await fetch("https://oauth2.googleapis.com/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[robin/google-calendar] token revocation failed", error);
  }
  await ensureSchema();
  const sql = connection();
  await sql`DELETE FROM robin_google_calendar_connection WHERE id = ${CONNECTION_ID}`;
  tokenCache = null;
}

function eventPayload(entry: CalendarEntry) {
  const details = entry.entryType === "booking"
    ? [
        entry.customerName ? `Klient: ${entry.customerName}` : null,
        entry.customerEmail ? `E-mail: ${entry.customerEmail}` : null,
        entry.customerPhone ? `Telefon: ${entry.customerPhone}` : null,
        entry.eventType ? `Typ akce: ${entry.eventType}` : null,
        entry.guestCount ? `Počet hostů: ${entry.guestCount}` : null,
        entry.message ? `Poznámka klienta: ${entry.message}` : null,
        entry.adminNote ? `Robinova poznámka: ${entry.adminNote}` : null,
      ]
    : [entry.adminNote ? `Soukromá poznámka: ${entry.adminNote}` : null];
  return {
    summary: entry.title,
    location: entry.location || undefined,
    description: details.filter(Boolean).join("\n") || undefined,
    start: { dateTime: entry.startAt, timeZone: "Europe/Prague" },
    end: { dateTime: entry.endAt, timeZone: "Europe/Prague" },
    transparency: "opaque",
    status: "confirmed",
    extendedProperties: {
      private: {
        robinEntryId: entry.id,
        robinEntryType: entry.entryType,
        robinSource: "kouzlimesrobinem.cz",
      },
    },
  };
}

async function readLink(entryId: string): Promise<LinkRow | null> {
  await ensureSchema();
  const sql = connection();
  const rows = await sql`
    SELECT entry_id, calendar_id, event_id, html_link
    FROM robin_google_calendar_links
    WHERE entry_id = ${entryId}
    LIMIT 1
  `;
  return (rows[0] as LinkRow | undefined) ?? null;
}

async function storeLink(entryId: string, calendarId: string, eventId: string, htmlLink: string | null) {
  await ensureSchema();
  const sql = connection();
  await sql`
    INSERT INTO robin_google_calendar_links (
      entry_id, calendar_id, event_id, html_link, last_synced_at, last_error
    ) VALUES (
      ${entryId}, ${calendarId}, ${eventId}, ${htmlLink}, now(), NULL
    )
    ON CONFLICT (entry_id) DO UPDATE SET
      calendar_id = EXCLUDED.calendar_id,
      event_id = EXCLUDED.event_id,
      html_link = EXCLUDED.html_link,
      last_synced_at = now(),
      last_error = NULL
  `;
}

async function storeLinkError(entryId: string, message: string) {
  await ensureSchema();
  const sql = connection();
  await sql`
    UPDATE robin_google_calendar_links
    SET last_error = ${message}, last_synced_at = now()
    WHERE entry_id = ${entryId}
  `;
}

export async function syncEntryToGoogleCalendar(entry: CalendarEntry): Promise<GoogleSyncResult> {
  if ((entry.entryType !== "booking" && entry.entryType !== "block") || entry.status !== "approved") {
    return { attempted: false, synced: false };
  }
  if (!isGoogleCalendarConfigured()) return { attempted: false, synced: false };
  const row = await readConnection();
  if (!row?.destination_calendar_id) return { attempted: false, synced: false };
  const payload = eventPayload(entry);
  const existing = await readLink(entry.id);
  try {
    let calendarId = existing?.calendar_id || row.destination_calendar_id;
    let result: GoogleEvent;
    if (existing) {
      try {
        result = await googleFetch<GoogleEvent>(
          row,
          `/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(existing.event_id)}?sendUpdates=none`,
          { method: "PUT", body: JSON.stringify(payload) },
        );
      } catch (error) {
        if (!(error instanceof GoogleApiError) || error.status !== 404) throw error;
        calendarId = row.destination_calendar_id;
        result = await googleFetch<GoogleEvent>(
          row,
          `/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=none`,
          { method: "POST", body: JSON.stringify(payload) },
        );
      }
    } else {
      result = await googleFetch<GoogleEvent>(
        row,
        `/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=none`,
        { method: "POST", body: JSON.stringify(payload) },
      );
    }
    if (!result.id) throw new Error("GOOGLE_EVENT_ID_MISSING");
    await storeLink(entry.id, calendarId, result.id, result.htmlLink || null);
    return { attempted: true, synced: true };
  } catch (error) {
    console.error("[robin/google-calendar] entry sync failed", error);
    await storeLinkError(entry.id, "Synchronizace do Google Kalendáře selhala.").catch(() => undefined);
    return {
      attempted: true,
      synced: false,
      error: "Změna je uložená, ale zápis do Google Kalendáře se nepodařil.",
    };
  }
}

export async function removeEntryFromGoogleCalendar(entryId: string): Promise<GoogleSyncResult> {
  if (!isGoogleCalendarConfigured()) return { attempted: false, synced: false };
  const row = await readConnection();
  if (!row) return { attempted: false, synced: false };
  const link = await readLink(entryId);
  if (!link) return { attempted: false, synced: false };
  try {
    try {
      await googleFetch<void>(
        row,
        `/calendar/v3/calendars/${encodeURIComponent(link.calendar_id)}/events/${encodeURIComponent(link.event_id)}?sendUpdates=none`,
        { method: "DELETE" },
      );
    } catch (error) {
      if (!(error instanceof GoogleApiError) || error.status !== 404) throw error;
    }
    const sql = connection();
    await sql`DELETE FROM robin_google_calendar_links WHERE entry_id = ${entryId}`;
    return { attempted: true, synced: true };
  } catch (error) {
    console.error("[robin/google-calendar] entry removal failed", error);
    await storeLinkError(entryId, "Odstranění z Google Kalendáře selhalo.").catch(() => undefined);
    return {
      attempted: true,
      synced: false,
      error: "Termín je uvolněný na webu, ale v Google Kalendáři se jej nepodařilo odstranit.",
    };
  }
}
