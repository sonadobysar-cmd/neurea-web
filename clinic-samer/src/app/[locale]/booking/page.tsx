import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

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
              <BookingForm locale={locale} dict={dict} />
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
