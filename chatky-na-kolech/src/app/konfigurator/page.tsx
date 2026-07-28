import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor",
  description:
    "Sestavte si tiny house na míru — rozměry, střecha, fasáda, výbava. Orientační cena a poptávka na chatkynakolech.cz.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Krok, který šetří týdny</p>
          <h1>Konfigurátor</h1>
          <p>
            Nastavte dům. Uvidíte cenu. Pošlete poptávku. My se ozveme s jasným
            dalším krokem — bydlení, Airbnb i kemp.
          </p>
        </div>
      </header>
      <div className="wrap">
        <Configurator />
      </div>
    </>
  );
}
