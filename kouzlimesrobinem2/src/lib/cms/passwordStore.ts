import { put, list } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createCipheriv,
  createDecipheriv,
  createHash,
} from "crypto";

const AUTH_BLOB = "robin-cms/admin-auth.enc.json";
const LOCAL_AUTH = path.join(process.cwd(), ".data", "admin-auth.json");

export type StoredAuth = {
  salt: string;
  hash: string;
  version: number;
};

type EncEnvelope = {
  iv: string;
  tag: string;
  data: string;
};

function hashPassword(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
}

function encryptionKey(): Buffer | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return null;
  return createHash("sha256").update(secret).digest();
}

function encryptPayload(json: string): EncEnvelope | null {
  const key = encryptionKey();
  if (!key) return null;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    data: encrypted.toString("hex"),
  };
}

function decryptPayload(envelope: EncEnvelope): string | null {
  const key = encryptionKey();
  if (!key) return null;
  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(envelope.iv, "hex"),
    );
    decipher.setAuthTag(Buffer.from(envelope.tag, "hex"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(envelope.data, "hex")),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch {
    return null;
  }
}

export function createPasswordRecord(password: string, version = 1): StoredAuth {
  const salt = randomBytes(16);
  const hash = hashPassword(password, salt);
  return {
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
    version,
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
        limit: 10,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match =
        blobs.find((b) => b.pathname === AUTH_BLOB) ||
        blobs.find((b) => b.pathname.includes("admin-auth")) ||
        blobs[0];
      if (match?.url) {
        const res = await fetch(match.url, { cache: "no-store" });
        if (res.ok) {
          const raw = await res.json();
          if (raw?.iv && raw?.tag && raw?.data) {
            const json = decryptPayload(raw as EncEnvelope);
            if (json) {
              const data = JSON.parse(json) as StoredAuth;
              if (data?.salt && data?.hash) return data;
            }
          } else if (raw?.salt && raw?.hash) {
            // legacy plaintext public blob — still usable once, migrate on next password change
            return raw as StoredAuth;
          }
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
  const json = JSON.stringify(record);
  const envelope = encryptPayload(json);
  const payload = JSON.stringify(envelope ?? record);

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
  await fs.writeFile(LOCAL_AUTH, json, "utf8");
}
