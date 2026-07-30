import { ArrowRight } from "lucide-react";
import { collectionBanner } from "@/data/films";

export function CollectionBanner() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:py-10">
      <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
        <img
          src={collectionBanner}
          alt="The Provincial New Wave collection artwork"
          loading="lazy"
          width={1920}
          height={800}
          className="h-[320px] w-full object-cover sm:h-[360px] lg:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-lg px-5 sm:px-8 lg:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Curated collection
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              The Provincial New Wave
            </h2>
            <p className="mt-3 font-editorial text-lg leading-snug text-foreground/85 sm:text-xl">
              “The cities got the cameras. The provinces got the stories.”
            </p>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
              Twelve films from Ilocos to Sulu, made outside Manila's studio system and shot in
              their own languages.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform active:scale-[0.97]">
              Explore collection
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
