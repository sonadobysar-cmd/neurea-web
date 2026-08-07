"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Shield } from "lucide-react";
import { BookableSlot, Provider } from "@/data/providers";
import {
  SERVICE_PRICING,
  ServiceType,
  calcBooking,
  formatCzk,
} from "@/data/pricing";
import { useAuth } from "@/lib/auth";

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
    if (!selected) return;
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
            Uloženo ve tvém účtu. Zaplatila jsi {formatCzk(quote.total)} za
            objednaný čas — konečná cena služby. Demo: platební brána se napojí
            později.
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
        <p className="eyebrow">Shrnutí</p>
        <h3 className="display mt-1 text-2xl">{SERVICE_PRICING[service].label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {SERVICE_PRICING[service].description}
        </p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Sazba</dt>
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
              <dt className="font-bold">Zaplatíš teď</dt>
              <dd className="display text-2xl">{formatCzk(quote.total)}</dd>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Konečná cena za objednané hodiny. Žádné předplatné.
            </p>
          </div>
        </dl>

        {user?.role === "mom" ? (
          <button
            type="button"
            className="btn btn-gold mt-6 w-full"
            disabled={!selected}
            onClick={confirm}
          >
            Zaplatit a rezervovat
          </button>
        ) : (
          <div className="mt-6 space-y-3">
            <Link
              href={`/prihlaseni`}
              className="btn btn-rose w-full"
            >
              Pro rezervaci se přihlas
            </Link>
            <p className="text-center text-xs text-ink-soft">
              Nemáš účet?{" "}
              <Link href="/registrace" className="font-bold underline">
                Registrace maminky
              </Link>
            </p>
          </div>
        )}

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
          Stejná cena pro všechny ve stejném segmentu. Platba předem na platformě
          — vidíte jen cenu služby.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-ink-soft">
          Když pečující nemůže přijet, pomůžeme najít náhradní termín nebo
          vrátíme platbu podle{" "}
          <Link href="/storno" className="font-bold underline">
            storno podmínek
          </Link>
          .
        </p>
      </aside>
    </div>
  );
}
