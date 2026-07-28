"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/data/i18n/dictionaries";
import type { Locale } from "@/lib/locales";

export function ReviewForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          text: data.get("text"),
          rating,
          locale,
        }),
      });
      if (!res.ok) throw new Error("fail");
      form.reset();
      setRating(5);
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="success-box">
        <h3>{dict.reviews.success}</h3>
        <p>{dict.reviews.successHint}</p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="field span-2">
        <label htmlFor="r-name">{dict.reviews.name}</label>
        <input id="r-name" name="name" required autoComplete="name" />
      </div>
      <div className="field span-2">
        <label>{dict.reviews.rating}</label>
        <div className="rating-pick" role="group" aria-label={dict.reviews.rating}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={n <= rating ? "is-on" : undefined}
              onClick={() => setRating(n)}
              aria-pressed={n <= rating}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="field span-2">
        <label htmlFor="r-text">{dict.reviews.text}</label>
        <textarea id="r-text" name="text" required minLength={12} />
      </div>
      <div className="span-2">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? dict.common.loading : dict.reviews.submit}
        </button>
        {status === "err" && (
          <p style={{ color: "var(--rose-deep)", marginTop: "0.75rem" }}>
            {dict.common.error}
          </p>
        )}
      </div>
    </form>
  );
}
