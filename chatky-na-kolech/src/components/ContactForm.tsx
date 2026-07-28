"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./Icons";

const INTENTS = [
  { value: "novy", label: "Nový tiny house" },
  { value: "renovace", label: "Opravy & renovace" },
  { value: "byznys", label: "Pro byznys (Airbnb / kemp)" },
  { value: "jine", label: "Zatím nevím — chci poradit" },
] as const;

export function ContactForm({
  submitLabel = "Poslat a domluvit další krok",
}: {
  submitLabel?: string;
}) {
  const [sent, setSent] = useState(false);
  const [intent, setIntent] = useState("novy");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("zamer");
    if (q === "renovace" || q === "byznys" || q === "novy") setIntent(q);
    const hash = window.location.hash;
    if (hash.includes("renovace")) setIntent("renovace");
    if (hash.includes("byznys")) setIntent("byznys");
  }, []);

  if (sent) {
    return (
      <p style={{ opacity: 0.75, fontWeight: 300, fontSize: "1.1rem" }}>
        Máme to. Ozveme se — obvykle do jednoho pracovního dne — s konkrétním
        dalším krokem.
      </p>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="field">
        <label htmlFor="intent">Záměr</label>
        <select
          id="intent"
          name="intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        >
          {INTENTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="name">Jméno</label>
        <input id="name" name="name" required placeholder="Jak vám máme říkat?" />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required placeholder="vas@email.cz" />
      </div>
      <div className="field">
        <label htmlFor="phone">Telefon</label>
        <input id="phone" name="phone" type="tel" placeholder="+420…" />
      </div>
      <div className="field">
        <label htmlFor="msg">Stručně k projektu</label>
        <textarea
          id="msg"
          name="msg"
          required
          placeholder={
            intent === "renovace"
              ? "Stav chatky, co chcete změnit, lokalita…"
              : intent === "byznys"
                ? "Kapacita, lokalita, Airbnb / kemp, termín…"
                : "Pozemek, lokalita, termín…"
          }
        />
      </div>
      <button type="submit" className="btn btn-ink btn-arrow">
        {submitLabel}
        <ArrowIcon />
      </button>
    </form>
  );
}
