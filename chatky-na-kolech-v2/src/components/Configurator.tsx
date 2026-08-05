"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/data/content";
import {
  BATHROOM_VARIANTS,
  type ConfigState,
  DEFAULT_CONFIG,
  DIMENSIONS,
  FACADES,
  FLOOR_HEATING,
  HALF_FACADE,
  INCLUDED,
  INSULATION,
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
import { deliverContact } from "@/lib/contact-client";
import { ArrowIcon } from "./Icons";

const HouseScene3D = dynamic(
  () => import("./HouseScene3D").then((m) => m.HouseScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="house3d-loading" role="status" aria-live="polite">
        <span className="house3d-loading-mark" aria-hidden="true" />
        <strong>Připravujeme 3D náhled</strong>
        <small>Za okamžik si dům můžete otočit a upravovat.</small>
      </div>
    ),
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
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "sending" | "sent" | "mailto"
  >("idle");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "loaded">(
    "idle",
  );
  const [showIncluded, setShowIncluded] = useState(false);
  const [showSuppliers, setShowSuppliers] = useState(false);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const prices = useMemo(() => calcPrices(cfg), [cfg]);
  const facade = FACADES.find((f) => f.id === cfg.facade)!;
  const facadeRate =
    facade.id === "half"
      ? (HALF_FACADE.woodPerM2 + HALF_FACADE.metalPerM2) / 2
      : facade.pricePerM2;
  const showPaint = !facade.includesPaint;
  const showLofts = cfg.roof !== "kulata";
  const roundAvailable = cfg.width === 2.5;
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cnk-config");
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<ConfigState>;
      setCfg({ ...DEFAULT_CONFIG, ...parsed });
      setSaveStatus("loaded");
      window.setTimeout(() => setSaveStatus("idle"), 2_500);
    } catch {
      localStorage.removeItem("cnk-config");
    }
  }, []);

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

  const selectStep = (nextStep: StepId) => {
    setStep(nextStep);
    if (window.matchMedia("(max-width: 979px)").matches) {
      window.requestAnimationFrame(() => {
        sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) selectStep(STEPS[stepIndex + 1].id);
  };
  const goBack = () => {
    if (stepIndex > 0) selectStep(STEPS[stepIndex - 1].id);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDeliveryStatus("sending");
    const data = new FormData(e.currentTarget);
    const result = await deliverContact(brand.email, {
      source: "configurator",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      intent: String(data.get("intent") ?? ""),
      message:
        String(data.get("note") ?? "").trim() ||
        "Mám zájem o tuto konfiguraci a prosím o další postup.",
      website: String(data.get("website") ?? ""),
      configuration: { cfg, prices },
    });
    setDeliveryStatus(result);
  };

  const saveProposal = () => {
    try {
      localStorage.setItem("cnk-config", JSON.stringify(cfg));
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 2_500);
    } catch {
      setSaveStatus("idle");
    }
  };

  const onHotspot = (id: string) => {
    setHotspot(id);
    if (id === "roof" || id === "facade") selectStep("exterior");
    else if (id === "window" || id === "door") selectStep("interior");
    else if (id === "size") selectStep("model");
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
  const paintLabel = facade.includesPaint
    ? "Zahrnutý v ceně fasády"
    : cfg.paint === "yes"
      ? "S nátěrem"
      : "Bez nátěru";
  const floorHeatingPrice =
    prices.floorArea <= 30
      ? FLOOR_HEATING.under30.priceUnder30
      : FLOOR_HEATING.under30.priceOver30;

  const titles: Record<StepId, { title: string; text: string }> = {
    model: {
      title: "Zvolte rozměry",
      text: "Délka a šířka určují podlahovou plochu i základní cenu. Jemně doladíte po 0,1 m.",
    },
    exterior: {
      title: "Exteriér",
      text: "Střecha a fasáda určují siluetu domu. Každou změnu průběžně uvidíte v 3D náhledu.",
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
      text: "Prohlédněte si orientační cenu a pošlete konfiguraci. Detaily společně doladíme bez závazku.",
    },
  };

  return (
    <div className="cfg-studio">
      <div className="cfg-topbar">
        <div className="cfg-topbar-main">
          <p className="cfg-topbar-name">Konfigurátor</p>
          <nav className="cfg-steps" aria-label="Kroky konfigurátoru">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`cfg-steps-item${step === s.id ? " is-active" : ""}${
                  i < stepIndex ? " is-done" : ""
                }`}
                onClick={() => selectStep(s.id)}
                aria-current={step === s.id ? "step" : undefined}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="cfg-topbar-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={saveProposal}
            aria-live="polite"
          >
            {saveStatus === "saved"
              ? "Návrh uložen"
              : saveStatus === "loaded"
                ? "Uložený návrh načten"
                : "Uložit návrh"}
          </button>
          <button
            type="button"
            className="btn btn-oak"
            onClick={() => selectStep("quote")}
          >
            Nezávazně poptat
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

        <aside className="cfg-sidebar" ref={sidebarRef}>
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
                    {FACADES.map((f) => {
                      const rate =
                        f.id === "half"
                          ? (HALF_FACADE.woodPerM2 + HALF_FACADE.metalPerM2) / 2
                          : f.pricePerM2;

                      return (
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
                            <Image
                              src={f.sample}
                              alt=""
                              width={64}
                              height={64}
                              sizes="64px"
                            />
                          </span>
                          <span>
                            <strong>{f.label}</strong>
                            <span>{f.desc}</span>
                            <span>
                              {formatCzk(rate)}/m²
                              {f.includesPaint ? " · nátěr v ceně" : ""}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="cfg-material-note">
                    Vzorky jsou ilustrační. Přirozená kresba a odstín se mohou
                    mezi jednotlivými kusy lišit.
                  </p>
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
                        + {formatCzk(floorHeatingPrice)} · sazba {prices.floorArea <= 30 ? "do" : "nad"}{" "}
                        30 m²
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
                      <span>
                        + {formatCzk(INSULATION.yes.pricePerM2)}/m² stěn a střechy
                      </span>
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
                    <dd>
                      {facade.label} · {formatCzk(facadeRate)}/m²
                    </dd>
                  </div>
                  <div>
                    <dt>Nátěr</dt>
                    <dd>{paintLabel}</dd>
                  </div>
                  <div>
                    <dt>Koupelna</dt>
                    <dd>{bathLabel}</dd>
                  </div>
                  <div>
                    <dt>Kuchyň</dt>
                    <dd>{kitchenLabel}</dd>
                  </div>
                  <div>
                    <dt>Lofty</dt>
                    <dd>
                      {showLofts ? loftLabel : "Bez loftu · kulatá střecha"}
                    </dd>
                  </div>
                  <div>
                    <dt>Podlahové vytápění</dt>
                    <dd>{cfg.floorHeating === "yes" ? "Ano" : "Ne"}</dd>
                  </div>
                  <div>
                    <dt>Dodatečné zateplení</dt>
                    <dd>{cfg.insulation === "yes" ? "Ano" : "Ne"}</dd>
                  </div>
                  <div>
                    <dt>Samostatný pokoj</dt>
                    <dd>{cfg.room === "yes" ? "Ano" : "Ne"}</dd>
                  </div>
                </dl>

                <div className="cfg-price-box">
                  <span>Orientační cena</span>
                  <strong>{formatCzk(prices.total)}</strong>
                </div>
                <p className="cfg-price-note">
                  Výsledná cena je orientační. Přesnou nabídku potvrdíme podle
                  finálního řešení a místa realizace.
                </p>

                {deliveryStatus === "sent" || deliveryStatus === "mailto" ? (
                  <p className="cfg-note" aria-live="polite">
                    {deliveryStatus === "sent"
                      ? "Konfiguraci máme. Ozveme se obvykle do jednoho pracovního dne s návrhem dalšího kroku."
                      : "Připravili jsme vám e-mail s konfigurací. Zkontrolujte ho a odešlete ve svém e-mailovém programu."}
                  </p>
                ) : (
                  <form className="contact-form" onSubmit={onSubmit}>
                    <div className="honeypot" aria-hidden="true">
                      <label htmlFor="cfg-website">Web</label>
                      <input
                        id="cfg-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
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
                    <button
                      type="submit"
                      className="btn btn-ink btn-arrow btn-block"
                      disabled={deliveryStatus === "sending"}
                    >
                      {deliveryStatus === "sending"
                        ? "Odesílám…"
                        : "Odeslat nezávaznou poptávku"}
                      <ArrowIcon />
                    </button>
                    <p className="form-note">
                      Údaje použijeme pouze k vyřízení poptávky. Více v{" "}
                      <Link href="/ochrana-osobnich-udaju">
                        ochraně osobních údajů
                      </Link>
                      .
                    </p>
                    <p className="form-status" aria-live="polite">
                      {deliveryStatus === "sending"
                        ? "Odesíláme konfiguraci…"
                        : ""}
                    </p>
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
                    <h4>Konstrukce obvodové stěny</h4>
                    <ol className="cfg-layers">
                      {WALL_LAYERS.map((layer) => (
                        <li key={layer}>{layer}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <button
                  type="button"
                  className="cfg-accordion"
                  onClick={() => setShowSuppliers((v) => !v)}
                  aria-expanded={showSuppliers}
                >
                  <span>Naši dodavatelé</span>
                  <span aria-hidden="true">{showSuppliers ? "−" : "+"}</span>
                </button>
                {showSuppliers && (
                  <div className="cfg-accordion-body">
                    <p className="cfg-accordion-intro">
                      Při výrobě chatek na kolech využíváme materiály a
                      komponenty od ověřených dodavatelů a výrobců.
                    </p>
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
