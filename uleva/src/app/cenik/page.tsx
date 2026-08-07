import Link from "next/link";
import { SERVICE_PRICING, PLATFORM_FEE, calcBooking, formatCzk } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
          Ceník
        </p>
        <h1 className="display mt-1 text-4xl md:text-5xl">Stejná služba, stejná cena</h1>
        <p className="mt-3 text-[var(--ink-soft)]">
          Ceny nastavuje platforma. Nehádáš se o sazbu podle profilu. Platíš jen
          objednané hodiny — žádné předplatné.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {(Object.keys(SERVICE_PRICING) as Array<keyof typeof SERVICE_PRICING>).map(
          (key) => {
            const s = SERVICE_PRICING[key];
            const sample = calcBooking(key, s.minHours);
            return (
              <article key={key} className="card flex flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sage)]">
                  {s.shortLabel}
                </p>
                <h2 className="display mt-2 text-3xl">{s.label}</h2>
                <p className="mt-4 display text-5xl text-[var(--ink)]">
                  {formatCzk(s.pricePerHour)}
                </p>
                <p className="text-sm text-[var(--ink-soft)]">
                  / hodina · minimum {s.minHours} h
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {s.description}
                </p>
                <div className="mt-6 rounded-2xl bg-[var(--mist)] p-4 text-sm">
                  <p className="font-bold">Příklad {s.minHours} h</p>
                  <p className="mt-1 text-[var(--ink-soft)]">
                    Celkem {formatCzk(sample.total)}
                    <br />
                    z toho fee {Math.round(PLATFORM_FEE * 100)} % = {formatCzk(sample.fee)}
                    <br />
                    pečující {formatCzk(sample.provider)}
                  </p>
                </div>
              </article>
            );
          }
        )}
      </div>

      <div className="card mt-8 p-6 md:p-8">
        <h2 className="display text-2xl">Jak platba funguje</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--ink-soft)]">
          <li>• Zaplatíš předem na platformě za vybraný termín.</li>
          <li>• Úleva si strhne fee za zprostředkování ({Math.round(PLATFORM_FEE * 100)} %).</li>
          <li>• Pečující dostane zbytek po dokončení návštěvy.</li>
          <li>• Žádné měsíční předplatné pro maminky ani pečující.</li>
        </ul>
        <Link href="/hledat" className="btn-primary mt-6 inline-flex">
          Najít volný termín
        </Link>
      </div>
    </div>
  );
}
