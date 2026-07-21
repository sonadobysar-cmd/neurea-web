import { put, list } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const AUTH_BLOB = "robin-cms/admin-auth.json";
const LOCAL_AUTH = path.join(process.cwd(), ".data", "admin-auth.json");

export type StoredAuth = {
  salt: string;
  hash: string;
};

function hashPassword(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, 64);
}

export function createPasswordRecord(password: string): StoredAuth {
  const salt = randomBytes(16);
  const hash = hashPassword(password, salt);
  return {
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
  };
}

export function verifyPasswordRecord(password: string, record: StoredAuth): boolean {
  try {
    const salt = Buffer.from(record.salt, "hex");
    const expected = Buffer.from(record.hash, "hex");
    const actual = hashPassword(password, salt);
    if (expected.length !== actual.length) return false;
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export async function readStoredAuth(): Promise<StoredAuth | null> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({
        prefix: "robin-cms/admin-auth",
        limit: 5,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match = blobs.find((b) => b.pathname === AUTH_BLOB) ?? blobs[0];
      if (match?.url) {
        const res = await fetch(match.url, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as StoredAuth;
          if (data?.salt && data?.hash) return data;
        }
      }
    }
  } catch (err) {
    console.error("[cms] auth blob read failed", err);
  }

  try {
    const raw = await fs.readFile(LOCAL_AUTH, "utf8");
    const data = JSON.parse(raw) as StoredAuth;
    if (data?.salt && data?.hash) return data;
  } catch {
    /* no custom password yet */
  }

  return null;
}

export async function writeStoredAuth(record: StoredAuth): Promise<void> {
  const payload = JSON.stringify(record);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(AUTH_BLOB, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_AUTH), { recursive: true });
  await fs.writeFile(LOCAL_AUTH, payload, "utf8");
}
