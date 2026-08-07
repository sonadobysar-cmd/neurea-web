import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { getBookableSlots, getProvider } from "@/data/providers";
import { SERVICE_PRICING, ServiceType } from "@/data/pricing";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ sluzba?: string }>;

export default async function ProviderPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const query = await searchParams;
  const provider = getProvider(id);
  if (!provider) notFound();

  const slots = getBookableSlots(provider);
  const initialService =
    query.sluzba && provider.services.includes(query.sluzba as ServiceType)
      ? (query.sluzba as ServiceType)
      : provider.services[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Link
        href="/hledat"
        className="text-sm font-semibold text-[var(--sage-deep)] hover:underline"
      >
        ← Zpět na výsledky
      </Link>

      <section className="card mt-5 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="display text-4xl md:text-5xl">{provider.name}</h1>
              <span className="chip">
                <BadgeCheck className="h-3.5 w-3.5" />
                100% ověřená
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[var(--ink-soft)]">
              <MapPin className="h-4 w-4" />
              {provider.district}, {provider.city} · dojezd do {provider.radiusKm} km
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)]">
              {provider.bio}
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--mist)] px-4 py-3 text-right">
            <p className="flex items-center justify-end gap-1 font-bold">
              <Star className="h-4 w-4 fill-[var(--clay)] text-[var(--clay)]" />
              {provider.rating.toFixed(1)}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">
              {provider.reviewCount} recenzí · {provider.completedVisits} návštěv
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {provider.badges.map((b) => (
            <span key={b} className="chip">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.experiences.map((e) => (
            <span
              key={e}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(26,46,40,0.08)]"
            >
              {e}
            </span>
          ))}
          {provider.lactationLevel === "pa" && (
            <span className="rounded-full bg-[rgba(197,106,74,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--clay-deep)]">
              Laktace: porodní asistentka
            </span>
          )}
          {provider.lactationLevel === "laicka" && (
            <span className="rounded-full bg-[rgba(197,106,74,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--clay-deep)]">
              Laktace: laická podpora
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {provider.services.map((s) => (
            <span
              key={s}
              className="rounded-full bg-[var(--sage-deep)] px-3 py-1.5 text-xs font-bold text-white"
            >
              {SERVICE_PRICING[s].label}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <BookingCalendar
          provider={provider}
          slots={slots}
          initialService={initialService}
        />
      </div>

      {provider.reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="display text-3xl">Recenze z reálných návštěv</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {provider.reviews.map((r) => (
              <article key={r.author + r.date} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{r.author}</p>
                  <p className="text-sm text-[var(--clay)]">{"★".repeat(r.stars)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{r.text}</p>
                <p className="mt-3 text-xs text-[var(--ink-soft)] opacity-70">{r.date}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-[var(--ink-soft)]">
        Úleva je zprostředkovatel. Službu poskytuje {provider.name} jako samostatná
        podnikatelka. Nejde o zdravotní službu ani zařízení péče o děti v denním
        režimu. Při zdravotních potížích kontaktuj lékaře nebo 155.
      </p>
    </div>
  );
}
