import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { values } from "@/data/content";

export const metadata: Metadata = {
  title: "Dílna",
  description:
    "Kde vznikají Chatky na kolech — moderní dřevostavby s teplým interiérem a homologovaným podvozkem.",
};

export default function AtelierPage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Dílna</p>
          <h1>Stavíme domy, které se smí hýbat</h1>
          <p>
            Nejsme katalog. Jsme dílna s moderním střihem — teplé dřevo,
            čisté linie, kola jako součást produktu.
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
                <p className="eyebrow">Přístup</p>
                <h2>Od záměru k jednotce, která vydělává nebo bydlí</h2>
                <p>
                  Stavíme pro majitele pozemků, provozovatele Airbnb i kempy,
                  které chtějí vyměnit staré chatky za něco, na co jsou hosté
                  pyšní.
                </p>
                <p>
                  Každý projekt začíná otázkou „k čemu to má sloužit“ — ne
                  „který model z PDF“.
                </p>
                <Link href="/#kontakt" className="btn btn-ink btn-arrow">
                  Domluvit konzultaci
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
                <p className="eyebrow">Výroba</p>
                <h2>Hotový dům. Ne staveniště u vás.</h2>
                <p>
                  Konstrukce, izolace, interiér — skládáme v dílně. K vám přijede
                  jednotka připravená k životu nebo k první rezervaci.
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
