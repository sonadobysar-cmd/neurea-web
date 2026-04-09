import type { Metadata } from "next";
import { headers } from "next/headers";
import { isRezervaceLandingHost } from "@/lib/landingHost";
import { RezervaceBookingPage } from "./RezervaceBookingPage";
import { RezervaceLandingView } from "./RezervaceLandingView";

const landingUrl = "https://rezervace.neurea.cz";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  if (isRezervaceLandingHost(h)) {
    return {
      metadataBase: new URL(landingUrl),
      title: "NEUREA Brno — rezervace",
      description:
        "První neuro-somatické pracoviště v ČR. Testovací studie a zájem o spuštění — NEUREA Brno.",
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        locale: "cs_CZ",
        url: landingUrl,
        siteName: "NEUREA",
        title: "NEUREA Brno — Terapie mluví. Neurea měří.",
        description:
          "První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.",
      },
      robots: { index: true, follow: true },
    };
  }
  return {
    title: "Rezervace",
    description: "Online rezervace termínu a platba zálohy — NEUREA Brno.",
  };
}

export default async function RezervacePage() {
  const h = await headers();
  if (isRezervaceLandingHost(h)) {
    return <RezervaceLandingView />;
  }
  return <RezervaceBookingPage />;
}
