"use client";

import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

const BOOKING_URL = "https://www.znamylekar.cz/profil/samer-asad";

const copy: Record<
  Locale,
  { title: string; text: string; online: string; phone: string }
> = {
  cs: {
    title: "Aktuální termíny bez čekání na potvrzení",
    text: "Online kalendář zobrazuje skutečně volné časy. Vyberete typ návštěvy a rezervaci dokončíte přímo na ověřeném profilu lékaře.",
    online: "Otevřít online kalendář",
    phone: "Objednat telefonicky",
  },
  en: {
    title: "Current appointments with instant confirmation",
    text: "The online calendar shows real availability. Choose the visit type and complete the booking directly on the doctor’s verified profile.",
    online: "Open online calendar",
    phone: "Book by phone",
  },
  de: {
    title: "Aktuelle Termine mit sofortiger Bestätigung",
    text: "Der Online-Kalender zeigt tatsächlich freie Zeiten. Wählen Sie die Terminart direkt im verifizierten Arztprofil.",
    online: "Online-Kalender öffnen",
    phone: "Telefonisch buchen",
  },
  it: {
    title: "Disponibilità aggiornata e conferma immediata",
    text: "Il calendario online mostra gli orari realmente disponibili. Completa la prenotazione sul profilo verificato del medico.",
    online: "Apri il calendario online",
    phone: "Prenota per telefono",
  },
  ar: {
    title: "مواعيد متاحة مع تأكيد فوري",
    text: "يعرض التقويم الإلكتروني الأوقات المتاحة فعلياً. اختاري نوع الزيارة وأكملي الحجز في ملف الطبيب الموثق.",
    online: "فتح التقويم الإلكتروني",
    phone: "الحجز عبر الهاتف",
  },
};

export function BookingForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const content = copy[locale];

  return (
    <div>
      <div className="book-steps" aria-label="Booking process">
        <div className="book-step is-active">{dict.booking.stepService}</div>
        <div className="book-step">{dict.booking.stepDateTime}</div>
        <div className="book-step">{dict.booking.stepDetails}</div>
      </div>

      <div className="service-pick">
        <button
          type="button"
          onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
        >
          <strong>{content.title}</strong>
          <span>{content.text}</span>
        </button>
      </div>

      <div className="book-summary">
        <strong>{dict.booking.summary}</strong>
        <br />
        {content.text}
      </div>

      <div className="book-nav">
        <a
          className="btn btn-primary"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.online}
        </a>
        <a className="btn btn-ghost" href="tel:+420734421860">
          {content.phone}
        </a>
      </div>
    </div>
  );
}
