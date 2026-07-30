import { Wordmark } from "./nav";

const columns = [
  { title: "Browse", links: ["Films", "Series", "Shorts", "Documentaries", "Collections"] },
  { title: "Regions", links: ["Luzon", "Visayas", "Mindanao", "Cordillera", "Diaspora"] },
  { title: "Filmmakers", links: ["Submit a film", "Distribution", "Festival partners", "Press kit"] },
  { title: "Support", links: ["Help center", "Rental terms", "Privacy", "Contact"] },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Wordmark className="text-lg" />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              A streaming home for Filipino independent cinema — festival winners, regional voices,
              documentaries and shorts.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p>© {new Date().getFullYear()} Likha Flix. Made in the Philippines.</p>
          <p className="sm:text-right">Rentals from ₱49 · 1080p · EN &amp; FIL subtitles</p>
        </div>
      </div>
    </footer>
  );
}
