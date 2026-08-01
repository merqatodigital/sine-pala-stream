import { supabase } from "@/integrations/supabase/client";

export type FilmRow = {
  id: string;
  title: string;
  director: string;
  year: number;
  runtime: string | null;
  genre: string | null;
  region: string | null;
  rating: string | null;
  price: number;
  tier: string;
  still: string | null;
  poster: string | null;
  synopsis: string | null;
  award: string | null;
  trailer_youtube_id: string | null;
  category: string;
  source_url: string | null;
  created_at?: string;
  updated_at?: string;
};

export const emptyFilmRow: FilmRow = {
  id: "",
  title: "",
  director: "",
  year: new Date().getFullYear(),
  runtime: "",
  genre: "",
  region: "",
  rating: "",
  price: 79,
  tier: "feature",
  still: "",
  poster: "",
  synopsis: "",
  award: "",
  trailer_youtube_id: "",
  category: "full-length",
  source_url: "",
};

/**
 * The `films` table is created via a raw SQL migration the admin runs
 * directly in Supabase, not through a Lovable-tracked migration, so it
 * isn't in the generated `Database` types yet. Cast once here instead of
 * sprinkling `as any` through the admin UI — safe to remove once
 * `src/integrations/supabase/types.ts` is regenerated with this table.
 */
const filmsTable = () => (supabase as unknown as { from: (table: string) => any }).from("films");

export async function listFilms(): Promise<FilmRow[]> {
  const { data, error } = await filmsTable().select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as FilmRow[];
}

export async function upsertFilm(film: FilmRow, isNew: boolean) {
  const payload = { ...film, updated_at: new Date().toISOString() };
  const { error } = isNew
    ? await filmsTable().insert(payload)
    : await filmsTable().update(payload).eq("id", film.id);
  if (error) throw error;
}

export async function deleteFilm(id: string) {
  const { error } = await filmsTable().delete().eq("id", id);
  if (error) throw error;
}
