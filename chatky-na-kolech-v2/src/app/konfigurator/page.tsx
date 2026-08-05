import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor tiny house na míru",
  description:
    "Sestavte si tiny house na kolech na míru. Vyberte rozměry, střechu, fasádu i výbavu a ihned uvidíte orientační cenu.",
  alternates: { canonical: "/konfigurator" },
  openGraph: {
    title: "Konfigurátor tiny house na míru · FLAX",
    description:
      "Sestavte si tiny house na kolech krok za krokem — rozměry, střecha, fasáda, interiér. Orientační cena v reálném čase.",
    url: "/konfigurator",
    images: [{ url: "/media/realizace/tiny-12x4.jpg", width: 1600, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konfigurátor tiny house na míru",
    images: ["/media/realizace/tiny-12x4.jpg"],
  },
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <main className="cfg-app">
        <h1 className="sr-only">Konfigurátor tiny house na kolech</h1>
        <Configurator />
      </main>
    </>
  );
}
