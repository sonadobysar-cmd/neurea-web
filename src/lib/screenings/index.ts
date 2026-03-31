import type { ScreeningDefinition } from "./types";
import { phq9 } from "./phq9";
import { gad7 } from "./gad7";
import { isi } from "./isi";
import { asrsPartA } from "./asrs";
import { adhdChildParent } from "./adhd-child";

const bySlug: Record<string, ScreeningDefinition> = {
  [phq9.slug]: phq9,
  [gad7.slug]: gad7,
  [isi.slug]: isi,
  [asrsPartA.slug]: asrsPartA,
  [adhdChildParent.slug]: adhdChildParent,
};

export function getScreening(slug: string): ScreeningDefinition | undefined {
  return bySlug[slug];
}

export const allScreeningSlugs = Object.keys(bySlug);
