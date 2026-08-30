import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

const PROFILE_URL = "https://www.znamylekar.cz/profil/samer-asad";

const copy: Record<Locale, { text: string; button: string }> = {
  cs: {
    text: "Hodnocení sbíráme na ověřeném profilu ZnámyLékař, kde je bezpečně najdou také další pacientky.",
    button: "Napsat ověřené hodnocení",
  },
  en: {
    text: "Reviews are collected on the verified ZnámyLékař profile, where other patients can also find them safely.",
    button: "Write a verified review",
  },
  de: {
    text: "Bewertungen sammeln wir im verifizierten ZnámyLékař-Profil, wo andere Patientinnen sie sicher finden können.",
    button: "Verifizierte Bewertung schreiben",
  },
  it: {
    text: "Le recensioni vengono raccolte sul profilo verificato ZnámyLékař, dove altre pazienti possono trovarle in sicurezza.",
    button: "Scrivi una recensione verificata",
  },
  ar: {
    text: "نجمع التقييمات في ملف ZnámyLékař الموثق حتى تتمكن المريضات الأخريات من العثور عليها بأمان.",
    button: "كتابة تقييم موثق",
  },
};

export function ReviewForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const content = copy[locale];

  return (
    <div>
      <div className="book-summary" style={{ marginTop: 0 }}>
        <strong>{dict.reviews.countHint}</strong>
        <br />
        {content.text}
      </div>
      <div className="book-nav">
        <a
          className="btn btn-primary"
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.button}
        </a>
      </div>
    </div>
  );
}
