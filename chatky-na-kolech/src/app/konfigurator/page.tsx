import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor",
  description:
    "Sestavte si tiny house na míru — rozměry, střecha, fasáda, výbava. Orientační cena a poptávka. Žádné typové katalogy.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Cesta 01 · Nový dům</p>
          <h1>Konfigurátor</h1>
          <p>
            Ne katalog. Váš brief. Nastavte rozměry a výbavu, sledujte cenu v
            reálném čase a pošlete poptávku jedním klikem.
          </p>
        </div>
      </header>
      <div className="wrap">
        <Configurator />
      </div>
    </>
  );
}
