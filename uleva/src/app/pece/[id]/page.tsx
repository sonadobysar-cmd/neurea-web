import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import {
  PROVIDERS_ARE_DEMO,
  getBookableSlots,
  getProvider,
  getProviderIco,
} from "@/data/providers";
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
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <Link href="/hledat" className="text-sm font-semibold text-moss hover:underline">
        ← Zpět na výsledky
      </Link>

      <section className="panel-solid mt-5 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div className="relative min-h-[280px] bg-sand md:min-h-full">
            <Image
              src={provider.photo}
              alt={provider.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 280px"
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="display text-4xl md:text-5xl">{provider.name}</h1>
                  <VerifiedBadge />
                  {(provider.isDemo || PROVIDERS_ARE_DEMO) && (
                    <span className="rounded-full bg-fog px-2.5 py-1 text-[0.7rem] font-bold text-ink-soft">
                      Ukázkový profil
                    </span>
                  )}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
                  <MapPin className="h-4 w-4" />
                  {provider.district}, {provider.city} · dojezd do {provider.radiusKm}{" "}
                  km
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Podnikatelka · IČO {getProviderIco(provider)}
                  {PROVIDERS_ARE_DEMO ? " (ukázkové)" : ""}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {provider.bio}
                </p>
              </div>
              <div className="rounded-2xl bg-fog px-4 py-3 text-right">
                <p className="flex items-center justify-end gap-1 font-bold">
                  <Star className="h-4 w-4 fill-rose text-rose" />
                  {provider.rating.toFixed(1)}
                </p>
                <p className="text-xs text-ink-soft">
                  {provider.reviewCount} recenzí · {provider.completedVisits} návštěv
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {provider.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-[rgba(63,94,81,0.1)] px-3 py-1.5 text-xs font-bold text-moss"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {provider.experiences.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-[var(--line)]"
                >
                  {e}
                </span>
              ))}
              {provider.lactationLevel === "pa" && (
                <span className="rounded-full bg-[rgba(196,91,74,0.12)] px-3 py-1.5 text-xs font-bold text-rose-deep">
                  Laktace: porodní asistentka
                </span>
              )}
              {provider.lactationLevel === "laicka" && (
                <span className="rounded-full bg-[rgba(196,91,74,0.12)] px-3 py-1.5 text-xs font-bold text-rose-deep">
                  Laktace: laická podpora
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {provider.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white"
                >
                  {SERVICE_PRICING[s].label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <BookingCalendar
          provider={provider}
          slots={slots}
          initialService={initialService}
        />
      </div>

      <div className="panel-solid mt-6 p-5 text-sm text-ink-soft">
        <p className="font-bold text-ink">Když pečující nemůže přijet</p>
        <p className="mt-2">
          Pomůžeme vám najít náhradní termín nebo vrátíme platbu podle{" "}
          <Link href="/storno" className="font-bold text-ink underline">
            storno podmínek
          </Link>
          . Při problému pište na{" "}
          <Link href="/kontakt" className="font-bold text-ink underline">
            podporu
          </Link>
          .
        </p>
      </div>

      {provider.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="display text-3xl md:text-4xl">Recenze</h2>
          {(provider.isDemo || PROVIDERS_ARE_DEMO) && (
            <p className="mt-2 text-sm text-ink-soft">
              Ukázkové recenze — před spuštěním nahradíme hodnoceními z dokončených
              návštěv.
            </p>
          )}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {provider.reviews.map((r) => (
              <article key={r.author + r.date} className="panel-solid p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold">{r.author}</p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[rgba(92,122,114,0.12)] px-2 py-0.5 text-[0.65rem] font-bold text-moss">
                      Ověřená návštěva
                    </span>
                    <p className="text-sm text-rose">{"★".repeat(r.stars)}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
                <p className="mt-3 text-xs text-ink-soft opacity-70">{r.date}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-soft">
        MamaSOS je zprostředkovatel. Službu poskytuje {provider.name} jako samostatná
        podnikatelka. Nejde o zdravotní službu ani zařízení péče o děti v denním
        režimu. Při zdravotních potížích kontaktujte lékaře nebo 155.
      </p>
    </div>
  );
}
