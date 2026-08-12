import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ochrana-udaju`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
