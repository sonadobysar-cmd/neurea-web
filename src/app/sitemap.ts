import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/jak-to-funguje",
  "/sluzby",
  "/technologie",
  "/o-nas",
  "/cenik",
  "/rezervace",
  "/rezervace/dekujeme",
  "/kontakt",
  "/testy",
  "/testy/deprese",
  "/testy/uzkost",
  "/testy/insomnie",
  "/testy/adhd",
  "/testy/adhd-deti",
  "/obchodni-podminky",
  "/zasady-ochrany-udaju",
  "/cookies",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
