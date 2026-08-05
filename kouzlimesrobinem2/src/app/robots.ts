import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://kouzlimesrobinem2.vercel.app/sitemap.xml",
    host: "https://kouzlimesrobinem2.vercel.app",
  };
}
