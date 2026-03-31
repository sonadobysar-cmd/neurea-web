import type { Metadata } from "next";
import { headers } from "next/headers";
import { isRezervaceLandingHost } from "@/lib/landingHost";
import HomePage from "./HomePage";
import { RezervaceLandingView } from "./rezervace/RezervaceLandingView";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  if (isRezervaceLandingHost(h)) {
    return {
      metadataBase: new URL("https://rezervace.neurea.cz"),
      title: "NEUREA Brno — rezervace",
      description:
        "První neuro-somatické pracoviště v ČR. Testovací studie a zájem o spuštění — NEUREA Brno.",
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        locale: "cs_CZ",
        url: "https://rezervace.neurea.cz",
        siteName: "NEUREA",
        title: "NEUREA Brno — Terapie mluví. Neurea měří.",
        description:
          "První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.",
      },
      robots: { index: true, follow: true },
    };
  }
  return {};
}

export default async function Page() {
  const h = await headers();
  if (isRezervaceLandingHost(h)) {
    return <RezervaceLandingView />;
  }
  return <HomePage />;
}
