import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { values } from "@/data/content";

export const metadata: Metadata = {
  title: "Ateliér",
  description:
    "Srdce naší dílny — od maringotek k prémiovým tiny houses. Česká řemeslná výroba.",
};

export default function AtelierPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">O nás</p>
          <h1>Srdce naší dílny</h1>
          <p>
            Nejsme montovna. Jsme ateliér a řemeslná dílna v jednom — místo,
            kde vznikají domy, které mají charakter.
          </p>
        </div>
      </header>

      <section className="section section-paper">
        <div className="wrap">
          <div className="split reverse">
            <Reveal>
              <div className="split-media">
                <Image
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80"
                  alt="Dílna — práce se dřevem"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-copy">
                <p className="eyebrow">Příběh</p>
                <h2>Od maringotek k prémiovým Tiny Housům</h2>
                <p>
                  Začínali jsme opravami a úpravami mobilních příbytků. Postupně
                  jsme pochopili, že lidé nechtějí kompromis — chtějí prostor,
                  který je krásný, funkční a připravený na české počasí.
                </p>
                <p>
                  Dnes stavíme homologované tiny houses na míru. Od prvního
                  nákresu po předání klíčků. Vše pod jednou střechou.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Hodnoty</p>
              <h2>Co nás drží při zemi — a ve dřevě</h2>
            </div>
          </Reveal>
          <div className="values">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div className="value">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="split-copy">
                <p className="eyebrow">Dílna</p>
                <h2>Kde váš dům vzniká</h2>
                <p>
                  Suchá hala, přesné nářadí, lidé, kteří dřevo cítí. Každý spoj,
                  každá izolace, každé okno — kontrolujeme sami. Protože dům na
                  kolech musí vydržet cestu i zimu.
                </p>
                <ul className="split-list">
                  <li>Vlastní výroba konstrukcí a interiérů</li>
                  <li>Spolupráce s ověřenými dodavateli podvozků</li>
                  <li>Předání včetně zaučení a dokumentace</li>
                </ul>
                <Link href="/#kontakt" className="btn btn-paper btn-arrow">
                  Domluvit návštěvu
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-media">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
                  alt="Výroba a konstrukce"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
