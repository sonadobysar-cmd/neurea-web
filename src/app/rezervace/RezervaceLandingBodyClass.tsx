"use client";

import { useLayoutEffect } from "react";

const CLASS_NAME = "rezervace-landing";

/**
 * Přidá třídu na document.body pro skrytí globálního chrome (viz rezervace-landing.css).
 */
export function RezervaceLandingBodyClass() {
  useLayoutEffect(() => {
    document.body.classList.add(CLASS_NAME);
    return () => {
      document.body.classList.remove(CLASS_NAME);
    };
  }, []);

  return null;
}
