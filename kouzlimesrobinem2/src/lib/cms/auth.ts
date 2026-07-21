import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  createPasswordRecord,
  readStoredAuth,
  verifyPasswordRecord,
  writeStoredAuth,
} from "./passwordStore";

const COOKIE = "robin_admin_session";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 dní

function secret(): string {
  return (
    process.env.ADMIN_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    "robin-dev-only-secret"
  );
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function getBootstrapPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "robin2026";
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
  return safeEqualString(input, getBootstrapPassword());
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await verifyPassword(currentPassword))) {
    return { ok: false, error: "Současné heslo nesedí." };
  }
  if (newPassword.length < 8) {
    return { ok: false, error: "Nové heslo musí mít alespoň 8 znaků." };
  }
  if (newPassword === currentPassword) {
    return { ok: false, error: "Nové heslo musí být jiné než současné." };
  }

  await writeStoredAuth(createPasswordRecord(newPassword));
  return { ok: true };
}

export async function createAdminSession(): Promise<void> {
  const token = `ok.${Date.now()}`;
  const jar = await cookies();
  jar.set(COOKIE, `${token}.${sign(token)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
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
  if (parts.length < 3) return false;
  const sig = parts.pop()!;
  const token = parts.join(".");
  const expected = sign(token);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
