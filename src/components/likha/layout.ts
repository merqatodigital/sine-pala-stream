/**
 * Single source of truth for horizontal rhythm.
 * Every section header, hero text block and first carousel card shares this
 * gutter so all left edges land on one vertical axis at every breakpoint.
 */
export const shell = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8";

/** Full-bleed rail track that re-applies the shell gutter as scroll padding. */
export const railBleed = "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8";

/** Vertical rhythm between major sections (8px grid: 64px / 96px). */
export const sectionGap = "mt-16 lg:mt-24";
