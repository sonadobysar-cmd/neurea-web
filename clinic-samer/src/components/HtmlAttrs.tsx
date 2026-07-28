"use client";

import { useEffect } from "react";
import { localeMeta, type Locale } from "@/lib/locales";

export function HtmlAttrs({ locale }: { locale: Locale }) {
  useEffect(() => {
    const meta = localeMeta[locale];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    document.documentElement.classList.toggle("is-rtl", meta.dir === "rtl");
  }, [locale]);
  return null;
}
