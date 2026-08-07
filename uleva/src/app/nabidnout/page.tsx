"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { SERVICE_PRICING, ServiceType } from "@/data/pricing";
import { DayKey } from "@/data/providers";
import { useAuth } from "@/lib/auth";

const EXPERIENCE_OPTS = [
  "Miminka 0–3 m",
  "Sourozenci",
  "Vaření",
  "Úklid",
  "Noční směna",
  "Kojení",
];

const DAYS: { key: DayKey; label: string }[] = [
  { key: 1, label: "Po" },
  { key: 2, label: "Út" },
  { key: 3, label: "St" },
  { key: 4, label: "Čt" },
  { key: 5, label: "Pá" },
  { key: 6, label: "So" },
  { key: 0, label: "Ne" },
];

const TIMES = ["08:00", "09:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

export default function OfferPage() {
  const { registerCaregiver, user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Praha");
  const [ico, setIco] = useState("");
  const [services, setServices] = useState<ServiceType[]>(["uleva"]);
  const [experiences, setExperiences] = useState<string[]>(["Vaření", "Úklid"]);
  const [bio, setBio] = useState("");
  const [radiusKm, setRadiusKm] = useState(12);
  const [slotHours, setSlotHours] = useState(3);
  const [lactationLevel, setLactationLevel] = useState<"pa" | "laicka" | "">("");
  const [weeklySlots, setWeeklySlots] = useState<Partial<Record<DayKey, string[]>>>({
    1: ["09:00", "14:00"],
    3: ["09:00"],
    5: ["09:00"],
  });
  const [docs, setDocs] = useState({ ico: false, rt: false, insurance: false, id: false });

  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);

  function toggleService(s: ServiceType) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function toggleExp(e: string) {
    setExperiences((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  }

  function toggleSlot(day: DayKey, time: string) {
    setWeeklySlots((prev) => {
      const current = prev[day] ?? [];
      const next = current.includes(time)
        ? current.filter((t) => t !== time)
        : [...current, time].sort();
      return { ...prev, [day]: next };
    });
  }

  function canNext() {
    if (step === 0)
      return name && email && password.length >= 4 && phone && city && ico.length >= 8;
    if (step === 1) return services.length > 0 && bio.trim().length >= 20;
    if (step === 2)
      return Object.values(weeklySlots).some((slots) => (slots?.length ?? 0) > 0);
    if (step === 3) return docs.ico && docs.rt && docs.insurance && docs.id;
    return false;
  }

  function submit() {
    setError(null);
    const res = registerCaregiver({
      name,
      email,
      password,
      phone,
      city,
      ico,
      services,
      experiences,
      bio,
      radiusKm,
      weeklySlots,
      slotHours,
      lactationLevel:
        services.includes("laktace") && lactationLevel
          ? lactationLevel
          : undefined,
    });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.push("/ucet-pecujici");
  }

  useEffect(() => {
    if (user?.role === "caregiver") router.replace("/ucet-pecujici");
  }, [user, router]);

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Pro pečující</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Registrace pečující</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          4 kroky: údaje → služby → kalendář → doklady. Bez kalendáře a ověření
          nejsi ve výsledcích.
        </p>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-rose transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-ink-soft">Krok {step + 1} / 4</p>

      <div className="panel-solid mt-6 p-5 md:p-7">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="display text-2xl">Základní údaje + IČO</h2>
            <label className="block text-sm font-semibold">
              Jméno
              <input className="input mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block text-sm font-semibold">
              E-mail
              <input
                type="email"
                className="input mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Heslo
              <input
                type="password"
                className="input mt-1.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
              />
            </label>
            <label className="block text-sm font-semibold">
              Telefon
              <input className="input mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className="block text-sm font-semibold">
              Město
              <input className="input mt-1.5" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label className="block text-sm font-semibold">
              IČO
              <input
                className="input mt-1.5"
                value={ico}
                onChange={(e) => setIco(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="12345678"
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="display text-2xl">Služby a zkušenosti</h2>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(SERVICE_PRICING) as ServiceType[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold ${
                    services.includes(s)
                      ? "bg-ink text-white"
                      : "bg-white text-ink-soft ring-1 ring-[var(--line)]"
                  }`}
                >
                  {SERVICE_PRICING[s].shortLabel}
                </button>
              ))}
            </div>
            {services.includes("laktace") && (
              <label className="block text-sm font-semibold">
                Úroveň laktace
                <select
                  className="input mt-1.5"
                  value={lactationLevel}
                  onChange={(e) =>
                    setLactationLevel(e.target.value as "pa" | "laicka" | "")
                  }
                >
                  <option value="">Vyber</option>
                  <option value="pa">Porodní asistentka</option>
                  <option value="laicka">Laická podpora</option>
                </select>
              </label>
            )}
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_OPTS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => toggleExp(e)}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold ${
                    experiences.includes(e)
                      ? "bg-moss text-white"
                      : "bg-white text-ink-soft ring-1 ring-[var(--line)]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <label className="block text-sm font-semibold">
              Bio (min. 20 znaků)
              <textarea
                className="input mt-1.5"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Kdo jsi, co umíš, jak maminkám ulevíš…"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Dojezd (km)
                <input
                  type="number"
                  className="input mt-1.5"
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                />
              </label>
              <label className="block text-sm font-semibold">
                Délka slotu (h)
                <input
                  type="number"
                  min={1}
                  max={8}
                  className="input mt-1.5"
                  value={slotHours}
                  onChange={(e) => setSlotHours(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="display text-2xl">Rezervační kalendář</h2>
            <p className="text-sm text-ink-soft">
              Vyber dny a časy startu slotů. Bez alespoň jednoho slotu registraci
              nedokončíš.
            </p>
            <div className="space-y-4">
              {DAYS.map((day) => (
                <div key={day.key}>
                  <p className="mb-2 text-sm font-bold">{day.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((time) => {
                      const active = (weeklySlots[day.key] ?? []).includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => toggleSlot(day.key, time)}
                          className={`rounded-xl px-3 py-2 text-xs font-bold ${
                            active
                              ? "bg-ink text-white"
                              : "bg-fog text-ink-soft"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="display text-2xl">Doklady k ověření</h2>
            <p className="text-sm text-ink-soft">
              V demu jen potvrď, že dokumenty máš. V produkci nahraješ skeny a
              provozovatelka je ručně zkontroluje.
            </p>
            {(
              [
                ["ico", "Potvrzuji platné IČO a živnost"],
                ["id", "Mám připravený doklad totožnosti"],
                ["rt", "Mám výpis z rejstříku trestů"],
                ["insurance", "Mám / budu mít pojištění odpovědnosti"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-start gap-3 rounded-2xl bg-fog px-4 py-3 text-sm font-semibold"
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={docs[key]}
                  onChange={(e) => setDocs((d) => ({ ...d, [key]: e.target.checked }))}
                />
                {label}
              </label>
            ))}
            <ul className="space-y-2 text-sm text-ink-soft">
              {[
                `Výplata: Úleva ${SERVICE_PRICING.uleva.payoutPerHour} Kč/h · Dula ${SERVICE_PRICING.dula.payoutPerHour} Kč/h · Laktace ${SERVICE_PRICING.laktace.payoutPerHour} Kč/h`,
                "Klientům ukazujeme jen cenu služby — ne rozpad výplat",
                "Bez aktivního kalendáře nejsi ve výsledcích",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="mt-4 text-sm font-semibold text-rose">{error}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 && (
            <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
              Zpět
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              className="btn btn-ink"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
            >
              Pokračovat
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-rose"
              disabled={!canNext()}
              onClick={submit}
            >
              Odeslat k ověření
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
