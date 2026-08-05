import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kouzlimesrobinem2.vercel.app";
  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ochrana-udaju`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
