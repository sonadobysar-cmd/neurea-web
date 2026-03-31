import Link from "next/link";
import { RezervaceLandingForm } from "./RezervaceLandingForm";

const STATS = [
  { value: "94,6 %", detail: "zlepšení deprese · Harvard" },
  { value: "6 z 7", detail: "dětí s ADHD · bez léků" },
  { value: "48 %", detail: "remise nespavosti · 21 dní" },
  { value: "100 %", detail: "zlepšení úzkostí · Harvard" },
] as const;

const HELP_CARDS = [
  {
    title: "Deprese a úzkosti",
    detail: "94,6 % deprese, 100 % úzkosti klinické zlepšení · Harvard",
  },
  {
    title: "ADHD u dětí",
    detail: "6 z 7 dětí zlepšení pozornosti · bez léků · Harvard + Boston University",
  },
  {
    title: "Vyhoření a nespavost",
    detail: "77 % zlepšení do 3 týdnů · 48 % remise nespavosti za 21 dní",
  },
  {
    title: "Chronická bolest",
    detail: "71 % snížení bolesti po 5 sezeních · klinicky ověřeno",
  },
] as const;

const HOW_STEPS = [
  {
    title: "Vstupní diagnostika",
    body: "Změříme stav vaší nervové soustavy. HRV koherence objektivně před i po každém sezení.",
  },
  {
    title: "Individuální protokol",
    body: "Kombinace klinicky ověřených neurotechnologií přesně pro váš problém. Bez léků. Bez vedlejších účinků.",
  },
  {
    title: "Měřitelný výsledek",
    body: "Vidíte přesnou změnu v číslech. Garantujeme měřitelné zlepšení nebo vracíme 50 % ceny série.",
  },
] as const;

function IconDiagnostics() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden
    >
      <path d="M4 12h2.5l2-6 3 12 2.5-9L17 12h3" />
    </svg>
  );
}

function IconProtocol() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.64 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.64 0l8.58-3.9A1 1 0 0 0 22 17" />
    </svg>
  );
}

function IconMeasurable() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden
    >
      <path d="M3 3v18h18" />
      <path d="M7 16V9" />
      <path d="M12 16v-5" />
      <path d="M17 16V6" />
    </svg>
  );
}

const HOW_ICONS = [IconDiagnostics, IconProtocol, IconMeasurable] as const;

export function RezervaceLandingView() {
  return (
    <div className="relative w-full overflow-hidden font-sans text-[#1A1A1A]">
      <div className="rez-landing-noise pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-4 pb-12 pt-10 sm:px-6 md:px-8 md:pb-16 md:pt-14">
        <header className="text-center">
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <p className="font-heading text-[clamp(0.8125rem,2vw,1rem)] font-normal uppercase tracking-[0.22em] text-gold sm:tracking-[0.26em] md:tracking-[0.28em]">
              NEUREA · BRNO
            </p>
            <hr className="rez-landing-divider mx-auto w-[min(100%,24rem)]" />
          </div>

          <h1 className="font-display mt-7 text-[clamp(1.65rem,6vw,3.15rem)] font-normal leading-[1.08] tracking-tight text-[#1A1A1A] sm:mt-8 md:mt-10">
            <span className="text-gold-gradient">Terapie mluví.</span> Neurea měří.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-[#1A1A1A]/72 sm:mt-8 sm:text-base md:mt-10 md:text-lg">
            První neuro-somatické pracoviště v ČR. Klinicky ověřené technologie. Měřitelné výsledky.
          </p>
        </header>

        <section
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 md:mt-16 md:gap-6 lg:grid-cols-4"
          aria-label="Klíčové výsledky"
        >
          {STATS.map((s) => (
            <div key={s.detail} className="rez-stat-tile px-4 py-6 text-center sm:px-5 sm:py-7 md:px-6">
              <p className="font-heading text-[clamp(1.85rem,5vw,2.65rem)] font-semibold tracking-tight text-gold md:text-4xl">
                {s.value}
              </p>
              <p className="mt-3 text-xs leading-snug text-[#1A1A1A]/58 sm:text-sm">{s.detail}</p>
            </div>
          ))}
        </section>

        <section
          className="mt-16 md:mt-20"
          aria-labelledby="rez-help-heading"
        >
          <h2
            id="rez-help-heading"
            className="font-heading text-center text-lg font-normal uppercase tracking-[0.22em] text-gold sm:text-xl md:tracking-[0.28em]"
          >
            S čím pomáháme
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-10 md:gap-7">
            {HELP_CARDS.map((c) => (
              <article
                key={c.title}
                className="rez-cream-card px-5 py-6 sm:px-6 sm:py-7"
              >
                <h3 className="font-heading text-lg font-medium text-[#1A1A1A] sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/72 sm:text-[15px]">
                  {c.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mt-16 md:mt-20"
          aria-labelledby="rez-how-heading"
        >
          <h2
            id="rez-how-heading"
            className="font-heading text-center text-lg font-normal uppercase tracking-[0.22em] text-gold sm:text-xl md:tracking-[0.28em]"
          >
            Jak to funguje
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-5 lg:gap-8">
            {HOW_STEPS.map((step, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <li key={step.title} className="rez-cream-card flex flex-col items-center px-5 py-7 text-center sm:px-6 sm:py-8">
                  <div className="rez-how-icon-wrap">
                    <Icon />
                  </div>
                  <span className="mt-4 font-heading text-xs font-medium uppercase tracking-[0.28em] text-[#B8963E]/90">
                    {i + 1}
                  </span>
                  <h3 className="font-heading mt-2 text-lg font-medium text-[#1A1A1A] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A]/72">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16 flex flex-1 flex-col items-center justify-center sm:mt-20 md:mt-24">
          <RezervaceLandingForm />
        </section>

        <footer className="mt-auto shrink-0 pt-12 text-center text-xs text-[#1A1A1A]/45 sm:pt-16 sm:text-sm md:pt-20">
          <Link href="https://neurea.cz" className="text-gold transition hover:opacity-90">
            neurea.cz
          </Link>
          <span className="mx-2 text-[#1A1A1A]/25" aria-hidden>
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
