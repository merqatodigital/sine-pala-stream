import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav, MobileTabBar } from "@/components/likha/nav";
import { Footer } from "@/components/likha/footer";
import { FilmDetail } from "@/components/likha/film-detail";
import { SearchOverlay } from "@/components/likha/search-overlay";
import { MyListPanel } from "@/components/likha/my-list-panel";
import { FilmCard } from "@/components/likha/rail";
import { shell } from "@/components/likha/layout";
import { browseCatalog, isBrowseSlug } from "@/lib/browse-catalog";
import type { Film } from "@/data/films";

export const Route = createFileRoute("/browse/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} — Likha Flix` }],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { slug } = Route.useParams();
  const [selected, setSelected] = useState<Film | null>(null);
  const [autoplayTrailer, setAutoplayTrailer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(false);

  const open = (film: Film) => {
    setSelected(film);
    setAutoplayTrailer(false);
  };

  const entry = isBrowseSlug(slug) ? browseCatalog[slug] : null;
  const films = entry ? entry.films() : [];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <TopNav onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <main className={`${shell} pt-10 lg:pt-14`}>
        <Link
          to="/"
          className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Home
        </Link>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] text-foreground sm:text-4xl">
          {entry ? entry.title : "Not found"}
        </h1>

        {films.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {films.map((film) => (
              <FilmCard key={film.id} film={film} variant="portrait" onOpen={open} />
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            {entry ? entry.emptyMessage : "That page doesn't exist."}
          </p>
        )}
      </main>

      <Footer />
      <MobileTabBar onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <FilmDetail
        film={selected}
        autoplayTrailer={autoplayTrailer}
        onClose={() => setSelected(null)}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onOpenFilm={open} />
      <MyListPanel open={myListOpen} onClose={() => setMyListOpen(false)} onOpenFilm={open} />
    </div>
  );
}
