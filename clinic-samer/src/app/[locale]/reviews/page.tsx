import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ReviewForm } from "@/components/ReviewForm";
import { getDictionary } from "@/data/i18n/dictionaries";
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
  const reviews = await listReviews({ status: "approved" });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.reviews.eyebrow}</span>
            <h1>{dict.reviews.title}</h1>
            <p className="lead">{dict.reviews.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
          {reviews.length === 0 ? (
            <Reveal>
              <p className="lead">{dict.reviews.empty}</p>
            </Reveal>
          ) : (
            <div className="reviews-grid">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.05}>
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
