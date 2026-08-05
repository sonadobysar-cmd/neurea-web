"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "robin_visit_session_v1";
const SESSION_TIMEOUT_MS = 30 * 60_000;

type SessionState = {
  id: string;
  lastSeenAt: number;
};

let memorySession: SessionState | null = null;

function newSession(now: number): SessionState {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${now.toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  return { id, lastSeenAt: now };
}

function readSession(): SessionState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return memorySession;
    const parsed = JSON.parse(raw) as Partial<SessionState>;
    return typeof parsed.id === "string" && typeof parsed.lastSeenAt === "number"
      ? { id: parsed.id, lastSeenAt: parsed.lastSeenAt }
      : memorySession;
  } catch {
    return memorySession;
  }
}

function saveSession(session: SessionState) {
  memorySession = session;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Soukromý režim může sessionStorage blokovat; paměťová relace stačí.
  }
}

function initialSource(): string {
  if (!document.referrer) return "direct";
  try {
    const referrer = new URL(document.referrer);
    return referrer.hostname === window.location.hostname
      ? "direct"
      : referrer.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "direct";
  }
}

export function SiteVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const now = Date.now();
    const existing = readSession();
    const isNew = !existing || now - existing.lastSeenAt > SESSION_TIMEOUT_MS;
    const session = isNew ? newSession(now) : { ...existing, lastSeenAt: now };
    saveSession(session);

    if (!isNew) return;

    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session.id,
        path: pathname,
        source: initialSource(),
      }),
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
