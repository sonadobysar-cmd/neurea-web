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
    images: [{ url: "/robin/robin-hero-cutout.png", width: 682, height: 842, alt: "Kouzelník Robin Panuš" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
    description: robinSite.description,
    images: ["/robin/robin-hero-cutout.png"],
  },
  robots: { index: true, follow: true },
};

export default function RobinPage() {
  return <RobinLandingView />;
}
