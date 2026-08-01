import { Check, Play, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Film } from "@/data/films";
import { useMyList } from "@/hooks/use-my-list";
import { useLanguage } from "@/lib/i18n";
import { sectionGap, shell } from "./layout";

type DiscoverProps = {
  title: string;
  subtitle?: string;
  films: Film[];
  onOpen: (film: Film) => void;
};

/**
 * An asymmetric editorial grid — one large spotlight card plus a mixed row
 * of smaller cards — used to break up the homepage's rail-after-rail rhythm
 * with something that reads like a festival program page, not a tile list.
 */
export function Discover({ title, subtitle, films, onOpen }: DiscoverProps) {
  const [spotlight, ...rest] = films;
  const supporting = rest.slice(0, 4);

  if (!spotlight) return null;

  return (
    <section className={`${shell} ${sectionGap}`}>
      <div className="mb-4 lg:mb-6">
        <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl lg:text-[28px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <SpotlightCard film={spotlight} onOpen={onOpen} />
        {supporting.length ? (
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-2">
            {supporting.map((film) => (
              <SupportingCard key={film.id} film={film} onOpen={onOpen} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MyListToggle({ film, size = "size-9" }: { film: Film; size?: string }) {
  const { isSaved, toggle } = useMyList();
  const saved = isSaved(film.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(film.id);
        toast.success(saved ? `Removed "${film.title}" from My List` : `Added "${film.title}" to My List`);
      }}
      aria-label={saved ? "Remove from My List" : "Add to My List"}
      aria-pressed={saved}
      className={`grid ${size} place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${
        saved
          ? "border-gold bg-gold/20 text-gold opacity-100"
          : "border-white/25 bg-black/40 text-foreground opacity-0 group-hover:opacity-100"
      }`}
    >
      {saved ? <Check className="size-4" /> : <Plus className="size-4" />}
    </button>
  );
}

function SpotlightCard({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  const { t } = useLanguage();
  return (
    <div className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-xl bg-card ring-1 ring-white/5 transition-all duration-300 hover:ring-white/15 lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[420px]">
      <button onClick={() => onOpen(film)} className="absolute inset-0 text-left" aria-label={`Open ${film.title}`}>
        <img
          src={film.still}
          alt={`${film.title} film still`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-8">
          <span className="rounded-sm bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold backdrop-blur-sm">
            {t("spotlight")}
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-foreground lg:text-3xl">
            {film.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/80 line-clamp-2">
            {film.synopsis}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {t("aFilmBy")} {film.director}
          </p>
        </div>

        <div className="pointer-events-none absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/25 bg-black/40 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          <Play className="size-4 fill-current" />
        </div>
      </button>

      <div className="absolute left-5 top-5">
        <MyListToggle film={film} />
      </div>
    </div>
  );
}

function SupportingCard({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-card ring-1 ring-white/5 transition-all duration-300 hover:ring-white/15">
      <button onClick={() => onOpen(film)} className="absolute inset-0 text-left" aria-label={`Open ${film.title}`}>
        <img
          src={film.poster ?? film.still}
          alt={`${film.title} poster`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h4 className="truncate text-[13px] font-semibold text-foreground">{film.title}</h4>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{film.director}</p>
        </div>
      </button>

      <div className="absolute right-2 top-2">
        <MyListToggle film={film} size="size-7" />
      </div>
    </div>
  );
}
