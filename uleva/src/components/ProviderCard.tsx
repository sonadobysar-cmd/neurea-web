import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Provider, PROVIDERS_ARE_DEMO, getBookableSlots } from "@/data/providers";
import { SERVICE_PRICING, ServiceType, formatCzk } from "@/data/pricing";
import { VerifiedBadge } from "@/components/VerifiedBadge";

function formatSlotDate(date: string) {
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
  }).format(new Date(date + "T12:00:00"));
}

export function ProviderCard({
  provider,
  distanceKm,
  preferredService,
}: {
  provider: Provider;
  distanceKm?: number;
  preferredService?: ServiceType;
}) {
  const slots = getBookableSlots(provider).slice(0, 3);
  const primary =
    preferredService && provider.services.includes(preferredService)
      ? preferredService
      : provider.services[0];
  const price = SERVICE_PRICING[primary];

  return (
    <article className="panel-solid group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
      <div className="flex gap-4 p-5 md:p-6">
        <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-[1.35rem] bg-sand">
          <Image
            src={provider.photo}
            alt={provider.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="88px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="display text-2xl text-ink">{provider.name}</h2>
                <VerifiedBadge compact />
                {(provider.isDemo || PROVIDERS_ARE_DEMO) && (
                  <span className="rounded-full bg-fog px-2.5 py-1 text-[0.7rem] font-bold text-ink-soft">
                    Ukázkový profil
                  </span>
                )}
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
                <MapPin className="h-3.5 w-3.5" />
                {provider.district}, {provider.city}
                {typeof distanceKm === "number" && (
                  <span className="text-moss">· {distanceKm.toFixed(1)} km</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1 text-sm font-bold">
                <Star className="h-4 w-4 fill-rose text-rose" />
                {provider.rating.toFixed(1)}
              </p>
              <p className="text-xs text-ink-soft">{provider.reviewCount} recenzí</p>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {provider.bio}
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-5 pb-5 md:px-6 md:pb-6">
        <div className="flex flex-wrap gap-2 pt-4">
          {provider.services.map((s) => (
            <span
              key={s}
              className="rounded-full bg-[rgba(196,91,74,0.1)] px-3 py-1 text-xs font-bold text-rose-deep"
            >
              {SERVICE_PRICING[s].shortLabel}
            </span>
          ))}
          {provider.experiences.slice(0, 2).map((e) => (
            <span
              key={e}
              className="rounded-full bg-fog px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {e}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-[1.2rem] bg-fog/80 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-moss">
              Nejbližší termíny
            </p>
            <p className="text-sm font-bold text-ink">{formatCzk(price.pricePerHour)}/h</p>
          </div>
          {slots.length ? (
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <span
                  key={`${s.date}-${s.start}`}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-[var(--line)]"
                >
                  {formatSlotDate(s.date)} {s.start}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-soft">Zatím bez volných slotů</p>
          )}
        </div>

        <Link
          href={`/pece/${provider.id}${preferredService ? `?sluzba=${preferredService}` : ""}`}
          className="btn btn-ink mt-5 w-full"
        >
          Zobrazit kalendář a rezervovat
        </Link>
      </div>
    </article>
  );
}
