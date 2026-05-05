import type { Metadata } from "next";
import { AdhdTestLanding } from "./AdhdTestLanding";

const landingUrl = "https://adhd.neurea.cz";

export const metadata: Metadata = {
  metadataBase: new URL(landingUrl),
  title: "ADHD test zdarma | Výsledek ihned | Neurea",
  description:
    "Bezplatný ADHD test. 10 otázek, výsledek ihned. První neuro-somatické pracoviště v ČR. Měřitelné výsledky bez léků.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: landingUrl,
    siteName: "Neurea",
    title: "ADHD test zdarma | Výsledek ihned | Neurea",
    description:
      "Bezplatný ADHD test. 10 otázek, výsledek ihned. První neuro-somatické pracoviště v ČR.",
    images: [{ url: "/test/opengraph-image", width: 1200, height: 630, alt: "ADHD test zdarma" }],
  },
  robots: { index: true, follow: true },
};

export default function TestPage() {
  return <AdhdTestLanding />;
}
