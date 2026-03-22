import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCta } from "@/components/FloatingCta";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

/** Nadpisy: Cormorant Garamond — lehké řezy 300/400. Tělo: DM Sans. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <PageIntro />
        <Header />
        <main className="min-h-[60vh] bg-white pb-28 text-ink md:pb-0">{children}</main>
        <Footer />
        <FloatingCta />
        <CookieBanner />
      </body>
    </html>
  );
}
