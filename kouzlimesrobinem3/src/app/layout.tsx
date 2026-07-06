import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./robin-modern.css";
import { robinSite } from "@/lib/robinSite";

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

export const metadata: Metadata = {
  metadataBase: new URL(robinSite.url),
  title: {
    default: "Kouzelník Robin Panuš | Kouzlíme s Robinem — moderní web",
    template: "%s | Kouzlíme s Robinem",
  },
  description: robinSite.description,
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: robinSite.url,
    siteName: robinSite.name,
    title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
    description: robinSite.description,
    images: [{ url: "/robin/modern/hero-magician.jpg", width: 1200, height: 1350, alt: "Kouzelník Robin Panuš" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="robin-body font-robin-sans antialiased">{children}</body>
    </html>
  );
}
