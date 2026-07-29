import { ZNAMYLEKAR_URL } from "@/data/showcase-reviews";
import type { Dictionary } from "@/data/i18n/dictionaries";

export function ReviewsRatingSummary({ dict }: { dict: Dictionary }) {
  return (
    <div className="reviews-rating-summary">
      <div
        className="reviews-rating-stars"
        aria-label={`${dict.reviews.ratingScore} / 5`}
      >
        ★★★★★
      </div>
      <p className="reviews-meta">
        <span>{dict.reviews.countHint}</span>
        {" · "}
        {dict.reviews.sourceLabel}{" "}
        <a href={ZNAMYLEKAR_URL} target="_blank" rel="noopener noreferrer">
          {dict.reviews.sourceLink}
        </a>
        {" - "}
        <strong>({dict.reviews.ratingScore})</strong>
      </p>
    </div>
  );
}
