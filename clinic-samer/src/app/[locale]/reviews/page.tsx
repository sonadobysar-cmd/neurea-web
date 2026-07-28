import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ReviewForm } from "@/components/ReviewForm";
import { getDictionary } from "@/data/i18n/dictionaries";
import {
  showcaseReviews,
  ZNAMYLEKAR_URL,
} from "@/data/showcase-reviews";
import { isLocale, type Locale } from "@/lib/locales";
import { listReviews } from "@/lib/store";

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const approved = await listReviews({ status: "approved" });
  const items =
    approved.length > 0
      ? approved.map((r) => ({
          id: r.id,
          name: r.name,
          text: r.text,
          rating: r.rating,
          date: "",
        }))
      : showcaseReviews.map((r, i) => ({
          id: `zl-${i}`,
          name: r.name,
          text: r.text,
          rating: 5,
          date: r.date,
        }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.reviews.eyebrow}</span>
            <h1>{dict.reviews.title}</h1>
            <p className="lead">{dict.reviews.lead}</p>
            <p className="reviews-meta" style={{ marginTop: "1rem" }}>
              <span>{dict.reviews.countHint}</span>
              {" · "}
              {dict.reviews.sourceLabel}{" "}
              <a href={ZNAMYLEKAR_URL} target="_blank" rel="noopener noreferrer">
                {dict.reviews.sourceLink}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
          <div className="reviews-grid-home">
            {items.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.05}>
                <blockquote className="review-card-home">
                  <div className="stars">{"★".repeat(r.rating)}</div>
                  <p>“{r.text}”</p>
                  <footer>
                    <cite>{r.name}</cite>
                    {r.date ? <span>{r.date}</span> : null}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="form-card" style={{ maxWidth: 720 }}>
              <h2
                className="display"
                style={{ fontSize: "2rem", marginTop: 0, color: "var(--rose-ink)" }}
              >
                {dict.reviews.formTitle}
              </h2>
              <p className="lead" style={{ marginBottom: "1.5rem" }}>
                {dict.reviews.formLead}
              </p>
              <ReviewForm locale={locale} dict={dict} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
