"use client";

import { useEffect } from "react";
import { luxuryBodyHtml } from "@/lib/luxuryBody";

export function LuxuryLanding() {
  useEffect(() => {
    const existing = document.getElementById("luxury-init");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "luxury-init";
    script.src = "/luxury.js";
    script.async = false;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: luxuryBodyHtml }} />;
}
