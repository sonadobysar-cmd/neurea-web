import { SearchPanel } from "@/components/SearchPanel";
import { ProviderCard } from "@/components/ProviderCard";
import {
  CITIES,
  PROVIDERS,
  getBookableSlots,
  haversineKm,
} from "@/data/providers";
import { SERVICE_PRICING, ServiceType } from "@/data/pricing";

type SearchParams = Promise<{ mesto?: string; sluzba?: string }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const cityKey = params.mesto && CITIES[params.mesto] ? params.mesto : "praha";
  const city = CITIES[cityKey];
  const service =
    params.sluzba && params.sluzba in SERVICE_PRICING
      ? (params.sluzba as ServiceType)
      : undefined;

  const results = PROVIDERS.map((p) => {
    const distanceKm = haversineKm(city.lat, city.lng, p.lat, p.lng);
    const slots = getBookableSlots(p);
    const serviceOk = !service || p.services.includes(service);
    return { provider: p, distanceKm, slots, serviceOk };
  })
    .filter((r) => r.serviceOk && r.slots.length > 0 && r.distanceKm <= 80)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Najít pomoc</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Volné termíny blízko tebe</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Jen ověřené ženy s aktivním kalendářem. Stejná služba — stejná cena.
        </p>
      </div>

      <div className="mt-8">
        <SearchPanel compact />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          <span className="font-bold text-ink">{results.length}</span> výsledků kolem{" "}
          <span className="font-bold text-ink">{city.label}</span>
          {service ? <> · {SERVICE_PRICING[service].label}</> : null}
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {results.map(({ provider, distanceKm }) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            distanceKm={distanceKm}
            preferredService={service}
          />
        ))}
      </div>

      {!results.length && (
        <div className="panel-solid mt-6 p-8 text-center">
          <h2 className="display text-2xl">Zatím tu nikdo nemá volný termín</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Nech si lokalitu na waitlist — ozveme se, až bude blízko tebe ověřená
            pečující. Nebo zkus sousední město.
          </p>
        </div>
      )}
    </div>
  );
}
