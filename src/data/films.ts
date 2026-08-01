import heroBackdrop from "@/assets/hero-backdrop.jpg";
import collectionBanner from "@/assets/collection-banner.jpg";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";
import still01 from "@/assets/still-01.jpg";
import still02 from "@/assets/still-02.jpg";
import still03 from "@/assets/still-03.jpg";
import still04 from "@/assets/still-04.jpg";
import still05 from "@/assets/still-05.jpg";
import still06 from "@/assets/still-06.jpg";
import still07 from "@/assets/still-07.jpg";
import still08 from "@/assets/still-08.jpg";
import still09 from "@/assets/still-09.jpg";
import still10 from "@/assets/still-10.jpg";
import still11 from "@/assets/still-11.jpg";
import still12 from "@/assets/still-12.jpg";
import still13 from "@/assets/still-13.jpg";
import still14 from "@/assets/still-14.jpg";
import still15 from "@/assets/still-15.jpg";
import still16 from "@/assets/still-16.jpg";
import still17 from "@/assets/still-17.jpg";
import still18 from "@/assets/still-18.jpg";
import still19 from "@/assets/still-19.jpg";
import still20 from "@/assets/still-20.jpg";
import still21 from "@/assets/still-21.jpg";
import still22 from "@/assets/still-22.jpg";

export { heroBackdrop, collectionBanner };

export type Tier = "premiere" | "feature" | "catalog" | "short" | "free";

export type Film = {
  id: string;
  title: string;
  director: string;
  year: number;
  runtime: string;
  genre: string;
  region: string;
  rating: string;
  price: number;
  tier: Tier;
  still: string;
  poster?: string;
  synopsis: string;
  award?: string;
  progress?: number;
  trailerYoutubeId?: string;
};

export const tierLabel: Record<Tier, string> = {
  premiere: "Premiere",
  feature: "HD Feature",
  catalog: "Catalog",
  short: "Short",
  free: "Free",
};

export function priceLabel(film: Film) {
  return film.price === 0 ? "Watch Free" : `Rent HD · ₱${film.price}`;
}

export const featured: Film = {
  id: "sa-pagitan",
  title: "Sa Pagitan ng mga Alon",
  director: "Rafaela Santos",
  year: 2025,
  runtime: "108m",
  genre: "Drama",
  region: "Pangasinan",
  rating: "PG-13",
  price: 79,
  tier: "feature",
  still: heroBackdrop,
  award: "QCinema · Best Picture",
  synopsis:
    "A meditative portrait of a vanishing coastal town in Pangasinan, and the tide that keeps pulling its people home.",
};

const f = (film: Film) => film;

export const popular: Film[] = [
  f({
    id: "escolta",
    title: "Ang Huling Gabi sa Escolta",
    director: "M. De La Cruz",
    year: 2024,
    runtime: "114m",
    genre: "Drama",
    region: "Metro Manila",
    rating: "R-16",
    price: 79,
    tier: "feature",
    still: still01,
    synopsis:
      "On the last night before demolition, the tenants of a crumbling Escolta building trade the stories that kept them there.",
  }),
  f({
    id: "alitaptap",
    title: "Alitaptap sa Dilim",
    director: "Isabel Sandoval",
    year: 2024,
    runtime: "95m",
    genre: "Romance",
    region: "Bohol",
    rating: "R-13",
    price: 79,
    tier: "feature",
    still: still02,
    synopsis:
      "Two strangers drift down a firefly river and decide, for one night, to be someone else entirely.",
  }),
  f({
    id: "concrete-twilight",
    title: "Concrete Twilight",
    director: "Antonio Luna",
    year: 2023,
    runtime: "98m",
    genre: "Noir",
    region: "Metro Manila",
    rating: "R-16",
    price: 49,
    tier: "catalog",
    still: still03,
    synopsis:
      "A rooftop caretaker becomes the unwilling witness to a crime the whole barangay would rather forget.",
  }),
  f({
    id: "ingay",
    title: "Ingay ng Lungsod",
    director: "T. Red",
    year: 2023,
    runtime: "140m",
    genre: "Documentary",
    region: "Metro Manila",
    rating: "PG",
    price: 49,
    tier: "catalog",
    still: still04,
    synopsis:
      "Twelve months inside the loudest city in Southeast Asia, told entirely through the people who drive it.",
  }),
  f({
    id: "sampaguita",
    title: "Sampaguita Highway",
    director: "Nadine Ocampo",
    year: 2025,
    runtime: "101m",
    genre: "Drama",
    region: "Laguna",
    rating: "PG-13",
    price: 129,
    tier: "premiere",
    still: still05,
    synopsis:
      "A garland seller on the expressway shoulder builds a secret life out of the cars that never stop.",
  }),
];

