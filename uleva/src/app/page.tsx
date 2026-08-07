import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { BrandWord } from "@/components/BrandMark";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

const SERVICES = [
  {
    key: "uleva" as const,
    verb: "ulevit",
    href: "/hledat?potreby=multi,uklid,pohlidat,vareni",
    copy: "Uvařit, uklidit, pohlídat sourozence nebo být s miminkem — jedna návštěva podle toho, co doma hoří.",
    image: "/media/service-uleva.jpg",
  },
  {
    key: "dula" as const,
    verb: "podržet",
    href: "/hledat?potreby=dula",
    copy: "Klidná nezdravotní podpora v šestinedělí. Přítomnost, rutina, někdo, kdo to už viděl.",
    image: "/media/service-dula.jpg",
  },
  {
    key: "laktace" as const,
    verb: "poradit",
    href: "/hledat?potreby=laktace",
    copy: "Podpora kojení s jasnou kvalifikací a konkrétním termínem — ne další vlákno ve skupině.",
    image: "/media/service-laktace.jpg",
  },
];

function Morse({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`morse ${light ? "morse-light" : ""}`}
      aria-label="SOS v Morseově abecedě"
    >
      <i />
      <i />
      <i />
      <b />
      <b />
      <b />
      <i />
      <i />
      <i />
    </span>
  );
}

const MARQUEE = [
  "Povinné ověření",
  "Reálný kalendář",
  "Jednotné ceny",
  "Bez předplatného",
  "Úleva · Dula · Laktace",
  "Celá ČR",
];

export default function HomePage() {
  return (
    <div className="signal-home">
      <section className="signal-hero shell">
        <div className="signal-chip">
          <Morse />
          <span>Signál přijat · MamaSOS</span>
        </div>

        <div className="signal-stage">
          <div className="signal-copy fade-in">
            <BrandWord className="text-[clamp(2rem,4vw,2.75rem)]" />
            <h1 className="signal-title">
              Pomoc má
              <br />
              konečně <em>termín.</em>
            </h1>
            <p className="signal-lead">
              Ověřená pečující ve vašem okolí. Vidíte volno. Rezervujete na klik.
              Bez členství, bez dopisování — jen úleva, když ji potřebujete.
            </p>
            <div className="signal-actions">
              <Link href="#najit" className="btn btn-rose">
                Najít pečující
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/jak-to-funguje" className="signal-link">
                Jak to funguje
              </Link>
            </div>
          </div>

          <div className="signal-visual fade-in-delay">
            <div>
              <Image
                src="/media/hero-mamasos-v2.png"
                alt="Maminka s miminkem"
                fill
                priority
                className="object-cover object-[35%_center]"
                sizes="(max-width:960px) 55vw, 28vw"
              />
            </div>
            <div>
              <span>
                <Image
                  src="/media/service-uleva.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:960px) 40vw, 22vw"
                />
              </span>
              <span>
                <Image
                  src="/media/service-dula.jpg"
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:960px) 40vw, 22vw"
                />
              </span>
            </div>
            <div className="signal-float">
              <Sparkles className="h-5 w-5 shrink-0 text-rose" />
              <div>
                <strong>Volný termín dnes</strong>
                <span>Kalendář místo „máš čas?“</span>
              </div>
            </div>
          </div>
        </div>

        <div className="signal-marquee" aria-hidden>
          <div>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="inline-flex items-center gap-2.5">
                <Morse />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="najit" className="signal-find">
        <div className="shell">
          <div className="signal-section-head">
            <div>
              <p className="eyebrow">
                <MapPin className="h-3.5 w-3.5" />
                Najít pomoc
              </p>
              <h2>Kde jste a co potřebujete?</h2>
            </div>
            <p>
              Zobrazíme jen ověřené pečující s aktivním kalendářem ve vašem
              dojezdu.
            </p>
          </div>
          <div className="signal-search">
            <SearchPanel />
          </div>
          <div className="signal-proof">
            <span>
              <BadgeCheck /> Povinné ověření
            </span>
            <span>
              <CalendarDays /> Skutečné termíny
            </span>
            <span>
              <MapPin /> Podle dojezdu
            </span>
            <span>Jednotná cena v segmentu</span>
          </div>
        </div>
      </section>

      <section className="signal-services shell">
        <div className="signal-section-head">
          <div>
            <p className="eyebrow">Služby</p>
            <h2>Tři cesty k úlevě</h2>
          </div>
          <p>
            Nemusíte znát přesnou profesi. Začněte tím, co je dnes příliš těžké.
          </p>
        </div>

        <div className="signal-cards">
          {SERVICES.map((service) => {
            const price = SERVICE_PRICING[service.key];
            return (
              <Link
                key={service.key}
                href={service.href}
                className="signal-card"
              >
                <div className="signal-card__media">
                  <Image
                    src={service.image}
                    alt={price.label}
                    fill
                    className="object-cover"
                    sizes="(max-width:900px) 100vw, 33vw"
                  />
                </div>
                <div className="signal-card__body">
                  <p className="signal-card__verb">{service.verb}</p>
                  <h3>{price.label}</h3>
                  <p>{service.copy}</p>
                  <div className="signal-card__foot">
                    <p className="signal-card__price">
                      {formatCzk(price.pricePerHour)}
                      <small>/hod · min. {price.minHours} h</small>
                    </p>
                    <span className="signal-card__go">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="signal-manifesto">
        <div className="shell">
          <Morse light />
          <p>
            Důvěra není pocit.
            <br />
            Je to systém.
          </p>
          <div className="signal-manifesto-foot">
            <span>
              Totožnost · IČO · kvalifikace · pohovor · pojištění · kalendář
            </span>
            <Link href="/bezpecnost">
              Jak ověřujeme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="signal-section-head">
          <div>
            <p className="eyebrow">Jak to funguje</p>
            <h2>Tři kroky. Hotovo.</h2>
          </div>
        </div>
        <div className="signal-steps">
          {[
            {
              n: "01",
              t: "Lokalita a potřeba",
              d: "Město, PSČ nebo GPS + úklid, pohlídat, dula, laktace.",
            },
            {
              n: "02",
              t: "Termín v kalendáři",
              d: "Vidíte volno u ověřených pečujících. Rezervujete na klik.",
            },
            {
              n: "03",
              t: "Platba za rezervaci",
              d: "Jen objednané hodiny. Žádné předplatné.",
            },
          ].map((step) => (
            <div key={step.n} className="signal-step">
              <strong>{step.n}</strong>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell signal-recruit">
        <div>
          <p className="eyebrow">Pro pečující</p>
          <h2>
            Váš signál může
            <br />
            někdo potřebovat.
          </h2>
        </div>
        <div className="signal-recruit__card">
          <p>
            Přijímáme pečující po celé ČR. Registrace zdarma, vlastní kalendář,
            vlastní dojezd — MamaSOS posílá rezervace.
          </p>
          <Link href="/nabidnout" className="btn btn-ink">
            Přidat se k síti
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
