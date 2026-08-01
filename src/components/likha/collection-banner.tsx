import { ArrowRight } from "lucide-react";
import { collectionBanner } from "@/data/films";
import { sectionGap } from "./layout";

export function CollectionBanner() {
  return (
    <section className={`relative w-full overflow-hidden ${sectionGap}`}>
      <img
        src={collectionBanner}
        alt="The Provincial New Wave collection artwork"
        loading="lazy"
        width={1920}
        height={800}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="hero-scrim absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-background/55" aria-hidden />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20 lg:px-8 lg:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
          Curated collection
        </p>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.01em] text-balance text-foreground sm:text-4xl lg:text-5xl">
          The Provincial New Wave
        </h2>
        <p className="mt-6 font-display text-lg leading-[1.5] text-foreground/85 sm:text-xl lg:text-2xl">
          “The cities got the cameras. The provinces got the stories.”
        </p>
        <p className="mt-6 max-w-xl text-sm leading-[1.6] text-muted-foreground">
          Twelve films from Ilocos to Sulu, made outside Manila's studio system and shot in their
          own languages.
        </p>
        <button className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:scale-[1.03] hover:brightness-95 active:scale-[0.98]">
          Explore collection
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
