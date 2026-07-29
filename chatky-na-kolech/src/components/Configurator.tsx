"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  BATHROOM_VARIANTS,
  type ConfigState,
  DEFAULT_CONFIG,
  DIMENSIONS,
  FACADES,
  INCLUDED,
  KITCHEN_VARIANTS,
  LOFTS,
  PAINT,
  ROOM,
  ROOF_TYPES,
  SUPPLIERS,
  WALL_LAYERS,
  calcPrices,
  clampDim,
  round1,
} from "@/data/configurator";
import { ArrowIcon } from "./Icons";

const HouseScene3D = dynamic(
  () => import("./HouseScene3D").then((m) => m.HouseScene3D),
  {
    ssr: false,
    loading: () => <div className="house3d-loading">Načítám 3D model…</div>,
  },
);

function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatM(n: number) {
  return `${n.toFixed(1).replace(".", ",")} m`;
}

function formatM2(n: number) {
  return `${n.toFixed(1).replace(".", ",")} m²`;
}

type StepId = "model" | "exterior" | "interior" | "upgrade" | "quote";

const STEPS: { id: StepId; label: string }[] = [
  { id: "model", label: "Rozměry" },
  { id: "exterior", label: "Exteriér" },
  { id: "interior", label: "Interiér" },
  { id: "upgrade", label: "Doplňky" },
  { id: "quote", label: "Poptávka" },
];

function DimControl({
  label,
  value,
  min,
  max,
  step,
  fine,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fine: number;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="dim-control">
      <div className="dim-head">
        <span>{label}</span>
        <strong>{formatM(value)}</strong>
      </div>
      <div className="dim-row">
        <button
          type="button"
          className="dim-nudge"
          aria-label={`Snížit ${label}`}
          onClick={() => onChange(clampDim(value - fine, min, max, fine))}
        >
          −
        </button>
        <div className="dim-slider-wrap">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) =>
              onChange(clampDim(Number(e.target.value), min, max, fine))
            }
            style={{ "--pct": `${pct}%` } as React.CSSProperties}
            aria-label={label}
          />
        </div>
        <button
          type="button"
          className="dim-nudge"
          aria-label={`Zvýšit ${label}`}
          onClick={() => onChange(clampDim(value + fine, min, max, fine))}
        >
          +
        </button>
      </div>
      <div className="dim-scale">
        <span>{formatM(min)}</span>
        <span>{formatM(max)}</span>
      </div>
    </div>
  );
}

