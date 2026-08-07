import Link from "next/link";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

export default function Page() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Pro pečující</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Jak spolupráce funguje</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Registrace je zdarma. Sama si určujete kalendář i dojezd. Klientka
          rezervuje konkrétní termín a platí předem přes MamaSOS.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          "Nastavíte služby, město a maximální dojezd.",
          "Držíte aktivní kalendář — bez něj nejste ve výsledcích.",
          "Před přijetím znáte místo, rozsah a svou odměnu.",
          "Po dokončení návštěvy dostanete výplatu podle podmínek platformy.",
        ].map((t, i) => (
          <article key={t} className="panel-solid p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-moss">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-semibold">{t}</p>
          </article>
        ))}
      </div>

      <div className="panel-solid mt-8 p-6">
        <h2 className="display text-2xl">Vaše odměna (za hodinu)</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Částky níže jsou výplata pečující po zprostředkování — klientka vidí
          jinou (vyšší) cenu služby.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {(Object.keys(SERVICE_PRICING) as Array<keyof typeof SERVICE_PRICING>).map(
            (k) => (
              <li key={k} className="flex justify-between gap-3 border-b border-[var(--line)] py-2">
                <span>{SERVICE_PRICING[k].label}</span>
                <span className="font-bold">
                  {formatCzk(SERVICE_PRICING[k].payoutPerHour)}/h
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      <Link href="/nabidnout#registrace" className="btn btn-rose mt-8">
        Chci se přidat
      </Link>
    </div>
  );
}
