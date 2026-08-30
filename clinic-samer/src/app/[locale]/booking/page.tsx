import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

const BOOKING_URL = "https://www.znamylekar.cz/profil/samer-asad";

const liveBookingCopy: Record<
  Locale,
  { title: string; text: string; points: string[]; online: string; phone: string }
> = {
  cs: {
    title: "Objednání bez čekání na potvrzení",
    text: "Online kalendář ukazuje aktuálně dostupné termíny. Vyberete typ návštěvy, čas a rezervaci dokončíte přímo na profilu lékaře.",
    points: ["Aktuální volné termíny", "Okamžité potvrzení rezervace", "Bez odesílání citlivých údajů přes tento web"],
    online: "Otevřít online kalendář",
    phone: "Objednat telefonicky",
  },
  en: {
    title: "Book without waiting for confirmation",
    text: "The online calendar shows current availability. Choose the visit type and time, then complete the booking directly on the doctor’s profile.",
    points: ["Current availability", "Immediate booking confirmation", "No sensitive data sent through this website"],
    online: "Open online calendar",
    phone: "Book by phone",
  },
  de: {
    title: "Termin ohne Warten auf Bestätigung",
    text: "Der Online-Kalender zeigt die aktuell verfügbaren Termine. Wählen Sie Leistung und Uhrzeit direkt im Arztprofil.",
    points: ["Aktuelle freie Termine", "Sofortige Bestätigung", "Keine sensiblen Daten über diese Website"],
    online: "Online-Kalender öffnen",
    phone: "Telefonisch buchen",
  },
  it: {
    title: "Prenota senza attendere la conferma",
    text: "Il calendario online mostra le disponibilità aggiornate. Scegli il tipo di visita e l’orario direttamente sul profilo del medico.",
    points: ["Disponibilità aggiornata", "Conferma immediata", "Nessun dato sensibile inviato da questo sito"],
    online: "Apri il calendario online",
    phone: "Prenota per telefono",
  },
  ar: {
    title: "احجزي دون انتظار التأكيد",
    text: "يعرض التقويم الإلكتروني المواعيد المتاحة حالياً. اختاري نوع الزيارة والوقت وأكملي الحجز مباشرة في ملف الطبيب.",
    points: ["المواعيد المتاحة حالياً", "تأكيد فوري للحجز", "لا تُرسل بيانات حساسة عبر هذا الموقع"],
    online: "فتح التقويم الإلكتروني",
    phone: "الحجز عبر الهاتف",
  },
};

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const copy = liveBookingCopy[locale];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.booking.eyebrow}</span>
            <h1>{dict.booking.title}</h1>
            <p className="lead">{dict.booking.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container form-shell">
          <Reveal>
            <div className="form-card">
              <span className="eyebrow">Online</span>
              <h2 className="booking-card-title">{copy.title}</h2>
              <p className="lead">{copy.text}</p>
              <ul className="booking-points">
                {copy.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="book-nav">
                <a
                  className="btn btn-primary"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.online}
                </a>
                <a className="btn btn-ghost" href="tel:+420734421860">
                  {copy.phone}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="side-card">
              <h3
                className="display"
                style={{ fontSize: "1.7rem", marginTop: 0, color: "var(--rose-ink)" }}
              >
                {dict.booking.hoursTitle}
              </h3>
              <ul className="hours-list">
                {dict.booking.hours.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="lead" style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
                {dict.contact.address}
                <br />
                {dict.contact.phone}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
