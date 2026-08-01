import { useEffect } from "react";
import { Bookmark, X } from "lucide-react";
import { cinemalaya2026FullLength } from "@/data/films-cinemalaya-2026";
import type { Film } from "@/data/films";
import { useMyList } from "@/hooks/use-my-list";
import { shell } from "./layout";

export function MyListPanel({
  open,
  onClose,
  onOpenFilm,
}: {
  open: boolean;
  onClose: () => void;
  onOpenFilm: (film: Film) => void;
}) {
  const { isSaved } = useMyList();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const saved = cinemalaya2026FullLength.filter((film) => isSaved(film.id));

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-background">
      <div className={`${shell} flex items-center justify-between border-b border-border py-4`}>
        <h2 className="font-display text-xl font-semibold text-foreground">My List</h2>
        <button
          onClick={onClose}
          aria-label="Close My List"
          className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className={`${shell} flex-1 overflow-y-auto py-6`}>
        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <Bookmark className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nothing saved yet. Tap the bookmark icon on any film to add it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {saved.map((film) => (
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
