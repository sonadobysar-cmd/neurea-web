"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PAYMENT_OPTIONS,
  PAYMENT_OPTION_TEST_10,
  SERVICES,
  type PaymentOption,
} from "@/lib/bookingConfig";

type SlotsResponse = { slots?: string[]; error?: string };

function toIsoDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function BookingFlow() {
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id ?? "");
  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0], [serviceId]);

  /** Dočasně: test platba 15 Kč (min. Stripe pro CZK) — po ověření odstranit. */
  const paymentOptions = useMemo(
    () => [...PAYMENT_OPTIONS, PAYMENT_OPTION_TEST_10],
    [],
  );

  const [date, setDate] = useState(toIsoDateLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)));
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [paymentOption, setPaymentOption] = useState<PaymentOption>("deposit_1000");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!service?.durationMin || !date) return;
      setSlotsLoading(true);
      setSlotsError(null);
      setTime("");
      try {
        const res = await fetch(`/api/reservations/slots?date=${date}&duration=${service.durationMin}`);
        const data = (await res.json()) as SlotsResponse;
        if (!res.ok) {
          throw new Error(data.error || "Nelze načíst dostupné sloty.");
        }
        if (!cancelled) setSlots(data.slots || []);
      } catch (err) {
        if (!cancelled) {
          setSlots([]);
          setSlotsError(err instanceof Error ? err.message : "Nelze načíst dostupné sloty.");
        }
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [date, service?.durationMin]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    if (!service) {
      setSubmitError("Vyberte službu.");
      return;
    }
    if (!time) {
      setSubmitError("Vyberte termín.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          date,
          time,
          clientName,
          clientEmail,
          clientPhone,
          notes,
          paymentOption,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Rezervaci se nepodařilo spustit.");
      }
      window.location.href = data.url;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Došlo k chybě.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 glass-panel-strong p-7 md:p-9">
      <h2 className="font-display text-xl font-normal text-ink">Rezervace a online platba</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/62">
        Vyberte službu, termín a způsob platby. Po zaplacení vás web automaticky vrátí na potvrzení
        rezervace.
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm text-ink/70">
          Služba
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none ring-0 focus:border-gold"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.durationMin} min)
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-ink/70">
          Datum
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={toIsoDateLocal(new Date())}
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none ring-0 focus:border-gold"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm text-ink/70">
        Dostupný čas
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none ring-0 focus:border-gold"
          disabled={slotsLoading || slots.length === 0}
        >
          <option value="">
            {slotsLoading ? "Načítám dostupné sloty…" : slots.length ? "Vyberte čas" : "Bez dostupných slotů"}
          </option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>
      {slotsError && <p className="mt-2 text-sm text-red-700">{slotsError}</p>}

      <fieldset className="mt-7">
        <legend className="text-sm text-ink/70">Platba při rezervaci</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {paymentOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gold/20 bg-white/80 px-3 py-2 text-sm text-ink/80"
            >
              <input
                type="radio"
                name="paymentOption"
                value={opt.id}
                checked={paymentOption === opt.id}
                onChange={() => setPaymentOption(opt.id)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm text-ink/70">
          Jméno a příjmení
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <label className="text-sm text-ink/70">
          E-mail
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm text-ink/70">
        Telefon
        <input
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </label>

      <label className="mt-5 block text-sm text-ink/70">
        Poznámka (volitelné)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </label>

      <p className="mt-6 text-xs leading-relaxed text-ink/50">
        Storno: bezplatně více než 48 hodin před termínem. Při zrušení později záloha propadá, s výjimkou
        1 doložené závažné situace (hospitalizace, pohřeb, závažná choroba).
      </p>

      {submitError && <p className="mt-3 text-sm text-red-700">{submitError}</p>}
      <button type="submit" disabled={submitting} className="btn-primary mt-8 min-h-[52px] w-full !px-8 sm:w-auto">
        <span>{submitting ? "Přesměrovávám na platbu…" : "Pokračovat na bezpečnou platbu"}</span>
      </button>
    </form>
  );
}

