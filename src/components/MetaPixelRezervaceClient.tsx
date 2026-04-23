"use client";

import { useLayoutEffect } from "react";
import { getRezervaceMetaPixelBootstrap, metaPixelBeacon } from "@/lib/rezervaceMetaPixel";

const SCRIPT_ID = "neurea-rezervace-meta-pixel";

/**
 * Vloží Meta Pixel do &lt;head&gt; na klientovi.
 * Nikdy nemažeme existující &lt;script&gt; — při React Strict Mode by druhý běh narazil na if(f.fbq)return a pixel by se nenačetl.
 */
export function MetaPixelRezervaceClient() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__NEUREA_META_PIXEL_BOOT) return;
    if (document.getElementById(SCRIPT_ID)) {
      window.__NEUREA_META_PIXEL_BOOT = true;
      return;
    }

    const node = document.createElement("script");
    node.id = SCRIPT_ID;
    node.type = "text/javascript";
    node.textContent = getRezervaceMetaPixelBootstrap();
    document.head.appendChild(node);
    window.__NEUREA_META_PIXEL_BOOT = true;

    window.setTimeout(() => {
      const fbq = (window as Window & { fbq?: unknown }).fbq;
      if (typeof fbq !== "function") {
        metaPixelBeacon("PageView");
      }
    }, 4000);
  }, []);

  return null;
}
