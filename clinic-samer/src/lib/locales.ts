export const locales = ["cs", "en", "de", "it", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; dir: "ltr" | "rtl"; ogLocale: string }
> = {
  cs: { label: "CZ", htmlLang: "cs", dir: "ltr", ogLocale: "cs_CZ" },
  en: { label: "EN", htmlLang: "en", dir: "ltr", ogLocale: "en_GB" },
  de: { label: "DE", htmlLang: "de", dir: "ltr", ogLocale: "de_DE" },
  it: { label: "IT", htmlLang: "it", dir: "ltr", ogLocale: "it_IT" },
  ar: { label: "AR", htmlLang: "ar", dir: "rtl", ogLocale: "ar_SA" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
