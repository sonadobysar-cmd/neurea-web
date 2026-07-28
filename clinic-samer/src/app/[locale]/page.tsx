import Link from "next/link";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/locales";
import { listReviews } from "@/lib/store";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const reviews = (await listReviews({ status: "approved" })).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Placeholder
            label="Foto: ordinace / atmosféra kliniky — dodáte"
            mark="Clinic"
          />
          <div className="hero-shade" />
        </div>
        <div className="container hero-content">
          <p className="hero-brand">{dict.hero.brand}</p>
          <h1>
            {dict.hero.title}
            <br />
            <em>{dict.hero.titleEm}</em>
          </h1>
          <p className="hero-lead">{dict.hero.lead}</p>
          <div className="hero-actions">
            <Link href={`/${locale}/booking`} className="btn btn-light">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}/services`} className="btn btn-ghost" style={{ color: "#fff8f6", borderColor: "rgba(255,248,246,0.35)" }}>
              {dict.hero.ctaSecondary}
            </Link>
          </div>
          <div className="hero-scroll">
            <i />
            {dict.hero.scroll}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="trust-grid">
              <div className="trust-item">
                <h3>{dict.trust.languages}</h3>
                <p>{dict.trust.languagesText}</p>
              </div>
              <div className="trust-item">
                <h3>{dict.trust.newPatients}</h3>
                <p>{dict.trust.newPatientsText}</p>
              </div>
              <div className="trust-item">
                <h3>{dict.trust.international}</h3>
                <p>{dict.trust.internationalText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{dict.services.eyebrow}</span>
              <h2>{dict.services.title}</h2>
              <p className="lead">{dict.services.lead}</p>
            </div>
          </Reveal>
          <div className="service-grid">
            {dict.services.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <article className="service-card">
                  <div className="num">0{i + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: "2rem" }}>
              <Link href={`/${locale}/services`} className="btn btn-ghost">
                {dict.services.viewAll}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal>
            <div className="split-media">
              <Placeholder
                label="Foto: MUDr. Samer Asad — dodáte"
                mark="SA"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">{dict.about.eyebrow}</span>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  color: "var(--rose-ink)",
                  margin: "0.7rem 0 1rem",
                }}
              >
                {dict.about.title}
              </h2>
              <p className="lead">{dict.about.lead}</p>
              <p style={{ color: "var(--stone)", lineHeight: 1.65 }}>
                {dict.about.doctorBio}
              </p>
              <div className="team-chip">
                <strong>{dict.about.nurseTitle}</strong>
                <span>{dict.about.nurseRole}</span>
              </div>
              <div style={{ marginTop: "1.75rem" }}>
                <Link href={`/${locale}/about`} className="btn btn-primary">
                  {dict.about.cta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{dict.atmosphere.eyebrow}</span>
              <h2>{dict.atmosphere.title}</h2>
              <p className="lead">{dict.atmosphere.lead}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="gallery">
              <Placeholder label="Foto: recepce — dodáte" mark="01" />
              <Placeholder label="Foto: ordinace — dodáte" mark="02" />
              <Placeholder label="Foto: detail / světlo — dodáte" mark="03" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{dict.reviews.eyebrow}</span>
              <h2>{dict.reviews.title}</h2>
              <p className="lead">{dict.reviews.lead}</p>
            </div>
          </Reveal>
          {reviews.length === 0 ? (
            <Reveal>
              <p className="lead">{dict.reviews.empty}</p>
            </Reveal>
          ) : (
            <div className="reviews-grid">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.08}>
                  <article className="review-card">
                    <div className="stars">{"★".repeat(r.rating)}</div>
                    <p>{r.text}</p>
                    <cite>{r.name}</cite>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal>
            <div style={{ marginTop: "1.75rem" }}>
              <Link href={`/${locale}/reviews`} className="btn btn-ghost">
                {dict.reviews.leave}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div>
                <h2>{dict.booking.title}</h2>
                <p>{dict.booking.lead}</p>
              </div>
              <div>
                <Link href={`/${locale}/booking`} className="btn btn-light">
                  {dict.nav.book}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
