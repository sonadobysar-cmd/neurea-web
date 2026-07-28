"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

export function BookingForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          note: data.get("note"),
          locale,
        }),
      });
      if (!res.ok) throw new Error("fail");
      form.reset();
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
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">{dict.booking.name}</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="phone">{dict.booking.phone}</label>
        <input id="phone" name="phone" required autoComplete="tel" />
      </div>
      <div className="field span-2">
        <label htmlFor="email">{dict.booking.email}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field span-2">
        <label htmlFor="service">{dict.booking.service}</label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            {dict.booking.servicePlaceholder}
          </option>
          {dict.services.items.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="preferredDate">{dict.booking.date}</label>
        <input id="preferredDate" name="preferredDate" type="date" required />
      </div>
      <div className="field">
        <label htmlFor="preferredTime">{dict.booking.time}</label>
        <input id="preferredTime" name="preferredTime" type="time" required />
      </div>
      <div className="field span-2">
        <label htmlFor="note">{dict.booking.note}</label>
        <textarea
          id="note"
          name="note"
          placeholder={dict.booking.notePlaceholder}
        />
      </div>
      <div className="span-2" style={{ display: "grid", gap: "0.85rem" }}>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? dict.common.loading : dict.booking.submit}
        </button>
        <p className="lead" style={{ fontSize: "0.88rem", margin: 0 }}>
          {dict.booking.privacy}
        </p>
        {status === "err" && (
          <p style={{ color: "var(--rose-deep)", margin: 0 }}>
            {dict.common.error}
          </p>
        )}
      </div>
    </form>
  );
}
