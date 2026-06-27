import { createServerFn } from "@tanstack/react-start";

const CHANNEL_ID = "UCaV58_nQM_6aNQEGFgUlMrg"; // Zpussy Club

export type LatestEpisode = {
  id: string;
  title: string;
  description: string;
  published: string; // ISO date
  thumbnail: string;
  views: number | null;
  url: string;
};

export type EpisodeItem = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  views: number | null;
  url: string;
};

function pick(xml: string, tag: string, from = 0): { value: string; end: number } | null {
  const open = xml.indexOf(`<${tag}`, from);
  if (open === -1) return null;
  const gt = xml.indexOf(">", open);
  const close = xml.indexOf(`</${tag}>`, gt);
  if (close === -1) return null;
  return { value: xml.slice(gt + 1, close), end: close };
}

function attr(xml: string, tag: string, name: string): string | null {
  const re = new RegExp(`<${tag}[^>]*\\b${name}="([^"]+)"`);
  const m = xml.match(re);
  return m ? m[1] : null;
}

async function fetchFeed(): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { headers: { "User-Agent": "Mozilla/5.0 ZpussyClub/1.0" } },
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseEntries(xml: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (true) {
    const s = xml.indexOf("<entry>", i);
    if (s === -1) break;
    const e = xml.indexOf("</entry>", s);
    if (e === -1) break;
    out.push(xml.slice(s, e));
    i = e + 8;
  }
  return out;
}

function parseEntry(entry: string): EpisodeItem | null {
  const id = pick(entry, "yt:videoId")?.value ?? "";
  if (!id) return null;
  const title = pick(entry, "title")?.value ?? "";
  const published = pick(entry, "published")?.value ?? "";
  const thumbnail = attr(entry, "media:thumbnail", "url") ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const viewsStr = attr(entry, "media:statistics", "views");
  const views = viewsStr ? Number(viewsStr) : null;
  return {
    id,
    title,
    published,
    thumbnail,
    views,
    url: `https://www.youtube.com/watch?v=${id}`,
  };
}

export const getLatestEpisode = createServerFn({ method: "GET" }).handler(
  async (): Promise<LatestEpisode | null> => {
    const xml = await fetchFeed();
    if (!xml) return null;
    const entries = parseEntries(xml);
    if (!entries.length) return null;
    const first = entries[0];
    const base = parseEntry(first);
    if (!base) return null;
    const description = pick(first, "media:description")?.value ?? "";
    return { ...base, description };
  },
);

export const getRecentEpisodes = createServerFn({ method: "GET" }).handler(
  async (): Promise<EpisodeItem[]> => {
    const xml = await fetchFeed();
    if (!xml) return [];
    const entries = parseEntries(xml);
    const items: EpisodeItem[] = [];
    for (const e of entries) {
      const it = parseEntry(e);
      if (it) items.push(it);
      if (items.length >= 8) break;
    }
    return items;
  },
);
