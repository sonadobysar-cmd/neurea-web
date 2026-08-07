"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { LOCATIONS, NEED_OPTIONS, NeedId } from "@/data/locations";
import { askAssistant } from "@/lib/assistant";
import { recommendProviders, type RecommendInput } from "@/lib/recommend";
import { needsToPreferredService } from "@/lib/needs";

export default function AssistantPage() {
  const [cityKey, setCityKey] = useState("praha");
  const [needs, setNeeds] = useState<NeedId[]>(["uklid", "pohlidat"]);
  const [babyAgeMonths, setBabyAgeMonths] = useState(2);
  const [lactationPaOnly, setLactationPaOnly] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const service = needsToPreferredService(needs) || "all";

  const input: RecommendInput = useMemo(
    () => ({
      cityKey,
      service,
      needs: needs.map((n) =>
        n === "pohlidat" ? "sourozenci" : n === "laktace" ? "kojeni" : n
      ),
      night: false,
      babyAgeMonths,
      lactationPaOnly: needs.includes("laktace") ? lactationPaOnly : false,
    }),
    [cityKey, service, needs, babyAgeMonths, lactationPaOnly]
  );

  const results = useMemo(() => recommendProviders(input), [input]);

  function toggleNeed(id: NeedId) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Sparkles className="h-3.5 w-3.5" />
          Pomozte mi vybrat
        </p>
        <h1 className="display mt-2 text-4xl md:text-6xl">
          Nejste si jistá, koho potřebujete?
        </h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Popište svou situaci a doporučíme vhodný typ pomoci i dostupné pečující
          ve vašem okolí. Doporučení vytváří AI — nejde o zdravotní poradnu ani
          diagnózu. Při zdravotních potížích kontaktujte lékaře nebo 155.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel-solid p-5 md:p-6">
          <h2 className="display text-2xl">Požadavky</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">
              Město
              <select
                className="input mt-1.5"
                value={cityKey}
                onChange={(e) => setCityKey(e.target.value)}
              >
                {Object.entries(LOCATIONS).map(([key, c]) => (
                  <option key={key} value={c.cityKey || key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="text-sm font-semibold">Co potřebuješ</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {NEED_OPTIONS.map((n) => {
                  const active = needs.includes(n.id);
                  return (
                    <button
                      key={n.id}
                      type="button"
                      title={n.hint}
                      onClick={() => toggleNeed(n.id)}
                      className={`rounded-full px-3.5 py-2 text-sm font-semibold ${
                        active
                          ? "bg-rose text-white"
                          : "bg-white text-ink-soft ring-1 ring-[var(--line)]"
                      }`}
                    >
                      {n.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block text-sm font-semibold">
              Věk miminka (měsíce)
              <input
                type="number"
                min={0}
                max={24}
                className="input mt-1.5"
                value={babyAgeMonths}
                onChange={(e) => setBabyAgeMonths(Number(e.target.value))}
              />
            </label>

            {needs.includes("laktace") && (
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={lactationPaOnly}
                  onChange={(e) => setLactationPaOnly(e.target.checked)}
                />
                Jen porodní asistentka (PA)
              </label>
            )}
          </div>

          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h3 className="font-bold">Nebo se zeptej čímkoli</h3>
            <form
              className="mt-3 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setAnswer(askAssistant(question).answer);
              }}
            >
              <textarea
                className="input"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Např. Jak funguje platba? Je to zdravotní služba?"
              />
              <button type="submit" className="btn btn-ink w-full">
                Zeptat se asistentky
              </button>
            </form>
            {answer && (
              <p className="mt-4 whitespace-pre-wrap rounded-2xl bg-fog p-4 text-sm leading-relaxed text-ink-soft">
                {answer}
              </p>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Výsledky</p>
              <h2 className="display mt-1 text-3xl">
                {results.length} doporučených kandidátek
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((r, idx) => (
              <article key={r.provider.id} className="panel-solid p-4 md:p-5">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand">
                    <Image
                      src={r.provider.photo}
                      alt={r.provider.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="display text-2xl">{r.provider.name}</p>
                      <span className="rounded-full bg-fog px-2.5 py-1 text-xs font-bold">
                        #{idx + 1} match
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft">
                      {r.provider.district}, {r.provider.city} ·{" "}
                      {r.distanceKm.toFixed(1)} km · ★ {r.provider.rating.toFixed(1)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.reasons.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full bg-[rgba(63,94,81,0.1)] px-2.5 py-1 text-[0.7rem] font-semibold text-moss"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">
                      Od{" "}
                      {formatCzk(
                        SERVICE_PRICING[
                          service !== "all" && r.provider.services.includes(service)
                            ? service
                            : r.provider.services[0]
                        ].pricePerHour
                      )}
                      /h
                      {r.nextSlot
                        ? ` · nejbližší ${r.nextSlot.date} ${r.nextSlot.start}`
                        : ""}
                    </p>
                    <Link
                      href={`/pece/${r.provider.id}${
                        service !== "all" ? `?sluzba=${service}` : ""
                      }`}
                      className="btn btn-gold mt-4 !py-2.5 !text-sm"
                    >
                      Rezervovat termín
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {!results.length && (
              <div className="panel-solid p-8 text-center">
                <h3 className="display text-2xl">Nikdo zatím nesedí</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Uvolni filtry nebo zkus sousední město.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
