"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/data/content";
import { deliverContact } from "@/lib/contact-client";
import { ArrowIcon } from "./Icons";

const INTENTS = [
  { value: "novy", label: "Nový tiny house" },
  { value: "renovace", label: "Opravy & renovace" },
  { value: "byznys", label: "Airbnb & investice" },
  { value: "kempy", label: "Rekonstrukce kempů / výměna chatek" },
  { value: "jine", label: "Zatím nevím — chci poradit" },
] as const;

const PLACEHOLDERS: Record<string, string> = {
  renovace: "Stav chatky, co chcete změnit, lokalita…",
  byznys: "Kapacita, lokalita, Airbnb / glamping, termín…",
  kempy: "Velikost kempu, počet chatek, sezóna, co vyměnit…",
  jine: "Stručně popište záměr…",
  novy: "Pozemek, lokalita, termín…",
};

export function ContactForm({
  submitLabel = "Poslat a domluvit další krok",
}: {
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">(
    "idle",
  );
  const [intent, setIntent] = useState("novy");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("zamer");
    if (q === "renovace" || q === "byznys" || q === "kempy" || q === "novy") {
      setIntent(q);
    }
    const hash = window.location.hash;
    if (hash.includes("renovace")) setIntent("renovace");
    if (hash.includes("byznys")) setIntent("byznys");
    if (hash.includes("kempy")) setIntent("kempy");
  }, []);

  if (status === "sent" || status === "mailto") {
    return (
      <div aria-live="polite">
        <p style={{ opacity: 0.75, fontWeight: 300, fontSize: "1.1rem" }}>
          {status === "sent"
            ? "Máme to. Ozveme se obvykle do jednoho pracovního dne s konkrétním dalším krokem."
            : "Připravili jsme vám e-mail s celou poptávkou. Zkontrolujte ho a odešlete ve svém e-mailovém programu."}
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        const data = new FormData(e.currentTarget);
        const result = await deliverContact(brand.email, {
          source: "homepage",
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          intent,
          message: String(data.get("msg") ?? ""),
          website: String(data.get("website") ?? ""),
        });
        setStatus(result);
      }}
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
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
          placeholder={PLACEHOLDERS[intent] ?? PLACEHOLDERS.novy}
        />
      </div>
      <button
        type="submit"
        className="btn btn-ink btn-arrow"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Odesílám…" : submitLabel}
        <ArrowIcon />
      </button>
      <p className="form-note">
        Údaje použijeme pouze k vyřízení poptávky. Podrobnosti najdete v{" "}
        <Link href="/ochrana-osobnich-udaju">ochraně osobních údajů</Link>.
      </p>
      <p className="form-status" aria-live="polite">
        {status === "sending" ? "Odesíláme vaši poptávku…" : ""}
      </p>
    </form>
  );
}
