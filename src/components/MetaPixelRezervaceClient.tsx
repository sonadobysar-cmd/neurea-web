"use client";

import { useEffect, useRef } from "react";
import { getRezervaceMetaPixelBootstrap } from "@/lib/rezervaceMetaPixel";

const SCRIPT_ID = "neurea-rezervace-meta-pixel";

/**
 * Načte Meta Pixel až na klientovi a vloží ho do document.head.
 * Inline <script> z RSC v <head> umí při hydrataci Next/React narušit — Pixel Helper pak nevidí události.
 */
export function MetaPixelRezervaceClient() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing?.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    const node = document.createElement("script");
    node.id = SCRIPT_ID;
    node.type = "text/javascript";
    node.textContent = getRezervaceMetaPixelBootstrap();
    document.head.appendChild(node);
  }, []);

  return null;
}
