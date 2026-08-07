"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Crosshair, MapPin, Search } from "lucide-react";
import {
  LOCATIONS,
  NEED_OPTIONS,
  NeedId,
  GeoPoint,
  nearestLocation,
  osmEmbedUrl,
  resolveLocationQuery,
} from "@/data/locations";

export function SearchPanel({
  compact = false,
  tone = "light",
  initialQuery,
  initialNeeds,
}: {
  compact?: boolean;
  tone?: "light" | "dark";
  initialQuery?: string;
  initialNeeds?: NeedId[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || "Praha");
  const [point, setPoint] = useState<GeoPoint>(LOCATIONS.praha);
  const [needs, setNeeds] = useState<NeedId[]>(
    initialNeeds?.length ? initialNeeds : ["uklid", "pohlidat"]
  );
  const [geoError, setGeoError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const mapUrl = useMemo(
    () => osmEmbedUrl(point.lat, point.lng),
    [point.lat, point.lng]
  );

  function applyResolved(next: GeoPoint) {
    setPoint(next);
    setQuery(next.label.replace(/ · .*$/, ""));
    setGeoError(null);
  }

  function onQueryBlur() {
    const resolved = resolveLocationQuery(query);
    if (resolved) applyResolved(resolved);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setGeoError("Prohlížeč nepodporuje polohu.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyResolved(nearestLocation(pos.coords.latitude, pos.coords.longitude));
        setLocating(false);
      },
      () => {
        setGeoError("Polohu se nepodařilo načíst — zadej město nebo PSČ.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function toggleNeed(id: NeedId) {
    setNeeds((prev) => {
      if (prev.includes(id)) return prev.filter((n) => n !== id);
      return [...prev, id];
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const resolved = resolveLocationQuery(query) || point;
    const params = new URLSearchParams({
      lat: String(resolved.lat),
      lng: String(resolved.lng),
      q: resolved.label,
      mesto: resolved.cityKey,
    });
    if (needs.length) params.set("potreby", needs.join(","));
    router.push(`/hledat?${params.toString()}`);
  }

  const dark = tone === "dark";

  return (
    <form
      onSubmit={submit}
      className={`w-full overflow-hidden ${
        dark
          ? "rounded-[1.75rem] border border-white/12 bg-[rgba(12,10,9,0.55)] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "panel-solid"
      }`}
    >
      <div className={`grid ${compact ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.2fr_0.9fr]"}`}>
        <div className={compact ? "p-4 md:p-5" : "p-5 md:p-6"}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <label className="block min-w-[220px] flex-1">
              <span
                className={`mb-1.5 flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] ${
                  dark ? "text-white/55" : "text-moss"
                }`}
              >
                <MapPin className="h-3.5 w-3.5" />
                Lokalita — město nebo PSČ
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={onQueryBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onQueryBlur();
                }}
                placeholder="Praha, Brno, 120 00…"
                className={`input ${dark ? "!border-white/10 !bg-white/[0.96]" : ""}`}
              />
            </label>
            <button
              type="button"
              onClick={useMyLocation}
              className={`btn !py-2.5 !text-sm ${
                dark
                  ? "btn-ghost !border-white/20 !bg-white/10 !text-white"
                  : "btn-ghost"
              }`}
            >
              <Crosshair className="h-4 w-4" />
              {locating ? "Hledám…" : "Moje poloha"}
            </button>
          </div>

          <p
            className={`mt-2 text-xs ${dark ? "text-white/55" : "text-ink-soft"}`}
          >
            Mapa: {point.label}
          </p>
          {geoError && (
            <p className="mt-1 text-xs font-semibold text-rose">{geoError}</p>
          )}

          <div className="mt-5">
            <span
              className={`mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] ${
                dark ? "text-white/55" : "text-moss"
              }`}
            >
              Co potřebuješ
            </span>
            <div className="flex flex-wrap gap-2">
              {NEED_OPTIONS.map((n) => {
                const active = needs.includes(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    title={n.hint}
                    onClick={() => toggleNeed(n.id)}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-rose text-white"
                        : dark
                          ? "bg-white/8 text-white/85 ring-1 ring-white/15 hover:bg-white/14"
                          : "bg-white text-ink-soft ring-1 ring-[var(--line)] hover:bg-fog"
                    }`}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>
            <p className={`mt-2 text-xs ${dark ? "text-white/45" : "text-ink-soft"}`}>
              Můžeš vybrat víc — třeba úklid + pohlídat, nebo „více najednou“.
            </p>
          </div>

          <button type="submit" className="btn btn-gold mt-6 w-full sm:w-auto">
            <Search className="h-4 w-4" />
            Najít ověřené ženy
          </button>
        </div>

        <div className="relative min-h-[220px] border-t border-white/10 lg:border-l lg:border-t-0">
          <iframe
            title="Mapa lokality"
            src={mapUrl}
            className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur">
            {point.lat.toFixed(3)}, {point.lng.toFixed(3)}
          </div>
        </div>
      </div>
    </form>
  );
}
