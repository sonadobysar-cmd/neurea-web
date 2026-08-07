"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Shield } from "lucide-react";
import {
  BookableSlot,
  PROVIDERS_ARE_DEMO,
  Provider,
  getProviderIco,
} from "@/data/providers";
import {
  SERVICE_PRICING,
  ServiceType,
  calcBooking,
  formatCzk,
} from "@/data/pricing";
import { useAuth } from "@/lib/auth";
import { MODEL_SUMMARY } from "@/data/legalModel";

function formatDay(date: string) {
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date + "T12:00:00"));
}

export function BookingCalendar({
  provider,
  slots,
  initialService,
}: {
  provider: Provider;
  slots: BookableSlot[];
  initialService: ServiceType;
}) {
  const { user, addBooking } = useAuth();
  const availableServices = provider.services;
  const [service, setService] = useState<ServiceType>(
    availableServices.includes(initialService) ? initialService : availableServices[0]
  );
  const [selected, setSelected] = useState<BookableSlot | null>(null);
  const [done, setDone] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [earlyStart, setEarlyStart] = useState(false);
  const ico = getProviderIco(provider);

  const byDate = useMemo(() => {
    const map = new Map<string, BookableSlot[]>();
    for (const slot of slots) {
      const list = map.get(slot.date) ?? [];
      list.push(slot);
      map.set(slot.date, list);
    }
    return [...map.entries()];
  }, [slots]);

  const hours = SERVICE_PRICING[service].minHours;
  const quote = selected
    ? calcBooking(service, Math.max(selected.hours, hours))
    : calcBooking(service, hours);

  function confirm() {
    if (!selected || !acceptTerms || !earlyStart) return;
    if (!user || user.role !== "mom") return;
    addBooking({
      providerId: provider.id,
      providerName: provider.name,
      service,
      date: selected.date,
      start: selected.start,
      end: selected.end,
      hours: quote.hours,
      total: quote.total,
    });
    setDone(true);
  }

  if (done && selected) {
    return (
      <div className="panel-solid p-6 md:p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgba(63,94,81,0.12)] text-moss">
            <Check className="h-7 w-7" />
          </div>
          <h3 className="display mt-4 text-3xl">Rezervace připravena</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {provider.name} · {formatDay(selected.date)} · {selected.start}–
            {selected.end}
            <br />
            {SERVICE_PRICING[service].label} · {formatCzk(quote.total)}
          </p>
          <p className="mt-4 rounded-2xl bg-fog px-4 py-3 text-xs leading-relaxed text-ink-soft">
            Potvrzení objednávky (demo): smlouva o službě vzniká mezi vámi a{" "}
            {provider.name} (IČO {ico}). MamaSOS zprostředkovala rezervaci.
            Ostré platby jsou zablokované, dokud advokát a daňový poradce
            neschválí fakturační a platební tok.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/ucet" className="btn btn-gold">
              Otevřít můj účet
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setDone(false);
                setSelected(null);
              }}
            >
              Vybrat jiný termín
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
      <section className="panel-solid p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Rezervační kalendář</p>
            <h3 className="display mt-1 text-3xl">Vyber termín</h3>
          </div>
          <p className="text-sm text-ink-soft">Bez dopisování · hned vidíš volno</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {availableServices.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setService(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                service === s
                  ? "bg-ink text-white"
                  : "bg-white text-ink-soft ring-1 ring-[var(--line)]"
              }`}
            >
              {SERVICE_PRICING[s].shortLabel} · {formatCzk(SERVICE_PRICING[s].pricePerHour)}
              /h
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {byDate.map(([date, daySlots]) => (
            <div key={date}>
              <p className="mb-2 text-sm font-bold capitalize text-ink">
                {formatDay(date)}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {daySlots.map((slot) => {
                  const active =
                    selected?.date === slot.date && selected?.start === slot.start;
                  return (
                    <button
                      key={`${slot.date}-${slot.start}`}
                      type="button"
                      className="slot"
                      data-active={active}
                      onClick={() => setSelected(slot)}
                    >
                      <span className="block text-sm font-bold">
                        {slot.start}–{slot.end}
                      </span>
                      <span
                        className={`text-xs ${active ? "text-white/80" : "text-ink-soft"}`}
                      >
                        {slot.hours} h
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="panel-solid h-fit p-5 md:p-6 lg:sticky lg:top-24">
        <p className="eyebrow">Objednávka a platba</p>
        <h3 className="display mt-1 text-2xl">{SERVICE_PRICING[service].label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {SERVICE_PRICING[service].description}
        </p>

        <div className="mt-4 rounded-2xl bg-fog p-3.5 text-xs leading-relaxed text-ink-soft">
          <p className="font-bold text-ink">S kým uzavíráte smlouvu</p>
          <p className="mt-1">
            Službu poskytuje <strong className="text-ink">{provider.name}</strong>
            , IČO {ico}
            {PROVIDERS_ARE_DEMO ? " (ukázkové IČO)" : ""}. MamaSOS je
            zprostředkovatel — {MODEL_SUMMARY.platformRole}
          </p>
        </div>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Cena služby</dt>
            <dd className="font-bold">{formatCzk(quote.pricePerHour)}/h</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Délka</dt>
            <dd className="font-bold">{quote.hours} h</dd>
          </div>
          {selected && (
            <div className="flex justify-between gap-3">
              <dt className="text-ink-soft">Termín</dt>
              <dd className="text-right font-bold">
                {formatDay(selected.date)}
                <br />
                <span className="font-semibold text-moss">
                  {selected.start}–{selected.end}
                </span>
              </dd>
            </div>
          )}
          <div className="border-t border-[var(--line)] pt-3">
            <div className="flex justify-between gap-3 text-base">
              <dt className="font-bold">Celkem k úhradě</dt>
              <dd className="display text-2xl">{formatCzk(quote.total)}</dd>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Konečná cena včetně DPH dle daňového režimu pečující. Bez
              předplatného.{" "}
              <Link href="/storno" className="font-bold underline">
                Storno
              </Link>
              .
            </p>
          </div>
        </dl>

        {user?.role === "mom" ? (
          <div className="mt-5 space-y-3">
            <label className="flex items-start gap-2 text-xs text-ink-soft">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              Souhlasím s{" "}
              <Link href="/obchodni-podminky" className="font-bold underline">
                podmínkami
              </Link>
              ,{" "}
              <Link href="/storno" className="font-bold underline">
                stornem
              </Link>{" "}
              a rozumím, že smlouva o péči vzniká s pečující ({provider.name},
              IČO {ico}).
            </label>
            <label className="flex items-start gap-2 text-xs text-ink-soft">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={earlyStart}
                onChange={(e) => setEarlyStart(e.target.checked)}
              />
              Žádám o zahájení služby ve sjednaném termínu, i pokud nastane před
              uplynutím 14 dnů od objednávky (poučení o odstoupení — finální
              text schválí advokát).
            </label>
            <button
              type="button"
              className="btn btn-gold w-full"
              disabled={!selected || !acceptTerms || !earlyStart}
              onClick={confirm}
            >
              Objednat a zaplatit {formatCzk(quote.total)}
            </button>
            <p className="text-[0.7rem] text-ink-soft">
              Demo režim: platba neprobíhá. Ostré inkaso až po schválení
              platebního toku (licencovaná brána / split payments).
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <Link href="/prihlaseni" className="btn btn-rose w-full">
              Pro rezervaci se přihlaste
            </Link>
            <p className="text-center text-xs text-ink-soft">
              Nemáte účet?{" "}
              <Link href="/registrace" className="font-bold underline">
                Registrace maminky
              </Link>
            </p>
          </div>
        )}

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
          Reklamaci služby řešíte primárně vůči pečující; MamaSOS pomáhá s
          rezervací, platbou a podporou dle podmínek platformy.
        </p>
      </aside>
    </div>
  );
}
