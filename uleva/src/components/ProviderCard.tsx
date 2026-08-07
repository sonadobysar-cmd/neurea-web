import Link from "next/link";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Provider, getBookableSlots } from "@/data/providers";
import { SERVICE_PRICING, ServiceType, formatCzk } from "@/data/pricing";

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
    <article className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(26,46,40,0.14)]">
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="display text-2xl text-[var(--ink)]">{provider.name}</h2>
              <span className="chip">
                <BadgeCheck className="h-3.5 w-3.5" />
                Ověřená
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--ink-soft)]">
              <MapPin className="h-3.5 w-3.5" />
              {provider.district}, {provider.city}
              {typeof distanceKm === "number" && (
                <span className="text-[var(--sage)]">· {distanceKm.toFixed(1)} km</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-sm font-bold">
              <Star className="h-4 w-4 fill-[var(--clay)] text-[var(--clay)]" />
              {provider.rating.toFixed(1)}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">{provider.reviewCount} recenzí</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{provider.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.services.map((s) => (
            <span key={s} className="chip !bg-[rgba(197,106,74,0.1)] !text-[var(--clay-deep)]">
              {SERVICE_PRICING[s].shortLabel}
            </span>
          ))}
          {provider.experiences.slice(0, 3).map((e) => (
            <span key={e} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(26,46,40,0.08)]">
              {e}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[var(--mist)]/70 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sage)]">
              Nejbližší termíny
            </p>
            <p className="text-sm font-bold text-[var(--ink)]">
              {formatCzk(price.pricePerHour)}/h
            </p>
          </div>
          {slots.length ? (
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <span
                  key={`${s.date}-${s.start}`}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink)] ring-1 ring-[rgba(26,46,40,0.08)]"
                >
                  {formatSlotDate(s.date)} {s.start}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--ink-soft)]">Zatím bez volných slotů</p>
          )}
        </div>

        <Link
          href={`/pece/${provider.id}${preferredService ? `?sluzba=${preferredService}` : ""}`}
          className="btn-primary mt-5 w-full"
        >
          Zobrazit kalendář a rezervovat
        </Link>
      </div>
    </article>
  );
}
