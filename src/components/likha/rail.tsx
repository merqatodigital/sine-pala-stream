import { useRef } from "react";
import { Check, ChevronLeft, ChevronRight, Play, Plus, Subtitles } from "lucide-react";
import { toast } from "sonner";
import type { Film } from "@/data/films";
import { useMyList } from "@/hooks/use-my-list";
import { railBleed, sectionGap, shell } from "./layout";

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
    <section className={`${shell} ${sectionGap}`}>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 lg:mb-6">
        <div className="min-w-0">
          <h2 className="truncate font-display text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl lg:text-[28px]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 truncate text-[13px] leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            aria-label={`Scroll ${title} left`}
            onClick={() => nudge(-1)}
            className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-gold/50 hover:text-gold"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label={`Scroll ${title} right`}
            onClick={() => nudge(1)}
            className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-gold/50 hover:text-gold"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className={`no-scrollbar snap-rail ${railBleed} flex gap-4 overflow-x-auto pb-4`}
      >
        {films.map((film) => (
          <FilmCard
            key={film.id + title}
            film={film}
            variant={variant}
            onOpen={onOpen}
          />
        ))}
        <div className="w-px shrink-0" aria-hidden />
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

const widths = {
  landscape: "w-[78%] sm:w-[46%] md:w-[34%] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)]",
  portrait: "w-[42%] sm:w-[28%] md:w-[22%] lg:w-[calc((100%-5rem)/6)] xl:w-[calc((100%-7rem)/8)]",
} as const;

export function FilmCard({
  film,
  variant,
  onOpen,
  inRail = true,
}: {
  film: Film;
  variant: "landscape" | "portrait";
  onOpen: (f: Film) => void;
  /** Rails need fixed percentage widths; grids need the card to fill its cell. */
  inRail?: boolean;
}) {
  const portrait = variant === "portrait";
  const { isSaved, toggle } = useMyList();
  const saved = isSaved(film.id);

  return (
    <div
      className={`group relative ${
        inRail ? `${widths[variant]} shrink-0 snap-start` : "w-full min-w-0"
      }`}
    >

      <button
        onClick={() => onOpen(film)}
        className="block w-full text-left"
      >
        <div
          className={`card-shadow group-hover:card-shadow-hover relative overflow-hidden rounded-lg bg-card ring-1 ring-white/5 group-hover:ring-white/15 lg:group-hover:scale-[1.03] ${
            portrait ? "aspect-[2/3]" : "aspect-video"
          }`}
        >
          <img
            src={portrait ? (film.poster ?? film.still) : film.still}
            alt={portrait ? `${film.title} poster` : `${film.title} film still`}
            loading="lazy"
            width={portrait ? 600 : 1024}
            height={portrait ? 900 : 576}
            className="size-full object-cover opacity-95 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute right-2 top-2">
            <PriceBadge film={film} />
          </div>

          {/* Centered translucent play affordance on hover */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid size-12 scale-90 place-items-center rounded-full border border-white/30 bg-white/15 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <Play className="size-4 fill-current" />
            </span>
          </div>

          {portrait ? (
            film.award ? (
              <p className="absolute inset-x-2 bottom-2 line-clamp-2 text-[10px] font-medium uppercase tracking-[0.08em] text-gold">
                {film.award}
              </p>
            ) : null
          ) : (
            <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-2">
              <span className="rounded-sm bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-foreground/90 backdrop-blur-sm">
                {film.runtime}
              </span>
            </div>
          )}

          {typeof film.progress === "number" ? (
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
              <div className="h-full bg-festival" style={{ width: `${film.progress}%` }} />
            </div>
          ) : null}
        </div>

        <h3 className="mt-3 truncate font-display text-[15px] font-semibold tracking-[-0.005em] text-foreground transition-colors group-hover:text-gold">
          {film.title}
        </h3>
        {portrait ? (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {film.director} · {film.year}
          </p>
        ) : (
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <span className="truncate">{film.region}</span>
            <Subtitles className="size-3 shrink-0" aria-hidden />
            <span className="shrink-0">EN·FIL</span>
          </p>
        )}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggle(film.id);
          toast.success(saved ? `Removed "${film.title}" from My List` : `Added "${film.title}" to My List`);
        }}
        aria-label={saved ? "Remove from My List" : "Add to My List"}
        aria-pressed={saved}
        className={`absolute left-2 top-2 grid size-7 place-items-center rounded-full border backdrop-blur-sm transition-all duration-200 ${
          saved
            ? "border-gold bg-gold/20 text-gold opacity-100"
            : "border-white/25 bg-black/50 text-foreground opacity-80 hover:opacity-100"
        }`}
      >
        {saved ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
      </button>
    </div>
  );
}
