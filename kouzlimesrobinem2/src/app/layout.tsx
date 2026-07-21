import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./luxury.css";
import "./robin-merge.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kouzlimesrobinem2.vercel.app"),
  title: "Kouzlíme s Robinem — kouzelník, balónkář a mentalista",
  description:
    "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce. Robin Panuš — 16 let na jevišti.",
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
      </body>
    </html>
  );
}
