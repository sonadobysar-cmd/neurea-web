import type { Metadata } from "next";
import { EB_Garamond, Oxygen } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCta } from "@/components/FloatingCta";
import { site } from "@/lib/site";

/** Nadpisy: EB Garamond. Tělo: Oxygen. Dekorativní skript: Momo Signature (globals.css). */
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
    <html
      lang="cs"
      className={`${ebGaramond.variable} ${oxygen.variable}`}
    >
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
