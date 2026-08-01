import { Link } from "@tanstack/react-router";
import { Wordmark } from "./nav";
import { useLanguage } from "@/lib/i18n";
import { shell } from "./layout";

const columns = [
  {
    title: "Browse",
    links: [
      { label: "Films", href: "/browse/films" },
      { label: "Series", href: "/browse/series" },
      { label: "Shorts", href: "/browse/shorts" },
      { label: "Documentaries", href: "/browse/documentaries" },
      { label: "Collections", href: "/browse/collections" },
    ],
  },
  {
    title: "Regions",
    links: [
      { label: "Luzon", href: "/browse/luzon" },
      { label: "Visayas", href: "/browse/visayas" },
      { label: "Mindanao", href: "/browse/mindanao" },
      { label: "Cordillera", href: "/browse/cordillera" },
      { label: "Diaspora", href: "/browse/diaspora" },
    ],
  },
  {
    title: "Filmmakers",
    links: [
      { label: "Submit a film", href: "/coming-soon/submit-a-film" },
      { label: "Distribution", href: "/coming-soon/distribution" },
      { label: "Festival partners", href: "/coming-soon/festival-partners" },
      { label: "Press kit", href: "/coming-soon/press-kit" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/coming-soon/help-center" },
      { label: "Rental terms", href: "/coming-soon/rental-terms" },
      { label: "Privacy", href: "/coming-soon/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
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
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
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
