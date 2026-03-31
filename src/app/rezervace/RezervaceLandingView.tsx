import Link from "next/link";
import { RezervaceLandingForm } from "./RezervaceLandingForm";

const STATS = [
  { value: "94,6 %", detail: "zlepšení deprese · Harvard" },
  { value: "6 z 7", detail: "dětí s ADHD · bez léků" },
  { value: "48 %", detail: "remise nespavosti · 21 dní" },
] as const;

export function RezervaceLandingView() {
  return (
    <div className="w-full bg-[#111110] font-sans text-white">
      <div className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-4 pb-10 pt-8 sm:px-6 md:px-8 md:pb-16 md:pt-12">
        <header className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#B8963E] sm:text-[11px] md:text-xs">
            NEUREA · BRNO
          </p>
          <h1 className="mt-6 font-heading text-[clamp(1.5rem,6vw,3rem)] font-normal leading-[1.1] tracking-tight text-white md:mt-10">
            Terapie mluví. Neurea měří.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/72 sm:text-base md:mt-5 md:text-lg">
            První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.
          </p>
        </header>

        <section
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5 md:mt-16 md:gap-6"
          aria-label="Klíčové výsledky"
        >
          {STATS.map((s) => (
            <div
              key={s.detail}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 text-center sm:px-5 sm:py-6 md:px-6"
            >
              <p className="font-heading text-[clamp(1.75rem,5vw,2.5rem)] font-semibold tracking-tight text-[#B8963E] md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-white/60 sm:text-sm">{s.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 flex flex-1 flex-col items-center justify-center sm:mt-12 md:mt-16">
          <RezervaceLandingForm />
        </section>

        <footer className="mt-auto shrink-0 pt-10 text-center text-xs text-white/45 sm:pt-14 sm:text-sm md:pt-20">
          <Link href="https://neurea.cz" className="text-[#B8963E]/90 transition hover:text-[#B8963E]">
            neurea.cz
          </Link>
          <span className="mx-2 text-white/30" aria-hidden>
            ·
          </span>
          <a
            href="mailto:info@neurea.cz"
            className="text-[#B8963E]/90 transition hover:text-[#B8963E]"
          >
            info@neurea.cz
          </a>
        </footer>
      </div>
    </div>
  );
}
