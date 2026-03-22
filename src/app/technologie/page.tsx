import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";
import { technologieItems } from "@/lib/technologie";

export const metadata: Metadata = {
  title: "Technologie",
  description:
    "HRV diagnostika, tDCS, CES, fotobiomodulace mozku a myofasciální terapie — přehled metod a odkazů na studie.",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-gray-200/80 pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <p className="eyebrow text-[10px] tracking-[0.28em]">{label}</p>
      <p className="mt-2 text-[15px] font-normal leading-relaxed text-ink/75">{children}</p>
    </div>
  );
}

export default function TechnologiePage() {
  return (
    <PageShell variant="wide">
      <p className="eyebrow">Metody &amp; přístroje</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
        Technologie
      </h1>
      <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-ink/58">
        Přehled technologií používaných v kontextu neuro-somatické péče — s odkazy na studijní
        souvislosti a oblasti, kde může být podpora užitečná. Konkrétní indikace vždy individuálně.
      </p>

      <div className="mt-14 flex flex-col gap-10 md:gap-12">
        {technologieItems.map((item, index) => (
          <article
            key={item.name}
            className="glass-panel-strong scroll-mt-28 p-8 md:p-10 lg:p-11"
            id={`tech-${index + 1}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-ink md:text-[1.65rem] lg:text-[1.85rem]">
                {item.name}
              </h2>
              <span className="font-heading text-[10px] font-normal uppercase tracking-[0.35em] text-gold opacity-90">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-6 text-[15px] font-normal leading-relaxed text-ink/72 md:text-base">
              {item.description}
            </p>

            {item.studies ? <Field label="Studie">{item.studies}</Field> : null}
            {item.institutions ? <Field label="Instituce &amp; reference">{item.institutions}</Field> : null}
            {item.successRate ? <Field label="Úspěšnost / výsledky">{item.successRate}</Field> : null}
            {item.approval ? <Field label="Schválení / regulace">{item.approval}</Field> : null}

            <Field label="Pomáhá s (orientačně)">{item.helpsWith}</Field>
          </article>
        ))}
      </div>

      <p className="mt-12 max-w-3xl text-sm font-light leading-relaxed text-ink/48">
        Uvedené údaje slouží k orientaci v dostupné evidenci; nejsou náhradou individuálního
        lékařského posouzení. Rozsah a forma péče vždy dle vstupní diagnostiky a platné legislativy.
      </p>

      <CtaButtons className="mt-10" />
    </PageShell>
  );
}
