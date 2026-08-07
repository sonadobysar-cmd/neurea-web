import Link from "next/link";
import { SearchPanel } from "@/components/SearchPanel";
import { ProviderCard } from "@/components/ProviderCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { LOCATIONS, NeedId } from "@/data/locations";
import { NEED_OPTIONS } from "@/data/locations";
import {
  PROVIDERS,
  getBookableSlots,
  haversineKm,
  isProviderBookable,
} from "@/data/providers";
import {
  needsToPreferredService,
  parseNeeds,
  providerMatchesNeeds,
  scoreProviderNeeds,
} from "@/lib/needs";
import { getCityStatus, statusLabel } from "@/data/cityStatus";

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
  const cityKey = params.mesto && LOCATIONS[params.mesto]
    ? LOCATIONS[params.mesto].cityKey
    : fallback.cityKey;
  const origin = {
    lat: Number.isFinite(lat) ? lat : fallback.lat,
    lng: Number.isFinite(lng) ? lng : fallback.lng,
    label: params.q || fallback.label,
  };
  const preferred = needsToPreferredService(needs);
  const cityStatus = getCityStatus(cityKey);

  const results = PROVIDERS.map((p) => {
    const distanceKm = haversineKm(origin.lat, origin.lng, p.lat, p.lng);
    const slots = getBookableSlots(p);
    const needsOk = providerMatchesNeeds(p, needs);
    const bookable = isProviderBookable(p);
    const score =
      scoreProviderNeeds(p, needs) +
      Math.max(0, 40 - distanceKm) +
      p.rating * 3;
    return { provider: p, distanceKm, slots, needsOk, bookable, score };
  })
    .filter(
      (r) => r.needsOk && r.bookable && r.slots.length > 0 && r.distanceKm <= 80
    )
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
          Lokalita z mapy, GPS, města nebo PSČ. Jen ověřené pečující s aktivním
          kalendářem — rezervace bez dopisování.
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
        <p className="rounded-full bg-fog px-3 py-1 text-xs font-semibold text-moss">
          {statusLabel(cityStatus)}
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
        <div className="panel-solid mt-6 p-6 md:p-8">
          <h2 className="display text-2xl md:text-3xl">
            Ve vašem okolí zatím dokončujeme ověření prvních pečujících
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-soft">
            Nábor běží po celé ČR. Zanechte kontakt — ozveme se, jakmile bude
            blízko vás ověřená pečující s volným termínem. Můžete také rozšířit
            vzdálenost nebo zkusit jiný termín.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/hledat" className="btn btn-ghost !py-2.5 !text-sm">
              Zkusit jiné město
            </Link>
            <Link href="/nabidnout" className="btn btn-ink !py-2.5 !text-sm">
              Znáte někoho, kdo by mohl pomáhat?
            </Link>
          </div>
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h3 className="font-bold">Chci upozornění na novou pečující</h3>
            <WaitlistForm locationLabel={origin.label} needs={needs} />
          </div>
        </div>
      )}
    </div>
  );
}
