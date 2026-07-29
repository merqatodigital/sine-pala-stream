import { createFileRoute } from "@tanstack/react-router";
import { Play, Plus, Search, Bookmark, Info } from "lucide-react";

import heroBackdrop from "@/assets/hero-backdrop.jpg";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";
import spotlight from "@/assets/spotlight.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

type Film = {
  title: string;
  director: string;
  meta: string;
  poster: string;
};

const cinemalaya: Film[] = [
  { title: "Ang Huling Gabi sa Escolta", director: "M. De La Cruz", meta: "Drama · 114m", poster: poster2 },
  { title: "Alitaptap sa Dilim", director: "Isabel Sandoval", meta: "Romance · 95m", poster: poster5 },
  { title: "Sa Pagitan ng mga Alon", director: "Rafaela Santos", meta: "Drama · 108m", poster: poster1 },
  { title: "Mga Anino ng Kahapon", director: "Mike De Leon", meta: "History · 124m", poster: poster3 },
  { title: "Bulawan sa Ulap", director: "Lav Diaz", meta: "Drama · 152m", poster: poster6 },
  { title: "Concrete Twilight", director: "Antonio Luna", meta: "Noir · 98m", poster: poster8 },
];

const regional: Film[] = [
  { title: "Vinta Dreams", director: "Sarah Dimaporo", meta: "Zamboanga · 92m", poster: poster4 },
  { title: "Wind of Batanes", director: "Ricardo Puno", meta: "Ivatan · 88m", poster: poster3 },
  { title: "Bulawang Palay", director: "Kidlat Tahimik", meta: "Cordillera · 105m", poster: poster6 },
  { title: "Asin at Dagat", director: "Jose Mari Rivera", meta: "Cebuano · 96m", poster: poster1 },
  { title: "Lupang Hinihirang", director: "Sheron Dayoc", meta: "Bisaya · 102m", poster: poster4 },
  { title: "Bayan ng Pangarap", director: "Arnel Mardoquio", meta: "Chavacano · 88m", poster: poster5 },
];

const shortsAndDocs: Film[] = [
  { title: "The Aswang Diaries", director: "Alyx Ayn Arumpac", meta: "Horror · 21m", poster: poster7 },
  { title: "Ingay ng Lungsod", director: "T. Red", meta: "Doc · 140m", poster: poster2 },
  { title: "Alamat ng Maya", director: "E. Villamanca", meta: "Animation · 85m", poster: poster6 },
  { title: "Pasay Midnight", director: "Carlos V.", meta: "Short · 18m", poster: poster8 },
  { title: "Bangka", director: "Baby Ruth Villarama", meta: "Doc · 76m", poster: poster1 },
  { title: "Sigwa", director: "Joel Lamangan", meta: "Doc · 68m", poster: poster5 },
];

const chips = [
  "All",
  "Drama",
  "Dokumentaryo",
  "Regional Cinema",
  "Maikling Pelikula",
  "LGBTQ+",
  "Horror",
  "Experimental",
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Chips />
      <Rail title="Cinemalaya Picks" subtitle="Festival winners you shouldn't miss" films={cinemalaya} />
      <Rail title="Mula sa Rehiyon" subtitle="Regional voices from Luzon, Visayas, Mindanao" films={regional} />
      <Spotlight />
      <Rail title="Shorts & Dokumentaryo" subtitle="Bite-sized cinema, big ideas" films={shortsAndDocs} />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <a href="#" className="font-display text-2xl font-semibold italic tracking-tight text-gold">
            sine<span className="text-foreground">libre</span>
          </a>
          <div className="hidden items-center gap-7 text-sm md:flex">
            <a href="#" className="font-medium text-foreground">Browse</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Festivals</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Regional</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Shorts</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Filmmakers</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-muted-foreground transition-colors hover:text-foreground">
            <Search className="size-4" />
          </button>
          <button className="hidden text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:block">
            My List
          </button>
          <div className="size-8 rounded-full bg-gradient-to-br from-gold to-festival ring-1 ring-white/10" />
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-6">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={heroBackdrop}
            alt="Sa Pagitan ng mga Alon — featured film backdrop"
            width={1920}
            height={900}
            className="h-[75vh] max-h-[720px] min-h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-2xl p-8 md:p-14">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-festival/40 bg-festival/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-festival">
                  QCinema · Best Picture
                </span>
                <span className="rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  2025 · Drama
                </span>
              </div>
              <h1 className="mb-5 font-display text-5xl font-medium leading-[0.95] text-balance md:text-7xl">
                Sa Pagitan ng<br />
                <span className="italic text-gold">mga Alon</span>
              </h1>
              <p className="mb-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">
                A meditative portrait of a vanishing coastal town in Pangasinan, and the tide that keeps
                pulling its people home. Directed by <span className="underline decoration-gold/50 underline-offset-4">Rafaela Santos</span>.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold hover:text-primary-foreground">
                  <Play className="size-4 fill-current" />
                  Panoorin
                </button>
                <button className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white/10">
                  <Plus className="size-4" />
                  My List
                </button>
                <button className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <Info className="size-4" />
                  More info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chips() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-10">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {chips.map((c, i) => (
          <button
            key={c}
            className={
              i === 0
                ? "whitespace-nowrap rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background"
                : "whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
            }
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}

