import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor Tiny House FLAX",
  description:
    "Sestavte si Tiny House FLAX na míru — rozměry, střecha, fasáda, výbava. Živý náhled a orientační cena.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Tiny House FLAX</p>
          <h1>Konfigurátor</h1>
          <p>
            Nastavte rozměry, materiály a výbavu. Systém spočítá plochy i
            orientační cenu — a vy pošlete nezávaznou poptávku jedním klikem.
          </p>
        </div>
      </header>
      <div className="wrap">
        <Configurator />
      </div>
    </>
  );
}
