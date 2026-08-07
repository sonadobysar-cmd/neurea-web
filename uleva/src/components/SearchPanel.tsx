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

export function SearchPanel({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const router = useRouter();
  const [city, setCity] = useState("praha");
  const [service, setService] = useState<ServiceType | "all">("all");

  function submit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ mesto: city });
    if (service !== "all") params.set("sluzba", service);
    router.push(`/hledat?${params.toString()}`);
  }

  const dark = tone === "dark";

  return (
    <form
      onSubmit={submit}
      className={`w-full ${compact ? "p-3 md:p-4" : "p-4 md:p-5"} ${
        dark
          ? "rounded-[1.6rem] border border-white/15 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "panel-solid"
      }`}
    >
      <div
        className={`grid gap-3 ${
          compact ? "md:grid-cols-[1.2fr_1fr_auto]" : "md:grid-cols-[1.3fr_1.1fr_auto]"
        }`}
      >
        <label className="block">
          <span
            className={`mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] ${
              dark ? "text-white/70" : "text-moss"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            Lokalita
          </span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`input ${dark ? "!bg-white/95" : ""}`}
          >
            {Object.entries(CITIES).map(([key, c]) => (
              <option key={key} value={key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span
            className={`mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] ${
              dark ? "text-white/70" : "text-moss"
            }`}
          >
            Co potřebuješ
          </span>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const active = service === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s.id)}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-ink text-white"
                      : dark
                        ? "bg-white/12 text-white ring-1 ring-white/20 hover:bg-white/18"
                        : "bg-white text-ink-soft ring-1 ring-[var(--line)] hover:bg-fog"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </label>

        <div className="flex items-end">
          <button type="submit" className="btn btn-rose w-full md:w-auto">
            <Search className="h-4 w-4" />
            Hledat termíny
          </button>
        </div>
      </div>
    </form>
  );
}
