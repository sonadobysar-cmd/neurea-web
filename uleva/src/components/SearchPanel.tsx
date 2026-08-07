"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { SERVICE_PRICING, ServiceType } from "@/data/pricing";
import { CITIES } from "@/data/providers";

const SERVICES: { id: ServiceType | "all"; label: string }[] = [
  { id: "all", label: "Cokoli" },
  { id: "uleva", label: SERVICE_PRICING.uleva.shortLabel },
  { id: "dula", label: SERVICE_PRICING.dula.shortLabel },
  { id: "laktace", label: SERVICE_PRICING.laktace.shortLabel },
];

export function SearchPanel({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [city, setCity] = useState("praha");
  const [service, setService] = useState<ServiceType | "all">("all");

  function submit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ mesto: city });
    if (service !== "all") params.set("sluzba", service);
    router.push(`/hledat?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className={`card w-full ${compact ? "p-3 md:p-4" : "p-4 md:p-5"}`}
    >
      <div className={`grid gap-3 ${compact ? "md:grid-cols-[1.2fr_1fr_auto]" : "md:grid-cols-[1.3fr_1.1fr_auto]"}`}>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--sage)]">
            <MapPin className="h-3.5 w-3.5" />
            Lokalita
          </span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-2xl border border-[rgba(26,46,40,0.12)] bg-white px-4 py-3.5 text-[0.95rem] font-medium outline-none focus:border-[var(--sage)]"
          >
            {Object.entries(CITIES).map(([key, c]) => (
              <option key={key} value={key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-[var(--sage)]">
            Co potřebuješ
          </span>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setService(s.id)}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  service === s.id
                    ? "bg-[var(--sage-deep)] text-white"
                    : "bg-white text-[var(--ink-soft)] ring-1 ring-[rgba(26,46,40,0.1)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </label>

        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full md:w-auto">
            <Search className="h-4 w-4" />
            Hledat termíny
          </button>
        </div>
      </div>
    </form>
  );
}
