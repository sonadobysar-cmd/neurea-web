import Link from "next/link";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import {
  educationCs,
  spokenLanguages,
  treatedConditions,
} from "@/data/clinic-catalog";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const conditions = treatedConditions[locale];
  const languages = spokenLanguages[locale];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.about.eyebrow}</span>
            <h1>{dict.about.title}</h1>
            <p className="lead">{dict.about.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal>
            <div className="split-media">
              <Placeholder label="Foto: lékař — dodáte" mark="SA" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  color: "var(--rose-ink)",
                  margin: "0 0 1rem",
                }}
              >
                {dict.about.doctorTitle}
              </h2>
              <p className="lead">{dict.about.doctorBio}</p>
              <h3
                style={{
                  marginTop: "2rem",
                  marginBottom: "0.75rem",
                  color: "var(--rose-ink)",
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontWeight: 450,
                  fontSize: "1.4rem",
                }}
              >
                {dict.pricing.languagesTitle}
              </h3>
              <ul className="chip-inline">
                {languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <h3
                style={{
                  marginTop: "2rem",
                  marginBottom: "0.75rem",
                  color: "var(--rose-ink)",
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontWeight: 450,
                  fontSize: "1.4rem",
                }}
              >
                {dict.about.membershipsTitle}
              </h3>
              <ul className="memberships">
                {dict.about.memberships.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              {locale === "cs" && (
                <>
                  <h3
                    style={{
                      marginTop: "2rem",
                      marginBottom: "0.75rem",
                      color: "var(--rose-ink)",
                      fontFamily: "var(--font-display), system-ui, sans-serif",
                      fontWeight: 450,
                      fontSize: "1.4rem",
                    }}
                  >
                    Vzdělání a kvalifikace
                  </h3>
                  <ul className="memberships">
                    {educationCs.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="team-chip">
                <strong>{dict.about.nurseTitle}</strong>
                <span>{dict.about.nurseRole}</span>
              </div>
              <div style={{ marginTop: "1.75rem" }}>
                <Link href={`/${locale}/booking`} className="btn btn-primary">
                  {dict.about.cta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.pricing.diseasesTitle}</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(1.85rem, 3vw, 2.4rem)",
                color: "var(--rose-ink)",
                margin: "0.35rem 0 0.75rem",
              }}
            >
              {dict.pricing.diseasesTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="condition-grid">
              {conditions.map((c) => (
                <li key={c}>{c}</li>
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
