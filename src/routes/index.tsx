import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav, MobileTabBar } from "@/components/likha/nav";
import { Hero } from "@/components/likha/hero";
import { Rail } from "@/components/likha/rail";
import { Discover } from "@/components/likha/discover";
import { FilmDetail } from "@/components/likha/film-detail";
import { Footer } from "@/components/likha/footer";
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

        <Discover
          title="Discover"
          subtitle="A closer look at this year's program"
          films={cinemalaya2026FullLength}
          onOpen={open}
        />
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