function Rail({ title, subtitle, films }: { title: string; subtitle: string; films: Film[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <a
          href="#"
          className="border-b border-transparent pb-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          View all
        </a>
      </div>

      <div className="no-scrollbar -mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-3">
        {films.map((f) => (
          <FilmCard key={f.title} film={f} />
        ))}
      </div>
    </section>
  );
}

function FilmCard({ film }: { film: Film }) {
  return (
    <div className="group w-[220px] flex-none snap-start cursor-pointer md:w-[240px]">
      <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-md bg-card ring-1 ring-white/5 transition-all duration-300 group-hover:ring-gold/40">
        <img
          src={film.poster}
          alt={`${film.title} poster`}
          loading="lazy"
          width={600}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            aria-label="Play"
            className="inline-flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-gold"
          >
            <Play className="size-3.5 fill-current" />
          </button>
          <button
            aria-label="Add to list"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-foreground backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            <Bookmark className="size-3.5" />
          </button>
        </div>
      </div>
      <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
        {film.title}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {film.director} · {film.meta}
      </p>
    </div>
  );
}

function Spotlight() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-20">
      <div className="grid gap-10 overflow-hidden rounded-xl border border-border bg-card p-8 md:grid-cols-2 md:p-14">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-block w-fit rounded-sm bg-gold/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Curated Series
          </span>
          <h2 className="mb-5 font-display text-4xl font-medium leading-tight md:text-5xl">
            The Provincial <span className="italic text-gold">New Wave</span>
          </h2>
          <p className="mb-8 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Mula Batanes hanggang Sulu. A season-long dive into the filmmakers rewriting Philippine
            cinema from outside the capital — raw, regional, and quietly furious.
          </p>
          <div className="mb-8 space-y-3">
            {[
              { n: "01", t: "Pasay Midnight", d: "Carlos V." },
              { n: "02", t: "Concrete Jungle Fever", d: "Maria Clara" },
              { n: "03", t: "Divisoria Blues", d: "Antonio Luna II" },
            ].map((r) => (
              <div
                key={r.n}
                className="group flex cursor-pointer items-center gap-5 border-b border-border pb-3 transition-colors hover:border-gold/50"
              >
                <span className="font-display text-2xl text-muted-foreground transition-colors group-hover:text-gold">
                  {r.n}
                </span>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider">{r.t}</h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Dir. {r.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-sm bg-festival px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-festival/90">
            <Play className="size-4 fill-current" />
            Start the series
          </button>
        </div>
        <div className="relative">
          <img
            src={spotlight}
            alt="Provincial New Wave feature still"
            loading="lazy"
            width={1200}
            height={800}
            className="aspect-[4/3] w-full rounded-lg object-cover ring-1 ring-white/5"
          />
          <div className="absolute -bottom-4 -left-4 hidden max-w-[220px] rounded-sm bg-gold p-5 shadow-xl md:block">
            <p className="font-display text-lg italic leading-tight text-primary-foreground">
              "A new era of Filipino storytelling."
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/70">
              — Rappler
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <a href="#" className="font-display text-2xl font-semibold italic tracking-tight text-gold">
            sine<span className="text-foreground">libre</span>
          </a>
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            Ang tahanan ng pelikulang Pilipino. Streaming independent film from every corner of the archipelago.
          </p>
        </div>
        <FooterCol title="Discover" links={["Browse", "Festivals", "Regional", "Shorts", "New releases"]} />
        <FooterCol title="Filmmakers" links={["Submit a film", "Grants", "Restoration project", "Press kit"]} />
        <FooterCol title="Support" links={["Contact", "FAQ", "Privacy", "Terms"]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Sinelibre Media · Made in Manila</p>
          <p>For the love of Philippine cinema.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h5 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
        {title}
      </h5>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