export const newReleases: Film[] = [
  f({
    id: "habagat",
    title: "Bagyong Habagat",
    director: "Sheron Dayoc",
    year: 2026,
    runtime: "119m",
    genre: "Drama",
    region: "Bicol",
    rating: "PG-13",
    price: 149,
    tier: "premiere",
    still: still06,
    synopsis:
      "As floodwater rises for the third time in a year, a rescue volunteer must choose between duty and his own family.",
  }),
  f({
    id: "salamin",
    title: "Salamin ng Maynila",
    director: "Gia Bernardo",
    year: 2026,
    runtime: "97m",
    genre: "Drama",
    region: "Metro Manila",
    rating: "R-13",
    price: 129,
    tier: "premiere",
    still: still07,
    synopsis:
      "A window cleaner on the 40th floor watches two versions of the same city refuse to look at each other.",
  }),
  f({
    id: "tahanan",
    title: "Tahanan sa Ulap",
    director: "Kidlat Tahimik",
    year: 2025,
    runtime: "88m",
    genre: "Drama",
    region: "Benguet",
    rating: "PG",
    price: 79,
    tier: "feature",
    still: still08,
    synopsis: "A woman returns to her family's fog-bound Baguio house to sell it, and cannot.",
  }),
  f({
    id: "pasay-midnight",
    title: "Pasay Midnight",
    director: "Carlos Villaruz",
    year: 2025,
    runtime: "18m",
    genre: "Short",
    region: "Pasay",
    rating: "PG-13",
    price: 29,
    tier: "short",
    still: still17,
    synopsis: "A terminal, a last bus, and two people who keep missing it on purpose.",
  }),
];

export const luzon: Film[] = [
  f({
    id: "batanes",
    title: "Wind of Batanes",
    director: "Ricardo Puno",
    year: 2024,
    runtime: "88m",
    genre: "Drama",
    region: "Luzon · Ivatan",
    rating: "PG",
    price: 49,
    tier: "catalog",
    still: still10,
    synopsis: "An Ivatan stonemason rebuilds the same wall after every storm, and every storm answers.",
  }),
  f({
    id: "bulawang-palay",
    title: "Bulawang Palay",
    director: "Lourdes Bagnas",
    year: 2023,
    runtime: "105m",
    genre: "Drama",
    region: "Luzon · Cordillera",
    rating: "PG",
    price: 49,
    tier: "catalog",
    still: still11,
    synopsis: "Three generations argue over a terrace that has fed them for four hundred years.",
  }),
  f({
    id: "asin-at-dagat",
    title: "Asin at Dagat",
    director: "Jose Mari Rivera",
    year: 2024,
    runtime: "96m",
    genre: "Drama",
    region: "Visayas · Cebuano",
    rating: "PG-13",
    price: 79,
    tier: "feature",
    still: still12,
    synopsis: "The last salt farmers of a Visayan coast measure their lives in evaporation.",
  }),
  f({
    id: "vinta",
    title: "Vinta Dreams",
    director: "Sarah Dimaporo",
    year: 2025,
    runtime: "92m",
    genre: "Coming of age",
    region: "Mindanao · Zamboanga",
    rating: "PG",
    price: 79,
    tier: "feature",
    still: still09,
    synopsis: "A girl paints her father's vinta sail with colors he has forbidden her to use.",
  }),
  f({
    id: "kanlungan-sulu",
    title: "Kanlungan sa Sulu",
    director: "Arnel Mardoquio",
    year: 2024,
    runtime: "102m",
    genre: "Drama",
    region: "Mindanao · Tausug",
    rating: "R-13",
    price: 49,
    tier: "catalog",
    still: still13,
    synopsis: "A Sama-Bajau family builds a house on water and a claim no map will honor.",
  }),
  f({
    id: "ilog-agusan",
    title: "Ilog Agusan",
    director: "Baby Ruth Villarama",
    year: 2023,
    runtime: "76m",
    genre: "Documentary",
    region: "Mindanao · Agusan",
    rating: "PG",
    price: 29,
    tier: "short",
    still: still14,
    synopsis: "Life on the floating villages of the Agusan Marsh, one dry season at a time.",
  }),
];

