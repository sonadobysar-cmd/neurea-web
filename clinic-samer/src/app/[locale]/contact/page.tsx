import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { insurers } from "@/data/clinic-catalog";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

export default async function ContactPage({
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
            <span className="eyebrow">{dict.contact.eyebrow}</span>
            <h1>{dict.contact.title}</h1>
            <p className="lead">{dict.contact.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container form-shell">
          <Reveal>
            <div className="form-card">
              <h2
                className="display"
                style={{ fontSize: "2rem", marginTop: 0, color: "var(--rose-ink)" }}
              >
                {dict.nav.contact}
              </h2>
              <ul className="hours-list" style={{ marginTop: "1.5rem" }}>
                <li>
                  <span>{dict.contact.address}</span>
                </li>
                <li>
                  <span>
                    <a href={`mailto:${dict.contact.email}`}>{dict.contact.email}</a>
                  </span>
                </li>
                <li>
                  <span>
                    <a href="tel:+420734421860">{dict.contact.phone}</a>
                  </span>
                </li>
                <li>
                  <span>
                    <a href="tel:+420739700970">+420 739 700 970</a>
                  </span>
                </li>
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <a
                  className="btn btn-primary"
                  href="https://maps.google.com/?q=Branick%C3%A1+479%2F21,+Praha+4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {dict.contact.mapCta}
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
              <h3
                className="display"
                style={{
                  fontSize: "1.35rem",
                  margin: "2rem 0 0.75rem",
                  color: "var(--rose-ink)",
                }}
              >
                {dict.pricing.paymentTitle}
              </h3>
              <p style={{ margin: 0, color: "var(--stone)" }}>
                {dict.pricing.paymentCash}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.pricing.insuranceTitle}</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(1.85rem, 3vw, 2.4rem)",
                color: "var(--rose-ink)",
                margin: "0.35rem 0 0.75rem",
              }}
            >
              {dict.pricing.insuranceTitle}
            </h2>
            <p className="lead" style={{ maxWidth: "40rem" }}>
              {dict.pricing.insuranceLead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="chip-grid">
              {insurers.map((ins) => (
                <li key={ins.code}>
                  <span className="chip-code">{ins.code}</span>
                  <span>{ins.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="source-note" style={{ marginTop: "1.5rem" }}>
            {dict.pricing.sourceNote}
          </p>
        </div>
      </section>
    </>
  );
}
