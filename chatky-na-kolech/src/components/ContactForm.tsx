"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

export function ContactForm({
  submitLabel = "Poslat a domluvit další krok",
}: {
  submitLabel?: string;
}) {
  const [sent, setSent] = useState(false);

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
        <label htmlFor="intent">Záměr</label>
        <select id="intent" name="intent" defaultValue="bydleni">
          <option value="bydleni">Vlastní bydlení / útočiště</option>
          <option value="airbnb">Airbnb / investice</option>
          <option value="kemp">Kemp / výměna chatek</option>
          <option value="jine">Zatím nevím — chci poradit</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="msg">Stručně k projektu</label>
        <textarea
          id="msg"
          name="msg"
          required
          placeholder="Pozemek, lokalita, kapacita kempu, termín…"
        />
      </div>
      <button type="submit" className="btn btn-ink btn-arrow">
        {submitLabel}
        <ArrowIcon />
      </button>
    </form>
  );
}