export const shortsAndDocs: Film[] = [
  f({
    id: "aswang-diaries",
    title: "The Aswang Diaries",
    director: "Alyx Ayn Arumpac",
    year: 2025,
    runtime: "21m",
    genre: "Horror short",
    region: "Capiz",
    rating: "R-16",
    price: 29,
    tier: "short",
    still: still15,
    synopsis: "A folklorist records a village's night sounds and captures something that answers back.",
  }),
  f({
    id: "bangka",
    title: "Bangka",
    director: "Baby Ruth Villarama",
    year: 2024,
    runtime: "76m",
    genre: "Documentary",
    region: "Palawan",
    rating: "PG",
    price: 0,
    tier: "free",
    still: still16,
    synopsis: "Dawn to dawn with two fishermen and the sea that is emptying beneath them.",
  }),
  f({
    id: "sigwa",
    title: "Sigwa",
    director: "Joel Lamangan",
    year: 2022,
    runtime: "68m",
    genre: "Documentary",
    region: "Metro Manila",
    rating: "PG-13",
    price: 0,
    tier: "free",
    still: still18,
    synopsis: "Restored 16mm footage from the First Quarter Storm, seen by the people who shot it.",
  }),
  f({
    id: "batang-estero",
    title: "Batang Estero",
    director: "Mila Fajardo",
    year: 2023,
    runtime: "24m",
    genre: "Short",
    region: "Manila",
    rating: "PG-13",
    price: 29,
    tier: "short",
    still: still22,
    synopsis: "Two brothers turn a poisoned canal into the only playground they have.",
  }),
];

export const classics: Film[] = [
  f({
    id: "anino-kahapon",
    title: "Mga Anino ng Kahapon",
    director: "Mike De Leon",
    year: 1978,
    runtime: "124m",
    genre: "Period drama",
    region: "Manila",
    rating: "R-13",
    price: 49,
    tier: "catalog",
    still: still19,
    synopsis: "A restored classic of post-war Manila society and the debts it never paid.",
  }),
  f({
    id: "bulawan-ulap",
    title: "Bulawan sa Ulap",
    director: "Lav Diaz",
    year: 1996,
    runtime: "152m",
    genre: "Drama",
    region: "Nueva Ecija",
    rating: "PG-13",
    price: 49,
    tier: "catalog",
    still: still20,
    synopsis: "Black-and-white long takes across a rice plain, and one man's very slow return.",
  }),
  f({
    id: "himala-nayon",
    title: "Himala sa Nayon",
    director: "Ishmael Bernabe",
    year: 1984,
    runtime: "131m",
    genre: "Drama",
    region: "Ilocos",
    rating: "PG-13",
    price: 49,
    tier: "catalog",
    still: still21,
    synopsis: "A hilltop apparition turns a dying town into a pilgrimage — and a marketplace.",
  }),
  f({
    id: "escolta-classic",
    title: "Divisoria Blues",
    director: "Antonio Luna II",
    year: 1989,
    runtime: "112m",
    genre: "Crime",
    region: "Manila",
    rating: "R-16",
    price: 49,
    tier: "catalog",
    still: still04,
    synopsis: "A market runner, a debt, and forty-eight hours in the loudest district in the country.",
  }),
];

export const continueWatching: Film[] = [
  { ...popular[0], progress: 62 },
  { ...luzon[3], progress: 28 },
  { ...shortsAndDocs[1], progress: 81 },
  { ...newReleases[2], progress: 14 },
];

export const awardWinners: Film[] = [
  { ...popular[1], poster: poster5, award: "Cinemalaya · Best Director" },
  { ...luzon[0], poster: poster3, award: "Berlinale · Forum" },
  { ...classics[0], poster: poster2, award: "FAMAS · Best Picture" },
  { ...popular[4], poster: poster1, award: "Locarno · Special Mention" },
  { ...shortsAndDocs[0], poster: poster7, award: "QCinema · Best Short" },
  { ...classics[2], poster: poster6, award: "Gawad Urian · Best Picture" },
];

export const curatedCollection: Film[] = [
  { ...newReleases[0], poster: poster4 },
  { ...newReleases[1], poster: poster8 },
  { ...luzon[4] },
  { ...luzon[1] },
  { ...classics[1] },
  { ...shortsAndDocs[3] },
];
