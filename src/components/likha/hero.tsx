import { Check, Play, Plus, Film as FilmIcon } from "lucide-react";
import { toast } from "sonner";
import { cinemalaya2026FullLength } from "@/data/films-cinemalaya-2026";
import type { Film } from "@/data/films";
import { useMyList } from "@/hooks/use-my-list";
import { shell } from "./layout";

const featured = cinemalaya2026FullLength[0];

export function Hero({
  onOpen,
  onWatchTrailer,
}: {
  onOpen: (film: Film) => void;
  onWatchTrailer: (film: Film) => void;
}) {
  const hasTrailer = Boolean(featured.trailerYoutubeId);
  const { isSaved, toggle } = useMyList();
  const saved = isSaved(featured.id);

  return (
    <section className="relative -mt-14 w-full overflow-hidden lg:-mt-16">
      <div className="grid min-h-[640px] w-full lg:grid-cols-2">
        {/* Video panel — muted ambient loop, no controls, no interaction. */}
        <div className="relative order-1 aspect-video w-full overflow-hidden lg:aspect-auto lg:h-auto">
          {hasTrailer ? (
            <iframe
              key={featured.id}
              src={`https://www.youtube.com/embed/${featured.trailerYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${featured.trailerYoutubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
              title={`${featured.title} — ambient preview`}
              aria-hidden="true"
              tabIndex={-1}
              className="pointer-events-none absolute inset-0 size-full scale-[1.35] object-cover"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <img
              src={featured.still}
              alt={`${featured.title} — featured film still`}
              width={1280}
              height={720}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background" />
        </div>

        {/* Editorial panel — festival-poster styled credit block. */}
        <div className="order-2 flex items-center bg-background">
          <div className={`${shell} py-10 lg:px-10 xl:px-14`}>
            <div className="max-w-xl">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-festival/40 bg-festival/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-festival">
                  {featured.award ?? "Cinemalaya 2026 Official Selection"}
                </span>
                <span className="rounded-full border border-white/12 bg-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {featured.year} · {featured.genre} · {featured.runtime}
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-balance text-foreground sm:text-5xl lg:text-[3.25rem]">
                {featured.title}
              </h1>

              <p className="mt-3 text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground">
                A film by {featured.director}
              </p>

              <p className="mt-6 text-pretty text-[15px] leading-[1.6] text-foreground/85 lg:text-base">
                {featured.synopsis}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpen(featured)}
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:scale-[1.03] hover:brightness-95 active:scale-[0.98]"
                >
                  <Play className="size-4 fill-current" />
                  Play Now · ₱{featured.price}
                </button>
                {hasTrailer ? (
                  <button
                    onClick={() => onWatchTrailer(featured)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
                  >
                    <FilmIcon className="size-4" />
                    Watch Trailer
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    toggle(featured.id);
                    toast.success(
                      saved
                        ? `Removed "${featured.title}" from My List`
                        : `Added "${featured.title}" to My List`,
                    );
                  }}
                  aria-pressed={saved}
                  className={`inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${
                    saved
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/25 text-foreground hover:bg-white/10"
                  }`}
                >
                  {saved ? <Check className="size-4" /> : <Plus className="size-4" />}
                  {saved ? "In My List" : "My List"}
                </button>
              </div>

              <p className="mt-5 text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
                7-day access · 1080p · English and Filipino subtitles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
