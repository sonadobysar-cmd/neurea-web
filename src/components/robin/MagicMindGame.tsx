"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal } from "./ScrollReveal";

type Phase = "intro" | "memorize" | "shuffle" | "pick" | "reveal";

type Card = {
  id: number;
  rank: string;
  suit: string;
  red: boolean;
};

const PREDICTION: Card = { id: -1, rank: "7", suit: "♥", red: true };

const DECK: Card[] = [
  { id: 0, rank: "K", suit: "♠", red: false },
  { id: 1, rank: "7", suit: "♥", red: true },
  { id: 2, rank: "A", suit: "♦", red: true },
  { id: 3, rank: "J", suit: "♣", red: false },
  { id: 4, rank: "Q", suit: "♥", red: true },
  { id: 5, rank: "5", suit: "♠", red: false },
];

function CardFace({ card, faceDown = false, size = "md" }: { card: Card; faceDown?: boolean; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "h-44 w-32 md:h-52 md:w-36" : size === "sm" ? "h-24 w-[4.5rem]" : "h-32 w-24 md:h-36 md:w-28";
  if (faceDown) {
    return (
      <div
        className={`${sz} relative overflow-hidden rounded-xl border-[3px] border-white shadow-xl`}
        style={{
          background: "repeating-linear-gradient(45deg, #ff6b00, #ff6b00 8px, #ffd700 8px, #ffd700 16px)",
        }}
      >
        <div className="absolute inset-2 rounded-lg border-2 border-white/40 bg-gradient-to-br from-robin-orange to-robin-gold" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">✦</span>
      </div>
    );
  }
  return (
    <div
      className={`${sz} relative overflow-hidden rounded-xl border-[3px] border-white bg-gradient-to-br from-white to-[#fff5e0] shadow-xl`}
    >
      <span className={`absolute left-2 top-2 text-lg font-black leading-none ${card.red ? "text-red-600" : "text-black"}`}>
        {card.rank}
        <br />
        {card.suit}
      </span>
      <span className={`absolute bottom-2 right-2 rotate-180 text-lg font-black leading-none ${card.red ? "text-red-600" : "text-black"}`}>
        {card.rank}
        <br />
        {card.suit}
      </span>
      <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl ${card.red ? "text-red-500" : "text-black"}`}>
        {card.suit}
      </span>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        hue: [18, 45, 210, 340][i % 4],
        size: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue}, 100%, 55%)`,
          }}
          initial={{ top: "-5%", opacity: 1, rotate: 0 }}
          animate={{ top: "105%", opacity: 0, rotate: 720 }}
          transition={{ duration: 2.5, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export function MagicMindGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [picked, setPicked] = useState<number | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const startGame = useCallback(() => {
    setPhase("memorize");
    setPicked(null);
    setTimeout(() => {
      setPhase("shuffle");
      setShuffleKey((k) => k + 1);
      setTimeout(() => setPhase("pick"), 2200);
    }, 3500);
  }, []);

  const onPick = (id: number) => {
    if (phase !== "pick") return;
    setPicked(id);
    setTimeout(() => setPhase("reveal"), 400);
  };

  const revealCards = DECK.map((c, i) => (picked === i ? { ...PREDICTION, id: c.id } : c));

  return (
    <section id="hra" className="relative overflow-hidden py-20 md:py-28">
      <div className="robin-game-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="robin-sticker inline-block rotate-[-2deg] bg-robin-red px-4 py-1 font-robin-display text-sm font-black uppercase text-white shadow-lg">
              Interaktivní kouzlo
            </span>
            <h2 className="mt-6 font-robin-display text-4xl font-black uppercase leading-tight text-white md:text-6xl">
              Robin čte
              <span className="block bg-gradient-to-r from-robin-gold via-yellow-300 to-robin-orange bg-clip-text text-transparent">
                tvoje myšlenky
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Vyzkoušej mentalismus přímo tady — stejně jako naživo u představení.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] border-4 border-black bg-gradient-to-br from-[#1a0a2e] via-[#2d1050] to-[#1a0533] p-6 shadow-[0_20px_60px_rgba(255,107,0,0.35)] md:p-10">
          {/* Stage curtains */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-robin-red/80 to-transparent md:w-14" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-robin-red/80 to-transparent md:w-14" aria-hidden />

          {phase === "reveal" && <Confetti />}

          {/* Prediction envelope */}
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={phase === "reveal" ? { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] } : {}}
              className="relative rounded-2xl border-4 border-robin-gold bg-gradient-to-br from-robin-orange to-robin-amber px-6 py-4 shadow-lg"
            >
              <p className="text-center text-xs font-bold uppercase tracking-widest text-black/70">
                Robinova predikce
              </p>
              <p className="mt-1 text-center font-robin-display text-3xl font-black text-black">
                {PREDICTION.rank}
                {PREDICTION.suit}
              </p>
              {phase === "reveal" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-robin-red text-lg text-white shadow-lg"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="mx-auto mb-8 flex max-w-sm items-center gap-4 rounded-2xl border-2 border-white/20 bg-black/30 p-4">
                  <Image
                    src="/robin/IMG_0872.jpg"
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border-2 border-robin-gold object-cover"
                  />
                  <p className="text-left text-sm text-white/85 md:text-base">
                    {`„Zapamatuj si jednu kartu. Zamíchám je a ty vybereš — uvidíš, jestli dokážu uhodnout, na co myslíš."`}
                  </p>
                </div>
                <MagneticButton>
                  <button
                    type="button"
                    onClick={startGame}
                    className="rounded-full bg-gradient-to-r from-robin-gold via-yellow-300 to-robin-orange px-10 py-5 font-robin-display text-xl font-black uppercase tracking-wider text-black shadow-[0_8px_30px_rgba(255,215,0,0.5)] transition hover:scale-105"
                  >
                    ✨ Zahájit kouzlo
                  </button>
                </MagneticButton>
              </motion.div>
            )}

            {(phase === "memorize" || phase === "shuffle") && (
              <motion.div
                key={`shuffle-${shuffleKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex min-h-[200px] flex-wrap items-center justify-center gap-3 md:gap-4"
              >
                {DECK.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      phase === "shuffle"
                        ? {
                            x: [0, (i % 2 ? 1 : -1) * (40 + i * 15), (i - 2.5) * 25],
                            y: [0, -30 - i * 10, 0],
                            rotate: [0, (i - 2.5) * 25, (i - 2.5) * 8],
                            scale: [1, 1.1, 1],
                          }
                        : { opacity: 1, y: 0 }
                    }
                    transition={
                      phase === "shuffle"
                        ? { duration: 1.8, ease: "easeInOut" }
                        : { delay: i * 0.08 }
                    }
                  >
                    <CardFace card={card} faceDown={phase === "shuffle"} />
                  </motion.div>
                ))}
                <p className="absolute -bottom-2 left-0 right-0 text-center text-sm font-bold uppercase tracking-widest text-robin-gold">
                  {phase === "memorize" ? "Zapamatuj si kartu…" : "Míchám…"}
                </p>
              </motion.div>
            )}

            {phase === "pick" && (
              <motion.div
                key="pick"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-3 gap-3 md:gap-5"
              >
                {DECK.map((card) => (
                  <motion.button
                    key={card.id}
                    type="button"
                    whileHover={{ scale: 1.06, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPick(card.id)}
                    className="mx-auto cursor-pointer rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-robin-gold"
                  >
                    <CardFace card={card} faceDown />
                  </motion.button>
                ))}
                <p className="col-span-3 mt-4 text-center text-lg font-bold uppercase tracking-wider text-white">
                  Vyber jednu kartu 👇
                </p>
              </motion.div>
            )}

            {phase === "reveal" && picked !== null && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  {revealCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <CardFace card={card} size={picked === i ? "lg" : "sm"} />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <p className="font-robin-display text-3xl font-black uppercase text-robin-gold md:text-4xl">
                    Věděl jsem to! 🎩
                  </p>
                  <p className="mt-3 text-white/75">
                    Přesně tuhle kartu jsem predikoval. Chceš stejné kouzlo naživo?
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPhase("intro")}
                      className="rounded-full border-2 border-white/30 px-6 py-3 text-sm font-bold uppercase text-white transition hover:border-robin-gold hover:text-robin-gold"
                    >
                      Hrát znovu
                    </button>
                    <a
                      href="#kontakt"
                      className="rounded-full bg-gradient-to-r from-robin-orange to-robin-gold px-8 py-3 text-sm font-bold uppercase text-black shadow-lg"
                    >
                      Objednat Robina
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
