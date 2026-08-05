import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { media, values } from "@/data/content";

export const metadata: Metadata = {
  title: "Materiály a zakázková výroba tiny house",
  description:
    "Nahlédněte do výroby tiny houses na kolech. Vlastní dílna, přírodní dřevo, moderní interiér a homologovaný podvozek.",
  alternates: { canonical: "/atelier" },
  openGraph: {
    title: "Materiály a zakázková výroba tiny house · FLAX",
    description:
      "Zakázková výroba, homologovaný podvozek a materiály, které vytvářejí přirozeně teplý interiér.",
    url: "/atelier",
    images: [{ url: "/media/atelier/konstrukce.jpg", width: 1600, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dílna a výroba tiny house na kolech",
    images: ["/media/atelier/konstrukce.jpg"],
  },
};

export default function AtelierPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Materiál & řemeslo</p>
          <h1>Dobře se tu žije ještě dřív, než vejdete</h1>
          <p>
            Dřevo, světlo, proporce a detail. Každý tiny house FLAX vzniká jako
            jeden celek — od prvního půdorysu po poslední úchytku.
          </p>
        </div>
      </header>

      <section className="section section-paper">
        <div className="wrap">
          <div className="split reverse">
            <Reveal>
              <div className="split-media">
                <Image
                  src={media.structure}
                  alt="KVH konstrukce a zateplení v dílně"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-copy">
                <p className="eyebrow">Začínáme účelem</p>
                <h2>Nejdřív váš den. Potom půdorys.</h2>
                <p>
                  Stavíme pro bydlení, víkendový únik, pronájem i rekreační
                  areály. Každý záměr potřebuje jiný rytmus, jinou dispozici a
                  jinou míru odolnosti.
                </p>
                <p>
                  Proto nezačínáme seznamem modelů. Začínáme otázkami: kdo tu
                  bude, co tu bude dělat a kam se může život časem posunout.
                </p>
                <Link href="/#kontakt" className="btn btn-ink btn-arrow">
                  Poptat konzultaci
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Principy</p>
              <h2>Na čem stojíme</h2>
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
                <p className="eyebrow">Výroba v dílně</p>
                <h2>K vám přijede dům, ne dlouhé staveniště.</h2>
                <p>
                  Podvozek, konstrukce, izolace, interiér — skládáme v dílně. K
                  vám přijede jednotka připravená k životu nebo k první
                  rezervaci.
                </p>
                <ul className="split-list">
                  <li>Vlastní výroba a kontrola detailů</li>
                  <li>Homologovaný podvozek jako standard</li>
                  <li>Předání včetně zaučení</li>
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  <Link href="/konfigurator" className="btn btn-oak btn-arrow">
                    Spočítat dům
                    <ArrowIcon />
                  </Link>
                  <Link href="/#kontakt" className="btn btn-ghost-light">
                    Napsat nám
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-media">
                <Image
                  src={media.chassis}
                  alt="Ocelový podvozek tiny house"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="split-media">
                <Image
                  src={media.loft}
                  alt="Loft a smrkový obklad"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-copy">
                <p className="eyebrow">Atmosféra</p>
                <h2>Materiály, které nepotřebují přetvářku</h2>
                <p>
                  Přirozená kresba dřeva, matný kov, klidné barvy a světlo v
                  pravý čas. Interiér má působit dobře na fotce, ale především
                  každý obyčejný den.
                </p>
                <Link href="/realizace" className="btn btn-ink btn-arrow">
                  Prohlédnout realizace
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
