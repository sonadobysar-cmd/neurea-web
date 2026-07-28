import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Konfigurátor",
  description:
    "Složte si tiny house na míru — model, fasáda, střecha, interiér a výbava s živým náhledem a orientační cenou.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Interaktivní návrh</p>
          <h1>Konfigurátor</h1>
          <p>
            Upravujte detaily a sledujte, jak se dům mění. Až budete spokojení,
            pošlete konfiguraci jako nezávaznou poptávku.
          </p>
        </div>
      </header>
      <div className="wrap">
        <Configurator />
      </div>
    </>
  );
}
