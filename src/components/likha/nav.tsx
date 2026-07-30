import { Link } from "@tanstack/react-router";
import { Search, Bell, Home, Bookmark, User } from "lucide-react";
import { useEffect, useState } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`select-none font-sans tracking-tight ${className}`}>
      <span className="font-bold text-foreground">LIKHA</span>
      <span className="font-medium text-gold"> FLIX</span>
    </span>
  );
}

const navItems = [
  "Home",
  "Films",
  "Series",
  "Shorts",
  "Collections",
  "Regions",
] as const;

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-xl" : "bg-gradient-to-b from-background to-transparent"
      }`}
    >
      <nav className="mx-auto grid h-14 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:h-16 lg:flex lg:justify-between">
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="shrink-0 text-lg lg:text-xl">
            <Wordmark />
          </Link>
          <ul className="hidden items-center gap-6 text-sm lg:flex">
            {navItems.map((item, i) => (
              <li key={item}>
                <a
                  href="#"
                  className={
                    i === 0
                      ? "font-medium text-foreground"
                      : "font-normal text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3 lg:gap-5">
          <button
            aria-label="Search"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-[18px]" />
          </button>
          <button
            aria-label="Notifications"
            className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:grid"
          >
            <Bell className="size-[18px]" />
          </button>
          <a
            href="#"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:block"
          >
            My List
          </a>
          <button
            aria-label="Profile"
            className="size-8 shrink-0 rounded-full bg-gradient-to-br from-gold to-festival ring-1 ring-white/15"
          />
        </div>
      </nav>
    </header>
  );
}

const tabs = [
  { label: "Home", icon: Home, active: true },
  { label: "Search", icon: Search, active: false },
  { label: "My List", icon: Bookmark, active: false },
  { label: "Profile", icon: User, active: false },
];

export function MobileTabBar() {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map(({ label, icon: Icon, active }) => (
          <li key={label}>
            <button
              className={`flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors active:scale-95 ${
                active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
