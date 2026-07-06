"use client";

const ITEMS = [
  "Kouzelník",
  "★",
  "Balonkář",
  "★",
  "Mentalista",
  "★",
  "Kouzlíme s Robinem",
  "★",
  "Praha & okolí",
  "★",
  "Narozeniny · Školy · Firemní akce",
  "★",
];

export function BoothTicker() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div className="robin-ticker" aria-hidden>
      <div className="robin-ticker-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
