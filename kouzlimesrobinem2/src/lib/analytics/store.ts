import "server-only";

import { randomUUID } from "crypto";
import { del, list, put, type ListBlobResultBlob } from "@vercel/blob";
import type {
  AnalyticsBreakdownItem,
  AnalyticsDashboard,
  AnalyticsPeriod,
} from "./types";

const PREFIX = "robin-analytics/v1";
const PRAGUE_TIME_ZONE = "Europe/Prague";
const MAX_MONTH_PAGES = 5;

export type VisitEventInput = {
  sessionId: string;
  path: string;
  source: string;
  country: string;
  device: "desktop" | "mobile" | "tablet";
  browser: "chrome" | "safari" | "firefox" | "edge" | "other";
};

type StoredVisit = VisitEventInput & {
  timestamp: number;
  date: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: PRAGUE_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dayLabelFormatter = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "UTC",
  day: "numeric",
  month: "numeric",
});

function dateKey(date = new Date()): string {
  return dateFormatter.format(date);
}

function shiftDate(key: string, days: number): string {
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string): string | null {
  try {
    return Buffer.from(value, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

function sanitizeSessionId(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  return /^[a-z0-9-]{16,64}$/.test(normalized) ? normalized : null;
}

function sanitizePath(value: string): string | null {
  const normalized = value.trim().split("?")[0]?.split("#")[0] ?? "";
  if (!normalized.startsWith("/") || normalized.length > 120) return null;
  if (normalized.startsWith("/admin") || normalized.startsWith("/api")) return null;
  return normalized.replace(/\/{2,}/g, "/");
}

function sanitizeSource(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/^www\./, "");
  if (!normalized || normalized.length > 100) return "direct";
  return /^[a-z0-9.-]+$/.test(normalized) ? normalized : "direct";
}

function sanitizeCountry(value: string): string {
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : "--";
}

function parseVisit(blob: ListBlobResultBlob): StoredVisit | null {
  const parts = blob.pathname.split("/");
  if (parts.length !== 5 || `${parts[0]}/${parts[1]}` !== PREFIX) return null;

  const date = parts[3];
  const filename = parts[4]?.replace(/\.evt$/, "");
  if (!date || !filename || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const fields = filename.split("~");
  if (fields.length !== 8) return null;
  const [timestampRaw, sessionId, pathRaw, sourceRaw, country, device, browser] = fields;
  const timestamp = Number(timestampRaw);
  const path = decode(pathRaw);
  const source = decode(sourceRaw);

  if (!Number.isFinite(timestamp) || !path || !source || !sanitizeSessionId(sessionId)) return null;
  if (!(["desktop", "mobile", "tablet"] as string[]).includes(device)) return null;
  if (!(["chrome", "safari", "firefox", "edge", "other"] as string[]).includes(browser)) return null;

  return {
    timestamp,
    date,
    sessionId,
    path,
    source,
    country,
    device: device as StoredVisit["device"],
    browser: browser as StoredVisit["browser"],
  };
}

async function listMonth(month: string, token: string): Promise<ListBlobResultBlob[]> {
  const blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined;

  for (let page = 0; page < MAX_MONTH_PAGES; page += 1) {
    const result = await list({
      prefix: `${PREFIX}/${month}/`,
      limit: 1000,
      cursor,
      token,
    });
    blobs.push(...result.blobs);
    if (!result.hasMore || !result.cursor) break;
    cursor = result.cursor;
  }

  return blobs;
}

function countBy(values: string[], label: (value: string) => string): AnalyticsBreakdownItem[] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .map(([key, value]) => ({ label: label(key), value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "cs"))
    .slice(0, 6);
}

function pageLabel(path: string): string {
  const labels: Record<string, string> = {
    "/": "Hlavní stránka",
    "/obchodni-podminky": "Obchodní podmínky",
    "/ochrana-udaju": "Ochrana osobních údajů",
  };
  return labels[path] ?? path;
}

function sourceLabel(source: string): string {
  if (source === "direct") return "Přímý přístup";
  if (source.includes("google.")) return "Google";
  if (source.includes("seznam.")) return "Seznam";
  if (source.includes("facebook.") || source === "fb.com") return "Facebook";
  if (source.includes("instagram.")) return "Instagram";
  if (source.includes("tiktok.")) return "TikTok";
  return source;
}

function countryLabel(country: string): string {
  const labels: Record<string, string> = {
    CZ: "Česko",
    SK: "Slovensko",
    DE: "Německo",
    AT: "Rakousko",
    PL: "Polsko",
    GB: "Velká Británie",
    US: "USA",
    "--": "Neurčeno",
  };
  return labels[country] ?? country;
}

function deviceLabel(device: string): string {
  return { desktop: "Počítač", mobile: "Mobil", tablet: "Tablet" }[device] ?? device;
}

function browserLabel(browser: string): string {
  return {
    chrome: "Chrome",
    safari: "Safari",
    firefox: "Firefox",
    edge: "Edge",
    other: "Jiný",
  }[browser] ?? browser;
}

function emptyPeriod(days: 7 | 30): AnalyticsPeriod {
  return {
    days,
    visits: 0,
    today: 0,
    referredVisits: 0,
    trendPercent: null,
    daily: [],
    landingPages: [],
    sources: [],
    countries: [],
    devices: [],
    browsers: [],
  };
}

function summarize(visits: StoredVisit[], days: 7 | 30, today: string): AnalyticsPeriod {
  const currentStart = shiftDate(today, -(days - 1));
  const previousStart = shiftDate(currentStart, -days);
  const previousEnd = shiftDate(currentStart, -1);
  const current = visits.filter((visit) => visit.date >= currentStart && visit.date <= today);
  const previous = visits.filter((visit) => visit.date >= previousStart && visit.date <= previousEnd);
  const trendPercent =
    previous.length === 0
      ? null
      : Math.round(((current.length - previous.length) / previous.length) * 100);

  const daily = Array.from({ length: days }, (_, index) => {
    const date = shiftDate(currentStart, index);
    return {
      date,
      label: dayLabelFormatter.format(new Date(`${date}T12:00:00Z`)),
      value: current.filter((visit) => visit.date === date).length,
    };
  });

  return {
    days,
    visits: current.length,
    today: current.filter((visit) => visit.date === today).length,
    referredVisits: current.filter((visit) => visit.source !== "direct").length,
    trendPercent,
    daily,
    landingPages: countBy(current.map((visit) => visit.path), pageLabel),
    sources: countBy(current.map((visit) => visit.source), sourceLabel),
    countries: countBy(current.map((visit) => visit.country), countryLabel),
    devices: countBy(current.map((visit) => visit.device), deviceLabel),
    browsers: countBy(current.map((visit) => visit.browser), browserLabel),
  };
}

export async function recordVisit(input: VisitEventInput): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is missing");

  const sessionId = sanitizeSessionId(input.sessionId);
  const path = sanitizePath(input.path);
  if (!sessionId || !path) throw new Error("Invalid analytics event");

  const source = sanitizeSource(input.source);
  const country = sanitizeCountry(input.country);
  const timestamp = Date.now();
  const date = dateKey(new Date(timestamp));
  const month = date.slice(0, 7);
  const filename = [
    timestamp,
    sessionId,
    encode(path),
    encode(source),
    country,
    input.device,
    input.browser,
    randomUUID(),
  ].join("~");

  await put(`${PREFIX}/${month}/${date}/${filename}.evt`, "1", {
    access: "public",
    contentType: "text/plain",
    addRandomSuffix: false,
    token,
  });
}

export async function readAnalyticsDashboard(): Promise<AnalyticsDashboard> {
  const generatedAt = new Date().toISOString();
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    return {
      status: "unavailable",
      generatedAt,
      week: emptyPeriod(7),
      month: emptyPeriod(30),
    };
  }

  try {
    const today = dateKey();
    const earliest = shiftDate(today, -59);
    const months = new Set<string>();
    for (let cursor = earliest; cursor <= today; cursor = shiftDate(cursor, 1)) {
      months.add(cursor.slice(0, 7));
    }

    const blobs = (await Promise.all([...months].map((month) => listMonth(month, token)))).flat();
    const parsed = blobs.map(parseVisit).filter((visit): visit is StoredVisit => visit !== null);
    const unique = new Map<string, StoredVisit>();
    for (const visit of parsed.sort((a, b) => a.timestamp - b.timestamp)) {
      if (!unique.has(visit.sessionId)) unique.set(visit.sessionId, visit);
    }
    const visits = [...unique.values()];

    return {
      status: visits.length ? "ready" : "empty",
      generatedAt,
      week: summarize(visits, 7, today),
      month: summarize(visits, 30, today),
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "analytics dashboard read failed",
        route: "/admin",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return {
      status: "unavailable",
      generatedAt,
      week: emptyPeriod(7),
      month: emptyPeriod(30),
    };
  }
}

export async function deleteExpiredVisits(retentionDays = 90): Promise<number> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is missing");

  const cutoff = Date.now() - retentionDays * 24 * 60 * 60_000;
  let cursor: string | undefined;
  let deleted = 0;

  for (let page = 0; page < 20; page += 1) {
    const result = await list({ prefix: `${PREFIX}/`, limit: 1000, cursor, token });
    const expired = result.blobs.filter((blob) => blob.uploadedAt.getTime() < cutoff);
    if (expired.length) {
      await del(expired.map((blob) => blob.url), { token });
      deleted += expired.length;
    }
    if (!result.hasMore || !result.cursor) break;
    cursor = result.cursor;
  }

  return deleted;
}
