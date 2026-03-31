import Image from "next/image";
import Link from "next/link";
import { RezervaceLandingForm } from "./RezervaceLandingForm";

const STATS = [
  { value: "94,6 %", detail: "zlepšení deprese · Harvard" },
  { value: "6 z 7", detail: "dětí s ADHD · bez léků" },
  { value: "48 %", detail: "remise nespavosti · 21 dní" },
] as const;

export function RezervaceLandingView() {
  return (
    <div className="relative w-full overflow-hidden font-sans text-ink">
      <div className="rez-landing-noise pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-4 pb-12 pt-10 sm:px-6 md:px-8 md:pb-16 md:pt-14">
        <header className="text-center">
          <div className="flex flex-col items-center gap-5 md:gap-6">
            <div className="flex flex-wrap items-end justify-center gap-3 md:gap-5">
              <Image
                src="/neurea-symbol.svg"
                alt=""
                width={56}
                height={56}
                className="rez-landing-symbol h-12 w-12 shrink-0 md:h-14 md:w-14"
                priority
              />
              <Image
                src="/neurea-wordmark.svg"
                alt="NEUREA"
                width={280}
                height={72}
                className="rez-landing-wordmark h-9 w-auto max-w-[min(72vw,280px)] md:h-11"
                priority
              />
            </div>
            <p className="eyebrow text-[10px] sm:text-[11px]">NEUREA · BRNO</p>
            <hr className="rez-landing-divider mx-auto w-[min(100%,20rem)]" />
          </div>

          <h1 className="font-display mt-8 text-[clamp(1.65rem,6vw,3.15rem)] font-normal leading-[1.08] tracking-tight text-ink md:mt-10">
            <span className="text-gold-gradient">Terapie mluví.</span> Neurea měří.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/72 sm:text-base md:mt-6 md:text-lg">
            První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.
          </p>
        </header>

        <section
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 md:mt-16 md:gap-6"
          aria-label="Klíčové výsledky"
        >
          {STATS.map((s) => (
            <div key={s.detail} className="rez-stat-tile px-4 py-6 text-center sm:px-5 sm:py-7 md:px-6">
              <p className="font-heading text-[clamp(1.85rem,5vw,2.65rem)] font-semibold tracking-tight text-gold md:text-4xl">
                {s.value}
              </p>
              <p className="mt-3 text-xs leading-snug text-ink/58 sm:text-sm">{s.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 flex flex-1 flex-col items-center justify-center sm:mt-14 md:mt-16">
          <RezervaceLandingForm />
        </section>

        <footer className="mt-auto shrink-0 pt-12 text-center text-xs text-ink/45 sm:pt-16 sm:text-sm md:pt-20">
          <Link href="https://neurea.cz" className="text-gold transition hover:opacity-90">
            neurea.cz
          </Link>
          <span className="mx-2 text-ink/25" aria-hidden>
            ·
          </span>
          <a href="mailto:info@neurea.cz" className="text-gold transition hover:opacity-90">
            info@neurea.cz
          </a>
        </footer>
      </div>
    </div>
  );
}
