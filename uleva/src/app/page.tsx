import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { BrandWord } from "@/components/BrandMark";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { PROVIDERS } from "@/data/providers";

const SERVICES = [
  {
    key: "uleva" as const,
    tip: "Úklid, vaření, sourozenci — jedna návštěva.",
    image: "/media/service-uleva.jpg",
  },
  {
    key: "dula" as const,
    tip: "Přítomnost a rutina v šestinedělí.",
    image: "/media/service-dula.jpg",
  },
  {
    key: "laktace" as const,
    tip: "Podpora kojení. Jasná kvalifikace.",
    image: "/media/service-laktace.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* —— Cinematic lovebrand hero —— */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/hero-mama.jpg"
            alt="Maminka s miminkem"
            fill
            priority
            className="hero-image object-cover object-[center_26%]"
            sizes="100vw"
          />
        </div>
        <div className="hero-scrim absolute inset-0" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14">
          <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-3xl text-[#fffaf8]">
              <p className="brand-rise mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                Pro maminky · celá ČR
              </p>

              <h1 className="brand-rise-delay">
                <BrandWord
                  light
                  className="block text-[clamp(3.6rem,12vw,8.5rem)]"
                />
              </h1>

              <p className="manifesto brand-rise-late mt-6 max-w-xl text-[clamp(1.45rem,3.2vw,2.15rem)] text-white/92">
                Pomoc, když to jako máma nestíháš.
              </p>

              <div className="brand-rise-late mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/hledat" className="btn btn-rose">
                  Potřebuju úlevu
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/jak-to-funguje" className="link-arrow link-arrow-light">
                  Jak to funguje
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="brand-rise-late hidden pb-2 md:flex">
              <a href="#hledat" className="scroll-hint">
                <span>Objevit</span>
                <span className="scroll-hint__line" />
                <ArrowDown className="h-3.5 w-3.5 opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search — utility below brand moment */}
      <section id="hledat" className="border-b border-[var(--line)] bg-snow">
        <div className="shell py-10 md:py-12">
          <p className="eyebrow mb-5">Najít pečující</p>
          <SearchPanel />
        </div>
      </section>

      {/* Manifesto band */}
      <section className="bg-fog">
        <div className="shell py-20 md:py-28">
          <p className="manifesto mx-auto max-w-4xl text-center text-[clamp(1.75rem,4.2vw,3.25rem)] text-ink">
            Ne katalog kontaktů.
            <br />
            Ověřená žena. Volný termín. Úleva doma.
          </p>
        </div>
      </section>

      {/* Úleva editorial */}
      <section className="shell-wide py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-5">
          <div className="relative min-h-[70vw] overflow-hidden rounded-[1.75rem] lg:col-span-7 lg:min-h-[720px] lg:rounded-[2rem]">
            <Image
              src="/media/service-uleva.jpg"
              alt="Úleva doma"
              fill
              className="img-grade object-cover"
              sizes="(max-width:1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                Hlavní služba
              </p>
              <h2 className="display mt-3 text-4xl text-white md:text-6xl">
                Úleva doma
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/78">
                Jedna ověřená pečující — úklid, vaření, sourozenci, přítomnost.
                Po porodu i kdykoli jindy.
              </p>
              <Link
                href="/hledat?potreby=multi,uklid,pohlidat,vareni"
                className="btn btn-rose mt-8"
              >
                Rezervovat úlevu
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="rounded-[1.75rem] bg-ink px-8 py-10 text-[#fffaf8] md:px-10 md:py-12 lg:min-h-[340px] lg:rounded-[2rem]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                Proč MamaSOS
              </p>
              <p className="manifesto mt-6 text-3xl md:text-4xl">
                Nejdřív důvěra.
                <br />
                Pak úleva.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-white/72">
                <li className="flex gap-3">
                  <span className="mt-1.5 trust-dot shrink-0" />
                  Povinné ověření — IČO, totožnost, pojištění
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 trust-dot shrink-0" />
                  Reálný kalendář, ne dopisování
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 trust-dot shrink-0" />
                  Jednotné ceny. Bez předplatného.
                </li>
              </ul>
              <Link
                href="/bezpecnost"
                className="link-arrow link-arrow-light mt-10"
              >
                Co ověřujeme
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[1.75rem] lg:rounded-[2rem]">
              <Image
                src="/media/trust-home.jpg"
                alt=""
                fill
                className="img-grade object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-ink/35" />
              <p className="manifesto absolute bottom-8 left-8 right-8 text-2xl text-white md:text-3xl">
                Ať si konečně odpočineš.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services — full-bleed editorial rows feel via tall tiles */}
      <section className="bg-snow py-20 md:py-28">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-lg">
              <p className="eyebrow">Služby</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">
                Víš přesně,
                <br />
                <span className="display-soft">co dostaneš</span>
              </h2>
            </div>
            <Link href="/cenik" className="link-arrow">
              Celý ceník
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {SERVICES.map((item, i) => {
              const s = SERVICE_PRICING[item.key];
              return (
                <Link
                  key={item.key}
                  href={`/hledat?potreby=${item.key === "uleva" ? "uklid,pohlidat,vareni" : item.key}`}
                  className="service-tile group aspect-[3/4] rounded-[1.5rem] md:rounded-[1.75rem] fade-in"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <Image
                    src={item.image}
                    alt={s.label}
                    fill
                    className="img-grade object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                      {s.shortLabel}
                    </p>
                    <p className="display mt-2 text-3xl text-white md:text-[2.35rem]">
                      {formatCzk(s.pricePerHour)}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      / hod · min. {s.minHours} h
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">
                      {item.tip}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps — quiet, typographic */}
      <section className="border-y border-[var(--line)] bg-fog/60">
        <div className="shell py-20 md:py-28">
          <p className="eyebrow">Jak to funguje</p>
          <h2 className="display mt-4 max-w-xl text-4xl md:text-5xl">
            Tři kroky k úlevě
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                n: "01",
                t: "Kde jsi a co potřebuješ",
                d: "Město nebo PSČ. Úleva, dula, laktace.",
              },
              {
                n: "02",
                t: "Vyber termín",
                d: "Volno v kalendáři. Rezervace na klik.",
              },
              {
                n: "03",
                t: "Zaplať na platformě",
                d: "Jen objednané hodiny. Bez předplatného.",
              },
            ].map((step) => (
              <div key={step.n} className="border-t border-ink/10 pt-8">
                <p className="display-soft text-4xl text-rose">{step.n}</p>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caregivers — photo-led, not list cards */}
      <section className="shell py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Síť</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Pečující připravené přijet
            </h2>
          </div>
          <Link href="/hledat" className="btn btn-ink !py-2.5 !text-sm">
            Prohlédnout termíny
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {PROVIDERS.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href={`/pece/${p.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={p.photo}
                alt={p.name}
                fill
                className="img-grade object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-white/65">{p.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-ink text-[#fffaf8]">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/media/hero-mama.jpg"
            alt=""
            fill
            className="img-grade object-cover object-[center_30%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        <div className="shell relative py-24 text-center md:py-32">
          <BrandWord light className="text-[clamp(2.5rem,8vw,5rem)]" />
          <p className="manifesto mx-auto mt-6 max-w-xl text-2xl text-white/85 md:text-3xl">
            Když potřebuješ, aby někdo přišel.
          </p>
          <Link href="/hledat" className="btn btn-rose mt-10">
            Najít pečující
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
