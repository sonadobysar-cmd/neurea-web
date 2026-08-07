import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { EB_Garamond, Fraunces, Inter, Nunito, Outfit, Oxygen } from "next/font/google";
import "./globals.css";
import "./rezervace/rezervace-landing.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { isRezervaceLandingHost, isRobinLandingHost, isTestLandingHost } from "@/lib/landingHost";
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

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-robin-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-robin-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
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
  const pathname = h.get("x-pathname") || "";
  const licApp = pathname === "/lic" || pathname.startsWith("/lic/");
  const rezervaceLanding = isRezervaceLandingHost(h);
  const testLanding = isTestLandingHost(h);
  const robinLanding = isRobinLandingHost(h);
  const landing = rezervaceLanding || testLanding || robinLanding;

  if (licApp) {
    return (
      <html lang="cs">
        <body style={{ margin: 0, background: "#07080c" }}>{children}</body>
      </html>
    );
  }

  if (robinLanding) {
    return (
      <html lang="cs" className={`${fraunces.variable} ${inter.variable}`}>
        <body className="robin-body font-robin-sans antialiased">
          {children}
        </body>
      </html>
    );
  }

  if (landing) {
    return (
      <html lang="cs" className={`${ebGaramond.variable} ${oxygen.variable}`}>
        <head>
          {rezervaceLanding ? (
            <>
              {/*
                Meta Pixel jako běžný externí skript z našeho API — spustí se mimo React,
                Pixel Helper pak uvidí PageView (na rozdíl od vkládání přes useEffect).
              */}
              <script async src="/rezervace/api/meta-pixel" />
            </>
          ) : null}
        </head>
        <body className="font-sans rezervace-landing antialiased">
          {rezervaceLanding ? (
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
          ) : null}
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
        <CookieBanner />
      </body>
    </html>
  );
}
