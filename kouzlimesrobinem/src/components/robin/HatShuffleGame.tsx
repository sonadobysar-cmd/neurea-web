"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "idle" | "shuffling" | "pick" | "won";

/** Klobouk i → slot 0 = vlevo, 1 = střed, 2 = vpravo */
function swapAdjacentSlots(slots: number[], pair: 0 | 1): number[] {
  const next = [...slots];
  const leftHat = next.findIndex((s) => s === pair);
  const rightHat = next.findIndex((s) => s === pair + 1);
  if (leftHat < 0 || rightHat < 0) return next;
  next[leftHat] = pair + 1;
  next[rightHat] = pair;
  return next;
}

function Hat({
  slot,
  shuffling,
  lifted,
  onPick,
  disabled,
  showRabbit,
}: {
  slot: number;
  shuffling: boolean;
  lifted: boolean;
  onPick: () => void;
  disabled: boolean;
  showRabbit: boolean;
}) {
  return (
    <div
      className={`robin-hat-slot ${shuffling ? "robin-hat-slot--shuffling" : ""}`}
      style={{ "--hat-slot": slot } as CSSProperties}
    >
      <div className={`robin-rabbit-pedestal ${showRabbit ? "robin-rabbit-pedestal--show" : ""}`} aria-hidden={!showRabbit}>
        🐰
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onPick}
        className={`robin-hat ${lifted ? "robin-hat--lifted" : ""}`}
        aria-label={`Klobouk ve sloupci ${slot + 1}`}
      >
        <div className={`robin-hat-body ${lifted ? "robin-hat-body--lifted" : ""}`}>
          <div className="robin-hat-crown" />
          <div className="robin-hat-band" />
          <div className="robin-hat-brim" />
        </div>
      </button>
    </div>
  );
}

export function HatShuffleGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [rabbitHat, setRabbitHat] = useState(1);
  const rabbitHatRef = useRef(1);
  /** hatSlots[i] = slot index of hat i */
  const [hatSlots, setHatSlots] = useState([0, 1, 2]);
  const [liftedHat, setLiftedHat] = useState<number | null>(null);
  const [message, setMessage] = useState("Králíček se schoval pod jeden ze tří klobouků. Najdeš ho!");
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

    const rabbit = Math.floor(Math.random() * 3);
    setRabbitHat(rabbit);
    rabbitHatRef.current = rabbit;

    let slots = [0, 1, 2];
    setHatSlots(slots);

    const totalSwaps = 9;
    let step = 0;

    const runSwap = () => {
      if (step >= totalSwaps) {
        setHatSlots(slots);
        setPhase("pick");
        setMessage("Pod kterým kloboukem je králíček? Klikni!");
        return;
      }
      const pair = (Math.random() < 0.5 ? 0 : 1) as 0 | 1;
      slots = swapAdjacentSlots(slots, pair);
      setHatSlots([...slots]);
      step++;
      schedule(runSwap, 420);
    };

    schedule(runSwap, 280);
  };

  const pick = (hatIndex: number) => {
    if (phase !== "pick") return;
    setLiftedHat(hatIndex);
    setPhase("won");
    setMessage(
      hatIndex === rabbitHatRef.current
        ? "Našel jsi ho! 🎉 Stejně tak okouzlím i tvoje hosty."
        : "Hmm… tentokrát ne. Ale naživo vždycky kouzla vyjdou!",
    );
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setLiftedHat(null);
    setHatSlots([0, 1, 2]);
    setRabbitHat(1);
    rabbitHatRef.current = 1;
    setMessage("Králíček se schoval pod jeden ze tří klobouků. Najdeš ho!");
  };

  return (
    <section id="hra" className="robin-tablecloth relative py-20 md:py-28">
      <div className="robin-content mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <span className="robin-game-badge">Interaktivní kouzlo</span>
          <h2 className="robin-booth-title robin-title-ink-shadow mt-5 text-4xl md:text-6xl">
            Najdi králíčka
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-semibold text-white/95">{message}</p>
        </div>

        <div className="robin-panel robin-panel--game mx-auto mt-12 max-w-2xl p-8 md:p-12">
          <div className="robin-hat-stage">
            {[0, 1, 2].map((hatIndex) => (
              <Hat
                key={hatIndex}
                slot={hatSlots[hatIndex] ?? hatIndex}
                shuffling={phase === "shuffling"}
                lifted={liftedHat === hatIndex}
                onPick={() => pick(hatIndex)}
                disabled={phase !== "pick"}
                showRabbit={liftedHat === hatIndex && hatIndex === rabbitHat}
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
