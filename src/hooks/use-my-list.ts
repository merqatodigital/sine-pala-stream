import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "likha-flix-my-list";
const EVENT_NAME = "likha-flix-my-list-changed";

function readStoredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStoredIds(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/**
 * Shared "My List" state, persisted to localStorage. No backend yet — this
 * is a real, working feature scoped to the browser until accounts exist.
 *
 * Writes only happen inside `toggle`, and the sync listener only reads —
 * never writes — so multiple mounted instances (rail cards, hero, nav
 * count, etc.) can stay in sync without feeding back into each other.
 */
export function useMyList() {
  const [ids, setIds] = useState<string[]>(() => readStoredIds());

  useEffect(() => {
    const sync = () => setIds(readStoredIds());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeStoredIds(next);
      return next;
    });
  }, []);

  return { ids, isSaved, toggle };
}
