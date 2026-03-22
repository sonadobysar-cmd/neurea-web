"use client";

import { useState } from "react";
import type { FaqSection } from "@/lib/faq";

export function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  const firstKey =
    sections[0]?.items[0] != null ? `${sections[0].id}-0` : null;
  const [open, setOpen] = useState<string | null>(firstKey);

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="font-display text-2xl text-ink md:text-3xl">{section.title}</h2>
          <ul className="mt-6 space-y-3">
            {section.items.map((item, index) => {
              const key = `${section.id}-${index}`;
              const isOpen = open === key;
              return (
                <li key={key} className="glass-panel overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    onClick={() => setOpen(isOpen ? null : key)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-ink">{item.question}</span>
                    <span className="shrink-0 text-gold" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-ink/5 px-5 pb-5 pt-0 text-sm leading-relaxed text-ink/75 md:px-6 md:pb-6">
                      <p className="pt-4">{item.answer}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
