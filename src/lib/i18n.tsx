import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "tl";

const STORAGE_KEY = "likha-flix-lang";

/**
 * Interface-chrome translations only (nav, labels, CTAs) — not film
 * synopses or director statements, which is a much larger content-
 * translation task, not a UI toggle. English is the default; Tagalog is
 * the secondary option, as requested.
 */
const dictionary = {
  home: { en: "Home", tl: "Home" },
  films: { en: "Films", tl: "Pelikula" },
  series: { en: "Series", tl: "Serye" },
  shorts: { en: "Shorts", tl: "Maiikling Pelikula" },
  collections: { en: "Collections", tl: "Koleksyon" },
  regions: { en: "Regions", tl: "Rehiyon" },
  search: { en: "Search", tl: "Maghanap" },
  searchPlaceholder: { en: "Search films, directors, genres…", tl: "Maghanap ng pelikula, direktor, genre…" },
  myList: { en: "My List", tl: "Listahan Ko" },
  inMyList: { en: "In My List", tl: "Nasa Listahan Ko" },
  notifications: { en: "Notifications", tl: "Abiso" },
  notSignedIn: { en: "Not signed in", tl: "Hindi naka-sign in" },
  signIn: { en: "Sign in", tl: "Mag-sign in" },
  settings: { en: "Settings", tl: "Setting" },
  playNow: { en: "Play Now", tl: "Panoorin Ngayon" },
  watchTrailer: { en: "Watch Trailer", tl: "Panoorin ang Trailer" },
  replayTrailer: { en: "Replay Trailer", tl: "Ulitin ang Trailer" },
  aFilmBy: { en: "A film by", tl: "Isang pelikula ni" },
  directedBy: { en: "Directed by", tl: "Direksyon ni" },
  officialSelection: { en: "Cinemalaya 2026 Official Selection", tl: "Opisyal na Pili — Cinemalaya 2026" },
  officialSelectionSubtitle: {
    en: "Real festival finalists, straight from cinemalaya.org",
    tl: "Tunay na finalist ng festival, mula mismo sa cinemalaya.org",
  },
  discover: { en: "Discover", tl: "Tuklasin" },
  discoverSubtitle: { en: "A closer look at this year's program", tl: "Isang malapitang tingin sa programa ngayong taon" },
  spotlight: { en: "Spotlight", tl: "Tampok" },
  confirmRental: { en: "Confirm rental", tl: "Kumpirmahin ang upa" },
  confirmRentalCta: { en: "Confirm Rental (Demo)", tl: "Kumpirmahin (Demo)" },
  cancel: { en: "Cancel", tl: "Kanselahin" },
  demoCheckoutNote: {
    en: "Demo checkout — no payment method is charged.",
    tl: "Demo lamang — walang sisingilin na bayad.",
  },
  accessTerms: {
    en: "7-day access · 1080p · English and Filipino subtitles",
    tl: "7-araw na access · 1080p · Subtitle sa Ingles at Filipino",
  },
  footerTagline: {
    en: "A streaming home for Filipino independent cinema — festival winners, regional voices, documentaries and shorts.",
    tl: "Tahanan ng Pilipinong indie sine sa streaming — mga panalo sa festival, boses ng rehiyon, dokumentaryo, at maiikling pelikula.",
  },
  comingSoon: { en: "Coming soon", tl: "Malapit nang dumating" },
  back: { en: "Back", tl: "Bumalik" },
  removeFromMyList: { en: "Remove from My List", tl: "Alisin sa Listahan Ko" },
  addToMyList: { en: "Add to My List", tl: "Idagdag sa Listahan Ko" },
  share: { en: "Share", tl: "Ibahagi" },
  shortsSection: { en: "Shorts", tl: "Maiikling Pelikula" },
  shortsSectionSubtitle: {
    en: "Featured short films from the 2026 program",
    tl: "Mga tampok na maikling pelikula sa programa ngayong 2026",
  },
} as const;

export type TranslationKey = keyof typeof dictionary;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "tl" ? "tl" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);

  const t = useCallback((key: TranslationKey) => dictionary[key][language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
