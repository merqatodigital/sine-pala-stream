import { useEffect } from "react";
import { X, Play, Plus, Share2 } from "lucide-react";
import { priceLabel, tierLabel } from "@/data/films";
import type { Film } from "@/data/films";

export function FilmDetail({ film, onClose }: { film: Film | null; onClose: () => void }) {
  useEffect(() => {
    if (!film) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [film, onClose]);

  if (!film) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />
      <div className="relative flex max-h-[92svh] w-full flex-col overflow-y-auto rounded-t-2xl bg-card ring-1 ring-white/10 sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl">
        <div className="relative shrink-0">
          <img
            src={film.still}
            alt={`${film.title} still`}
            width={1024}
            height={576}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/60 text-foreground backdrop-blur-sm"
          >
            <X className="size-4" />
          </button>
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/25 sm:hidden" />
        </div>

        <div className="p-5 sm:p-7">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
            {film.title}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {film.year} · {film.runtime} · {film.rating} · {film.genre} · {film.region}
          </p>

          {film.award ? (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gold">
              {film.award}
            </p>
          ) : null}

          <p className="mt-4 text-sm leading-relaxed text-foreground/85">{film.synopsis}</p>
          <p className="mt-3 text-[13px] text-muted-foreground">
            Directed by <span className="text-foreground">{film.director}</span> ·{" "}
            {tierLabel[film.tier]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97] sm:flex-none">
              <Play className="size-4 fill-current" />
              {priceLabel(film)}
            </button>
            <button className="grid size-11 place-items-center rounded-md border border-white/15 text-foreground transition-colors hover:bg-white/10">
              <Plus className="size-4" />
            </button>
            <button className="grid size-11 place-items-center rounded-md border border-white/15 text-foreground transition-colors hover:bg-white/10">
              <Share2 className="size-4" />
            </button>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            7-day access · 1080p · English and Filipino subtitles
          </p>
        </div>
      </div>
    </div>
  );
}
