"use client";

import { useEffect } from "react";
import { luxuryBodyHtml } from "@/lib/luxuryBody";

function loadScript(id: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function LuxuryLanding() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadScript("luxury-init", "/luxury.js");
        if (!cancelled) await loadScript("robin-merge-init", "/robin-merge.js");
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div className="luxury-root" dangerouslySetInnerHTML={{ __html: luxuryBodyHtml }} />;
}
