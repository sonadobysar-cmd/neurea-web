import { SearchPanel } from "@/components/SearchPanel";
import { ProviderCard } from "@/components/ProviderCard";
import { LOCATIONS, NeedId } from "@/data/locations";
import {
  PROVIDERS,
  getBookableSlots,
  haversineKm,
} from "@/data/providers";
import {
  needsToPreferredService,
  parseNeeds,
  providerMatchesNeeds,
  scoreProviderNeeds,
} from "@/lib/needs";
import { NEED_OPTIONS } from "@/data/locations";

type SearchParams = Promise<{
  mesto?: string;
  lat?: string;
  lng?: string;
  q?: string;
  potreby?: string;
  sluzba?: string;
}>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const needs = parseNeeds(params.potreby);
  const fallback = LOCATIONS.praha;
  const lat = Number(params.lat);
  const lng = Number(params.lng);
  const origin = {
    lat: Number.isFinite(lat) ? lat : fallback.lat,
    lng: Number.isFinite(lng) ? lng : fallback.lng,
    label: params.q || fallback.label,
  };
  const preferred = needsToPreferredService(needs);

  const results = PROVIDERS.map((p) => {
    const distanceKm = haversineKm(origin.lat, origin.lng, p.lat, p.lng);
    const slots = getBookableSlots(p);
    const needsOk = providerMatchesNeeds(p, needs);
    const score =
      scoreProviderNeeds(p, needs) +
      Math.max(0, 40 - distanceKm) +
      p.rating * 3;
    return { provider: p, distanceKm, slots, needsOk, score };
  })
    .filter((r) => r.needsOk && r.slots.length > 0 && r.distanceKm <= 80)
    .sort((a, b) => b.score - a.score || a.distanceKm - b.distanceKm);

  const needLabels = needs
    .map((id) => NEED_OPTIONS.find((n) => n.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Najít pomoc</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Volné termíny blízko tebe</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Lokalita z mapy, GPS, města nebo PSČ. Jen ověřené ženy s aktivním
          kalendářem.
        </p>
      </div>

      <div className="mt-8">
        <SearchPanel
          compact
          initialQuery={params.q || "Praha"}
          initialNeeds={needs as NeedId[]}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          <span className="font-bold text-ink">{results.length}</span> výsledků kolem{" "}
          <span className="font-bold text-ink">{origin.label}</span>
          {needLabels ? <> · {needLabels}</> : null}
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {results.map(({ provider, distanceKm }) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            distanceKm={distanceKm}
            preferredService={preferred}
          />
        ))}
      </div>

      {!results.length && (
        <div className="panel-solid mt-6 p-8 text-center">
          <h2 className="display text-2xl">Zatím tu nikdo nesedí na požadavky</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Uvolni filtry, zkus sousední PSČ, nebo nech lokalitu na waitlist.
          </p>
        </div>
      )}
    </div>
  );
}
