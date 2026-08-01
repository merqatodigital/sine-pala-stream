import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cinemalaya2026FullLength } from "@/data/films-cinemalaya-2026";
import type { Film } from "@/data/films";
import { useLanguage } from "@/lib/i18n";
import { shell } from "./layout";

export function SearchOverlay({
  open,
  onClose,
  onOpenFilm,
}: {
  open: boolean;
  onClose: () => void;
  onOpenFilm: (film: Film) => void;
}) {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cinemalaya2026FullLength;
    return cinemalaya2026FullLength.filter(
      (film) =>
        film.title.toLowerCase().includes(q) ||
        film.director.toLowerCase().includes(q) ||
        film.genre.toLowerCase().includes(q),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-background">
      <div className={`${shell} flex items-center gap-3 border-b border-border py-4`}>
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          onClick={onClose}
          aria-label="Close search"
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className={`${shell} flex-1 overflow-y-auto py-6`}>
        {results.length === 0 ? (
          <p className="text-sm text-muted-foreground">No films match “{query}.”</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {results.map((film) => (
              <button
                key={film.id}
                onClick={() => {
                  onOpenFilm(film);
                  onClose();
                }}
                className="group text-left"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-card ring-1 ring-white/5 transition-all group-hover:ring-white/15">
                  <img
                    src={film.poster ?? film.still}
                    alt={`${film.title} poster`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-2 truncate text-[13px] font-semibold text-foreground">
                  {film.title}
                </h3>
                <p className="truncate text-xs text-muted-foreground">{film.director}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
