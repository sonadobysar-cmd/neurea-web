import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { brand } from "@/data/content";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: "Informace o zpracování osobních údajů na webu Chatky na kolech.",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main>
        <header className="page-hero page-hero--compact">
          <div className="wrap-narrow">
            <p className="eyebrow">Soukromí</p>
            <h1>Ochrana osobních údajů</h1>
            <p>Vaše údaje používáme pouze k vyřízení poptávky a komunikaci o projektu.</p>
          </div>
        </header>
        <section className="section section-paper">
          <div className="wrap-narrow legal-copy">
            <h2>Kdo údaje zpracovává</h2>
            <p>
              Správcem údajů je provozovatel webu {brand.name}. V otázkách
              soukromí nás můžete kontaktovat na {brand.email}.
            </p>
            <h2>Jaké údaje používáme</h2>
            <p>
              Zpracováváme údaje, které nám sami odešlete — typicky jméno,
              e-mail, telefon a informace o zamýšleném projektu.
            </p>
            <h2>Proč a jak dlouho</h2>
            <p>
              Údaje používáme k vyřízení dotazu, přípravě nabídky a navazující
              komunikaci. Uchováváme je jen po dobu potřebnou k vyřízení
              poptávky a případné spolupráce, nejdéle 12 měsíců od posledního
              kontaktu, pokud nám právní předpis neukládá delší dobu.
            </p>
            <h2>Vaše práva</h2>
            <p>
              Můžete požádat o přístup, opravu nebo výmaz svých údajů. Stačí
              napsat na {brand.email}.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
