import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock } from "lucide-react";
import { TopNav, MobileTabBar } from "@/components/likha/nav";
import { Footer } from "@/components/likha/footer";
import { FilmDetail } from "@/components/likha/film-detail";
import { SearchOverlay } from "@/components/likha/search-overlay";
import { MyListPanel } from "@/components/likha/my-list-panel";
import { shell } from "@/components/likha/layout";
import type { Film } from "@/data/films";

const pageTitles: Record<string, string> = {
  "submit-a-film": "Submit a Film",
  distribution: "Distribution",
  "festival-partners": "Festival Partners",
  "press-kit": "Press Kit",
  "help-center": "Help Center",
  "rental-terms": "Rental Terms",
  privacy: "Privacy",
};

export const Route = createFileRoute("/coming-soon/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${pageTitles[params.slug] ?? "Coming Soon"} — Likha Flix` }],
  }),
  component: ComingSoonPage,
});

function ComingSoonPage() {
  const { slug } = Route.useParams();
  const title = pageTitles[slug] ?? "This page";
  const [selected, setSelected] = useState<Film | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <TopNav onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <main className={`${shell} flex flex-col items-center py-24 text-center`}>
        <Clock className="size-8 text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          This page is coming soon. Check back shortly.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
        >
          Back to Home
        </Link>
      </main>

      <Footer />
      <MobileTabBar onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <FilmDetail film={selected} onClose={() => setSelected(null)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onOpenFilm={setSelected} />
      <MyListPanel open={myListOpen} onClose={() => setMyListOpen(false)} onOpenFilm={setSelected} />
    </div>
  );
}
