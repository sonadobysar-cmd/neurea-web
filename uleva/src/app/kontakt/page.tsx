"use client";

import { FormEvent, useState } from "react";
import { TodoNote } from "@/components/LegalDoc";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="shell max-w-2xl pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Kontakt</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">Lidská podpora MamaSOS</h1>
      <p className="mt-4 text-ink-soft">
        AI pomáhá s výběrem služby. Při problému s rezervací, platbou nebo
        ověřením pište podpoře — nejsme jen chatbot.
      </p>

      <div className="panel-solid mt-8 space-y-3 p-6 text-sm">
        <p>
          <span className="font-bold">E-mail:</span>{" "}
          <a href="mailto:ahoj@mamasos.cz" className="underline">
            ahoj@mamasos.cz
          </a>
        </p>
        <TodoNote>
          Doplnit produkční telefon / callback a přesnou provozní dobu podpory.
        </TodoNote>
        <p className="text-ink-soft">
          Urgentní problém s dnešní rezervací: uveďte v předmětu „URGENTNÍ
          REZERVACE“ a číslo rezervace.
        </p>
        <p className="text-ink-soft">
          Zdravotní potíže neřešíme — volejte lékaře nebo 155.
        </p>
      </div>

      {sent ? (
        <div className="mt-8 rounded-2xl bg-[rgba(92,122,114,0.12)] p-5 text-moss">
          Zpráva odeslána (demo). Ozveme se e-mailem.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="panel-solid mt-8 space-y-4 p-6">
          <h2 className="display text-2xl">Napište nám</h2>
          <label className="block text-sm font-semibold">
            Jméno
            <input required name="name" className="input mt-1.5" />
          </label>
          <label className="block text-sm font-semibold">
            E-mail
            <input required type="email" name="email" className="input mt-1.5" />
          </label>
          <label className="block text-sm font-semibold">
            Zpráva
            <textarea required name="message" rows={4} className="input mt-1.5" />
          </label>
          <button type="submit" className="btn btn-rose w-full">
            Odeslat
          </button>
        </form>
      )}
    </div>
  );
}
