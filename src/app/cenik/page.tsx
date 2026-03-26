import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ceník",
};

const rows: [string, string, string][] = [
  ["Vstupní diagnostika", "75 min", "3 500 Kč"],
  ["Samostatné terapeutické sezení dospělí", "60–90 min", "3 000 Kč"],
  ["Série 5 sezení", "60–90 min / sezení", "14 000 Kč"],
  ["Série 10 sezení", "60–90 min / sezení", "25 000 Kč"],
  ["Dětský protokol série 5", "45–60 min", "12 000 Kč"],
  ["Samostatné dětské sezení", "45–60 min", "2 600 Kč"],
  ["Dětský protokol série 10", "45–60 min", "22 000 Kč"],
  ["HRV biofeedback", "45 min", "1 600 Kč"],
  ["Transkraniální stimulace (tDCS / tACS)", "45 min", "2 200 Kč"],
  ["Kraniální elektrostimulace (CES)", "45 min", "1 800 Kč"],
  ["Fotobiomodulace mozku (PBM)", "45 min", "2 200 Kč"],
  ["Myofasciální práce", "60 min", "2 000 Kč"],
];

export default function CenikPage() {
  return (
    <PageShell variant="pricing">
      <p className="eyebrow">Transparentně</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Ceník
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Služby nejsou hrazeny z veřejného zdravotního pojištění. Platba kartou nebo převodem; u
        rezervace online je povinná záloha {site.depositCzk} Kč přes Stripe.
      </p>

      <div className="mt-12 overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-luxury backdrop-blur-md">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/[0.06] bg-fog/80">
            <tr>
              <th className="px-5 py-4 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55">
                Služba
              </th>
              <th className="hidden px-5 py-4 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55 sm:table-cell">
                Délka
              </th>
              <th className="px-5 py-4 text-right font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55">
                Cena
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, len, price]) => (
              <tr key={name} className="border-t border-ink/[0.05] transition hover:bg-white/40">
                <td className="px-5 py-4 text-[15px] text-ink">{name}</td>
                <td className="hidden px-5 py-4 text-ink/55 sm:table-cell">{len}</td>
                <td className="px-5 py-4 text-right font-medium tabular-nums text-ink">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 glass-panel-strong p-8 md:p-10">
        <h2 className="font-display text-xl font-normal text-ink">Záloha a storno (shrnutí)</h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink/68">
          <li>Záloha při rezervaci: {site.depositCzk} Kč (online, Stripe).</li>
          <li>Doplatek v den návštěvy na místě — hotově nebo kartou.</li>
          <li>Podrobné storno podmínky jsou v obchodních podmínkách na webu.</li>
        </ul>
      </div>

      <CtaButtons className="mt-12" />
    </PageShell>
  );
}
