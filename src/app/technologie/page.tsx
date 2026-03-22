import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Technologie",
};

const items = [
  {
    name: "HRV a koherence ANS",
    desc: "Měření variability srdečního rytmu a analýza koherence autonomního nervového systému — podklad pro diagnostiku a sledování pokroku.",
  },
  {
    name: "HRV biofeedback",
    desc: "Trénink regulace nervové soustavy na základě živé zpětné vazby.",
  },
  {
    name: "Transkraniální stimulace (tDCS)",
    desc: "Jemná elektrická stimulace — vhodné indikace dle protokolu (např. nálada, pozornost, bolest).",
  },
  {
    name: "Kranální elektrostimulace (CES)",
    desc: "Podpora relaxace, spánku a zvládání úzkosti — dle individuálního plánu.",
  },
  {
    name: "Fotobiomodulace mozku",
    desc: "Světelná terapie cílená na mozkovou aktivitu — energie, spánek, soustředění.",
  },
  {
    name: "Myofasciální práce",
    desc: "Práce s napětím a chronickou bolestí v těle.",
  },
  {
    name: "Dětský protokol — Vielight Gamma + emWave",
    desc: "Součást dětských protokolů pro ADHD a související obtíže (podle vašich podkladů).",
  },
];

export default function TechnologiePage() {
  return (
    <PageShell variant="wide">
      <p className="eyebrow">Hi-tech péče</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Technologie
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">
        Obecné popisy bez nutnosti uvádět interní názvy přístrojů na veřejné stránce — upravíte podle
        komunikační strategie.
      </p>
      <div className="mt-14 grid gap-7 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.name} className="card-luxury p-8 md:p-9">
            <h2 className="font-display text-xl font-normal text-ink">{item.name}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{item.desc}</p>
          </article>
        ))}
      </div>
      <CtaButtons className="mt-14" />
    </PageShell>
  );
}
