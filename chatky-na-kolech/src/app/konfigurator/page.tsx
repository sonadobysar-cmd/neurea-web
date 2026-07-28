import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor",
  description:
    "Sestavte si tiny house na míru — rozměry, střecha, fasáda, výbava. Orientační cena a poptávka.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <main className="cfg-app">
        <Configurator />
      </main>
    </>
  );
}
