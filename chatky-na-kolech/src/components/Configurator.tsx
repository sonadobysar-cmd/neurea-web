"use client";

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
import { HousePreview } from "./HousePreview";
import { ArrowIcon } from "./Icons";

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
          aria-label={`Snížit ${label} o ${fine} m`}
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
          aria-label={`Zvýšit ${label} o ${fine} m`}
          onClick={() => onChange(clampDim(value + fine, min, max, fine))}
        >
          +
        </button>
      </div>
      <div className="dim-scale">
        <span>{formatM(min)}</span>
        <span className="dim-hint">slider {step} m · jemně ±{fine} m</span>
        <span>{formatM(max)}</span>
      </div>
    </div>
  );
}

export function Configurator() {
  const [cfg, setCfg] = useState<ConfigState>(DEFAULT_CONFIG);
  const [sent, setSent] = useState(false);
  const [showIncluded, setShowIncluded] = useState(false);

  const prices = useMemo(() => calcPrices(cfg), [cfg]);
  const facade = FACADES.find((f) => f.id === cfg.facade)!;
  const showPaint = !facade.includesPaint;
  const showLofts = cfg.roof !== "kulata";
  const roundAvailable = cfg.width === 2.5;

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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

  return (
    <div className="configurator">
      <aside className="cfg-stage">
        <div className="cfg-stage-label">chatkynakolech.cz · živý náhled</div>
        <div className="cfg-canvas">
          <HousePreview
            length={cfg.length}
            width={cfg.width}
            roof={cfg.roof}
            facade={cfg.facade}
            loft={cfg.loft}
            hasBathroom={cfg.bathroom === "yes"}
            hasKitchen={cfg.kitchen === "yes"}
          />
        </div>

        <div className="cfg-metrics">
          <div>
            <span>Podlaha</span>
            <strong>{formatM2(prices.floorArea)}</strong>
          </div>
          <div>
            <span>Stěny · {formatM(prices.wallHeight)}</span>
            <strong>{formatM2(prices.wallArea)}</strong>
          </div>
          <div>
            <span>Střecha</span>
            <strong>{formatM2(prices.roofArea)}</strong>
          </div>
        </div>

        <div className="cfg-summary">
          <div>
            <span>Orientační cena</span>
            <strong>{formatCzk(prices.total)}</strong>
          </div>
          <a href="#cfg-poptavka" className="btn btn-oak btn-arrow">
            Poslat poptávku
            <ArrowIcon />
          </a>
        </div>
      </aside>

      <div className="cfg-panel">
        {/* 1 Rozměry */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>01</span>
            <h3>Rozměry</h3>
          </div>
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
          <p className="cfg-note">
            Základní cena: do 30 m² vyšší sazba za m², nad 30 m² nižší. Výška stěn{" "}
            {formatM(prices.wallHeight)}
            {cfg.loft !== "none" ? " (zvýšeno kvůli loftu)" : ""}.
          </p>
        </section>

        {/* 2 Střecha */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>02</span>
            <h3>Typ střechy</h3>
          </div>
          <div className="cfg-options">
            {ROOF_TYPES.map((r) => {
              const locked = r.id === "kulata" && !roundAvailable;
              return (
                <button
                  key={r.id}
                  type="button"
                  disabled={locked}
                  className={`cfg-opt${cfg.roof === r.id ? " is-active" : ""}${
                    locked ? " is-locked" : ""
                  }`}
                  onClick={() => !locked && set("roof", r.id)}
                >
                  <span className="opt-label">{r.label}</span>
                  <span className="opt-meta">
                    {locked
                      ? "Dostupné jen při šířce 2,5 m"
                      : r.surchargePerM2
                        ? `+ ${formatCzk(r.surchargePerM2)}/m²`
                        : r.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3 Fasáda */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>03</span>
            <h3>Fasáda</h3>
          </div>
          <div className="cfg-samples">
            {FACADES.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`cfg-sample${cfg.facade === f.id ? " is-active" : ""}`}
                onClick={() => set("facade", f.id)}
              >
                <span className="cfg-sample-swatch">
                  <Image src={f.sample} alt="" width={56} height={56} />
                </span>
                <span className="cfg-sample-text">
                  <span className="opt-label">{f.label}</span>
                  <span className="opt-meta">
                    {f.id === "half"
                      ? "polovina dřevo + polovina plech"
                      : f.includesPaint
                        ? "cena včetně nátěru"
                        : `${formatCzk(f.pricePerM2)}/m²`}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4 Nátěr */}
        {showPaint && (
          <section className="cfg-block">
            <div className="cfg-step">
              <span>04</span>
              <h3>Nátěr</h3>
            </div>
            <div className="cfg-options row">
              <button
                type="button"
                className={`cfg-opt${cfg.paint === "none" ? " is-active" : ""}`}
                onClick={() => set("paint", "none")}
              >
                <span className="opt-label">{PAINT.none.label}</span>
              </button>
              <button
                type="button"
                className={`cfg-opt${cfg.paint === "yes" ? " is-active" : ""}`}
                onClick={() => set("paint", "yes")}
              >
                <span className="opt-label">{PAINT.yes.label}</span>
                <span className="opt-meta">
                  + {formatCzk(PAINT.yes.pricePerM2)}/m² fasády
                </span>
              </button>
            </div>
          </section>
        )}

        {/* 5 Koupelna */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>05</span>
            <h3>Koupelna</h3>
          </div>
          <div className="cfg-options row">
            <button
              type="button"
              className={`cfg-opt${cfg.bathroom === "none" ? " is-active" : ""}`}
              onClick={() => set("bathroom", "none")}
            >
              <span className="opt-label">Ne</span>
            </button>
            <button
              type="button"
              className={`cfg-opt${cfg.bathroom === "yes" ? " is-active" : ""}`}
              onClick={() => set("bathroom", "yes")}
            >
              <span className="opt-label">Ano</span>
            </button>
          </div>
          {cfg.bathroom === "yes" && (
            <div className="cfg-options cfg-sub">
              {BATHROOM_VARIANTS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`cfg-opt${cfg.bathVariant === b.id ? " is-active" : ""}`}
                  onClick={() => set("bathVariant", b.id)}
                >
                  <span className="opt-label">{b.label}</span>
                  <span className="opt-meta">
                    {b.desc} · {formatCzk(b.price)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 6 Podlahové vytápění */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>06</span>
            <h3>Podlahové vytápění</h3>
          </div>
          <div className="cfg-options row">
            <button
              type="button"
              className={`cfg-opt${cfg.floorHeating === "none" ? " is-active" : ""}`}
              onClick={() => set("floorHeating", "none")}
            >
              <span className="opt-label">Ne</span>
            </button>
            <button
              type="button"
              className={`cfg-opt${cfg.floorHeating === "yes" ? " is-active" : ""}`}
              onClick={() => set("floorHeating", "yes")}
            >
              <span className="opt-label">Ano</span>
              <span className="opt-meta">
                pevná cena dle plochy ({prices.floorArea <= 30 ? "do" : "nad"} 30 m²)
              </span>
            </button>
          </div>
        </section>

        {/* 7 Zateplení */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>07</span>
            <h3>Dodatečné zateplení</h3>
          </div>
          <div className="cfg-options row">
            <button
              type="button"
              className={`cfg-opt${cfg.insulation === "none" ? " is-active" : ""}`}
              onClick={() => set("insulation", "none")}
            >
              <span className="opt-label">Ne</span>
            </button>
            <button
              type="button"
              className={`cfg-opt${cfg.insulation === "yes" ? " is-active" : ""}`}
              onClick={() => set("insulation", "yes")}
            >
              <span className="opt-label">Ano</span>
              <span className="opt-meta">
                (stěny + střecha) × sazba / m²
              </span>
            </button>
          </div>
        </section>

        {/* 8 Lofty */}
        {showLofts && (
          <section className="cfg-block">
            <div className="cfg-step">
              <span>08</span>
              <h3>Spací lofty</h3>
            </div>
            <div className="cfg-options">
              {LOFTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`cfg-opt${cfg.loft === l.id ? " is-active" : ""}`}
                  onClick={() => set("loft", l.id)}
                >
                  <span className="opt-label">{l.label}</span>
                  <span className="opt-meta">
                    {l.count > 0
                      ? `${formatCzk(l.price)} · výška stěn 3,5 m`
                      : "výška stěn 2,5 m"}
                  </span>
                </button>
              ))}
            </div>
            {cfg.loft !== "none" && (
              <p className="cfg-note">
                Loft automaticky zvedá obvodové stěny na 3,5 m a přepočítá fasádu,
                nátěr i zateplení.
              </p>
            )}
          </section>
        )}

        {/* 9 Kuchyň */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>09</span>
            <h3>Kuchyň</h3>
          </div>
          <div className="cfg-options row">
            <button
              type="button"
              className={`cfg-opt${cfg.kitchen === "none" ? " is-active" : ""}`}
              onClick={() => set("kitchen", "none")}
            >
              <span className="opt-label">Ne</span>
            </button>
            <button
              type="button"
              className={`cfg-opt${cfg.kitchen === "yes" ? " is-active" : ""}`}
              onClick={() => set("kitchen", "yes")}
            >
              <span className="opt-label">Ano</span>
            </button>
          </div>
          {cfg.kitchen === "yes" && (
            <div className="cfg-options cfg-sub">
              {KITCHEN_VARIANTS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className={`cfg-opt${cfg.kitchenVariant === k.id ? " is-active" : ""}`}
                  onClick={() => set("kitchenVariant", k.id)}
                >
                  <span className="opt-label">{k.label}</span>
                  <span className="opt-meta">
                    {k.desc} · {formatCzk(k.price)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 10 Pokoj */}
        <section className="cfg-block">
          <div className="cfg-step">
            <span>10</span>
            <h3>Samostatný pokoj</h3>
          </div>
          <div className="cfg-options row">
            <button
              type="button"
              className={`cfg-opt${cfg.room === "none" ? " is-active" : ""}`}
              onClick={() => set("room", "none")}
            >
              <span className="opt-label">Ne</span>
            </button>
            <button
              type="button"
              className={`cfg-opt${cfg.room === "yes" ? " is-active" : ""}`}
              onClick={() => set("room", "yes")}
            >
              <span className="opt-label">Ano</span>
              <span className="opt-meta">{formatCzk(ROOM.yes.price)}</span>
            </button>
          </div>
        </section>

        {/* Rekapitulace */}
        <section className="cfg-block cfg-recap">
          <div className="cfg-step">
            <span>✓</span>
            <h3>Rekapitulace</h3>
          </div>
          <dl className="recap-grid">
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
            {showPaint && (
              <div>
                <dt>Nátěr</dt>
                <dd>{cfg.paint === "yes" ? "S nátěrem" : "Bez nátěru"}</dd>
              </div>
            )}
            <div>
              <dt>Koupelna</dt>
              <dd>{bathLabel}</dd>
            </div>
            <div>
              <dt>Podlahové vytápění</dt>
              <dd>{cfg.floorHeating === "yes" ? "Ano" : "Ne"}</dd>
            </div>
            <div>
              <dt>Dodatečné zateplení</dt>
              <dd>{cfg.insulation === "yes" ? "Ano" : "Ne"}</dd>
            </div>
            {showLofts && (
              <div>
                <dt>Lofty</dt>
                <dd>{loftLabel}</dd>
              </div>
            )}
            <div>
              <dt>Kuchyň</dt>
              <dd>{kitchenLabel}</dd>
            </div>
            <div>
              <dt>Samostatný pokoj</dt>
              <dd>{cfg.room === "yes" ? "Ano" : "Ne"}</dd>
            </div>
          </dl>

          <div className="recap-breakdown">
            <div>
              <span>Základ ({formatM2(prices.floorArea)})</span>
              <span>{formatCzk(prices.base)}</span>
            </div>
            {prices.roofSurcharge > 0 && (
              <div>
                <span>Kulatá střecha</span>
                <span>{formatCzk(prices.roofSurcharge)}</span>
              </div>
            )}
            <div>
              <span>Fasáda</span>
              <span>{formatCzk(prices.facade)}</span>
            </div>
            {prices.paint > 0 && (
              <div>
                <span>Nátěr</span>
                <span>{formatCzk(prices.paint)}</span>
              </div>
            )}
            {prices.bathroom > 0 && (
              <div>
                <span>Koupelna</span>
                <span>{formatCzk(prices.bathroom)}</span>
              </div>
            )}
            {prices.floorHeating > 0 && (
              <div>
                <span>Podlahové vytápění</span>
                <span>{formatCzk(prices.floorHeating)}</span>
              </div>
            )}
            {prices.insulation > 0 && (
              <div>
                <span>Dodatečné zateplení</span>
                <span>{formatCzk(prices.insulation)}</span>
              </div>
            )}
            {prices.loft > 0 && (
              <div>
                <span>Lofty</span>
                <span>{formatCzk(prices.loft)}</span>
              </div>
            )}
            {prices.kitchen > 0 && (
              <div>
                <span>Kuchyň</span>
                <span>{formatCzk(prices.kitchen)}</span>
              </div>
            )}
            {prices.room > 0 && (
              <div>
                <span>Samostatný pokoj</span>
                <span>{formatCzk(prices.room)}</span>
              </div>
            )}
            <div className="recap-total">
              <span>Celkem orientačně</span>
              <strong>{formatCzk(prices.total)}</strong>
            </div>
          </div>
        </section>

        {/* Poptávka */}
        <section className="cfg-block" id="cfg-poptavka">
          <div className="cfg-step">
            <span>→</span>
            <h3>Hotovo? Pošlete to nám</h3>
          </div>
          {sent ? (
            <p className="cfg-note" style={{ fontSize: "1.05rem" }}>
              Konfiguraci máme. Ozveme se do 24 hodin s upřesněním a návrhem
              dalšího kroku — konzultace, termín, případně úpravy.
            </p>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="cfg-name">Jméno</label>
                <input id="cfg-name" name="name" required placeholder="Jak vám máme říkat?" />
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
                  <option value="airbnb">Airbnb / investice</option>
                  <option value="kemp">Kemp / výměna chatek</option>
                  <option value="jine">Zatím nevím</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cfg-note">Poznámka</label>
                <textarea
                  id="cfg-note"
                  name="note"
                  placeholder="Pozemek, lokalita, kapacita, termín…"
                />
              </div>
              <input type="hidden" name="config" value={JSON.stringify({ cfg, prices })} />
              <button type="submit" className="btn btn-ink btn-arrow">
                Odeslat konfiguraci a poptávku
                <ArrowIcon />
              </button>
              <p className="cfg-note">
                Cena je orientační. Finál doladíme po krátké konzultaci — bez
                závazku.
              </p>
            </form>
          )}
        </section>

        {/* Included + construction + suppliers */}
        <section className="cfg-block cfg-extras-info">
          <button
            type="button"
            className="cfg-accordion"
            onClick={() => setShowIncluded((v) => !v)}
            aria-expanded={showIncluded}
          >
            <span>Co je v základní ceně · skladba stěny · dodavatelé</span>
            <span aria-hidden="true">{showIncluded ? "−" : "+"}</span>
          </button>
          {showIncluded && (
            <div className="cfg-accordion-body">
              <h4>V základní ceně je zahrnuto</h4>
              <ul className="cfg-bullets">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Konstrukce obvodové stěny</h4>
              <p className="cfg-note" style={{ marginBottom: "0.75rem" }}>
                Od exteriéru do interiéru:
              </p>
              <ol className="cfg-layers">
                {WALL_LAYERS.map((layer) => (
                  <li key={layer}>{layer}</li>
                ))}
              </ol>
              <h4>Dodavatelé</h4>
              <p className="cfg-note" style={{ marginBottom: "0.75rem" }}>
                Materiály a komponenty od ověřených partnerů:
              </p>
              <div className="cfg-suppliers">
                {SUPPLIERS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
