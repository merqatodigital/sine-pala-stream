import { Play, Plus, Info } from "lucide-react";
import { featured } from "@/data/films";
import type { Film } from "@/data/films";

export function Hero({ onOpen }: { onOpen: (film: Film) => void }) {
  return (
    <section className="relative -mt-14 h-[78svh] max-h-[760px] min-h-[520px] w-full overflow-hidden lg:-mt-16 lg:h-[68vh]">
      <img
        src={featured.still}
        alt={`${featured.title} — featured film still`}
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 lg:pb-16">
          <div className="max-w-xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-festival/40 bg-festival/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-festival">
                {featured.award}
              </span>
              <span className="rounded-full border border-border bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                {featured.year} · {featured.genre} · {featured.runtime}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {featured.title}
            </h1>

            <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-foreground/80 lg:text-base">
              {featured.synopsis} Directed by {featured.director}.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <button className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:brightness-105 active:scale-[0.97]">
                <Play className="size-4 fill-current" />
                Rent HD · ₱{featured.price}
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white/15 active:scale-[0.97]">
                <Info className="size-4" />
                Watch Trailer
              </button>
              <button
                onClick={() => onOpen(featured)}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 active:scale-[0.97]"
              >
                <Plus className="size-4" />
                My List
              </button>
            </div>

            <p className="mt-3 text-[11px] font-medium tracking-wide text-muted-foreground">
              7-day access · 1080p · English and Filipino subtitles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
