import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RezervaceLandingBodyClass } from "./RezervaceLandingBodyClass";

const landingUrl = "https://rezervace.neurea.cz";

export const metadata: Metadata = {
  metadataBase: new URL(landingUrl),
  title: {
    default: "NEUREA Brno — rezervace",
    template: "%s | NEUREA Brno",
  },
  description:
    "První neuro-somatické pracoviště v ČR. Testovací studie a zájem o spuštění — NEUREA Brno.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: landingUrl,
    siteName: "NEUREA",
    title: "NEUREA Brno — Terapie mluví. Neurea měří.",
    description:
      "První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RezervaceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RezervaceLandingBodyClass />
      {children}
    </>
  );
}
