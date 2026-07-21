import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  createPasswordRecord,
  readStoredAuth,
  verifyPasswordRecord,
  writeStoredAuth,
} from "./passwordStore";

const COOKIE = "robin_admin_session";
const MAX_AGE_MS = 60 * 60 * 24 * 14 * 1000; // 14 dní

function requireAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SECRET must be set in production");
  }
  return "robin-dev-only-secret";
}

function sign(value: string): string {
  return createHmac("sha256", requireAdminSecret()).update(value).digest("hex");
}

function getBootstrapPassword(): string | null {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return null;
  return "robin2026";
}

function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function verifyPassword(input: string): Promise<boolean> {
  const stored = await readStoredAuth();
  if (stored) {
    return verifyPasswordRecord(input, stored);
  }
  const bootstrap = getBootstrapPassword();
  if (!bootstrap) return false;
  return safeEqualString(input, bootstrap);
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: true; version: number } | { ok: false; error: string }> {
  if (!(await verifyPassword(currentPassword))) {
    return { ok: false, error: "Současné heslo nesedí." };
  }
  if (newPassword.length < 8) {
    return { ok: false, error: "Nové heslo musí mít alespoň 8 znaků." };
  }
  if (newPassword === currentPassword) {
    return { ok: false, error: "Nové heslo musí být jiné než současné." };
  }

  const current = await readStoredAuth();
  const version = (current?.version ?? 0) + 1;
  await writeStoredAuth(createPasswordRecord(newPassword, version));
  return { ok: true, version };
}

function trySign(value: string): string | null {
  try {
    return sign(value);
  } catch {
    return null;
  }
}

export async function createAdminSession(version?: number): Promise<void> {
  const stored = await readStoredAuth();
  const ver = version ?? stored?.version ?? 0;
  const issuedAt = Date.now();
  const token = `ok.${ver}.${issuedAt}`;
  const signature = trySign(token);
  if (!signature) {
    throw new Error("ADMIN_SECRET must be set in production");
  }
  const jar = await cookies();
  jar.set(COOKIE, `${token}.${signature}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(MAX_AGE_MS / 1000),
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length < 4) return false;
  const sig = parts.pop()!;
  const token = parts.join(".");
  const expected = trySign(token);
  if (!expected) return false;
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }

  const [, verStr, issuedStr] = token.split(".");
  const issuedAt = Number(issuedStr);
  const cookieVersion = Number(verStr);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > MAX_AGE_MS) return false;

  const stored = await readStoredAuth();
  const currentVersion = stored?.version ?? 0;
  if (cookieVersion !== currentVersion) return false;

  return true;
}
