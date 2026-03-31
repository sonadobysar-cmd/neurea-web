"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getScreening } from "@/lib/screenings";

type Props = {
  slug: string;
};

const shell = "mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24";

export function ScreeningRunner({ slug }: Props) {
  const screening = getScreening(slug);
  const qCount = screening?.questions.length ?? 0;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => Array(qCount).fill(-1));
  const [done, setDone] = useState(false);

  const progress = useMemo(() => {
    if (!qCount) return 0;
    return Math.round(((step + (done ? 1 : 0)) / qCount) * 100);
  }, [step, done, qCount]);

  if (!screening || !qCount) {
    return (
      <div className={shell}>
        <p className="text-ink/65">Test nebyl nalezen.</p>
        <Link href="/testy" className="mt-4 inline-block font-medium text-gold transition hover:underline">
          Zpět na testy
        </Link>
      </div>
    );
  }

  const s = screening;
  const current = s.questions[step];

  function setAnswer(value: number) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
  }

  function next() {
    if (answers[step] < 0) return;
    if (step < s.questions.length - 1) setStep(step + 1);
    else setDone(true);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  const result = done ? s.interpret(answers) : null;

  const phq9Risk = s.slug === "deprese" && answers[8] !== undefined && answers[8] > 0;

  if (done && result) {
    return (
      <div className={shell}>
        <p className="eyebrow">Výsledek</p>
        <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
          Shrnutí
        </h1>
        <div className="mt-10 glass-panel-strong p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-wider text-ink/45">Součet bodů (orientačně)</p>
          <p className="mt-2 font-display text-4xl text-gold">{result.raw}</p>
          <h2 className="mt-8 font-display text-2xl font-normal text-ink">{result.label}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/72">{result.detail}</p>
        </div>
        {phq9Risk && (
          <div className="mt-6 rounded-2xl border border-red-200/90 bg-red-50/95 p-5 text-sm leading-relaxed text-red-900 shadow-luxury">
            Uvedli jste přítomnost obtížných myšlenek. V krizi volejte{" "}
            <strong>122</strong> (linky důvěry) nebo <strong>155</strong> (krizová linka), při akutním
            nebezpečí <strong>155</strong> nebo <strong>112</strong>.
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/rezervace" className="btn-primary">
            <span>Rezervovat vstupní diagnostiku</span>
          </Link>
          <Link href="/testy" className="btn-secondary">
            <span>Další testy</span>
          </Link>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-ink/45">
          Tento výsledek není diagnóza. Rozhodnutí vždy náleží kvalifikovanému odborníkovi.
        </p>
      </div>
    );
  }

  return (
    <div className={shell}>
      <p className="eyebrow">Screening</p>
      <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink md:text-[2.35rem]">
        {s.title}
      </h1>
      <p className="mt-3 text-ink/58">{s.subtitle}</p>
      <p className="mt-2 text-xs text-ink/40">{s.scaleNote}</p>

      <div className="mt-8 rounded-2xl border border-amber-200/70 bg-amber-50/90 p-5 text-sm leading-relaxed text-ink/78 shadow-luxury">
        <strong className="text-ink">Upozornění:</strong> orientační dotazník nenahrazuje vyšetření u
        odborníka.
      </div>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-sand/90">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/90 to-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wider text-ink/40">
        Otázka {step + 1} z {s.questions.length}
      </p>

      <div className="mt-8 glass-panel-strong p-7 md:p-9">
        <p className="text-lg leading-relaxed text-ink md:text-xl">{current.text}</p>
        <div className="mt-7 flex flex-col gap-2.5">
          {s.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAnswer(opt.value)}
              className={`rounded-xl border px-5 py-3.5 text-left text-sm transition md:text-base ${
                answers[step] === opt.value
                  ? "border-gold bg-white shadow-luxury ring-1 ring-gold/35"
                  : "border-ink/[0.08] bg-white/70 hover:border-gold/35 hover:bg-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="btn-secondary !min-h-0 px-6 py-2.5"
            >
              <span>Zpět</span>
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={answers[step] < 0}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>{step === s.questions.length - 1 ? "Vyhodnotit" : "Pokračovat"}</span>
          </button>
        </div>
      </div>

      <Link
        href="/testy"
        className="mt-12 inline-block text-sm font-medium text-ink/50 transition hover:text-gold"
      >
        ← Zpět na výběr testů
      </Link>
    </div>
  );
}
