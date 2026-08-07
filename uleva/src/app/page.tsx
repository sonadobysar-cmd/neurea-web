import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark, BrandWord } from "@/components/BrandMark";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { PROVIDERS } from "@/data/providers";

const SERVICES = [
  {
    key: "uleva" as const,
    tip: "Uvařit, uklidit, sourozence — ať si konečně odpočineš.",
    image: "/media/service-uleva.jpg",
  },
  {
    key: "dula" as const,
    tip: "Přítomnost a rutina v šestinedělí. Nezdravotní podpora.",
    image: "/media/service-dula.jpg",
  },
  {
    key: "laktace" as const,
    tip: "Podpora kojení doma. S jasnou kvalifikací.",
    image: "/media/service-laktace.jpg",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/media/hero-mama.jpg"
            alt="Maminka s miminkem v klidném ranním světle"
            fill
            priority
            className="hero-ken object-cover object-[center_28%]"
            sizes="100vw"
          />
        </div>
        <div className="hero-scrim absolute inset-0" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-32">
          <div className="max-w-3xl text-white">
            <div className="brand-rise mb-8 flex items-center gap-4">
              <BrandMark size="hero" tone="light" />
              <BrandWord
                light
                className="text-[clamp(2.6rem,7vw,4rem)] leading-none"
              />
            </div>

            <h1 className="display-soft brand-rise-delay text-[clamp(2.1rem,5.8vw,3.65rem)] leading-[1.12] text-white">
              Pomoc, když to jako máma nestíháš.
            </h1>

            <div className="brand-rise-late">
              <div className="lux-rule--start mt-8 max-w-[7.5rem]" />
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/82 md:text-lg">
                Ověřená pečující u vás doma — s volným termínem, bez dopisování.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/hledat" className="btn btn-rose">
                  Potřebuju úlevu
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/jak-to-funguje" className="btn btn-ghost-light">
                  Jak to funguje
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-band border-b border-[var(--line)]">
        <div className="shell py-9 md:py-11">
          <SearchPanel />
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="grid items-end gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Pro maminky</p>
            <h2 className="section-title mt-3 text-4xl md:text-6xl">
              Úleva, která přijede.
            </h2>
            <div className="lux-rule--start mt-6 max-w-[6.5rem]" />
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Jedna ověřená žena — úklid, vaření, sourozenci, přítomnost.
              Po porodu i kdykoli jindy, když už nemáš sílu všechno táhnout sama.
            </p>
            <Link
              href="/hledat?potreby=multi,uklid,pohlidat,vareni"
              className="btn btn-rose mt-8"
            >
              Rezervovat úlevu doma
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow)] md:aspect-[5/6]">
            <Image
              src="/media/service-uleva.jpg"
              alt="Úleva doma"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <p className="display-soft absolute bottom-6 left-6 right-6 text-2xl text-white md:text-3xl">
              Ať si konečně odpočineš.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-snow/80 py-20 md:py-28">
        <div className="shell">
          <div className="mb-12 max-w-xl">
            <p className="eyebrow">Typy pomoci</p>
            <h2 className="section-title mt-3 text-4xl md:text-5xl">
              Víš přesně, co dostaneš
            </h2>
            <div className="lux-rule--start mt-5 max-w-[6.5rem]" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((item, i) => {
              const s = SERVICE_PRICING[item.key];
              return (
                <Link
                  key={item.key}
                  href={`/hledat?potreby=${item.key === "uleva" ? "uklid,pohlidat,vareni" : item.key}`}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-ink text-white shadow-[var(--shadow)] fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={s.label}
                      fill
                      className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/65">
                        {s.shortLabel}
                      </p>
                      <p className="display mt-2 text-3xl md:text-4xl">
                        {formatCzk(s.pricePerHour)}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        / hodina · min. {s.minHours} h
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/88">
                        {item.tip}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <Link href="/cenik" className="text-sm font-bold text-rose hover:underline">
              Celý ceník →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-45">
          <Image
            src="/media/trust-home.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/50" />
        </div>
        <div className="shell relative grid items-center gap-12 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <div>
            <p className="eyebrow !text-rose">Proč MamaSOS</p>
            <h2 className="section-title mt-3 text-4xl text-white md:text-6xl">
              Nejdřív důvěra.
              <br />
              <span className="display-soft">Pak úleva.</span>
            </h2>
            <div className="lux-rule--start mt-7 max-w-[6.5rem]" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Nejsme databáze kontaktů. Každá pečující projde ověřením a má
              aktivní kalendář — jinak ji neuvidíš.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Povinné ověření totožnosti, IČO a pojištění",
                "Reálné termíny — ne „napiš mi, jestli máš čas“",
                "Jednotné ceny. Bez předplatného.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm text-white/88"
                >
                  <span className="mt-1.5 trust-dot shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="floaty rounded-[2rem] border border-white/12 bg-white/[0.07] p-8 backdrop-blur-md">
            <BrandMark size="lg" tone="light" />
            <p className="display mt-6 text-5xl text-white md:text-6xl">
              {PROVIDERS.length}+
            </p>
            <p className="display-soft mt-2 text-xl text-white/90">
              ověřených žen v demo síti
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Praha, Brno, Ostrava… Každá s fotkou, badge a volnými sloty.
            </p>
            <Link href="/hledat" className="btn btn-rose mt-8">
              Prohlédnout termíny
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Jak to funguje</p>
          <h2 className="section-title mt-3 text-4xl md:text-5xl">
            Tři kroky k úlevě
          </h2>
          <div className="lux-rule--start mt-5 max-w-[6.5rem]" />
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Kde jsi a co potřebuješ",
              d: "Město nebo PSČ a typ pomoci — úleva, dula, laktace.",
            },
            {
              n: "02",
              t: "Vyber termín",
              d: "Vidíš volno v kalendáři. Rezervuješ na klik.",
            },
            {
              n: "03",
              t: "Zaplať na platformě",
              d: "Jen objednané hodiny. Žádné předplatné.",
            },
          ].map((step) => (
            <div key={step.n}>
              <p className="display-soft text-5xl text-rose">{step.n}</p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-fog/50 py-20 md:py-28">
        <div className="shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-lg">
              <p className="eyebrow">Po celé ČR</p>
              <h2 className="section-title mt-3 text-4xl md:text-5xl">
                Pečující připravené přijet
              </h2>
              <div className="lux-rule--start mt-5 max-w-[6.5rem]" />
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
                className="group flex items-center gap-4 rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative h-[4.25rem] w-[4.25rem] overflow-hidden rounded-[1.15rem] bg-sand">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="68px"
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
        </div>
      </section>
    </div>
  );
}
