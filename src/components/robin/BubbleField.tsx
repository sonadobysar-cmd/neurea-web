"use client";

const BUBBLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 95}%`,
  size: 18 + (i % 5) * 14,
  duration: 14 + (i % 7) * 3,
  delay: (i % 11) * 1.4,
}));

export function BubbleField() {
  return (
    <div className="robin-bubbles" aria-hidden>
      {BUBBLES.map((b) => (
        <span
          key={b.id}
          className="robin-bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function StageSpotlights() {
  const units = [
    { left: "20%", rotate: -14, delay: 0, scale: 0.95 },
    { left: "50%", rotate: 0, delay: 0.7, scale: 1.05 },
    { left: "80%", rotate: 14, delay: 1.4, scale: 0.95 },
  ];

  return (
    <div className="robin-spotlights" aria-hidden>
      {units.map((u, i) => (
        <div
          key={i}
          className="robin-spot-unit"
          style={{
            left: u.left,
            ["--spot-rot" as string]: `${u.rotate}deg`,
            ["--spot-delay" as string]: `${u.delay}s`,
            ["--spot-scale" as string]: String(u.scale),
          }}
        >
          <div className="robin-spot-yoke" />
          <div className="robin-spot-head">
            <span className="robin-spot-lens" />
          </div>
          <div className="robin-spot-beam" />
        </div>
      ))}
    </div>
  );
}

export function StageStars() {
  const stars = [
    { top: "8%", left: "5%", size: 18, delay: 0 },
    { top: "15%", right: "8%", size: 14, delay: 0.5 },
    { top: "45%", left: "3%", size: 12, delay: 1 },
    { top: "70%", right: "4%", size: 16, delay: 1.5 },
    { top: "30%", right: "15%", size: 10, delay: 0.8 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="robin-star"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          ★
        </span>
      ))}
    </>
  );
}
