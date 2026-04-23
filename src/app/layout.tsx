import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { EB_Garamond, Oxygen } from "next/font/google";
import "./globals.css";
import "./rezervace/rezervace-landing.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCta } from "@/components/FloatingCta";
import { MetaPixelRezervaceClient } from "@/components/MetaPixelRezervaceClient";
import { isRezervaceLandingHost } from "@/lib/landingHost";
import { REZERVACE_META_PIXEL_ID } from "@/lib/rezervaceMetaPixel";
import { site } from "@/lib/site";

const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const oxygen = Oxygen({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

/** Bez plné cache HTML — landing podle hostu musí být vždy čerstvá. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NEUREA — neuro péče nové generace | Brno",
    template: "%s | NEUREA",
  },
  description:
    "NEUREA — poradenské a podpůrné pracoviště pro neuro-somatickou diagnostiku a terapii. Brno.",
  openGraph: {
    title: "NEUREA",
    description: "Neuro péče nové generace — Brno",
    locale: "cs_CZ",
    siteName: "NEUREA",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const h = await headers();
  const landing = isRezervaceLandingHost(h);

  if (landing) {
    return (
      <html lang="cs" className={`${ebGaramond.variable} ${oxygen.variable}`}>
        <body className="font-sans rezervace-landing antialiased">
          <MetaPixelRezervaceClient />
          <noscript>
            {/* Meta Pixel noscript — musí zůstat <img>, ne next/image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${REZERVACE_META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          <main className="min-h-[100dvh] bg-white pb-0 text-ink">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="cs" className={`${ebGaramond.variable} ${oxygen.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-[60vh] bg-white pb-28 text-ink md:pb-0">{children}</main>
        <Footer />
        <FloatingCta />
        <CookieBanner />
      </body>
    </html>
  );
}
