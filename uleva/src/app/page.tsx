import Image from "next/image";
import Link from "next/link";
import { BrandWord } from "@/components/BrandMark";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

const SERVICES = [
  {
    key: "uleva" as const,
    line: "Úklid, vaření, sourozenci — jedna návštěva.",
  },
  {
    key: "dula" as const,
    line: "Přítomnost a rutina v šestinedělí.",
  },
  {
    key: "laktace" as const,
    line: "Podpora kojení. Jasná kvalifikace.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 1 — Brand campaign hero */}
      <section className="relative flex min-h-[100svh] flex-col">
        <div className="absolute inset-0">
          <Image
            src="/media/hero-mama.jpg"
            alt=""
            fill
            priority
            className="img-grade object-cover object-[center_28%]"
            sizes="100vw"
          />
          <div className="hero-scrim absolute inset-0" />
        </div>

        <div className="shell relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-2 pb-16 pt-28 text-center text-[#fafaf8]">
          <p className="brand-rise text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">
            Péče pro maminky
          </p>
          <h1 className="brand-rise-delay mt-8">
            <BrandWord
              light
              className="block text-[clamp(3.8rem,14vw,9rem)]"
            />
          </h1>
          <p className="display-soft brand-rise-late mt-8 max-w-md text-[clamp(1.35rem,3vw,1.85rem)] text-white/90">
            Pomoc, když to jako máma nestíháš.
          </p>
          <div className="brand-rise-late mt-12">
            <Link href="/hledat" className="btn btn-ghost-light">
              Rezervovat
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — Manifesto */}
      <section className="bg-snow">
        <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-28 text-center md:py-36">
          <p className="display max-w-3xl text-[clamp(2rem,5vw,3.75rem)]">
            Ne katalog.
            <br />
            <span className="display-soft">Ověřená pečující.</span>
            <br />
            Volný termín.
          </p>
          <Link href="/bezpecnost" className="text-link mt-14">
            Jak ověřujeme
          </Link>
        </div>
      </section>

      {/* 3 — One image story */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <Image
          src="/media/service-uleva.jpg"
          alt="Úleva doma"
          fill
          className="img-grade object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/10" />
        <div className="shell relative flex min-h-[85vh] flex-col justify-end pb-16 pt-32 md:pb-24">
          <p className="eyebrow text-white/55">Úleva doma</p>
          <h2 className="display mt-4 max-w-xl text-4xl text-white md:text-6xl">
            Ať si konečně
            <br />
            odpočineš.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            Jedna ověřená žena — úklid, vaření, sourozenci, přítomnost.
            Po porodu i kdykoli jindy.
          </p>
          <Link href="/hledat?potreby=multi,uklid,pohlidat,vareni" className="btn btn-ghost-light mt-10 w-fit">
            Rezervovat úlevu
          </Link>
        </div>
      </section>

      {/* 4 — Services as editorial list */}
      <section className="bg-snow">
        <div className="shell py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--line)] pb-10">
            <div>
              <p className="eyebrow">Služby</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">Ceník</h2>
            </div>
            <Link href="/cenik" className="text-link">
              Detail
            </Link>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {SERVICES.map((item) => {
              const s = SERVICE_PRICING[item.key];
              return (
                <Link
                  key={item.key}
                  href={`/hledat?potreby=${item.key === "uleva" ? "uklid,pohlidat,vareni" : item.key}`}
                  className="group grid grid-cols-1 items-baseline gap-3 py-10 transition md:grid-cols-[1fr_1.4fr_auto] md:gap-8"
                >
                  <p className="display text-3xl md:text-4xl group-hover:text-rose">
                    {s.label}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-soft md:pt-2">
                    {item.line}
                  </p>
                  <p className="display text-2xl md:text-right md:text-3xl">
                    {formatCzk(s.pricePerHour)}
                    <span className="ml-1 text-sm tracking-normal text-ink-soft">
                      / hod
                    </span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — Trust, one breath */}
      <section className="bg-ink text-[#fafaf8]">
        <div className="shell flex min-h-[50vh] flex-col items-center justify-center py-24 text-center md:py-28">
          <p className="display-soft max-w-2xl text-[clamp(1.6rem,3.5vw,2.5rem)] text-white/90">
            Každá pečující projde ověřením.
            <br />
            Bez aktivního kalendáře ji neuvidíš.
          </p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/45">
            IČO · totožnost · pojištění · jednotné ceny · bez předplatného
          </p>
        </div>
      </section>

      {/* 6 — Close */}
      <section className="bg-fog">
        <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-28 text-center">
          <BrandWord className="text-[clamp(2.5rem,8vw,5rem)]" />
          <p className="display-soft mt-6 text-xl text-ink-soft md:text-2xl">
            Když potřebuješ, aby někdo přišel.
          </p>
          <Link href="/hledat" className="btn btn-rose mt-12">
            Najít pečující
          </Link>
        </div>
      </section>
    </div>
  );
}
