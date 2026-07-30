import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Subtitles } from "lucide-react";
import type { Film } from "@/data/films";

type RailProps = {
  title: string;
  subtitle?: string;
  films: Film[];
  variant?: "landscape" | "portrait";
  onOpen: (film: Film) => void;
};

export function Rail({ title, subtitle, films, variant = "landscape", onOpen }: RailProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 lg:mb-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground lg:text-[13px]">{subtitle}</p>
          ) : null}
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
          <button
            aria-label={`Scroll ${title} left`}
            onClick={() => nudge(-1)}
            className="grid size-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label={`Scroll ${title} right`}
            onClick={() => nudge(1)}
            className="grid size-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:gap-4"
      >
        {films.map((film) =>
          variant === "portrait" ? (
            <PosterCard key={film.id + title} film={film} onOpen={onOpen} />
          ) : (
            <LandscapeCard key={film.id + title} film={film} onOpen={onOpen} />
          ),
        )}
        <div className="w-1 shrink-0 sm:w-2" aria-hidden />
      </div>
    </section>
  );
}

function PriceBadge({ film }: { film: Film }) {
  return (
    <span
      className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tracking-wide backdrop-blur-sm ${
        film.price === 0
          ? "bg-gold text-primary-foreground"
          : "bg-black/70 text-foreground ring-1 ring-white/15"
      }`}
    >
      {film.price === 0 ? "Watch Free" : `₱${film.price}`}
    </span>
  );
}

export function LandscapeCard({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="group w-[76%] shrink-0 snap-start text-left transition-transform duration-200 active:scale-[0.975] sm:w-[46%] md:w-[34%] lg:w-[25%] xl:w-[21%]"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-card ring-1 ring-white/5 transition-all duration-300 lg:group-hover:scale-[1.04] lg:group-hover:ring-gold/40">
        <img
          src={film.still}
          alt={`${film.title} film still`}
          loading="lazy"
          width={1024}
          height={576}
          className="size-full object-cover opacity-95 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        <div className="absolute right-2 top-2 flex items-center gap-1">
          <PriceBadge film={film} />
        </div>

        <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-2">
          <span className="rounded-sm bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-foreground/90 backdrop-blur-sm">
            {film.runtime}
          </span>
          <span className="flex items-center gap-1.5 opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100">
            <span className="grid size-7 place-items-center rounded-full bg-foreground text-background">
              <Play className="size-3 fill-current" />
            </span>
            <span className="grid size-7 place-items-center rounded-full border border-white/25 bg-black/50 text-foreground backdrop-blur-sm">
              <Plus className="size-3.5" />
            </span>
          </span>
        </div>

        {typeof film.progress === "number" ? (
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
            <div className="h-full bg-festival" style={{ width: `${film.progress}%` }} />
          </div>
        ) : null}
      </div>

      <h3 className="mt-2 truncate text-[13px] font-semibold text-foreground transition-colors group-hover:text-gold lg:text-sm">
        {film.title}
      </h3>
      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
        <span className="truncate">{film.region}</span>
        <Subtitles className="size-3 shrink-0" aria-hidden />
        <span className="shrink-0">EN·FIL</span>
      </p>
    </button>
  );
}

export function PosterCard({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="group w-[42%] shrink-0 snap-start text-left transition-transform duration-200 active:scale-[0.975] sm:w-[28%] md:w-[22%] lg:w-[16%] xl:w-[13.5%]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card ring-1 ring-white/5 transition-all duration-300 lg:group-hover:scale-[1.05] lg:group-hover:ring-gold/40">
        <img
          src={film.poster ?? film.still}
          alt={`${film.title} poster`}
          loading="lazy"
          width={600}
          height={900}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute right-2 top-2">
          <PriceBadge film={film} />
        </div>
        {film.award ? (
          <p className="absolute inset-x-2 bottom-2 line-clamp-2 text-[10px] font-medium uppercase tracking-wide text-gold">
            {film.award}
          </p>
        ) : null}
      </div>
      <h3 className="mt-2 truncate text-[13px] font-semibold transition-colors group-hover:text-gold">
        {film.title}
      </h3>
      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
        {film.director} · {film.year}
      </p>
    </button>
  );
}
