import { cinemalaya2026FullLength } from "@/data/films-cinemalaya-2026";
import type { Film } from "@/data/films";

export type BrowseSlug =
  | "films"
  | "series"
  | "shorts"
  | "documentaries"
  | "collections"
  | "luzon"
  | "visayas"
  | "mindanao"
  | "cordillera"
  | "diaspora";

type BrowseEntry = {
  title: string;
  emptyMessage: string;
  films: () => Film[];
};

/**
 * Real filters over the real catalog. Categories with no matching data yet
 * (Series, Documentaries, Collections, and every named region) honestly
 * return an empty list with an explanatory message instead of faking
 * content — the page still navigates and works, it just says so plainly.
 */
export const browseCatalog: Record<BrowseSlug, BrowseEntry> = {
  films: {
    title: "Films",
    emptyMessage: "No full-length films yet.",
    films: () => cinemalaya2026FullLength.filter((f) => f.tier !== "short"),
  },
  shorts: {
    title: "Shorts",
    emptyMessage: "No shorts published yet.",
    films: () => cinemalaya2026FullLength.filter((f) => f.tier === "short"),
  },
  series: {
    title: "Series",
    emptyMessage: "No series on Likha Flix yet — the catalog is currently films and shorts only.",
    films: () => [],
  },
  documentaries: {
    title: "Documentaries",
    emptyMessage: "No films tagged as documentaries yet.",
    films: () => [],
  },
  collections: {
    title: "Collections",
    emptyMessage: "No curated collections have been published yet.",
    films: () => [],
  },
  luzon: {
    title: "Luzon",
    emptyMessage: "No films are tagged by region yet — this page is ready for when they are.",
    films: () => [],
  },
  visayas: {
    title: "Visayas",
    emptyMessage: "No films are tagged by region yet — this page is ready for when they are.",
    films: () => [],
  },
  mindanao: {
    title: "Mindanao",
    emptyMessage: "No films are tagged by region yet — this page is ready for when they are.",
    films: () => [],
  },
  cordillera: {
    title: "Cordillera",
    emptyMessage: "No films are tagged by region yet — this page is ready for when they are.",
    films: () => [],
  },
  diaspora: {
    title: "Diaspora",
    emptyMessage: "No films are tagged by region yet — this page is ready for when they are.",
    films: () => [],
  },
};

export function isBrowseSlug(slug: string): slug is BrowseSlug {
  return slug in browseCatalog;
}
