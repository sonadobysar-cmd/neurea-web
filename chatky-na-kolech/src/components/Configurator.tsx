"use client";

import { useMemo, useState } from "react";
import {
  claddingOptions,
  extras,
  interiorOptions,
  models,
  roofOptions,
} from "@/data/content";
import { HousePreview } from "./HousePreview";
import { ArrowIcon } from "./Icons";

function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(n);
}

export function Configurator() {
  const [modelId, setModelId] = useState(models[1].id);
  const [cladding, setCladding] = useState(claddingOptions[0].id);
  const [roof, setRoof] = useState(roofOptions[0].id);
  const [interior, setInterior] = useState(interiorOptions[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["stove", "bath"]);
  const [sent, setSent] = useState(false);

  const model = models.find((m) => m.id === modelId) ?? models[1];

  const total = useMemo(() => {
    let sum = model.from;
    sum += claddingOptions.find((c) => c.id === cladding)?.price ?? 0;
    sum += roofOptions.find((r) => r.id === roof)?.price ?? 0;
    sum += interiorOptions.find((i) => i.id === interior)?.price ?? 0;
    for (const id of selectedExtras) {
      sum += extras.find((e) => e.id === id)?.price ?? 0;
    }
    return sum;
  }, [model, cladding, roof, interior, selectedExtras]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="configurator">
      <div className="cfg-stage">
        <div className="cfg-stage-label">Živý náhled · {model.name}</div>
        <div className="cfg-canvas">
          <HousePreview
            cladding={cladding}
            roof={roof}
            interior={interior}
            extras={selectedExtras}
          />
        </div>
        <div className="cfg-summary">
          <div>
            <span>Odhadovaná investice</span>
            <strong>{formatCzk(total)}</strong>
          </div>
          <div>
            <span>Orientace</span>
            <strong style={{ fontSize: "1.15rem" }}>{model.size}</strong>
          </div>
        </div>
      </div>

      <div className="cfg-panel">
        <div className="cfg-block">
          <h3>1 · Model</h3>
          <div className="cfg-options">
            {models.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`cfg-opt${modelId === m.id ? " is-active" : ""}`}
                onClick={() => setModelId(m.id)}
              >
                <span className="opt-label">{m.name}</span>
                <span className="opt-meta">
                  {m.subtitle} · od {formatCzk(m.from)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cfg-block">
          <h3>2 · Fasáda</h3>
          <div className="cfg-options row">
            {claddingOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`cfg-opt${cladding === c.id ? " is-active" : ""}`}
                onClick={() => setCladding(c.id)}
              >
                <span className="opt-label">
                  <i className="cfg-swatch" style={{ background: c.swatch }} />
                  {c.label}
                </span>
                <span className="opt-meta">
                  {c.price ? `+ ${formatCzk(c.price)}` : "v základu"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cfg-block">
          <h3>3 · Střecha</h3>
          <div className="cfg-options">
            {roofOptions.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`cfg-opt${roof === r.id ? " is-active" : ""}`}
                onClick={() => setRoof(r.id)}
              >
                <span className="opt-label">{r.label}</span>
                <span className="opt-meta">
                  {r.price ? `+ ${formatCzk(r.price)}` : "v základu"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cfg-block">
          <h3>4 · Interiér</h3>
          <div className="cfg-options">
            {interiorOptions.map((i) => (
              <button
                key={i.id}
                type="button"
                className={`cfg-opt${interior === i.id ? " is-active" : ""}`}
                onClick={() => setInterior(i.id)}
              >
                <span className="opt-label">{i.label}</span>
                <span className="opt-meta">
                  {i.price ? `+ ${formatCzk(i.price)}` : "v základu"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cfg-block">
          <h3>5 · Výbava</h3>
          <div className="cfg-checks">
            {extras.map((ex) => {
              const on = selectedExtras.includes(ex.id);
              return (
                <label
                  key={ex.id}
                  className={`cfg-check${on ? " is-on" : ""}`}
                >
                  <span className="cfg-check-label">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleExtra(ex.id)}
                    />
                    {ex.label}
                  </span>
                  <span className="cfg-price-tag">+ {formatCzk(ex.price)}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="cfg-block" id="cfg-poptavka">
          <h3>6 · Nezávazná poptávka</h3>
          {sent ? (
            <p style={{ opacity: 0.75, fontWeight: 300 }}>
              Děkujeme. Vaši konfiguraci jsme přijali — ozveme se do 24 hodin s
              přesným návrhem a termínem konzultace.
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
                <label htmlFor="cfg-note">Poznámka</label>
                <textarea
                  id="cfg-note"
                  name="note"
                  placeholder="Pozemek, termín, speciální přání…"
                />
              </div>
              <input
                type="hidden"
                name="config"
                value={JSON.stringify({
                  model: modelId,
                  cladding,
                  roof,
                  interior,
                  extras: selectedExtras,
                  total,
                })}
              />
              <button type="submit" className="btn btn-ink btn-arrow">
                Odeslat konfiguraci
                <ArrowIcon />
              </button>
              <p style={{ fontSize: "0.82rem", opacity: 0.5, marginTop: "0.5rem" }}>
                Cena je orientační. Finální nabídku připravíme po konzultaci.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
