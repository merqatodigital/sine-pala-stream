import { Link } from "@tanstack/react-router";
import { Bell, Bookmark, Home, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMyList } from "@/hooks/use-my-list";

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

const notifications = [
  { title: "9 new Cinemalaya 2026 titles added", time: "Today" },
  { title: "A.ni.mál trailer now available", time: "Today" },
  { title: "Shorts A & B program announced", time: "This week" },
];

type NavCallbacks = {
  onSearch: () => void;
  onOpenMyList: () => void;
};

export function TopNav({ onSearch, onOpenMyList }: NavCallbacks) {
  const [scrolled, setScrolled] = useState(false);
  const { ids } = useMyList();

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
      <nav className="mx-auto grid h-14 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:h-16 lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-center gap-8">

          <Link to="/" className="shrink-0 text-lg lg:text-xl">
            <Wordmark />
          </Link>
          <ul className="hidden items-center gap-6 text-sm lg:flex">
            {navItems.map((item, i) => (
              <li key={item}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-disabled={i !== 0}
                  className={
                    i === 0
                      ? "font-medium text-foreground"
                      : "font-normal text-muted-foreground/60 transition-colors"
                  }
                  title={i === 0 ? undefined : "Coming soon"}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3 lg:gap-5">
          <button
            onClick={onSearch}
            aria-label="Search"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-[18px]" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Notifications"
                className="relative hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:grid"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-gold" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5 whitespace-normal">
                  <span className="text-sm text-foreground">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={onOpenMyList}
            className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            My List
            {ids.length > 0 ? (
              <span className="grid size-4 place-items-center rounded-full bg-gold text-[10px] font-semibold text-primary-foreground">
                {ids.length}
              </span>
            ) : null}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Profile"
                className="size-8 shrink-0 rounded-full bg-gradient-to-br from-gold to-festival ring-1 ring-white/15"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Not signed in</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast("Accounts are coming soon")}>
                Sign in
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenMyList}>My List</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("Settings are coming soon")}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export function MobileTabBar({ onSearch, onOpenMyList }: NavCallbacks) {
  const tabs = [
    { label: "Home", icon: Home, onClick: undefined },
    { label: "Search", icon: Search, onClick: onSearch },
    { label: "My List", icon: Bookmark, onClick: onOpenMyList },
    {
      label: "Profile",
      icon: User,
      onClick: () => toast("Accounts are coming soon"),
    },
  ] as const;

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map(({ label, icon: Icon, onClick }, i) => (
          <li key={label}>
            <button
              onClick={onClick}
              className={`flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors active:scale-95 ${
                i === 0 ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-5" strokeWidth={i === 0 ? 2.2 : 1.8} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
