"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "shuffling" | "pick" | "won";

function Hat({
  index,
  hasRabbit,
  lifted,
  onPick,
  disabled,
  offset,
}: {
  index: number;
  hasRabbit: boolean;
  lifted: boolean;
  onPick: () => void;
  disabled: boolean;
  offset: number;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPick}
      className={`robin-hat mx-auto block bg-transparent ${lifted ? "robin-hat--lifted" : ""}`}
      style={{ transform: `translateX(${offset}px)` }}
      aria-label={`Klobouk ${index + 1}`}
    >
      <span className={`robin-rabbit ${lifted && hasRabbit ? "robin-rabbit--show" : ""}`}>🐰</span>
      <div className="robin-hat-crown" />
      <div className="robin-hat-band" />
      <div className="robin-hat-brim" />
    </button>
  );
}

export function HatShuffleGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [rabbitPos, setRabbitPos] = useState(1);
  const rabbitPosRef = useRef(1);
  const [offsets, setOffsets] = useState([0, 0, 0]);
  const [liftedHat, setLiftedHat] = useState<number | null>(null);
  const [message, setMessage] = useState("Králíček se schoval pod jeden ze tří klobouků. Najdeš ho?");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const shuffle = () => {
    clearTimers();
    setLiftedHat(null);
    setPhase("shuffling");
    setMessage("Kouzla! Míchám klobouky…");
    const pos = Math.floor(Math.random() * 3);
    setRabbitPos(pos);
    rabbitPosRef.current = pos;

    const sequences = [
      [-70, 70, 0],
      [70, -70, 0],
      [0, -80, 80],
      [-90, 45, 45],
    ];
    let step = 0;
    const runStep = () => {
      if (step >= sequences.length) {
        setOffsets([0, 0, 0]);
        setPhase("pick");
        setMessage("Pod kterým kloboukem je králíček? Klikni!");
        return;
      }
      setOffsets(sequences[step]!);
      step++;
      schedule(runStep, 380);
    };
    runStep();
  };

  const pick = (hatIndex: number) => {
    if (phase !== "pick") return;
    setLiftedHat(hatIndex);
    setPhase("won");
    const pos = rabbitPosRef.current;
    setMessage(
      hatIndex === pos
        ? "Našel jsi ho! 🎉 Stejně tak okouzlím i tvoje hosty."
        : "Hmm… tentokrát ne. Ale naživo vždycky kouzla vyjdou!",
    );
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setLiftedHat(null);
    setOffsets([0, 0, 0]);
    setRabbitPos(1);
    rabbitPosRef.current = 1;
    setMessage("Králíček se schoval pod jeden ze tří klobouků. Najdeš ho?");
  };

  return (
    <section id="hra" className="robin-tablecloth relative py-20 md:py-28">
      <div className="robin-content mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <span className="robin-booth-sub inline-block rounded-full bg-black px-4 py-1.5 text-[var(--robin-gold)]">
            Interaktivní kouzlo
          </span>
          <h2
            className="robin-booth-title mt-5 text-4xl text-white md:text-6xl"
            style={{ textShadow: "3px 3px 0 #000" }}
          >
            Najdi králíčka
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-semibold text-white/95">{message}</p>
        </div>

        <div className="robin-panel mx-auto mt-12 max-w-2xl p-8 md:p-12">
          <div className="flex items-end justify-center gap-4 md:gap-10">
            {[0, 1, 2].map((i) => (
              <Hat
                key={i}
                index={i}
                hasRabbit={i === rabbitPos}
                lifted={liftedHat === i}
                onPick={() => pick(i)}
                disabled={phase !== "pick"}
                offset={offsets[i] ?? 0}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {phase === "idle" && (
              <button type="button" className="robin-btn robin-btn--dark" onClick={shuffle}>
                🎩 Zahájit kouzlo
              </button>
            )}
            {phase === "shuffling" && (
              <p className="font-bold uppercase tracking-wider text-[var(--robin-ink)]">Míchám…</p>
            )}
            {phase === "won" && (
              <>
                <button type="button" className="robin-btn robin-btn--light" onClick={reset}>
                  Hrát znovu
                </button>
                <a href="#kontakt" className="robin-btn robin-btn--red">
                  Objednat Robina
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
