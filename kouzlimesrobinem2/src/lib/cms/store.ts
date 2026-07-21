import { put, list } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_CONTENT, mergeContent, type SiteContent } from "./types";

const BLOB_PATHNAME = "robin-cms/content.json";
const LOCAL_PATH = path.join(process.cwd(), ".data", "robin-content.json");

export async function readSiteContent(): Promise<SiteContent> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({
        prefix: "robin-cms/content",
        limit: 10,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match = blobs.find((b) => b.pathname === BLOB_PATHNAME) ?? blobs[0];
      if (match?.url) {
        const res = await fetch(match.url, { cache: "no-store" });
        if (res.ok) {
          return mergeContent(await res.json());
        }
      }
    }
  } catch (err) {
    console.error("[cms] blob read failed", err);
  }

  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    return structuredClone(DEFAULT_CONTENT);
  }
}

export async function writeSiteContent(content: SiteContent): Promise<{ ok: true; storage: string }> {
  const payload = JSON.stringify(content, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_PATHNAME, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { ok: true, storage: "blob" };
  }

  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, payload, "utf8");
  return { ok: true, storage: "local" };
}

export async function uploadCmsImage(file: File): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Nahrávání fotek vyžaduje BLOB_READ_WRITE_TOKEN na Vercelu. Zatím můžete vložit URL obrázku.",
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const blob = await put(`robin-cms/uploads/${Date.now()}-${safeName}`, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}
