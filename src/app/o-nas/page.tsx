import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "O nás",
};

export default function ONasPage() {
  return (
    <PageShell>
      <p className="eyebrow">Tým</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        O nás
      </h1>
      <div className="mt-12 glass-panel-strong p-9 md:p-11">
        <p className="eyebrow !text-[10px]">Zakladatelka</p>
        <h2 className="mt-4 font-display text-3xl font-normal text-ink">Nia Dobyšar</h2>
        <p className="mt-2 text-sm text-ink/50">Neuro-somatický praktik · zakladatelka NEUREA</p>
        <p className="mt-7 text-[15px] leading-relaxed text-ink/72">
          Certifikace: neuro-somatický praktik, NLP, myofasciální terapie, neuroplasticita, KBT, krizová
          komunikace, vagal toning. Profesionální fotografie k doplnění na web.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/72">
          (Pracovní bio z podkladů — finální osobní příběh a tón doplníte.)
        </p>
      </div>
      <CtaButtons className="mt-12" />
    </PageShell>
  );
}
