import type { Metadata } from "next";
import { headers } from "next/headers";
import { isRezervaceLandingHost, isRobinLandingHost } from "@/lib/landingHost";
import HomePage from "./HomePage";
import { RezervaceLandingView } from "./rezervace/RezervaceLandingView";
import { RobinLandingView } from "./robin/RobinLandingView";
import { robinSite } from "@/lib/robinSite";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  if (isRobinLandingHost(h)) {
    return {
      metadataBase: new URL(robinSite.url),
      title: {
        default:
          "Kouzelník Robin Panuš Praha | Kouzlíme s Robinem — kouzla, balonky, mentalismus",
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
      ],
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        locale: "cs_CZ",
        url: robinSite.url,
        siteName: robinSite.name,
        title: "Kouzelník Robin Panuš — Kouzlíme s Robinem",
        description: robinSite.description,
        images: [
          { url: "/robin/IMG_0872.jpg", width: 800, height: 1067, alt: "Kouzelník Robin Panuš" },
        ],
      },
      robots: { index: true, follow: true },
    };
  }
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
  if (isRobinLandingHost(h)) {
    return <RobinLandingView />;
  }
  if (isRezervaceLandingHost(h)) {
    return <RezervaceLandingView />;
  }
  return <HomePage />;
}
