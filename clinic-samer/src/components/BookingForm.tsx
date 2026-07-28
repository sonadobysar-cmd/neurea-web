"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

const TIME_SLOTS = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function BookingForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  const serviceLabel = useMemo(
    () => dict.services.items.find((s) => s.id === service)?.title ?? "",
    [dict.services.items, service]
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!service || !preferredDate || !preferredTime || !name || !email || !phone) {
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          preferredDate,
          preferredTime,
          note,
          locale,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="success-box">
        <h3>{dict.booking.success}</h3>
        <p>{dict.booking.successHint}</p>
        <div className="book-summary" style={{ marginTop: "1rem" }}>
          <strong>{dict.booking.summary}</strong>
          <br />
          {serviceLabel}
          <br />
          {preferredDate} · {preferredTime}
          <br />
          {name} · {phone}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="book-steps" aria-label="Progress">
        <div className={`book-step${step === 1 ? " is-active" : step > 1 ? " is-done" : ""}`}>
          {dict.booking.stepService}
        </div>
        <div className={`book-step${step === 2 ? " is-active" : step > 2 ? " is-done" : ""}`}>
          {dict.booking.stepDateTime}
        </div>
        <div className={`book-step${step === 3 ? " is-active" : ""}`}>
          {dict.booking.stepDetails}
        </div>
      </div>

      {step === 1 && (
        <div>
          <div className="field" style={{ marginBottom: "0.85rem" }}>
            <label>{dict.booking.service}</label>
          </div>
          <div className="service-pick">
            {dict.services.items.map((s) => (
              <button
                key={s.id}
                type="button"
                className={service === s.id ? "is-on" : undefined}
                onClick={() => setService(s.id)}
              >
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </button>
            ))}
          </div>
          <div className="book-nav">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!service}
              onClick={() => setStep(2)}
            >
              {dict.booking.next}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-grid">
          <div className="field span-2">
            <label htmlFor="preferredDate">{dict.booking.date}</label>
            <input
              id="preferredDate"
              type="date"
              min={minDate()}
              value={preferredDate}
              onChange={(e) => {
                setPreferredDate(e.target.value);
                setPreferredTime("");
              }}
              required
            />
          </div>
          <div className="field span-2">
            <label>{dict.booking.slotsTitle}</label>
            <div className="slot-grid">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={preferredTime === t ? "is-on" : undefined}
                  onClick={() => setPreferredTime(t)}
                  disabled={!preferredDate}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {(serviceLabel || preferredDate || preferredTime) && (
            <div className="span-2 book-summary">
              <strong>{dict.booking.summary}</strong>
              <br />
              {serviceLabel}
              {preferredDate ? ` · ${preferredDate}` : ""}
              {preferredTime ? ` · ${preferredTime}` : ""}
            </div>
          )}
          <div className="span-2 book-nav">
            <button className="btn btn-ghost" type="button" onClick={() => setStep(1)}>
              {dict.booking.back}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={!preferredDate || !preferredTime}
              onClick={() => setStep(3)}
            >
              {dict.booking.next}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="form-grid" onSubmit={submit}>
          <div className="span-2 book-summary">
            <strong>{dict.booking.summary}</strong>
            <br />
            {serviceLabel} · {preferredDate} · {preferredTime}
          </div>
          <div className="field">
            <label htmlFor="name">{dict.booking.name}</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">{dict.booking.phone}</label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>
          <div className="field span-2">
            <label htmlFor="email">{dict.booking.email}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="field span-2">
            <label htmlFor="note">{dict.booking.note}</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={dict.booking.notePlaceholder}
            />
          </div>
          <div className="span-2 book-nav">
            <button className="btn btn-ghost" type="button" onClick={() => setStep(2)}>
              {dict.booking.back}
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? dict.common.loading : dict.booking.submit}
            </button>
          </div>
          <p className="span-2 lead" style={{ fontSize: "0.88rem", margin: 0 }}>
            {dict.booking.privacy}
          </p>
          {status === "err" && (
            <p className="span-2" style={{ color: "var(--rose-deep)", margin: 0 }}>
              {dict.common.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
