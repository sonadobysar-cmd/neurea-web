import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import {
  audiences,
  brand,
  businessPoints,
  faq,
  models,
  process,
  realizations,
  values,
  wheelPoints,
} from "@/data/content";

function formatFrom(n: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(n);
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

export default function HomePage() {
  return (
    <>
      <SiteNav darkHero />

      {/* 1 · Hook */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="https://images.unsplash.com/photo-1518780664697-55e3abfb3887?auto=format&fit=crop&w=2400&q=85"
            alt="Moderní tiny house na kolech v přírodě"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-content">
          <p className="hero-brand">{brand.name}</p>
          <h1>
            Dům z teplého dřeva.
            <br />
            <em>Svoboda na kolech.</em>
          </h1>
          <p className="hero-lead">
            Moderní tiny house pro bydlení, Airbnb i obnovu kempů. Hotový přijede
            — vy rozhodnete, kam ho postavíte příště.
          </p>
          <div className="hero-actions">
            <Link href="/konfigurator" className="btn btn-oak btn-arrow">
              Spočítat svůj dům
              <ArrowIcon />
            </Link>
            <Link href="/#kontakt" className="btn btn-ghost-light">
              Domluvit hovor
            </Link>
          </div>
          <div className="hero-scroll">
            <i />
            Jak to funguje
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].flatMap((dup) =>
            [
              "Bydlení na pozemku",
              "Airbnb jednotky",
              "Výměna chatek v kempu",
              "Homologovaný podvozek",
              "Přemístitelné",
              "Moderní dřevo",
              "Konfigurátor online",
              brand.domain,
            ].map((label) => (
              <span key={`${dup}-${label}`}>{label}</span>
            ))
          )}
        </div>
      </div>

      {/* 2 · Pro koho (qualify) */}
      <section className="section section-paper" id="pro-koho">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Pro koho stavíme</p>
                <h2>Tři cesty. Jeden dům, který se hýbe.</h2>
              </div>
              <p>
                Nehledáte katalogovou chatku. Hledáte řešení — pro sebe, pro
                hosty, nebo pro celý areál. Vyberte, kudy začít.
              </p>
            </div>
          </Reveal>
          <div className="audience-rail">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <Link href={a.href} className="audience-tile">
                  <span className="audience-n">0{i + 1}</span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <span className="audience-cta">
                    {a.cta}
                    <ArrowIcon />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Wheels USP */}
      <section className="section section-ink" id="kola">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Proč kola</p>
                <h2>Nejsilnější argument není design. Je to pohyb.</h2>
              </div>
              <p>
                Beton drží. Kola pouští dál. Proto stavíme tiny house jako
                homologované vozidlo — krásné uvnitř, volné venku.
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
            <div className="mt-3">
              <CtaBand
                dark
                title="Chcete vědět, jestli to sedí na váš pozemek?"
                text="Napište nám lokalitu a záměr. Ozveme se s jasným doporučením — bez omáčky."
                primary="Napsat teď"
                primaryHref="/#kontakt"
                secondary="Nejdřív konfigurátor"
                secondaryHref="/konfigurator"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 · Lines */}
      <section className="section section-mist" id="modely">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Řady</p>
                <h2>Weekend. Live. Stay.</h2>
              </div>
              <p>
                Stejná DNA — teplé dřevo, moderní střih, kola. Jiný účel. V
                konfigurátoru doladíte rozměry a výbavu na metr.
              </p>
            </div>
          </Reveal>
          <div className="models-rail">
            {models.map((m, i) => (
              <Reveal key={m.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <article className="model-tile">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width:900px) 100vw, 33vw"
                  />
                  <div className="model-meta">
                    {m.subtitle} · {m.size}
                  </div>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <div className="model-foot">
                    <strong>od {formatFrom(m.from)}</strong>
                    <Link href="/konfigurator" className="btn btn-paper">
                      Nastavit
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Configurator = mid funnel */}
      <section className="section section-paper" id="konfigurator-teaser">
        <div className="wrap">
          <Reveal>
            <div className="cfg-teaser">
              <div>
                <p className="eyebrow">Konfigurátor</p>
                <h2>Nejdřív čísla. Pak hovor.</h2>
                <p>
                  Rozměry, střecha, fasáda, koupelna, kuchyň — sestavíte dům a
                  uvidíte orientační cenu. Pak jedním klikem pošlete poptávku.
                  Žádné „napište nám do prázdna“.
                </p>
                <div className="hero-actions" style={{ marginBottom: 0 }}>
                  <Link href="/konfigurator" className="btn btn-oak btn-arrow">
                    Spustit konfigurátor
                    <ArrowIcon />
                  </Link>
                  <Link href="/#kontakt" className="btn btn-ghost-light">
                    Radši rovnou konzultace
                  </Link>
                </div>
              </div>
              <div className="cfg-preview" aria-hidden="true">
                <svg
                  className="house-svg"
                  viewBox="0 0 480 340"
                  style={{ maxWidth: 340 }}
                >
                  <ellipse cx="240" cy="300" rx="160" ry="14" fill="#000" opacity="0.35" />
                  <rect x="130" y="248" width="240" height="10" rx="2" fill="#1a1a1a" />
                  <circle cx="165" cy="268" r="14" fill="#111" />
                  <circle cx="335" cy="268" r="14" fill="#111" />
                  <rect x="130" y="145" width="240" height="105" fill="#B8956A" />
                  <path d="M118 152 L240 78 L362 152 Z" fill="#4A5560" />
                  <rect x="155" y="178" width="40" height="72" fill="#1a1512" opacity="0.85" />
                  <rect x="220" y="168" width="48" height="38" fill="#FFF4D6" opacity="0.85" />
                  <rect x="290" y="168" width="48" height="38" fill="#FFF4D6" opacity="0.7" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · Business */}
      <section className="section section-mist" id="byznys">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Investice & provozy</p>
                <h2>Nejen bydlet. Vydělávat. Obnovovat.</h2>
              </div>
              <p>
                Cílíme na lidi s pozemkem i na ty, kdo počítají cashflow. Tiny
                house je produkt — i aktivum.
              </p>
            </div>
          </Reveal>
          <div className="values">
            {businessPoints.map((v, i) => (
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
                title="Máte kemp, nebo plánujete flotilu?"
                text="Napište kapacitu a lokalitu. Připravíme návrh výměny chatek nebo startovacích Airbnb jednotek."
                primary="Poptat byznys řešení"
                primaryHref="/#kontakt"
                secondary="Sestavit jednotku"
                secondaryHref="/konfigurator"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 · Process */}
      <section className="section section-ink" id="proces">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Jak to běží</p>
              <h2>Od záměru k zaparkovanému domu</h2>
              <p>
                Funnel, ne chaos. Každý krok má výstup — vy vždy víte, co
                následuje.
              </p>
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
          <div className="mt-3" style={{ textAlign: "center" }}>
            <Link href="/konfigurator" className="btn btn-oak btn-arrow">
              Začít krokem 02 — konfigurátor
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* 8 · Craft */}
      <section className="section section-paper">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="split-media">
                <Image
                  src="https://images.unsplash.com/photo-1504148455328-c663245643a9?auto=format&fit=crop&w=1400&q=80"
                  alt="Moderní práce se dřevem"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-copy">
                <p className="eyebrow">Design</p>
                <h2>Teplo dřeva. Moderní klid.</h2>
                <p>
                  Inspirace resortovým pocitem — měkké světlo, přírodní
                  materiály, čisté linie. Interiér, ve kterém chcete zůstat.
                  Exteriér, který nezkopíruje sousedovu kůlnu.
                </p>
                <ul className="split-list">
                  <li>Teplé dřevo bez rustikálního přetížení</li>
                  <li>Homologovaný podvozek jako standard</li>
                  <li>Dispozice pro život i short-stay provoz</li>
                </ul>
                <Link href="/#kontakt" className="btn btn-ink btn-arrow">
                  Chci konzultaci
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 · Proof */}
      <section className="section section-mist" id="realizace-preview">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Realizace</p>
                <h2>Už stojí. Už vydělávají. Už bydlí.</h2>
              </div>
              <p>
                Ukázky atmosféry — vaše fotky sem brzy doplníme. Principie, kterou
                hosté i majitelé poznají na první dobrou.
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
              Prohlédnout realizace
              <ArrowIcon />
            </Link>
            <Link href="/#kontakt" className="btn btn-ghost">
              Chci podobný projekt
            </Link>
          </div>
        </div>
      </section>

      {/* 10 · Why us */}
      <section className="section section-paper">
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
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="section section-mist">
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
          <Reveal>
            <div className="mt-3">
              <CtaBand
                title="Pořád si nejste jistí?"
                text="To je v pořádku. Desetiminutový hovor ušetří týdny dohadů."
                primary="Domluvit hovor"
                primaryHref="/#kontakt"
                secondary="Nejdřív si pohrát s cenou"
                secondaryHref="/konfigurator"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12 · Contact close */}
      <section className="section section-paper" id="kontakt">
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
                  Napište záměr. My vrátíme konkrétní další krok.
                </h2>
                <p
                  style={{
                    opacity: 0.7,
                    fontWeight: 300,
                    maxWidth: "40ch",
                    marginBottom: "1.5rem",
                  }}
                >
                  Bydlení, Airbnb, kemp — jedno pole stačí. Nebo rovnou pošlete
                  konfiguraci z konfigurátoru.
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
                  {brand.domain} · {brand.address}
                </p>
                <Link
                  href="/konfigurator"
                  className="btn btn-oak btn-arrow"
                  style={{ marginTop: "1.5rem" }}
                >
                  Radši nejdřív konfigurátor
                  <ArrowIcon />
                </Link>
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
