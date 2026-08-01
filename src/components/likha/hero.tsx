import { Play, Plus, Film as FilmIcon } from "lucide-react";
import { featured } from "@/data/films";
import type { Film } from "@/data/films";
import { shell } from "./layout";

export function Hero({ onOpen }: { onOpen: (film: Film) => void }) {
  return (
    <section className="relative -mt-14 h-[78svh] max-h-[820px] min-h-[560px] w-full overflow-hidden lg:-mt-16 lg:h-[68vh]">
      <img
        src={featured.still}
        alt={`${featured.title} — featured film still`}
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      {/* Multi-stop scrims: bottom for the copy block, left for wide viewports */}
      <div className="hero-scrim absolute inset-0" aria-hidden />
      <div className="hero-scrim-x absolute inset-0 hidden md:block" aria-hidden />

      <div className="absolute inset-x-0 bottom-0">
        <div className={`${shell} pb-16 lg:pb-24`}>
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-festival/40 bg-festival/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-festival">
                {featured.award}
              </span>
              <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
                {featured.year} · {featured.genre} · {featured.runtime}
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-balance text-foreground sm:text-5xl lg:text-6xl">
              {featured.title}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-[1.6] text-foreground/85 lg:text-base">
              {featured.synopsis} Directed by {featured.director}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:scale-[1.03] hover:brightness-95 active:scale-[0.98]">
                <Play className="size-4 fill-current" />
                Play Now · ₱{featured.price}
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-white/18 active:scale-[0.98]">
                <FilmIcon className="size-4" />
                Watch Trailer
              </button>
              <button
                onClick={() => onOpen(featured)}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
              >
                <Plus className="size-4" />
                My List
              </button>
            </div>

            <p className="mt-4 text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
              7-day access · 1080p · English and Filipino subtitles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
