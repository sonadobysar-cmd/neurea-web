import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import {
  brand,
  faq,
  media,
  paths,
  process,
  realizations,
  values,
  wheelPoints,
} from "@/data/content";

const proposalNav = [
  { href: "#na-miru", label: "Na míru" },
  { href: "/atelier", label: "Výroba" },
  { href: "/realizace", label: "Realizace" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

const useCases = [
  {
    title: "Bydlení a zahrada",
    text: "Celoroční bydlení, zahradní domek pro hosty nebo samostatné místo k odpočinku. Bez typového katalogu — podle vás, pozemku a způsobu využití.",
    image: "/media/realizace/tiny-12x4.jpg",
    alt: "Dřevěný tiny house na zahradě pro bydlení a odpočinek",
  },
  {
    title: "Kancelář / home office",
    text: "Klid na práci pár kroků od domu. Tiny house může fungovat jako plnohodnotná zahradní kancelář nebo samostatné zázemí pro firmu.",
    image: "/media/realizace/tiny-12x4-interior.jpg",
    alt: "Světlý interiér tiny house vhodný jako kancelář nebo home office",
  },
  {
    title: "Podnikání",
    text: "Ubytování v přírodě, bistro, provozovna nebo jiný vlastní projekt. Navrhneme prostor podle reálného provozu, ne podle hotového modelu.",
    image: "/media/realizace/sirek.jpg",
    alt: "Tiny house umístěný v přírodě pro podnikatelský projekt",
  },
] as const;

function UseCasesSection() {
  return (
    <section className="section section-paper use-cases" id="na-miru">
      <div className="wrap">
        <Reveal>
          <div className="section-head wide use-cases-head">
            <div>
              <p className="eyebrow">Jeden tiny. Spousta možností.</p>
              <h2>Tiny house na míru vašemu životu</h2>
            </div>
            <p>
              Nevyrábíme katalogové domky, ze kterých si musíte vybrat. Každý
              tiny house vzniká podle konkrétního místa a způsobu využití.
            </p>
          </div>
        </Reveal>

        <div className="use-case-grid">
          {useCases.map((item, i) => (
            <Reveal key={item.title} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <article className={`use-case-card use-case-card--${i + 1}`}>
                <div className="use-case-media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
                <div className="use-case-copy">
                  <span className="use-case-number">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href="#kontakt" className="audience-cta">
                    Probrat záměr <ArrowIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({
  title,
  text,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
  dark = false,
}: {
  title: string;
  text: string;
  primary: string;
  primaryHref: string;
  secondary?: string;
  secondaryHref?: string;
  dark?: boolean;
}) {
  return (
    <div className={`cta-band${dark ? " is-dark" : ""}`}>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="cta-band-actions">
        <Link
          href={primaryHref}
          className={`btn btn-arrow ${dark ? "btn-oak" : "btn-ink"}`}
        >
          {primary}
          <ArrowIcon />
        </Link>
        {secondary && secondaryHref && (
          <Link
            href={secondaryHref}
            className={`btn ${dark ? "btn-ghost-light" : "btn-ghost"}`}
          >
            {secondary}
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ varianta?: string }>;
}) {
  const { varianta } = await searchParams;
  const proposal = varianta === "b" ? "b" : varianta === "a" ? "a" : null;
  const proposalHref = proposal ? `/?varianta=${proposal}` : "/";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav
        darkHero
        navItems={proposal ? proposalNav : undefined}
        homeHref={proposalHref}
        ctaLabel={proposal ? "Spustit konfigurátor" : undefined}
      />

      {proposal && (
        <aside className="proposal-switcher" aria-label="Porovnání návrhů">
          <span>Porovnání</span>
          <Link
            href="/?varianta=a"
            className={proposal === "a" ? "is-active" : ""}
          >
            A
          </Link>
          <Link
            href="/?varianta=b"
            className={proposal === "b" ? "is-active" : ""}
          >
            B
          </Link>
        </aside>
      )}

      <section className="hero">
        <div className="hero-media">
          <Image
            src={media.hero}
            alt="Tiny house v lese při soumraku — zlaté světlo, wellness, oheň"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-content">
          <p className="hero-brand">{brand.name}</p>
          <h1>
            Dřevěný dům{" "}
            <br />
            <span className="hero-accent">na kolech</span>
          </h1>
          <p className="hero-lead">
            {proposal
              ? "Moderní tiny house ze dřeva s charakterem. Celoroční bydlení, home office i prostor pro podnikání. Dům, který vzniká podle vás."
              : "Moderní tiny house z dřeva s charakterem. Homologovaný podvozek — bydlení, Airbnb i rekonstrukce kempů. Dům, který s vámi jede."}
          </p>
          <div className="hero-stats" aria-label="Parametry">
            <div>
              <strong>6–12 m</strong>
              <span>Délka na míru</span>
            </div>
            <div>
              <strong>3D</strong>
              <span>Konfigurátor</span>
            </div>
            <div>
              <strong>100 %</strong>
              <span>Váš návrh</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link href="/konfigurator" className="btn btn-oak btn-arrow">
              Spustit konfigurátor
              <ArrowIcon />
            </Link>
            <Link href={proposal ? "#na-miru" : "/#cesty"} className="btn btn-ghost-light">
              {proposal ? "Možnosti využití" : "Vybrat cestu"}
            </Link>
          </div>
          <div className="hero-scroll">
            <i />
            Systém
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].flatMap((dup) =>
            [
              "Nový tiny house",
              "Opravy & renovace",
              "Airbnb & investice",
              "Rekonstrukce kempů",
              "Homologovaný podvozek",
              "Přemístitelné",
              "Moderní dřevo",
              "Konfigurátor",
              brand.domain,
            ].map((label) => (
              <span key={`${dup}-${label}`}>{label}</span>
            ))
          )}
        </div>
      </div>

      {proposal && <UseCasesSection />}

      {/* Systém: 4 cesty */}
      {(!proposal || proposal === "b") && (
        <section
          className={`section section-paper${proposal === "b" ? " proposal-existing-paths" : ""}`}
          id="cesty"
        >
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Systém</p>
                <h2>Čtyři cesty. Bez typových katalogů.</h2>
              </div>
              <p>
                Neprodáváme „model A / model B“. Řešíme váš záměr — nový dům,
                renovaci, Airbnb investici nebo rekonstrukci kempu. Každá cesta
                má jasný další krok.
              </p>
            </div>
          </Reveal>

          <div className="path-stack">
            {paths.map((p, i) => (
              <Reveal key={p.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <article
                  className={`path-card path-card--${p.id}${i % 2 ? " is-reverse" : ""}`}
                  id={p.id}
                >
                  <div className="path-card-media">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:900px) 100vw, 48vw"
                    />
                  </div>
                  <div className="path-card-body">
                    <p className="eyebrow">{p.eyebrow}</p>
                    <h3>{p.title}</h3>
                    <p className="path-lead">{p.text}</p>
                    <ul className="path-points">
                      {p.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="path-actions">
                      <Link href={p.href} className="btn btn-ink btn-arrow">
                        {p.cta}
                        <ArrowIcon />
                      </Link>
                      <Link href={p.secondaryHref} className="btn btn-ghost">
                        {p.secondary}
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        </section>
      )}

      <section className="section section-ink" id="kola">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Proč kola</p>
                <h2>Nejsilnější argument není design. Je to pohyb.</h2>
              </div>
              <p>
                Beton drží. Kola pouští dál. Homologované vozidlo — krásné
                uvnitř, volné venku.
              </p>
            </div>
          </Reveal>
          <div className="values values-on-ink">
            {wheelPoints.map((v, i) => (
              <Reveal key={v.title} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div className="value">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="wheel-visual mt-3">
              <Image
                src={media.mobility}
                alt="Hotový dřevěný tiny house na homologovaném dvounápravovém podvozku"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-mist" id="konfigurator-teaser">
        <div className="wrap">
          <Reveal>
            <div className="cfg-teaser">
              <div>
                <p className="eyebrow">
                  {proposal ? "Konfigurátor" : "Cesta 01 · Konfigurátor"}
                </p>
                <h2>Sestavte dům. Uvidíte cenu. Pošlete poptávku.</h2>
                <p>
                  Rozměry, střecha, fasáda, výbava — živý náhled a orientační
                  rozpočet. Žádné typové šablony. Váš návrh, vaše orientační
                  cena.
                </p>
                <div className="hero-actions" style={{ marginBottom: 0 }}>
                  <Link href="/konfigurator" className="btn btn-oak btn-arrow">
                    Otevřít konfigurátor
                    <ArrowIcon />
                  </Link>
                  <Link
                    href={proposal ? "#kontakt" : "/#renovace"}
                    className="btn btn-ghost-light"
                  >
                    {proposal ? "Nejdřív probrat záměr" : "Spíš renovace?"}
                  </Link>
                </div>
              </div>
              <div className="cfg-preview cfg-preview--photo">
                <Image
                  src="/media/realizace/tiny-12x4.jpg"
                  alt="Tiny house 12×4 m sestavený v konfigurátoru Chatky na kolech"
                  fill
                  sizes="400px"
                  style={{ objectFit: "cover", borderRadius: "1rem" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper" id="realizace-preview">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Realizace</p>
                <h2>Důkaz z dílny</h2>
              </div>
              <p>
                Exteriéry, interiéry, převozy. Skutečné jednotky — ne katalogové
                vizualizace.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="real-strip">
              {realizations.map((r) => (
                <figure key={r.id} className="real-card">
                  <Image src={r.image} alt={r.alt} fill sizes="380px" />
                  <figcaption>
                    <div>
                      <h3>{r.title}</h3>
                      <span>
                        {r.place} · {r.year} · {r.tag}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
          <div className="mt-2" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href="/realizace" className="btn btn-ink btn-arrow">
              Všechny realizace
              <ArrowIcon />
            </Link>
            <Link href="/#kontakt" className="btn btn-ghost">
              Chci podobný projekt
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-ink" id="proces">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Jak to běží</p>
              <h2>Čtyři kroky. Vždy víte, co dál.</h2>
            </div>
          </Reveal>
          <div className="process-grid">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div className="process-step">
                  <span className="process-n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Proč my</p>
              <h2>Tři věci, na kterých stojíme</h2>
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
          <Reveal>
            <div className="mt-3">
              <CtaBand
                title={
                  proposal
                    ? "Máte představu? Pojďme ji probrat."
                    : "Nejste si jistí, která cesta je vaše?"
                }
                text={
                  proposal
                    ? "Nemusíte mít hotový projekt. Stačí popsat, k čemu má tiny house sloužit a kam ho chcete umístit."
                    : "Napište jednou větou, co řešíte. Ozveme se s doporučením."
                }
                primary="Popsat svůj projekt"
                primaryHref="/#kontakt"
                secondary="Konfigurátor"
                secondaryHref="/konfigurator"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap-narrow">
          <Reveal>
            <div className="section-head" style={{ maxWidth: "none" }}>
              <p className="eyebrow">FAQ</p>
              <h2>Co lidi brzdí — a jak to řešíme</h2>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-mist" id="kontakt">
        <div className="wrap">
          <div className="contact-band">
            <Reveal>
              <div>
                <p className="eyebrow">Kontakt</p>
                <h2
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                    marginBottom: "1rem",
                    maxWidth: "16ch",
                  }}
                >
                  {proposal
                    ? "Máte představu? Pojďme ji probrat."
                    : "Popište nám svůj záměr. Ozveme se s dalším krokem."}
                </h2>
                <p
                  style={{
                    opacity: 0.7,
                    fontWeight: 300,
                    maxWidth: "40ch",
                    marginBottom: "1.5rem",
                  }}
                >
                  {proposal
                    ? "Nemusíte mít hotový projekt ani přesně vědět, jak má váš tiny house vypadat. Řekněte nám, k čemu ho chcete používat, kam ho chcete umístit a jakou máte představu."
                    : "Nový dům, renovace, byznys nebo kemp — vyberte ve formuláři. Nebo rovnou pošlete konfiguraci."}
                </p>
                <p style={{ marginBottom: "0.35rem" }}>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </p>
                <p style={{ marginBottom: "0.35rem" }}>
                  <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                    {brand.phone}
                  </a>
                </p>
                <p style={{ opacity: 0.55, fontWeight: 300 }}>
                  {brand.domain}
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <ContactForm mode={proposal ? "proposal" : "current"} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
