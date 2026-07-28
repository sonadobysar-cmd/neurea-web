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
  const reviews = (await listReviews({ status: "approved" })).slice(0, 2);
  const featured = dict.services.items.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Placeholder
            label="Foto: atmosféra kliniky — dodáte"
            mark=""
            className="is-hero"
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
            <Link href={`/${locale}/services`} className="btn btn-ghost-light">
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <p className="trust-line">
              <span>{dict.trust.languages}</span>
              <i />
              <span>{dict.trust.newPatients}</span>
              <i />
              <span>{dict.trust.international}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head section-head-wide">
              <span className="eyebrow">{dict.services.eyebrow}</span>
              <h2>{dict.services.title}</h2>
              <p className="lead">{dict.services.lead}</p>
            </div>
          </Reveal>
          <div className="feature-rows">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <article className="feature-row">
                  <span className="num">0{i + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="section-action">
              <Link href={`/${locale}/services`} className="btn btn-ghost">
                {dict.services.viewAll}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-flush">
        <div className="container split split-airy">
          <Reveal>
            <div className="split-media">
              <Placeholder label="Foto: MUDr. Samer Asad — dodáte" mark="" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="split-copy">
              <span className="eyebrow">{dict.about.eyebrow}</span>
              <h2 className="display">{dict.about.title}</h2>
              <p className="lead">{dict.about.lead}</p>
              <p className="body-copy">{dict.about.doctorBio}</p>
              <div className="team-chip">
                <strong>{dict.about.nurseTitle}</strong>
                <span>{dict.about.nurseRole}</span>
              </div>
              <div className="section-action">
                <Link href={`/${locale}/booking`} className="btn btn-primary">
                  {dict.about.cta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{dict.atmosphere.eyebrow}</span>
              <h2>{dict.atmosphere.title}</h2>
              <p className="lead">{dict.atmosphere.lead}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="gallery gallery-warm">
              <Placeholder label="Foto: recepce — dodáte" mark="" />
              <Placeholder label="Foto: ordinace — dodáte" mark="" />
              <Placeholder label="Foto: světlo — dodáte" mark="" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
          <div className="container reviews-layout">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">{dict.reviews.eyebrow}</span>
                <h2>{dict.reviews.title}</h2>
                <p className="lead">{dict.reviews.lead}</p>
                <Link href={`/${locale}/reviews`} className="text-link">
                  {dict.reviews.leave}
                </Link>
              </div>
            </Reveal>
            <div className="reviews-stack">
              {reviews.length === 0 ? (
                <Reveal>
                  <p className="lead">{dict.reviews.empty}</p>
                </Reveal>
              ) : (
                reviews.map((r, i) => (
                  <Reveal key={r.id} delay={i * 0.08}>
                    <blockquote className="review-quote">
                      <p>“{r.text}”</p>
                      <cite>{r.name}</cite>
                    </blockquote>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div>
                <p className="eyebrow eyebrow-on-dark">{dict.booking.eyebrow}</p>
                <h2>{dict.booking.title}</h2>
                <p>{dict.booking.lead}</p>
              </div>
              <Link href={`/${locale}/booking`} className="btn btn-light">
                {dict.nav.book}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
