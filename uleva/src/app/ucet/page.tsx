"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { CITIES } from "@/data/providers";
import { useAuth } from "@/lib/auth";
import { recommendProviders } from "@/lib/recommend";

export default function MomAccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/prihlaseni");
    else if (user.role === "caregiver") router.replace("/ucet-pecujici");
  }, [ready, user, router]);

  if (!ready || !user || user.role !== "mom") {
    return (
      <div className="shell pb-16 pt-28 text-ink-soft md:pt-32">Načítám účet…</div>
    );
  }

  const cityKey =
    user.city && CITIES[user.city]
      ? user.city
      : Object.entries(CITIES).find(([, c]) => c.label === user.city)?.[0] || "praha";

  const tips = recommendProviders({
    cityKey,
    service: "uleva",
    needs: ["vareni", "sourozenci"],
    babyAgeMonths: user.babyAgeMonths ?? 2,
  }).slice(0, 3);

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Účet maminky</p>
          <h1 className="display mt-2 text-4xl md:text-5xl">Ahoj, {user.name}</h1>
          <p className="mt-3 text-ink-soft">{user.email}</p>
        </div>
        <button type="button" onClick={logout} className="btn btn-ghost !py-2.5 !text-sm">
          Odhlásit se
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/hledat" className="panel-solid p-5 transition hover:-translate-y-0.5">
          <CalendarDays className="h-5 w-5 text-moss" />
          <p className="mt-3 font-bold">Najít termín</p>
          <p className="mt-1 text-sm text-ink-soft">Kalendář ověřených žen blízko tebe</p>
        </Link>
        <Link href="/asistent" className="panel-solid p-5 transition hover:-translate-y-0.5">
          <Sparkles className="h-5 w-5 text-rose" />
          <p className="mt-3 font-bold">AI doporučení</p>
          <p className="mt-1 text-sm text-ink-soft">Kandidátka podle tvých požadavků</p>
        </Link>
        <div className="panel-solid p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-moss">Rezervace</p>
          <p className="display mt-2 text-4xl">{user.bookings.length}</p>
          <p className="text-sm text-ink-soft">aktivních / minulých</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="display text-3xl">Tvoje rezervace</h2>
        <div className="mt-5 space-y-3">
          {user.bookings.length === 0 && (
            <div className="panel-solid p-6 text-sm text-ink-soft">
              Zatím žádná rezervace.{" "}
              <Link href="/hledat" className="font-bold text-ink underline">
                Najdi pomoc
              </Link>{" "}
              nebo nech AI doporučit kandidátku.
            </div>
          )}
          {user.bookings.map((b) => (
            <article
              key={b.id}
              className="panel-solid flex flex-wrap items-center justify-between gap-3 p-5"
            >
              <div>
                <p className="font-bold">{b.providerName}</p>
                <p className="text-sm text-ink-soft">
                  {SERVICE_PRICING[b.service].label} · {b.date} · {b.start}–{b.end}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCzk(b.total)}</p>
                <p className="text-xs uppercase tracking-wide text-moss">{b.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="display text-3xl">Doporučeno pro tebe</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {tips.map((r) => (
            <Link
              key={r.provider.id}
              href={`/pece/${r.provider.id}`}
              className="panel-solid p-4 transition hover:-translate-y-0.5"
            >
              <p className="font-bold">{r.provider.name}</p>
              <p className="text-sm text-ink-soft">
                {r.provider.city} · {r.distanceKm.toFixed(1)} km · ★{" "}
                {r.provider.rating.toFixed(1)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
