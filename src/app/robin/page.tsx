import type { Metadata } from "next";
import { RobinLandingView } from "./RobinLandingView";
import { robinSite } from "@/lib/robinSite";

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
    "kouzelník na svatbu",
    "mikromagie",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: robinSite.url,
    siteName: robinSite.name,
    title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
    description: robinSite.description,
    images: [{ url: "/robin/hero.jpg", width: 1200, height: 1350, alt: "Kouzelník Robin Panuš" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
    description: robinSite.description,
    images: ["/robin/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RobinPage() {
  return <RobinLandingView />;
}
