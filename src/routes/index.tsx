import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav, MobileTabBar } from "@/components/likha/nav";
import { Hero } from "@/components/likha/hero";
import { Rail } from "@/components/likha/rail";
import { CollectionBanner } from "@/components/likha/collection-banner";
import { FilmDetail } from "@/components/likha/film-detail";
import { Footer } from "@/components/likha/footer";
import {
  awardWinners,
  classics,
  curatedCollection,
  luzon,
  newReleases,
  shortsAndDocs,
} from "@/data/films";
import { cinemalaya2026FullLength } from "@/data/films-cinemalaya-2026";
import type { Film } from "@/data/films";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Likha Flix — Stream Filipino Independent Cinema" },
      {
        name: "description",
        content:
          "Rent Filipino independent films in HD from ₱49. Festival winners, regional voices from Luzon, Visayas and Mindanao, documentaries, shorts and restored classics.",
      },
      { property: "og:title", content: "Likha Flix — Stream Filipino Independent Cinema" },
      {
        property: "og:description",
        content:
          "Festival winners, regional voices, documentaries and shorts. 7-day access · 1080p · EN & FIL subtitles.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cinema.palawancollective.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cinema.palawancollective.com/" }],
  }),
  component: Home,
});

// Placeholder watch-progress until real accounts + rental history exist.
// Films themselves are real Cinemalaya 2026 titles with real trailers.
const CONTINUE_WATCHING_PROGRESS = [62, 28, 81, 14];
const continueWatchingReal: Film[] = cinemalaya2026FullLength
  .slice(0, 4)
  .map((film, i) => ({ ...film, progress: CONTINUE_WATCHING_PROGRESS[i] }));
// Same 9 real titles as the selection rail above, reordered so the row
// doesn't look like a literal duplicate until there's enough catalog depth
// to make "Popular" a genuinely different subset.
const popularReal: Film[] = [...cinemalaya2026FullLength].reverse();

function Home() {
  const [selected, setSelected] = useState<Film | null>(null);
  const [autoplayTrailer, setAutoplayTrailer] = useState(false);
  const open = (film: Film) => {
    setSelected(film);
    setAutoplayTrailer(false);
  };
  const openWithTrailer = (film: Film) => {
    setSelected(film);
    setAutoplayTrailer(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <TopNav />
      <main>
        <Hero onOpen={open} onWatchTrailer={openWithTrailer} />

        <Rail
          title="Cinemalaya 2026 Official Selection"
          subtitle="Real festival finalists, straight from cinemalaya.org"
          films={cinemalaya2026FullLength}
          onOpen={open}
        />

        <Rail
          title="Continue Watching"
          films={continueWatchingReal}
          onOpen={open}
        />
        <Rail
          title="Popular in the Philippines"
          subtitle="What the country is renting this week"
          films={popularReal}
          onOpen={open}
        />
        <Rail title="New Releases" subtitle="Premieres and fresh festival runs" films={newReleases} onOpen={open} />
        <Rail
          title="From Luzon, Visayas & Mindanao"
          subtitle="Regional cinema in its own languages"
          films={luzon}
          onOpen={open}
        />

        <CollectionBanner />

        <Rail
          title="Curated Collection"
          subtitle="The Provincial New Wave — twelve films"
          films={curatedCollection}
          variant="portrait"
          onOpen={open}
        />
        <Rail
          title="Award Winners"
          subtitle="Cinemalaya, QCinema, Gawad Urian and beyond"
          films={awardWinners}
          variant="portrait"
          onOpen={open}
        />
        <Rail
          title="Shorts & Documentaries"
          subtitle="Free to ₱29"
          films={shortsAndDocs}
          onOpen={open}
        />
        <Rail title="Filipino Classics" subtitle="Restored and remastered" films={classics} onOpen={open} />
      </main>

      <Footer />
      <MobileTabBar />
      <FilmDetail
        film={selected}
        autoplayTrailer={autoplayTrailer}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
