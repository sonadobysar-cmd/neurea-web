import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Observability } from "@/components/Observability";
import { SiteVisitTracker } from "@/components/SiteVisitTracker";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";
import "./luxury.css";
import "./robin-merge.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Kouzelník pro děti | Robin Panuš, Mladá Boleslav",
  description:
    "Kouzelník Robin Panuš: interaktivní show pro dětské oslavy, školky, školy, svatby i firemní akce. Kouzla, mentalismus a balónky po celé ČR.",
  alternates: { canonical: "/" },
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
    url: "/",
    siteName: "Kouzlíme s Robinem",
    title: "Kouzelník pro děti | Robin Panuš, Mladá Boleslav",
    description:
      "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce.",
    images: [{ url: "/luxury/img-01.jpg", width: 800, height: 1000, alt: "Kouzelník Robin Panuš" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kouzelník pro děti | Robin Panuš",
    description: "Interaktivní kouzelnická show, mentalismus a balónková zvířátka pro malé i velké.",
    images: ["/luxury/img-01.jpg"],
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
          id="robin-turnstile-config"
          dangerouslySetInnerHTML={{
            __html: `window.__ROBIN_TURNSTILE_SITE_KEY=${JSON.stringify(turnstileSiteKey)};`,
          }}
        />
        {children}
        <Observability />
        <SiteVisitTracker />
      </body>
    </html>
  );
}
