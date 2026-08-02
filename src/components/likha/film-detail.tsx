import { useEffect, useState } from "react";
import { Check, ChevronLeft, Play, Plus, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { priceLabel, tierLabel } from "@/data/films";
import type { Film } from "@/data/films";
import { useMyList } from "@/hooks/use-my-list";
import { useLanguage } from "@/lib/i18n";

export function FilmDetail({
  film,
  autoplayTrailer = false,
  onClose,
}: {
  film: Film | null;
  autoplayTrailer?: boolean;
  onClose: () => void;
}) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [step, setStep] = useState<"details" | "confirmRental">("details");
  const { isSaved, toggle } = useMyList();
  const { t } = useLanguage();

  useEffect(() => {
    if (!film) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [film, onClose]);

  // Reopen on the poster by default; a "Watch Trailer" CTA (e.g. from the
  // Hero) can request the trailer start playing immediately instead.
  useEffect(() => {
    setIsPreviewing(Boolean(autoplayTrailer && film?.trailerYoutubeId));
    setStep("details");
  }, [film?.id, autoplayTrailer]);

  if (!film) return null;

  const hasTrailer = Boolean(film.trailerYoutubeId);
  const saved = isSaved(film.id);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${film.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: film.title, text: film.synopsis, url });
      } catch {
        // user cancelled the native share sheet — no error toast needed
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const handleConfirmRental = () => {
    toast.success(`"${film.title}" rental confirmed`, {
      description: "Demo only — no payment was charged.",
    });
    setStep("details");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />
      <div className="relative flex max-h-[92svh] w-full flex-col overflow-y-auto rounded-t-2xl bg-card ring-1 ring-white/10 sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl">
        <div className="relative shrink-0">
          {isPreviewing && hasTrailer ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                key={film.id}
                src={`https://www.youtube.com/embed/${film.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${film.title} — trailer preview`}
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <img
                src={film.still}
                alt={`${film.title} still`}
                width={1024}
                height={576}
                className="aspect-video w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              {hasTrailer ? (
                <button
                  onClick={() => setIsPreviewing(true)}
                  aria-label={`Play trailer for ${film.title}`}
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-black/60 text-foreground backdrop-blur-sm transition-transform hover:scale-110">
                    <Play className="size-7 fill-current" />
                  </span>
                </button>
              ) : null}
            </>
          )}

          {isPreviewing ? (
            <button
              onClick={() => setIsPreviewing(false)}
              aria-label="Back to poster"
              className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-black/75"
            >
              <ChevronLeft className="size-3.5" />
              {t("back")}
            </button>
          ) : null}

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/60 text-foreground backdrop-blur-sm"
          >
            <X className="size-4" />
          </button>
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/25 sm:hidden" />
        </div>

        <div className="p-5 sm:p-7">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
            {film.title}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {film.year} · {film.runtime} · {film.rating} · {film.genre} · {film.region}
          </p>

          {film.award ? (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gold">
              {film.award}
            </p>
          ) : null}

          <p className="mt-4 text-sm leading-relaxed text-foreground/85">{film.synopsis}</p>
          <p className="mt-3 text-[13px] text-muted-foreground">
            {t("directedBy")} <span className="text-foreground">{film.director}</span> ·{" "}
            {tierLabel[film.tier]}
          </p>

          {step === "confirmRental" ? (
            <div className="mt-6 rounded-lg border border-white/15 p-4">
              <p className="text-sm font-semibold text-foreground">{t("confirmRental")}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                <span>{film.title}</span>
                <span className="text-foreground">{priceLabel(film)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t("accessTerms")}</p>
              <div className="mt-4 flex gap-2.5">
                <button
                  onClick={handleConfirmRental}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
                >
                  {t("confirmRentalCta")}
                </button>
                <button
                  onClick={() => setStep("details")}
                  className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
                >
                  {t("cancel")}
                </button>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">{t("demoCheckoutNote")}</p>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                onClick={() => setStep("confirmRental")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97] sm:order-2 sm:w-auto"
              >
                <Play className="size-4 fill-current" />
                {priceLabel(film)}
              </button>
              <div className="flex items-center gap-2.5 sm:order-1">
                {hasTrailer ? (
                  <button
                    onClick={() => setIsPreviewing(true)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10 sm:flex-none"
                  >
                    <Play className="size-4 fill-current" />
                    {isPreviewing ? t("replayTrailer") : t("watchTrailer")}
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    toggle(film.id);
                    toast.success(saved ? `Removed "${film.title}" from My List` : `Added "${film.title}" to My List`);
                  }}
                  aria-label={saved ? t("removeFromMyList") : t("addToMyList")}
                  aria-pressed={saved}
                  className={`grid size-11 shrink-0 place-items-center rounded-md border text-foreground transition-colors ${
                    saved ? "border-gold bg-gold/10 text-gold" : "border-white/15 hover:bg-white/10"
                  }`}
                >
                  {saved ? <Check className="size-4" /> : <Plus className="size-4" />}
                </button>
                <button
                  onClick={handleShare}
                  aria-label={t("share")}
                  className="grid size-11 shrink-0 place-items-center rounded-md border border-white/15 text-foreground transition-colors hover:bg-white/10"
                >
                  <Share2 className="size-4" />
                </button>
              </div>
            </div>

          )}
          <p className="mt-3 text-[11px] text-muted-foreground">{t("accessTerms")}</p>
        </div>
      </div>
    </div>
  );
}
