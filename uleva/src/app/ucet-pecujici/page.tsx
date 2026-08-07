"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Check, Clock3 } from "lucide-react";
import { SERVICE_PRICING } from "@/data/pricing";
import { useAuth } from "@/lib/auth";

export default function CaregiverAccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/prihlaseni");
    else if (user.role === "mom") router.replace("/ucet");
  }, [ready, user, router]);

  if (!ready || !user || user.role !== "caregiver") {
    return (
      <div className="shell pb-16 pt-28 text-ink-soft md:pt-32">Načítám účet…</div>
    );
  }

  const pending = user.status !== "verified";

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Účet pečující</p>
          <h1 className="display mt-2 text-4xl md:text-5xl">{user.name}</h1>
          <p className="mt-3 text-ink-soft">
            {user.city} · IČO {user.ico} · {user.email}
          </p>
        </div>
        <button type="button" onClick={logout} className="btn btn-ghost !py-2.5 !text-sm">
          Odhlásit se
        </button>
      </div>

      <div
        className={`mt-8 rounded-[1.4rem] p-5 ${
          pending
            ? "bg-[rgba(196,91,74,0.1)] text-rose-deep"
            : "bg-[rgba(63,94,81,0.12)] text-moss"
        }`}
      >
        <p className="flex items-center gap-2 font-bold">
          {pending ? <Clock3 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {pending
            ? "Čeká na manuální ověření (RT, pohovor, pojištění)"
            : "Profil ověřen — můžeš přijímat rezervace"}
        </p>
        <p className="mt-2 text-sm opacity-90">
          Bez dokončeného ověření a aktivního kalendáře se ve výsledcích
          maminkám nezobrazíš. Ověření v produkci dělá provozovatelka MamaSOS.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="panel-solid p-5">
          <h2 className="display text-2xl">Služby a výplata</h2>
          <div className="mt-3 space-y-2">
            {user.services.map((s) => (
              <div
                key={s}
                className="flex items-center justify-between gap-3 rounded-xl bg-fog px-3 py-2.5 text-sm"
              >
                <span className="font-bold">{SERVICE_PRICING[s].label}</span>
                <span className="font-semibold text-moss">
                  {SERVICE_PRICING[s].payoutPerHour} Kč/h
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{user.bio}</p>
          <p className="mt-3 text-xs text-ink-soft">
            Výplata po dokončené návštěvě. Klientům ukazujeme jen cenu služby.
          </p>
        </section>

        <section className="panel-solid p-5">
          <h2 className="display text-2xl">Kalendář</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Slot {user.slotHours} h · dojezd {user.radiusKm} km
          </p>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(user.weeklySlots).map(([day, slots]) => (
              <div key={day} className="flex justify-between gap-3">
                <span className="text-ink-soft">Den {day}</span>
                <span className="font-semibold">{(slots || []).join(", ") || "—"}</span>
              </div>
            ))}
          </div>
          <Link href="/nabidnout" className="btn btn-ink mt-5 !py-2.5 !text-sm">
            Upravit registraci
          </Link>
        </section>
      </div>
    </div>
  );
}
