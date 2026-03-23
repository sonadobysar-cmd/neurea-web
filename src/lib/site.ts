export const site = {
  name: "NEUREA",
  url: "https://neurea.cz",
  email: "info@neurea.cz",
  /** Doplňte po zveřejnění — zatím null = na webu skryto */
  phone: null as string | null,
  /**
   * Veřejná URL rezervačního kalendáře (Calendly, Cal.com, Google booking…).
   * Zobrazí se na /rezervace jako tlačítko „Vybrat termín“.
   */
  bookingUrl: "https://calendly.com/neurea" as string | null,
  /**
   * Logo lockup v hero (PNG se zlatým symbolem + NEUREA). Soubor v `public/`.
   * Průhledné PNG bez černého pozadí vypadá nejlépe; jinak sedí na tmavém panelu v hero.
   */
  heroSymbolUrl: "/neurea-hero-lockup.png" as string,
  /** Rozměry exportu (px) — pro `width`/`height` u `<img>`. */
  heroSymbolSize: { width: 1024, height: 1024 } as const,
  /**
   * Hero video (MP4) — celoplošné smyčkové video jako na theaeonclinic.com.
   * Export z Canvy: Video → stáhnout jako MP4, vložit do `public/` a nastavit cestu.
   * `null` = použije se statické logo + gradient (fallback).
   */
  heroVideoUrl: null as string | null,
  /** Volitelný poster (JPG/PNG) — první snímek videa, lepší LCP než prázdné video. */
  heroVideoPosterUrl: null as string | null,
  /**
   * Volitelné obrázkové logo v levé části hlavičky. `null` = pouze text „NEUREA“ (stejný zlatý styl jako značka ve hero).
   */
  wordmarkUrl: null as string | null,
  ico: "00736813",
  operator: "Nia Dobyšar",
  locations: {
    brno: "Brno — centrum (přesná adresa bude doplněna)",
    praha: "Praha (adresa bude doplněna)",
  },
  depositCzk: 1000,
  stripeCurrency: "czk" as const,
};

export const hours = [
  { day: "Pondělí", time: "9:00 – 13:00" },
  { day: "Úterý", time: "14:00 – 18:00" },
  { day: "Středa", time: "7:00 – 12:00" },
  { day: "Čtvrtek", time: "15:00 – 20:00" },
  { day: "Pátek", time: "7:00 – 12:00" },
  { day: "Sobota / Neděle", time: "Zavřeno" },
];

/** Hlavní položky v horní liště — zbytek v „Více“ (viz `navMore`), aby menu nebylo namačkané. */
export const navMain = [
  { href: "/sluzby", label: "Služby" },
  { href: "/technologie", label: "Technologie" },
  { href: "/o-nas", label: "O nás" },
  { href: "/cenik", label: "Ceník" },
  { href: "/testy", label: "Screening testy" },
];

export const navMore = [
  { href: "/", label: "Úvod" },
  { href: "/jak-to-funguje", label: "Jak to funguje" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

/** Pro sitemap / přehled — všechny veřejné stránky z menu */
export const navAll = [...navMain, ...navMore];
