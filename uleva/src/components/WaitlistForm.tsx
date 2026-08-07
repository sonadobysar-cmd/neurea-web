"use client";

import { FormEvent, useState } from "react";
import { NEED_OPTIONS, NeedId } from "@/data/locations";

const STORAGE_KEY = "mamasos.waitlist.v1";

export function WaitlistForm({
  locationLabel,
  needs = [],
}: {
  locationLabel: string;
  needs?: NeedId[];
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const entry = {
      id: `wl-${Date.now()}`,
      location: String(fd.get("location") || locationLabel),
      service: String(fd.get("service") || needs.join(",") || "uleva"),
      preferredDate: String(fd.get("preferredDate") || ""),
      contact: String(fd.get("contact") || ""),
      consent: true,
      createdAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...prev]));
    } catch {
      /* ignore */
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-[rgba(92,122,114,0.12)] p-5 text-sm text-moss">
        Děkujeme. Ozveme se, jakmile bude ve vašem okolí ověřená pečující s volným
        termínem.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-3 text-left">
      <label className="block text-sm font-semibold">
        Lokalita
        <input
          name="location"
          className="input mt-1.5"
          defaultValue={locationLabel}
          required
        />
      </label>
      <label className="block text-sm font-semibold">
        Požadovaná služba
        <select name="service" className="input mt-1.5" defaultValue={needs[0] || "uklid"}>
          {NEED_OPTIONS.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        Preferovaný termín (orientačně)
        <input name="preferredDate" type="date" className="input mt-1.5" />
      </label>
      <label className="block text-sm font-semibold">
        E-mail nebo telefon
        <input
          name="contact"
          className="input mt-1.5"
          required
          placeholder="vas@email.cz nebo +420…"
        />
      </label>
      <label className="flex items-start gap-2 text-xs text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        Souhlasím, že mě MamaSOS může kontaktovat ohledně dostupnosti pečující.
      </label>
      <button type="submit" className="btn btn-rose w-full">
        Chci dostat upozornění
      </button>
    </form>
  );
}
