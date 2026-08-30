import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/data/i18n/dictionaries";
import { ReviewsRatingSummary } from "@/components/ReviewsRatingSummary";
import {
  priceCategories,
  pricedServices,
  type PricedService,
} from "@/data/clinic-catalog";
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
  const pricedById = new Map(pricedServices.map((service) => [service.id, service]));
  const gallery = [
    { src: "/photos/gallery-01.png", position: "center 38%" },
    { src: "/photos/gallery-02.png", position: "center 52%" },
    { src: "/photos/family-story-01.webp", position: "center 42%" },
    { src: "/photos/gallery-03.png", position: "center 38%" },
    { src: "/photos/family-story-02.webp", position: "center 34%" },
    { src: "/photos/family-story-03.webp", position: "center 38%" },
  ];
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
          <div className="hero-bg" aria-hidden />
          <div className="hero-shape" aria-hidden>
            <Image
              src="/photos/hero-shape.png"
              alt=""
              width={1186}
              height={1063}
              priority
              className="hero-shape-img"
            />
          </div>
          <div className="hero-shade" />
        </div>
        <div className="hero-content-wrap">
          <div className="container">
            <div className="hero-content">
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
        </div>
      </section>

      <section className="section welcome-band">
        <div className="container welcome-grid">
          <Reveal>
            <div className="welcome-media">
              <Image
                src="/photos/welcome.png"
                alt={dict.welcome.title}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="welcome-photo"
              />
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
          <div className="service-editorial-grid">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <article className={`service-editorial-card service-editorial-card-${i + 1}`}>
                  <div className="service-editorial-topline">
                    <span className="num">0{i + 1}</span>
                    <span>{dict.services.eyebrow}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={`/${locale}/services`} className="service-card-link">
                    {dict.services.viewAll} <span aria-hidden="true">↗</span>
                  </Link>
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

      <section className="section pricing-preview-section">
        <div className="container">
          <Reveal>
            <div className="pricing-preview-head">
              <div>
                <span className="eyebrow">{dict.pricing.eyebrow}</span>
                <h2 className="display">{dict.pricing.title}</h2>
              </div>
              <p className="lead">{dict.pricing.lead}</p>
            </div>
          </Reveal>

          <div className="pricing-preview-grid">
            {priceCategories.map((category, i) => {
              const services = category.serviceIds
                .map((id) => pricedById.get(id))
                .filter(
                  (service): service is PricedService => Boolean(service?.price)
                )
                .slice(0, 2);

              return (
                <Reveal key={category.id} delay={i * 0.06}>
                  <article className="pricing-preview-card">
                    <span className="pricing-category-index">0{i + 1}</span>
                    <h3>{category.title[locale]}</h3>
                    <p>{category.description[locale]}</p>
                    <div className="pricing-preview-list">
                      {services.map((service) => (
                        <div key={service.id}>
                          <span>{service.name[locale]}</span>
                          <strong>{service.price}</strong>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="section-action pricing-preview-action">
              <Link href={`/${locale}/services#pricing`} className="btn btn-primary">
                {dict.pricing.title}
              </Link>
              <span>{dict.pricing.sourceNote}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-flush">
        <div className="container split split-airy">
          <Reveal>
            <div className="split-media">
              <Image
                src="/photos/doctor.png"
                alt={dict.about.doctorTitle}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="split-photo"
              />
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
            <div className="gallery gallery-warm gallery-stories">
              {gallery.map((image, i) => (
                <figure className={`gallery-item gallery-item-${i + 1}`} key={image.src}>
                  <Image
                    src={image.src}
                    alt={`${dict.atmosphere.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 380px"
                    className="gallery-photo"
                    style={{ objectPosition: image.position }}
                  />
                </figure>
              ))}
            </div>
            <p className="gallery-consent-note">{dict.atmosphere.consent}</p>
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
