import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { BrandWord } from "@/components/BrandMark";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { PROVIDERS } from "@/data/providers";

const SERVICES = [
  {
    key: "uleva" as const,
    tip: "Uvařit, uklidit, pohlídat sourozence — ať si odpočineš.",
    image: "/media/service-uleva.jpg",
  },
  {
    key: "dula" as const,
    tip: "Poporodní přítomnost a rutina. Nezdravotní podpora.",
    image: "/media/service-dula.jpg",
  },
  {
    key: "laktace" as const,
    tip: "Podpora kojení na objednání. Jasná kvalifikace.",
    image: "/media/service-laktace.jpg",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero — brand + produktový slib + CTA; search hned pod foldem */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/media/hero-mama.jpg"
          alt="Maminka s miminkem"
          fill
          priority
          className="img-grade object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="hero-scrim absolute inset-0" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14 md:pt-32">
          <div className="fade-in max-w-2xl text-white">
            <p className="mb-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/70">
              <span className="trust-dot !bg-white/80 !shadow-[0_0_0_4px_rgba(255,255,255,0.15)]" />
              Celá ČR · povinně ověřené pečující
            </p>
            <BrandWord
              light
              className="mb-5 block text-[clamp(2.4rem,6vw,3.6rem)]"
            />
            <h1 className="display text-[clamp(2.1rem,5.5vw,3.6rem)] leading-[1.08] text-white">
              Ověřená pomoc doma.
              <br />
              Rovnou s volným termínem.
            </h1>
            <div className="lux-rule mt-6" />
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
              Úklid, vaření, sourozenci, dula nebo laktace — blízko tebe.
              Rezervace bez dopisování. Bez předplatného.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#hledat" className="btn btn-rose">
                Najít pečující
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/jak-to-funguje" className="btn btn-ghost-light">
                Jak to funguje
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search — jádro produktu */}
      <section id="hledat" className="border-b border-[var(--line)] bg-snow">
        <div className="shell py-8 md:py-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">
                <MapPin className="h-3.5 w-3.5" />
                Hledat podle lokality
              </p>
              <h2 className="display mt-2 text-2xl md:text-3xl">
                Kde jsi a co potřebuješ?
              </h2>
            </div>
          </div>
          <SearchPanel />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[var(--line)] bg-white/70">
        <div className="shell grid gap-6 py-7 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)] md:py-8">
          {[
            {
              icon: BadgeCheck,
              t: "Povinné ověření",
              d: "IČO, totožnost, RT, pohovor, pojištění — jinak profil neuvidíš.",
            },
            {
              icon: CalendarDays,
              t: "Kalendář, ne chat",
              d: "Vidíš volné sloty a rezervuješ na klik. Žádné obvolávání.",
            },
            {
              icon: ShieldCheck,
              t: "Jednotné ceny",
              d: "Stejná služba = stejná cena. Platíš jen objednané hodiny.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="flex items-start gap-3 md:px-6 first:md:pl-0 last:md:pr-0"
            >
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <div>
                <p className="font-bold text-ink">{item.t}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Úleva highlight */}
      <section className="shell py-16 md:py-20">
        <div className="panel-solid grid overflow-hidden md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[360px]">
            <Image
              src="/media/service-uleva.jpg"
              alt="Úleva doma"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="eyebrow">Hlavní služba</p>
            <h2 className="display mt-2 text-3xl md:text-4xl">Úleva doma</h2>
            <p className="mt-4 text-ink-soft">
              Jedna ověřená pečující — uvaří, uklidí, pohlídá sourozence nebo
              zůstane s miminkem, zatímco si odpočineš. Po porodu i kdykoli
              jindy.
            </p>
            <p className="mt-4 text-sm font-bold text-ink">
              {formatCzk(SERVICE_PRICING.uleva.pricePerHour)}/h · min.{" "}
              {SERVICE_PRICING.uleva.minHours} h
            </p>
            <Link
              href="/hledat?potreby=multi,uklid,pohlidat,vareni"
              className="btn btn-rose mt-6 w-fit"
            >
              Rezervovat úlevu
            </Link>
          </div>
        </div>
      </section>

      {/* 3 services */}
      <section className="bg-fog/80 py-16 md:py-24">
        <div className="shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Služby</p>
              <h2 className="display mt-2 text-3xl md:text-5xl">
                Vše pro maminku na jednom místě
              </h2>
              <p className="mt-3 max-w-lg text-ink-soft">
                Tři jasné segmenty. Stejná cena v rámci segmentu — ne podle
                profilu.
              </p>
            </div>
            <Link href="/cenik" className="btn btn-ghost !py-2.5 !text-sm">
              Celý ceník
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((item) => {
              const s = SERVICE_PRICING[item.key];
              return (
                <Link
                  key={item.key}
                  href={`/hledat?potreby=${item.key === "uleva" ? "uklid,pohlidat,vareni" : item.key}`}
                  className="group overflow-hidden rounded-2xl bg-ink text-white shadow-[var(--shadow)]"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.image}
                      alt={s.label}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">
                        {s.shortLabel}
                      </p>
                      <p className="display mt-1 text-3xl">
                        {formatCzk(s.pricePerHour)}
                      </p>
                      <p className="text-sm text-white/70">
                        / hod · min. {s.minHours} h
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/88">
                        {item.tip}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vs Hlídačky / why us */}
      <section className="shell py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Proč MamaSOS</p>
            <h2 className="display mt-2 text-3xl md:text-5xl">
              Ne katalog kontaktů.
              <br />
              Rezervace s jistotou.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Každá pečující povinně ověřená — ne dobrovolně",
                "Reálný kalendář místo „zeptejte se na dostupnost“",
                "Jednotné ceny · platba za rezervaci · bez předplatného",
                "Úleva, dula i laktace lokálně podle mapy",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm text-ink-soft">
                  <span className="mt-1.5 trust-dot shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <Link href="/bezpecnost" className="text-link mt-8">
              Co ověřujeme →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
            <Image
              src="/media/trust-home.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="shell py-16 md:py-20">
          <p className="eyebrow">Jak to funguje</p>
          <h2 className="display mt-2 text-3xl md:text-4xl">Tři kroky k úlevě</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Zadej lokalitu a potřebu",
                d: "Město, PSČ nebo GPS. Úklid, pohlídat, dula, laktace — i víc najednou.",
              },
              {
                n: "2",
                t: "Vyber termín v kalendáři",
                d: "Vidíš ověřené pečující s volnem. Rezervuješ konkrétní slot.",
              },
              {
                n: "3",
                t: "Zaplať na platformě",
                d: "Jen objednané hodiny. Žádné předplatné jako u katalogů.",
              },
            ].map((step) => (
              <div key={step.n}>
                <p className="display text-4xl text-rose">{step.n}</p>
                <h3 className="mt-3 text-lg font-bold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="shell py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pečující</p>
            <h2 className="display mt-2 text-3xl md:text-4xl">
              Ověřené ženy připravené přijet
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Ukázkové profily — před spuštěním nahradíme reálnými pečujícími.
            </p>
          </div>
          <Link href="/hledat" className="btn btn-ink !py-2.5 !text-sm">
            Prohlédnout termíny
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDERS.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href={`/pece/${p.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-sand">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{p.name}</p>
                <p className="truncate text-sm text-ink-soft">
                  {p.city} ·{" "}
                  {p.services
                    .map((s) => SERVICE_PRICING[s].shortLabel)
                    .join(", ")}
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold text-rose">
                ★ {p.rating.toFixed(1)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="shell flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <h2 className="display text-3xl md:text-4xl">
              Potřebuješ úlevu teď?
            </h2>
            <p className="mt-3 max-w-md text-white/70">
              Najdi ověřenou pečující ve svém okolí a rezervuj volný termín.
            </p>
          </div>
          <Link href="/hledat" className="btn btn-rose">
            Najít pečující
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
