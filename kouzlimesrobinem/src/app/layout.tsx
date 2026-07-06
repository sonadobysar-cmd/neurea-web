import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./robin-landing.css";
import { robinSite } from "@/lib/robinSite";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "900"],
  variable: "--font-robin-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-robin-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(robinSite.url),
  title: {
    default: "Kouzelník Robin Panuš Praha | Kouzlíme s Robinem — kouzla, balonky, mentalismus",
    template: "%s | Kouzlíme s Robinem",
  },
  description: robinSite.description,
  keywords: [
    "kouzelník Praha",
    "kouzelník na narozeniny",
    "kouzelnické představení pro děti",
    "balonkář Praha",
    "mentalista firemní večírek",
    "kouzelník Robin Panuš",
    "kouzlíme s robinem",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: robinSite.url,
    siteName: robinSite.name,
    title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
    description: robinSite.description,
    images: [{ url: "/robin/IMG_0722.jpg", width: 1066, height: 1600, alt: "Kouzelník Robin Panuš" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-robin-sans antialiased">{children}</body>
    </html>
  );
}
