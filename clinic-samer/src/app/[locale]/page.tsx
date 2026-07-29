import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { ReviewsRatingSummary } from "@/components/ReviewsRatingSummary";
import {
  showcaseReviews,
  ZNAMYLEKAR_URL,
} from "@/data/showcase-reviews";
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
  const approved = await listReviews({ status: "approved" });
  const featured = dict.services.items.slice(0, 3);
  const displayReviews =
    approved.length > 0
      ? approved.slice(0, 4).map((r) => ({
          name: r.name,
          text: r.text,
          date: "",
          source: "own" as const,
        }))
      : showcaseReviews.slice(0, 4).map((r) => ({
          ...r,
          source: "znamylekar" as const,
        }));

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <div className="hero-bg-base" aria-hidden />
          <div className="hero-bg-photo">
            <Image
              src="/photos/hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 62vw"
              className="hero-photo"
            />
          </div>
          <div className="hero-shade" />
        </div>
        <div className="hero-content-wrap">
          <div className="container hero-content">
            <p className="hero-brand">{dict.brand.short}</p>
            <h1>
              {dict.hero.title} <em>{dict.hero.titleEm}</em>
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
        </div>
      </section>

      <section className="section welcome-band">
        <div className="container welcome-grid">
          <Reveal>
            <div className="welcome-media">
              <Placeholder label={dict.welcome.photoLabel} mark="" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="welcome-copy">
              <span className="eyebrow">{dict.welcome.eyebrow}</span>
              <h2 className="display">{dict.welcome.title}</h2>
              <p className="lead">{dict.welcome.lead}</p>
              <Link href={`/${locale}/booking`} className="btn btn-primary">
                {dict.welcome.cta}
              </Link>
            </div>
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
        <div className="container">
          <Reveal>
            <div className="section-head section-head-wide">
              <span className="eyebrow">{dict.reviews.eyebrow}</span>
              <h2>{dict.reviews.title}</h2>
              <p className="lead">{dict.reviews.lead}</p>
              <ReviewsRatingSummary dict={dict} />
            </div>
          </Reveal>
          <div className="reviews-grid-home">
            {displayReviews.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={i * 0.06}>
                <blockquote className="review-card-home">
                  <p>“{r.text}”</p>
                  <footer>
                    <cite>{r.name}</cite>
                    {"date" in r && r.date ? <span>{r.date}</span> : null}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="section-action reviews-actions">
              <Link href={`/${locale}/reviews`} className="btn btn-ghost">
                {dict.reviews.leave}
              </Link>
              <a
                className="text-link"
                href={ZNAMYLEKAR_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.reviews.sourceLink} →
              </a>
            </div>
          </Reveal>
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
