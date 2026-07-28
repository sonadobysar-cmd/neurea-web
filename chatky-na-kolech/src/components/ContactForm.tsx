"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p style={{ opacity: 0.75, fontWeight: 300, fontSize: "1.1rem" }}>
        Děkujeme. Ozveme se co nejdřív — obvykle do jednoho pracovního dne.
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
        <input id="name" name="name" required placeholder="Vaše jméno" />
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
        <label htmlFor="msg">Zpráva</label>
        <textarea
          id="msg"
          name="msg"
          required
          placeholder="Řekněte nám o pozemku, termínu nebo snu…"
        />
      </div>
      <button type="submit" className="btn btn-ink btn-arrow">
        Poslat zprávu
        <ArrowIcon />
      </button>
    </form>
  );
}
