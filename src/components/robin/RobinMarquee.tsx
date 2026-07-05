"use client";

const ITEMS = [
  "Kouzelník",
  "Balonkář",
  "Mentalista",
  "★",
  "Kouzlíme s Robinem",
  "★",
  "Praha & okolí",
  "★",
  "Narozeniny",
  "Firemní akce",
  "★",
];

export function RobinMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="robin-marquee relative overflow-hidden border-y-4 border-black py-4">
      <div className="robin-marquee-track flex w-max gap-8">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={
              item === "★"
                ? "text-3xl text-robin-gold"
                : "font-robin-display text-2xl font-black uppercase tracking-wider text-black md:text-3xl"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
