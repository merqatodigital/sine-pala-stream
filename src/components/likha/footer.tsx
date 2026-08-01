import { Wordmark } from "./nav";
import { useLanguage } from "@/lib/i18n";
import { shell } from "./layout";

const columns = [
  { title: "Browse", links: ["Films", "Series", "Shorts", "Documentaries", "Collections"] },
  { title: "Regions", links: ["Luzon", "Visayas", "Mindanao", "Cordillera", "Diaspora"] },
  { title: "Filmmakers", links: ["Submit a film", "Distribution", "Festival partners", "Press kit"] },
  { title: "Support", links: ["Help center", "Rental terms", "Privacy", "Contact"] },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-border bg-card/30 lg:mt-24">
      <div className={`${shell} py-16 lg:py-20`}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Wordmark className="text-lg" />
            <p className="mt-4 max-w-xs text-[13px] leading-[1.6] text-muted-foreground">
              {t("footerTagline")}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      title={t("comingSoon")}
                      className="text-[13px] text-muted-foreground/60 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p>© {new Date().getFullYear()} Likha Flix. Made in the Philippines.</p>
          <p className="sm:text-right">Rentals from ₱49 · 1080p · EN &amp; FIL subtitles</p>
        </div>
      </div>
    </footer>
  );
}
