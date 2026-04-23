"use client";

import { useEffect } from "react";
import { getRezervaceMetaPixelBootstrap } from "@/lib/rezervaceMetaPixel";

const SCRIPT_MARKER = "neurea-rezervace-meta-pixel";

/**
 * Načte Meta Pixel stejně jako klasický snippet v HTML (často spolehlivější než next/script
 * s dangerouslySetInnerHTML u App Routeru).
 */
export function MetaPixelRezervaceLanding() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(SCRIPT_MARKER)) return;
    const node = document.createElement("script");
    node.id = SCRIPT_MARKER;
    node.type = "text/javascript";
    node.textContent = getRezervaceMetaPixelBootstrap();
    (document.head ?? document.documentElement).appendChild(node);
  }, []);

  return null;
}
