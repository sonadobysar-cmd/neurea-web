import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./luxury.css";
import "./robin-merge.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kouzlimesrobinem2.vercel.app"),
  title: "Kouzlíme s Robinem — kouzelník, balónkář a mentalista",
  description:
    "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce. Robin Panuš — 16 let na jevišti.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    title: "Kouzlíme s Robinem — kouzelník, balónkář a mentalista",
    description:
      "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce.",
    images: [{ url: "/luxury/img-01.jpg", width: 800, height: 1000, alt: "Kouzelník Robin Panuš" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  return (
    <html lang="cs">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ROBIN_TURNSTILE_SITE_KEY=${JSON.stringify(turnstileSiteKey)};`,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
