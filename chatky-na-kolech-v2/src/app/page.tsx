import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { brand, faq, process, realizations } from "@/data/content";

const intentions = [
  {
    number: "01",
    title: "Místo pro život",
    text: "Domov, víkendové útočiště nebo pokoj navíc. Dispozici stavíme kolem toho, jak skutečně žijete.",
    image: "/media/koncepty/koncept-luka-zapad.jpg",
    href: "/konfigurator",
    label: "Začít vlastní návrh",
  },
  {
    number: "02",
    title: "Místo pro hosty",
    text: "Tiny house pro Airbnb a glamping, který dobře vypadá na fotce a ještě lépe funguje v provozu.",
    image: "/media/koncepty/koncept-cerna-jezero.jpg",
    href: "/?zamer=byznys#kontakt",
    label: "Probrat investici",
  },
  {
    number: "03",
    title: "Nový život pro areál",
    text: "Postupná obnova kempu, staré chatky nebo maringotky. Citlivě, po etapách a s ohledem na sezonu.",
    image: "/media/koncepty/koncept-jezero-sauna.jpg",
    href: "/?zamer=kempy#kontakt",
    label: "Popsat svůj záměr",
  },
];

const materials = [
  {
    name: "Dřevo",
    detail: "smrk · modřín · thermoborovice",
    image: "/media/fasady/vzorky/thermoborovice.jpg",
  },
  {
    name: "Kov",
    detail: "antracitový plech · čisté hrany",
    image: "/media/fasady/vzorky/plech-antracit.jpg",
  },
  {
    name: "Kámen",
    detail: "hmota · klid · přirozená kresba",
    image: "/media/v2/flax-hero.png",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav darkHero />

      <main>
        <section className="flax-hero">
          <Image
            src="/media/v2/flax-hero.png"
            alt="Zakázkový tiny house ze dřeva, kovu a kamene při soumraku"
            fill
            priority
            sizes="100vw"
            className="flax-hero-image"
          />
          <div className="flax-hero-overlay" />
          <div className="wrap flax-hero-inner">
            <div className="flax-hero-copy">
              <p className="flax-kicker">Tiny houses na míru · Česká výroba</p>
              <h1>
                Dům bez
                <br />
                <em>předlohy.</em>
              </h1>
              <p className="flax-hero-lead">
                Nevybíráte si model. Společně vytvoříme prostor, který vychází z
                vašeho života, místa a rozpočtu — a může se vydat dál s vámi.
              </p>
              <div className="flax-actions">
                <Link href="/konfigurator" className="btn btn-clay btn-arrow">
                  Začít vlastní návrh
                  <ArrowIcon />
                </Link>
                <Link href="/realizace" className="btn btn-line-light">
                  Prohlédnout realizace
                </Link>
              </div>
            </div>

            <aside className="flax-hero-note" aria-label="Hlavní vlastnosti">
              <span>01</span>
              <p>6–12 metrů</p>
              <span>02</span>
              <p>homologovaný podvozek</p>
              <span>03</span>
              <p>100 % na míru</p>
            </aside>
          </div>
          <a className="flax-scroll" href="#na-miru">
            Objevit návrh <i />
          </a>
        </section>

        <section className="flax-intro" id="na-miru">
          <div className="wrap">
            <Reveal>
              <div className="flax-intro-grid">
                <p className="flax-kicker dark">Náš přístup</p>
                <h2>
                  Malý půdorys.
                  <br />
                  <em>Velmi osobní prostor.</em>
                </h2>
                <div className="flax-intro-copy">
                  <p>
                    Každý projekt začíná prázdným papírem. Kolik světla chcete
                    po ránu? Kde má být ticho? Co musí dům zvládnout za pět let?
                  </p>
                  <p>
                    Teprve potom řešíme metry, okna, dřevo a kola. Výsledkem
                    není typová chatka, ale místo s vlastní logikou a atmosférou.
                  </p>
                  <Link href="/atelier" className="flax-text-link">
                    Jak pracujeme <ArrowIcon />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="flax-intentions" aria-labelledby="intentions-title">
          <div className="wrap">
            <Reveal>
              <div className="flax-section-heading">
                <p className="flax-kicker dark">Ne modely. Záměry.</p>
                <h2 id="intentions-title">Co má váš prostor umět?</h2>
                <p>
                  Nemusíte znát rozměry ani skladbu stěny. Stačí vědět, proč má
                  dům vzniknout. Technické řešení najdeme spolu.
                </p>
              </div>
            </Reveal>

            <div className="flax-intention-list">
              {intentions.map((item, index) => (
                <Reveal key={item.number} delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}>
                  <article className="flax-intention">
                    <div className="flax-intention-image">
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 850px) 100vw, 38vw" />
                    </div>
                    <span className="flax-intention-number">{item.number}</span>
                    <div className="flax-intention-copy">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <Link href={item.href} className="flax-text-link">
                        {item.label} <ArrowIcon />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="flax-materials">
          <div className="wrap">
            <div className="flax-materials-grid">
              <Reveal>
                <div className="flax-materials-copy">
                  <p className="flax-kicker">Atmosféra v materiálu</p>
                  <h2>Teplo nevzniká dekorací.</h2>
                  <p>
                    Vzniká dotekem dřeva, vahou kamene, měkkým světlem a
                    detailem, který není jen na efekt. Paletu vždy skládáme pro
                    konkrétní dům.
                  </p>
                  <Link href="/atelier" className="btn btn-line-light btn-arrow">
                    Poznat naši dílnu <ArrowIcon />
                  </Link>
                </div>
              </Reveal>
              <div className="flax-material-cards">
                {materials.map((material, index) => (
                  <Reveal key={material.name} delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}>
                    <figure className="flax-material">
                      <Image src={material.image} alt={`Detail materiálu: ${material.name}`} fill sizes="220px" />
                      <figcaption>
                        <strong>{material.name}</strong>
                        <span>{material.detail}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flax-config-teaser">
          <div className="wrap">
            <div className="flax-config-card">
              <div className="flax-config-visual">
                <Image
                  src="/media/realizace/tiny-12x4-interior.jpg"
                  alt="Interiér tiny house na míru"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <span>Váš prostor / vaše volby</span>
              </div>
              <Reveal delay={1}>
                <div className="flax-config-copy">
                  <p className="flax-kicker dark">Interaktivní začátek</p>
                  <h2>Nejdřív si dům zkuste představit.</h2>
                  <p>
                    Zvolte rozměry, střechu, fasádu a výbavu. Uvidíte průběžnou
                    orientační cenu a na konci nám pošlete zadání, od kterého se
                    můžeme odrazit. Není to katalog — je to první rozhovor.
                  </p>
                  <ul className="flax-ticks">
                    <li>výpočet ploch a ceny v reálném čase</li>
                    <li>reálné vzorky fasádních materiálů</li>
                    <li>nezávazná poptávka s uloženou konfigurací</li>
                  </ul>
                  <Link href="/konfigurator" className="btn btn-basalt btn-arrow">
                    Otevřít konfigurátor <ArrowIcon />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="flax-work" id="realizace-preview">
          <div className="wrap">
            <Reveal>
              <div className="flax-section-heading is-light">
                <p className="flax-kicker">Z dílny ven</p>
                <h2>Každý jiný. Všechny opravdové.</h2>
                <p>
                  Hotové jednotky, detaily interiérů i domy cestou na místo.
                  Ukazujeme práci takovou, jaká je.
                </p>
              </div>
            </Reveal>
            <div className="flax-work-grid">
              {realizations.slice(0, 5).map((item, index) => (
                <Reveal key={item.id} delay={(Math.min((index % 3) + 1, 3) as 1 | 2 | 3)}>
                  <figure className={`flax-work-item flax-work-item-${index + 1}`}>
                    <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                    <figcaption>
                      <span>{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p>{item.place} · {item.year}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Link href="/realizace" className="btn btn-line-light btn-arrow">
              Všechny realizace <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="flax-process" id="proces">
          <div className="wrap">
            <Reveal>
              <div className="flax-section-heading">
                <p className="flax-kicker dark">Od myšlenky po klíče</p>
                <h2>Jasný proces. Prostor pro změnu.</h2>
              </div>
            </Reveal>
            <ol className="flax-process-list">
              {process.map((step, index) => (
                <Reveal key={step.n} delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}>
                  <li>
                    <span>{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="flax-faq">
          <div className="wrap flax-faq-grid">
            <Reveal>
              <div className="flax-faq-title">
                <p className="flax-kicker dark">Než začneme</p>
                <h2>Otázky, které je dobré položit nahlas.</h2>
                <p>
                  Nenašli jste odpověď? Napište nám. U zakázkového domu je
                  konkrétní situace důležitější než obecná poučka.
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="flax-faq-list">
                {faq.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="flax-contact" id="kontakt">
          <div className="wrap flax-contact-grid">
            <Reveal>
              <div className="flax-contact-copy">
                <p className="flax-kicker">Váš projekt</p>
                <h2>Řekněte nám, co má vzniknout.</h2>
                <p>
                  Nemusíte mít hotový půdorys. Popište místo, účel a svou
                  představu. Ozveme se s otázkami a doporučeným dalším krokem.
                </p>
                <div className="flax-contact-details">
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                  <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                  <span>{brand.address}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="flax-form-wrap">
                <ContactForm submitLabel="Odeslat svůj záměr" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
