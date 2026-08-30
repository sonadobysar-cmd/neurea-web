import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "clinic_admin_session";

function secret() {
  return process.env.ADMIN_PASSWORD || null;
}

export function signToken(password: string) {
  const key = secret();
  if (!key) return "";
  return createHmac("sha256", key).update(password).digest("hex");
}

export function verifyPassword(password: string) {
  const key = secret();
  return Boolean(key && password === key);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  const key = secret();
  if (!token || !key) return false;
  const expected = signToken(key);
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE as ADMIN_COOKIE };
