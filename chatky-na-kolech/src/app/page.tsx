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

export default function HomePage() {
  return (
    <>
      <SiteNav darkHero />

      <section className="hero">
        <div className="hero-media">
          <Image
            src={media.hero}
            alt="Moderní tiny house na kolech — teplé dřevo, čistý střih"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 45%" }}
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-content">
          <p className="hero-brand">{brand.name}</p>
          <h1>
            Moderní tiny house
            <br />
            na kolech
          </h1>
          <p className="hero-lead">
            Teplé dřevo. Čistý střih. Homologovaný podvozek — bydlení, Airbnb
            i kempy.
          </p>
          <div className="hero-actions">
            <Link href="/konfigurator" className="btn btn-paper btn-arrow">
              Otevřít konfigurátor
              <ArrowIcon />
            </Link>
            <Link href="/#cesty" className="btn btn-ghost-light">
              Tři cesty
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].flatMap((dup) =>
            [
              "Nový tiny house",
              "Opravy & renovace",
              "Airbnb & kempy",
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

      {/* System: 3 paths */}
      <section className="section section-paper" id="cesty">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Systém</p>
                <h2>Tři cesty. Bez typových katalogů.</h2>
              </div>
              <p>
                Neprodáváme „model A / model B“. Řešíme váš záměr — nový dům,
                renovaci, nebo byznys. Každá cesta má jasný další krok.
              </p>
            </div>
          </Reveal>

          <div className="path-stack">
            {paths.map((p, i) => (
              <Reveal key={p.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <article className={`path-card path-card--${p.id}`} id={p.id}>
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
                src={media.chassis}
                alt="Homologovaný podvozek tiny house"
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
                <p className="eyebrow">Cesta 01 · Konfigurátor</p>
                <h2>Sestavte dům. Uvidíte cenu. Pošlete poptávku.</h2>
                <p>
                  Rozměry, střecha, fasáda, výbava — živý náhled a orientační
                  rozpočet. Žádné typové šablony. Váš brief, vaše čísla.
                </p>
                <div className="hero-actions" style={{ marginBottom: 0 }}>
                  <Link href="/konfigurator" className="btn btn-oak btn-arrow">
                    Otevřít konfigurátor
                    <ArrowIcon />
                  </Link>
                  <Link href="/#renovace" className="btn btn-ghost-light">
                    Spíš renovace?
                  </Link>
                </div>
              </div>
              <div className="cfg-preview cfg-preview--photo">
                <Image
                  src="/media/realizace/tiny-12x4.jpg"
                  alt=""
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
                  <Image src={r.image} alt={r.title} fill sizes="380px" />
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
                title="Nejste si jistí, která cesta je vaše?"
                text="Napište jednou větou, co řešíte. Ozveme se s doporučením."
                primary="Napsat teď"
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
                  Napište záměr. My vrátíme další krok.
                </h2>
                <p
                  style={{
                    opacity: 0.7,
                    fontWeight: 300,
                    maxWidth: "40ch",
                    marginBottom: "1.5rem",
                  }}
                >
                  Nový dům, renovace, byznys — vyberte v formuláři. Nebo rovnou
                  pošlete konfiguraci.
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
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
