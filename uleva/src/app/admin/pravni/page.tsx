import Link from "next/link";
import {
  BILLING_HYPOTHESES,
  LAWYER_BRIEF_QUESTIONS,
  MODEL_SUMMARY,
} from "@/data/legalModel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Zadání pro advokáta — MamaSOS",
};

export default function LawyerBriefPage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Interní · předat advokátovi + daňovému poradci</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">
        Právní a účetní zadání MamaSOS
      </h1>
      <p className="mt-4 max-w-3xl text-sm text-ink-soft">
        Ostré platby nepouštět, dokud není písemně zvolený jeden fakturační model
        a potvrzený platební tok (ne běžný provozní účet bez posouzení ČNB).
      </p>

      <section className="panel-solid mt-10 p-6">
        <h2 className="display text-2xl">Zvolený produktový model</h2>
        <p className="mt-3 font-bold">{MODEL_SUMMARY.label}</p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>• Smlouva o péči: {MODEL_SUMMARY.careContract}</li>
          <li>• Role platformy: {MODEL_SUMMARY.platformRole}</li>
          <li>• Klientka před platbou vidí: {MODEL_SUMMARY.clientSees}</li>
          <li>• Platby: {MODEL_SUMMARY.paymentsRule}</li>
          <li className="font-bold text-rose-deep">
            • Blokace ostrých plateb: {MODEL_SUMMARY.livePaymentsBlockedUntil}
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="display text-2xl">Aktuální ceny v produktu</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-xs uppercase text-ink-soft">
                <th className="py-2">Služba</th>
                <th className="py-2">Klientka vidí</th>
                <th className="py-2">Výplata pečující</th>
                <th className="py-2">Rozdíl (platforma)</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(SERVICE_PRICING) as Array<keyof typeof SERVICE_PRICING>).map(
                (k) => {
                  const s = SERVICE_PRICING[k];
                  const diff = s.pricePerHour - s.payoutPerHour;
                  return (
                    <tr key={k} className="border-b border-[var(--line)]">
                      <td className="py-2 font-bold">{s.label}</td>
                      <td className="py-2">{formatCzk(s.pricePerHour)}/h</td>
                      <td className="py-2">{formatCzk(s.payoutPerHour)}/h</td>
                      <td className="py-2">{formatCzk(diff)}/h</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">
          Hypotézy fakturace — musíte zvolit právě jednu
        </h2>
        <div className="mt-4 space-y-4">
          {BILLING_HYPOTHESES.map((h) => (
            <article key={h.id} className="panel-solid p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-moss">
                {h.fitsVariantA ? "Kompatibilní s variantou A" : "Není varianta A"}
              </p>
              <h3 className="mt-2 font-bold">{h.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{h.exampleUleva}</p>
              <p className="mt-2 text-sm text-ink-soft">{h.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Otázky do memoranda advokáta</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          {LAWYER_BRIEF_QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-soft">
          Výstupem nemá být jen sada VOP. Požadujte kontrolu obrazovek:
          registrace, profil, checkout, potvrzovací e-mail, faktura, storno,
          reklamace.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/admin" className="btn btn-ghost">
          Přehled měst
        </Link>
        <Link href="/obchodni-podminky" className="btn btn-ink">
          Veřejné VOP (stub)
        </Link>
      </div>
    </div>
  );
}
