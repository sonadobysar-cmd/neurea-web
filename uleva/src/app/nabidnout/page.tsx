"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SERVICE_PRICING } from "@/data/pricing";

export default function OfferPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="shell max-w-xl pb-20 pt-32 text-center">
        <div className="panel-solid p-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgba(63,94,81,0.12)] text-moss">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="display mt-4 text-3xl">Dáme ti vědět</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Ozveme se kvůli ověření (IČO, RT, pohovor) a nastavení kalendáře.
            Bez aktivního kalendáře profil nezveřejníme.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Pro pečující</p>
          <h1 className="display mt-2 text-4xl md:text-6xl">
            Nabídni pomoc maminkám
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft md:text-lg">
            Nastavíš kalendář, přijímáš rezervace, dostáváš výplatu po návštěvě.
            Ceny jsou jednotné — vyděláš víc rezervacemi a dobrými recenzemi.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink-soft">
            {[
              "Musíš mít IČO a správnou živnost",
              "Povinné ověření totožnosti + RT + pohovor",
              "Povinný rezervační kalendář (jinak nejsi ve výsledcích)",
              `Sazby: Úleva ${SERVICE_PRICING.uleva.pricePerHour} Kč/h · Dula ${SERVICE_PRICING.dula.pricePerHour} Kč/h · Laktace ${SERVICE_PRICING.laktace.pricePerHour} Kč/h`,
              "Fee platformy 18 % z rezervace",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form
          className="panel-solid p-6 md:p-7"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="display text-2xl">Přihláška</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">
              Jméno
              <input required name="name" className="input mt-1.5" />
            </label>
            <label className="block text-sm font-semibold">
              E-mail
              <input required type="email" name="email" className="input mt-1.5" />
            </label>
            <label className="block text-sm font-semibold">
              Město
              <input required name="city" className="input mt-1.5" />
            </label>
            <fieldset>
              <legend className="text-sm font-semibold">Co nabízíš</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {(["uleva", "dula", "laktace"] as const).map((s) => (
                  <label
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm ring-1 ring-[var(--line)]"
                  >
                    <input type="checkbox" name="services" value={s} />
                    {SERVICE_PRICING[s].shortLabel}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-semibold">
              Zkušenosti (stručně)
              <textarea
                required
                name="experience"
                rows={4}
                className="input mt-1.5"
                placeholder="Např. 2 děti, vaření, kurz duly…"
              />
            </label>
            <button type="submit" className="btn btn-rose w-full">
              Odeslat přihlášku
            </button>
            <p className="text-xs leading-relaxed text-ink-soft">
              Odesláním souhlasíš, že pečující musí mít IČO a že MamaSOS je
              zprostředkovatel, ne zaměstnavatel.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
