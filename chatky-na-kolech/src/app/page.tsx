import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import {
  brand,
  faq,
  models,
  process,
  realizations,
  values,
} from "@/data/content";

function formatFrom(n: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HomePage() {
  return (
    <>
      <SiteNav darkHero />

      <section className="hero">
        <div className="hero-media">
          <Image
            src="https://images.unsplash.com/photo-1518780664697-55e3abfb3887?auto=format&fit=crop&w=2400&q=85"
            alt="Tiny house v přírodě při zlaté hodině"
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
            Život ve dřevě.
            <br />
            <em>Na kolech.</em>
          </h1>
          <p className="hero-lead">
            Prémiové tiny houses na míru. Homologované, celoroční, postavené v
            české dílně — od prvního sukovitého prkna po klíčky.
          </p>
          <div className="hero-actions">
            <Link href="/konfigurator" className="btn btn-oak btn-arrow">
              Spustit konfigurátor
              <ArrowIcon />
            </Link>
            <Link href="/realizace" className="btn btn-ghost-light">
              Prohlédnout realizace
            </Link>
          </div>
          <div className="hero-scroll">
            <i />
            Scroll
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].flatMap((dup) =>
            [
              "Masivní dřevo",
              "Homologace",
              "Celoroční bydlení",
              "Glamping",
              "Zakázková výroba",
              "České klima",
              "Off-grid ready",
              "Ateliér & dílna",
            ].map((label) => (
              <span key={`${dup}-${label}`}>{label}</span>
            ))
          )}
        </div>
      </div>

      <section className="section section-paper" id="modely">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Modely</p>
                <h2>Vyberte si svůj rytmus života</h2>
              </div>
              <p>
                Tři směry. Nekonečně variací. Každý dům vzniká jako originál —
                vy si zvolíte proporce, materiály a výbavu v konfigurátoru.
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
                      Konfigurovat
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink" id="proces">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Proces</p>
              <h2>Od nápadu k zaparkovanému domovu</h2>
              <p>
                Čtyři jasné kroky. Žádné překvapení na konci — jen dům, který
                sedí přesně vám.
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
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="split-media">
                <Image
                  src="https://images.unsplash.com/photo-1504148455328-c663245643a9?auto=format&fit=crop&w=1400&q=80"
                  alt="Řemeslná práce se dřevem"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="split-copy">
                <p className="eyebrow">Filozofie</p>
                <h2>Stavíme z masivu, ne z iluzí</h2>
                <p>
                  Tiny house není skládačka z katalogu. Je to řemeslo, které
                  musí vydržet zimu, vítr i každodenní život. Proto volíme
                  materiály, které stárnou s důstojností — a detaily, které
                  ucítíte rukou.
                </p>
                <ul className="split-list">
                  <li>Konstrukce dimenzovaná na české klima</li>
                  <li>Homologovaný podvozek a SPZ</li>
                  <li>Interiér navržený na míru vašemu rytmu</li>
                </ul>
                <Link href="/atelier" className="btn btn-ink btn-arrow">
                  Poznat ateliér
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <Reveal>
            <div className="cfg-teaser">
              <div>
                <p className="eyebrow">Konfigurátor</p>
                <h2>Složte si dům dřív, než ho postavíme</h2>
                <p>
                  Model, fasáda, střecha, interiér a výbava — v reálném čase
                  vidíte, jak se váš tiny house mění. A hned víte orientační
                  investici.
                </p>
                <Link href="/konfigurator" className="btn btn-oak btn-arrow">
                  Otevřít konfigurátor
                  <ArrowIcon />
                </Link>
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

      <section className="section section-mist" id="realizace-preview">
        <div className="wrap">
          <Reveal>
            <div className="section-head wide">
              <div>
                <p className="eyebrow">Realizace</p>
                <h2>Domy, které už bydlí</h2>
              </div>
              <p>
                Každý projekt je jiný pozemek, jiný člověk, jiný příběh. Tady
                jsou vybrané kusy z posledních sezón.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="real-strip">
              {realizations.map((r) => (
                <figure key={r.id} className="real-card">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="380px"
                  />
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
          <div className="mt-2">
            <Link href="/realizace" className="btn btn-ink btn-arrow">
              Všechny realizace
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Proč my</p>
              <h2>Tři věci, které neděláme jinak</h2>
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

      <section className="section section-mist">
        <div className="wrap-narrow">
          <Reveal>
            <div className="section-head" style={{ maxWidth: "none" }}>
              <p className="eyebrow">FAQ</p>
              <h2>Otázky, které padají nejčastěji</h2>
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
                    maxWidth: "14ch",
                  }}
                >
                  Pojďme si sednout nad váš pozemek
                </h2>
                <p style={{ opacity: 0.7, fontWeight: 300, maxWidth: "38ch", marginBottom: "1.5rem" }}>
                  Napište nám — nebo rovnou sestavte dům v konfigurátoru a
                  pošlete ho jako poptávku.
                </p>
                <p style={{ marginBottom: "0.35rem" }}>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </p>
                <p style={{ marginBottom: "0.35rem" }}>
                  <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                </p>
                <p style={{ opacity: 0.55, fontWeight: 300 }}>{brand.address}</p>
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
