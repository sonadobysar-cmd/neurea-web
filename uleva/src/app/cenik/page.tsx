import Image from "next/image";
import Link from "next/link";
import { SERVICE_PRICING, calcBooking, formatCzk } from "@/data/pricing";

const IMAGES = {
  uleva: "/media/service-uleva.jpg",
  dula: "/media/service-dula.jpg",
  laktace: "/media/service-laktace.jpg",
} as const;

export default function PricingPage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Ceník</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Stejná služba, stejná cena</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Vidíš jen cenu za hodiny, které si objednáš. Žádné předplatné, žádné
          skryté příplatky podle profilu.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {(Object.keys(SERVICE_PRICING) as Array<keyof typeof SERVICE_PRICING>).map(
          (key) => {
            const s = SERVICE_PRICING[key];
            const sample = calcBooking(key, s.minHours);
            return (
              <article key={key} className="panel-solid flex flex-col overflow-hidden">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={IMAGES[key]}
                    alt={s.label}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">{s.shortLabel}</p>
                  <h2 className="display mt-2 text-3xl">{s.label}</h2>
                  <p className="mt-4 display text-5xl text-ink">
                    {formatCzk(s.pricePerHour)}
                  </p>
                  <p className="text-sm text-ink-soft">
                    / hodina · minimum {s.minHours} h
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                  <div className="mt-6 rounded-2xl bg-fog p-4 text-sm">
                    <p className="font-bold">Příklad {s.minHours} h</p>
                    <p className="mt-1 text-ink-soft">
                      Zaplatíš {formatCzk(sample.total)}
                      <br />
                      Cena je konečná za objednaný čas.
                    </p>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>

      <div className="panel-solid mt-8 p-6 md:p-8">
        <h2 className="display text-2xl md:text-3xl">Jak platba funguje</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
          <li>• Zaplatíte předem na platformě za vybraný termín.</li>
          <li>• Cena, kterou vidíte, je cena služby — bez předplatného.</li>
          <li>• Stejná služba = stejná cena u všech ověřených pečujících.</li>
          <li>
            • MamaSOS je zprostředkovatel — smlouva o službě je mezi vámi a
            pečující.
          </li>
        </ul>
        <h3 className="mt-8 font-bold">Storno a náhrada</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
          <li>• Pečující nepřijede → náhradní termín nebo vrácení platby.</li>
          <li>• Zrušení klientkou → dle storno podmínek.</li>
          <li>• Služba neodpovídá objednávce → kontaktujte podporu / reklamace.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/hledat" className="btn btn-gold inline-flex">
            Najít volný termín
          </Link>
          <Link href="/storno" className="btn btn-ghost inline-flex">
            Storno podmínky
          </Link>
        </div>
      </div>
    </div>
  );
}
