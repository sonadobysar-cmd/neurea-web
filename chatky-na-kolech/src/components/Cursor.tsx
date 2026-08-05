"use client";

import { useEffect } from "react";

const INTERACTIVE = "a, button, summary, input, select, textarea, [role='button']";

export function Cursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    // Delegated hover detection instead of per-element listeners: works for
    // any element present now or added later (route changes, configurator
    // steps, accordions), instead of a one-time snapshot at mount.
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(INTERACTIVE)) {
        document.body.classList.add("is-hovering");
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest(INTERACTIVE)) {
        document.body.classList.remove("is-hovering");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