export function Configurator() {
  const [cfg, setCfg] = useState<ConfigState>(DEFAULT_CONFIG);
  const [step, setStep] = useState<StepId>("model");
  const [sent, setSent] = useState(false);
  const [showIncluded, setShowIncluded] = useState(false);
  const [hotspot, setHotspot] = useState<string | null>(null);

  const prices = useMemo(() => calcPrices(cfg), [cfg]);
  const facade = FACADES.find((f) => f.id === cfg.facade)!;
  const showPaint = !facade.includesPaint;
  const showLofts = cfg.roof !== "kulata";
  const roundAvailable = cfg.width === 2.5;
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  useEffect(() => {
    if (cfg.roof === "kulata" && cfg.width !== 2.5) {
      setCfg((c) => ({ ...c, roof: "ackova" }));
    }
  }, [cfg.width, cfg.roof]);

  useEffect(() => {
    if (cfg.roof === "kulata" && cfg.loft !== "none") {
      setCfg((c) => ({ ...c, loft: "none" }));
    }
  }, [cfg.roof, cfg.loft]);

  const set = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setCfg((c) => ({ ...c, [key]: value }));
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].id);
  };
  const goBack = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].id);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const onHotspot = (id: string) => {
    setHotspot(id);
    if (id === "roof" || id === "facade") setStep("exterior");
    else if (id === "window" || id === "door") setStep("interior");
    else if (id === "size") setStep("model");
  };

  const roofLabel = ROOF_TYPES.find((r) => r.id === cfg.roof)?.label ?? "";
  const loftLabel = LOFTS.find((l) => l.id === cfg.loft)?.label ?? "";
  const bathLabel =
    cfg.bathroom === "none"
      ? "Ne"
      : BATHROOM_VARIANTS.find((b) => b.id === cfg.bathVariant)?.label ?? "Ano";
  const kitchenLabel =
    cfg.kitchen === "none"
      ? "Ne"
      : KITCHEN_VARIANTS.find((k) => k.id === cfg.kitchenVariant)?.label ?? "Ano";

  const titles: Record<StepId, { title: string; text: string }> = {
    model: {
      title: "Zvolte rozměry",
      text: "Délka a šířka určují podlahovou plochu i základní cenu. Jemně doladíte po 0,1 m.",
    },
    exterior: {
      title: "Exteriér",
      text: "Střecha a fasáda — silueta domu. Materiály sedí na karavan, ne vedle něj.",
    },
    interior: {
      title: "Interiér",
      text: "Koupelna, kuchyň, loft a pokoj. Jen to, co opravdu chcete.",
    },
    upgrade: {
      title: "Doplňky",
      text: "Podlahové topení a dodatečné zateplení — komfort na celý rok.",
    },
    quote: {
      title: "Rekapitulace a poptávka",
      text: "Orientační cena. Pošlete konfiguraci — doladíme finál bez závazku.",
    },
  };

  return (
    <div className="cfg-studio">
      <div className="cfg-topbar">
        <nav className="cfg-steps" aria-label="Kroky konfigurátoru">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`cfg-steps-item${step === s.id ? " is-active" : ""}${
                i < stepIndex ? " is-done" : ""
              }`}
              onClick={() => setStep(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="cfg-topbar-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              try {
                localStorage.setItem("cnk-config", JSON.stringify(cfg));
              } catch {
                /* ignore */
              }
            }}
          >
            Uložit návrh
          </button>
          <button
            type="button"
            className="btn btn-oak"
            onClick={() => setStep("quote")}
          >
            Poslat poptávku
          </button>
        </div>
      </div>

      <div className="cfg-studio-body">
        <section className="cfg-viewport" aria-label="Náhled domu">
          <div className="cfg-viewport-canvas">
            <HouseScene3D
              length={cfg.length}
              width={cfg.width}
              roof={cfg.roof}
              facade={cfg.facade}
              loft={cfg.loft}
              hasBathroom={cfg.bathroom === "yes"}
              hasKitchen={cfg.kitchen === "yes"}
              activeHotspot={hotspot}
              onHotspot={onHotspot}
            />
          </div>

          <div className="cfg-viewport-meta">
            <div className="cfg-spec">
              <span>Rozměry</span>
              <strong>
                {formatM(cfg.length)} × {formatM(cfg.width)}
              </strong>
            </div>
            <div className="cfg-spec">
              <span>Podlaha</span>
              <strong>{formatM2(prices.floorArea)}</strong>
            </div>
            <div className="cfg-spec cfg-spec--price">
              <span>Orientačně</span>
              <strong>{formatCzk(prices.total)}</strong>
            </div>
          </div>
        </section>

        <aside className="cfg-sidebar">
          <header className="cfg-sidebar-head">
            <p className="cfg-kicker">
              Krok {String(stepIndex + 1).padStart(2, "0")} / {STEPS.length}
            </p>
            <h2>{titles[step].title}</h2>
            <p>{titles[step].text}</p>
          </header>

          <div className="cfg-sidebar-scroll">
            {step === "model" && (
              <div className="cfg-stack">
                <DimControl
                  label="Délka"
                  value={cfg.length}
                  min={DIMENSIONS.length.min}
                  max={DIMENSIONS.length.max}
                  step={DIMENSIONS.length.step}
                  fine={DIMENSIONS.length.fine}
                  onChange={(n) => set("length", n)}
                />
                <DimControl
                  label="Šířka"
                  value={cfg.width}
                  min={DIMENSIONS.width.min}
                  max={DIMENSIONS.width.max}
                  step={DIMENSIONS.width.step}
                  fine={DIMENSIONS.width.fine}
                  onChange={(n) => set("width", round1(n))}
                />
                <div className="cfg-pill-row">
                  <span className="cfg-pill">
                    Základ {formatCzk(prices.base)}
                  </span>
                  <span className="cfg-pill">
                    Stěny {formatM(prices.wallHeight)}
                  </span>
                </div>
              </div>
            )}

            {step === "exterior" && (
              <div className="cfg-stack">
                <div>
                  <h3 className="cfg-subhead">Střecha</h3>
                  <div className="cfg-cards">
                    {ROOF_TYPES.map((r) => {
                      const locked = r.id === "kulata" && !roundAvailable;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          disabled={locked}
                          className={`cfg-card${cfg.roof === r.id ? " is-active" : ""}`}
                          onClick={() => !locked && set("roof", r.id)}
                        >
                          <strong>{r.label}</strong>
                          <span>
                            {locked
                              ? "Jen při šířce 2,5 m"
                              : r.surchargePerM2
                                ? `+ ${formatCzk(r.surchargePerM2)}/m²`
                                : r.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="cfg-subhead">Fasáda</h3>
                  <div className="cfg-cards cfg-cards--samples">
                    {FACADES.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        className={`cfg-card cfg-card--sample${
                          cfg.facade === f.id ? " is-active" : ""
                        }`}
                        onClick={() => set("facade", f.id)}
                      >
                        <span
                          className="cfg-swatch"
                          style={{ background: f.swatch }}
                        >
                          <Image src={f.sample} alt="" width={48} height={48} />
                        </span>
                        <span>
                          <strong>{f.label}</strong>
                          <span>
                            {f.includesPaint
                              ? "včetně nátěru"
                              : `${formatCzk(f.pricePerM2)}/m²`}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {showPaint && (
                  <div>
                    <h3 className="cfg-subhead">Nátěr</h3>
                    <div className="cfg-cards cfg-cards--row">
                      <button
                        type="button"
                        className={`cfg-card${cfg.paint === "none" ? " is-active" : ""}`}
                        onClick={() => set("paint", "none")}
                      >
                        <strong>{PAINT.none.label}</strong>
                      </button>
                      <button
                        type="button"
                        className={`cfg-card${cfg.paint === "yes" ? " is-active" : ""}`}
                        onClick={() => set("paint", "yes")}
                      >
                        <strong>{PAINT.yes.label}</strong>
                        <span>+ {formatCzk(PAINT.yes.pricePerM2)}/m²</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === "interior" && (
              <div className="cfg-stack">
                <div>
                  <h3 className="cfg-subhead">Koupelna</h3>
                  <div className="cfg-cards cfg-cards--row">
                    <button
                      type="button"
                      className={`cfg-card${cfg.bathroom === "none" ? " is-active" : ""}`}
                      onClick={() => set("bathroom", "none")}
                    >
                      <strong>Ne</strong>
                    </button>
                    <button
                      type="button"
                      className={`cfg-card${cfg.bathroom === "yes" ? " is-active" : ""}`}
                      onClick={() => set("bathroom", "yes")}
                    >
                      <strong>Ano</strong>
                    </button>
                  </div>
                  {cfg.bathroom === "yes" && (
                    <div className="cfg-cards" style={{ marginTop: "0.65rem" }}>
                      {BATHROOM_VARIANTS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          className={`cfg-card${cfg.bathVariant === b.id ? " is-active" : ""}`}
                          onClick={() => set("bathVariant", b.id)}
                        >
                          <strong>{b.label}</strong>
                          <span>
                            {b.desc} · {formatCzk(b.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="cfg-subhead">Kuchyň</h3>
                  <div className="cfg-cards cfg-cards--row">
                    <button
                      type="button"
                      className={`cfg-card${cfg.kitchen === "none" ? " is-active" : ""}`}
                      onClick={() => set("kitchen", "none")}
                    >
                      <strong>Ne</strong>
                    </button>
                    <button
                      type="button"
                      className={`cfg-card${cfg.kitchen === "yes" ? " is-active" : ""}`}
                      onClick={() => set("kitchen", "yes")}
                    >
                      <strong>Ano</strong>
                    </button>
                  </div>
                  {cfg.kitchen === "yes" && (
                    <div className="cfg-cards" style={{ marginTop: "0.65rem" }}>
                      {KITCHEN_VARIANTS.map((k) => (
                        <button
                          key={k.id}
                          type="button"
                          className={`cfg-card${
                            cfg.kitchenVariant === k.id ? " is-active" : ""
                          }`}
                          onClick={() => set("kitchenVariant", k.id)}
                        >
                          <strong>{k.label}</strong>
                          <span>
                            {k.desc} · {formatCzk(k.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {showLofts && (
                  <div>
                    <h3 className="cfg-subhead">Spací lofty</h3>
                    <div className="cfg-cards">
                      {LOFTS.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          className={`cfg-card${cfg.loft === l.id ? " is-active" : ""}`}
                          onClick={() => set("loft", l.id)}
                        >
                          <strong>{l.label}</strong>
                          <span>
                            {l.count > 0
                              ? `${formatCzk(l.price)} · stěny 3,5 m`
                              : "stěny 2,5 m"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="cfg-subhead">Samostatný pokoj</h3>
                  <div className="cfg-cards cfg-cards--row">
                    <button
                      type="button"
                      className={`cfg-card${cfg.room === "none" ? " is-active" : ""}`}
                      onClick={() => set("room", "none")}
                    >
                      <strong>Ne</strong>
                    </button>
                    <button
                      type="button"
                      className={`cfg-card${cfg.room === "yes" ? " is-active" : ""}`}
                      onClick={() => set("room", "yes")}
                    >
                      <strong>Ano</strong>
                      <span>{formatCzk(ROOM.yes.price)}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "upgrade" && (
              <div className="cfg-stack">
                <div>
                  <h3 className="cfg-subhead">Podlahové vytápění</h3>
                  <div className="cfg-cards cfg-cards--row">
                    <button
                      type="button"
                      className={`cfg-card${
                        cfg.floorHeating === "none" ? " is-active" : ""
                      }`}
                      onClick={() => set("floorHeating", "none")}
                    >
                      <strong>Ne</strong>
                    </button>
                    <button
                      type="button"
                      className={`cfg-card${
                        cfg.floorHeating === "yes" ? " is-active" : ""
                      }`}
                      onClick={() => set("floorHeating", "yes")}
                    >
                      <strong>Ano</strong>
                      <span>
                        sazba dle plochy ({prices.floorArea <= 30 ? "do" : "nad"}{" "}
                        30 m²)
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="cfg-subhead">Dodatečné zateplení</h3>
                  <div className="cfg-cards cfg-cards--row">
                    <button
                      type="button"
                      className={`cfg-card${
                        cfg.insulation === "none" ? " is-active" : ""
                      }`}
                      onClick={() => set("insulation", "none")}
                    >
                      <strong>Ne</strong>
                    </button>
                    <button
                      type="button"
                      className={`cfg-card${
                        cfg.insulation === "yes" ? " is-active" : ""
                      }`}
                      onClick={() => set("insulation", "yes")}
                    >
                      <strong>Ano</strong>
                      <span>stěny + střecha</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "quote" && (
              <div className="cfg-stack">
                <dl className="cfg-recap-list">
                  <div>
                    <dt>Rozměry</dt>
                    <dd>
                      {formatM(cfg.length)} × {formatM(cfg.width)} ·{" "}
                      {formatM2(prices.floorArea)}
                    </dd>
                  </div>
                  <div>
                    <dt>Střecha</dt>
                    <dd>{roofLabel}</dd>
                  </div>
                  <div>
                    <dt>Fasáda</dt>
                    <dd>{facade.label}</dd>
                  </div>
                  <div>
                    <dt>Koupelna</dt>
                    <dd>{bathLabel}</dd>
                  </div>
                  <div>
                    <dt>Kuchyň</dt>
                    <dd>{kitchenLabel}</dd>
                  </div>
                  {showLofts && (
                    <div>
                      <dt>Lofty</dt>
                      <dd>{loftLabel}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Topení</dt>
                    <dd>{cfg.floorHeating === "yes" ? "Ano" : "Ne"}</dd>
                  </div>
                  <div>
                    <dt>Zateplení</dt>
                    <dd>{cfg.insulation === "yes" ? "Ano" : "Ne"}</dd>
                  </div>
                </dl>

                <div className="cfg-price-box">
                  <span>Orientační cena</span>
                  <strong>{formatCzk(prices.total)}</strong>
                </div>

                {sent ? (
                  <p className="cfg-note">
                    Konfiguraci máme. Ozveme se do 24 hodin s návrhem dalšího
                    kroku.
                  </p>
                ) : (
                  <form className="contact-form" onSubmit={onSubmit}>
                    <div className="field">
                      <label htmlFor="cfg-name">Jméno</label>
                      <input id="cfg-name" name="name" required placeholder="Vaše jméno" />
                    </div>
                    <div className="field">
                      <label htmlFor="cfg-email">E-mail</label>
                      <input
                        id="cfg-email"
                        name="email"
                        type="email"
                        required
                        placeholder="vas@email.cz"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="cfg-phone">Telefon</label>
                      <input id="cfg-phone" name="phone" type="tel" placeholder="+420…" />
                    </div>
                    <div className="field">
                      <label htmlFor="cfg-intent">Záměr</label>
                      <select id="cfg-intent" name="intent" defaultValue="bydleni">
                        <option value="bydleni">Vlastní bydlení</option>
                        <option value="byznys">Airbnb / investice</option>
                        <option value="kempy">Rekonstrukce kempu / výměna chatek</option>
                        <option value="jine">Zatím nevím</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="cfg-note">Poznámka</label>
                      <textarea
                        id="cfg-note"
                        name="note"
                        placeholder="Pozemek, lokalita, termín…"
                      />
                    </div>
                    <input
                      type="hidden"
                      name="config"
                      value={JSON.stringify({ cfg, prices })}
                    />
                    <button type="submit" className="btn btn-ink btn-arrow btn-block">
                      Odeslat poptávku
                      <ArrowIcon />
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  className="cfg-accordion"
                  onClick={() => setShowIncluded((v) => !v)}
                  aria-expanded={showIncluded}
                >
                  <span>Co je v základní ceně</span>
                  <span aria-hidden="true">{showIncluded ? "−" : "+"}</span>
                </button>
                {showIncluded && (
                  <div className="cfg-accordion-body">
                    <ul className="cfg-bullets">
                      {INCLUDED.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <h4>Skladba stěny</h4>
                    <ol className="cfg-layers">
                      {WALL_LAYERS.map((layer) => (
                        <li key={layer}>{layer}</li>
                      ))}
                    </ol>
                    <h4>Dodavatelé</h4>
                    <div className="cfg-suppliers">
                      {SUPPLIERS.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <footer className="cfg-sidebar-foot">
            {stepIndex > 0 ? (
              <button type="button" className="btn btn-ghost" onClick={goBack}>
                Zpět
              </button>
            ) : (
              <span />
            )}
            {step !== "quote" && (
              <button type="button" className="btn btn-oak btn-arrow" onClick={goNext}>
                Další
                <ArrowIcon />
              </button>
            )}
          </footer>
        </aside>
      </div>
    </div>
  );
}
