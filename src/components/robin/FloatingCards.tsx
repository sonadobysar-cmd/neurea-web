"use client";

import { motion } from "framer-motion";

const CARDS = [
  { id: 0, rotate: -18, x: -80, y: 20, delay: 0 },
  { id: 1, rotate: -8, x: -30, y: -10, delay: 0.1 },
  { id: 2, rotate: 6, x: 30, y: 5, delay: 0.2 },
  { id: 3, rotate: 16, x: 85, y: 25, delay: 0.3 },
];

function PlayingCard({ rotate, suit, rank }: { rotate: number; suit: string; rank: string }) {
  const red = suit === "♥" || suit === "♦";
  return (
    <div
      className="relative h-28 w-20 rounded-lg border-2 border-white/80 bg-gradient-to-br from-white to-robin-cream shadow-2xl md:h-36 md:w-24"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className={`absolute left-1.5 top-1 text-sm font-bold ${red ? "text-red-600" : "text-black"}`}>
        {rank}
        <br />
        {suit}
      </span>
      <span className={`absolute bottom-1.5 right-1.5 rotate-180 text-sm font-bold ${red ? "text-red-600" : "text-black"}`}>
        {rank}
        <br />
        {suit}
      </span>
      <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl ${red ? "text-red-500" : "text-black"}`}>
        {suit}
      </span>
    </div>
  );
}

export function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CARDS.map((c, i) => (
        <motion.div
          key={c.id}
          className="absolute left-1/2 top-1/3"
          style={{ x: c.x, y: c.y }}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: [c.y, c.y - 15, c.y],
            rotate: [c.rotate, c.rotate + 5, c.rotate],
          }}
          transition={{
            opacity: { delay: c.delay, duration: 0.6 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <PlayingCard
            rotate={0}
            rank={["A", "K", "7", "J"][i]!}
            suit={["♠", "♥", "♦", "♣"][i]!}
          />
        </motion.div>
      ))}
    </div>
  );
}
