import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { media } from "@/data/content";

const productionPoints = [
  {
    title: "Výroba v hale",
    text: "Stavíme pod střechou, v kontrolovaném prostředí a bez vlivu počasí. Jednotlivé technologické postupy tak máme pod dohledem.",
  },
  {
    title: "Osobní kontrola výroby",
    text: "Výrobu vede a kontroluje přímo majitel. Komunikujete s člověkem, který váš tiny house skutečně staví.",
  },
  {
    title: "Masivní konstrukce",
    text: "Používáme konstrukční systém moderní dřevostavby s důrazem na pevnost, mobilitu, stabilitu a dlouhou životnost.",
  },
  {
    title: "Detaily, které rozhodují",
    text: "Hlídáme skladbu izolací, tepelné mosty, nosné prvky i správné provedení stěn — tedy věci, které po dokončení často nejsou vidět.",
  },
  {
    title: "Každý dům vzniká jinak",
    text: "Rozměry, dispozici, lofty, okna, koupelnu, kuchyň i technologie řešíme podle toho, jak chcete dům opravdu používat.",
  },
  {
    title: "Stavební zkušenosti",
    text: "Vycházíme ze zkušeností ze staveb a rekonstrukcí. Tiny house vnímáme jako skutečnou malou dřevostavbu.",
  },
] as const;

export const metadata: Metadata = {
  title: "Dílna a výroba tiny house na kolech",
  description:
    "Nahlédněte do výroby tiny houses na kolech. Vlastní dílna, přírodní dřevo, moderní interiér a homologovaný podvozek.",
  alternates: { canonical: "/atelier" },
  openGraph: {
    title: "Dílna a výroba tiny house na kolech · Chatky na kolech",
    description:
      "Stavíme domy, které se smí hýbat. Vlastní výroba, homologovaný podvozek, moderní dřevěný interiér.",
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
          <p className="eyebrow">Výroba</p>
          <h1>Záleží i na tom, co není vidět</h1>
          <p>
            Tiny house pro nás není jen hezký výrobek. Stavíme ho jako skutečnou
            moderní dřevostavbu — od podvozku a konstrukce až po poslední detail.
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
                <p className="eyebrow">Přístup</p>
                <h2>Dům musí fungovat jako celek</h2>
                <p>
                  Pevnost, mobilita, stabilita a dlouhá životnost nezačínají u
                  pohledového obkladu. Rozhoduje konstrukce, správná skladba stěn
                  a promyšlené napojení každého prvku.
                </p>
                <p>
                  Každý projekt proto začíná tím, jak chcete tiny house skutečně
                  používat — ne výběrem modelu z katalogu.
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
              <p className="eyebrow">Pod povrchem</p>
              <h2>Šest věcí, na kterých záleží</h2>
            </div>
          </Reveal>
          <div className="values">
            {productionPoints.map((v, i) => (
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
                <p className="eyebrow">Výroba</p>
                <h2>Výroba pod střechou. Kontrola v každém kroku.</h2>
                <p>
                  Podvozek, konstrukci, izolaci i interiér skládáme v hale bez
                  vlivu počasí. Výrobu osobně vede člověk, se kterým projekt od
                  začátku řešíte.
                </p>
                <ul className="split-list">
                  <li>Kontrolované prostředí a technologické postupy</li>
                  <li>Moderní konstrukční systém dřevostavby</li>
                  <li>Osobní kontrola výroby majitelem</li>
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
                <p className="eyebrow">Na míru</p>
                <h2>Každý dům vzniká jinak</h2>
                <p>
                  Rozměry, dispozici, počet loftů, velikost oken, koupelnu,
                  kuchyň i technologie řešíme podle místa a vašeho způsobu
                  života. Výsledkem není typový domek, ale řešení pro konkrétní
                  člověka.
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
