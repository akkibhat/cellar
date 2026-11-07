'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Browser-local persistence: which chapters you have finished, the tasting
 * notes you have saved, and the theme. Everything lives in localStorage,
 * so there is no account or backend, at the cost of not following you
 * between devices.
 *
 * localStorage is read through useSyncExternalStore rather than loaded
 * into state in an effect, so React renders the server snapshot first and
 * swaps to the real value after hydrating, with no mismatch.
 *
 * Every read and write is wrapped, because localStorage throws (rather
 * than returning null) in private browsing and when site data is blocked.
 */

/* localStorage keys. The .v1 suffix leaves room to change the shape later. */
const PROGRESS_KEY = 'wine.progress.v1';
const JOURNAL_KEY = 'wine.journal.v1';

/* sessionStorage key for the last chapter opened, written by ChapterRail
   and read by Contents to mark that row. */
export const LAST_CHAPTER_KEY = 'cellar.lastChapter';

/**
 * Fired after any write so that separate components mounted at the same
 * time (the sidebar and the chapter body, say) stay in agreement without
 * needing a shared context provider.
 */
const CHANGE_EVENT = 'wine:storage';

/* ------------------------------------------------------------------ *
 * External store plumbing
 * ------------------------------------------------------------------ */

/**
 * The last parsed value for each key, alongside the raw string it came
 * from. useSyncExternalStore requires getSnapshot to be referentially
 * stable between changes - returning a freshly parsed object every call
 * would spin React into an infinite re-render.
 */
const snapshots = new Map<string, { raw: string | null; value: unknown }>();

/** Subscribe to writes from this tab, and to writes from other tabs. */
export function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** Read and parse a key, reusing the cached object if nothing changed. */
export function snapshot<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    raw = null;
  }

  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value: T = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  snapshots.set(key, { raw, value });
  return value;
}

/** Write a JSON value and notify subscribers. */
export function write<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage full, or blocked. The session still works, it just forgets. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Read the current value outside of render, for update helpers. */
export function readNow<T>(key: string, fallback: T): T {
  return typeof window === 'undefined' ? fallback : snapshot(key, fallback);
}

/* Nothing to listen to for useHydrated; only the snapshot differs. */
const noopSubscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during server
 * rendering and the hydrating render. Lets the UI distinguish "storage
 * not loaded yet" from "storage loaded and empty".
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* ------------------------------------------------------------------ *
 * Progress
 * ------------------------------------------------------------------ */

/** Completion state keyed by chapter slug, plus the best quiz score seen. */
export type Progress = {
  done: string[];
  /** chapter slug -> number of questions answered correctly, best attempt */
  scores: Record<string, number>;
};

/** Chapter-level constant so the server snapshot stays referentially stable. */
const EMPTY_PROGRESS: Progress = { done: [], scores: {} };

/**
 * Course progress, with helpers to mark a chapter complete and to record a
 * quiz result.
 */
export function useProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    () => snapshot(PROGRESS_KEY, EMPTY_PROGRESS),
    () => EMPTY_PROGRESS,
  );
  const ready = useHydrated();

  /** Mark a chapter finished, or unfinished if it already was. */
  const toggleDone = useCallback((slug: string) => {
    const current = readNow(PROGRESS_KEY, EMPTY_PROGRESS);
    const done = current.done.includes(slug)
      ? current.done.filter((s) => s !== slug)
      : [...current.done, slug];
    write(PROGRESS_KEY, { ...current, done });
  }, []);

  /** Record a quiz result, keeping only the best score for that chapter. */
  const recordScore = useCallback((slug: string, score: number) => {
    const current = readNow(PROGRESS_KEY, EMPTY_PROGRESS);
    const best = Math.max(current.scores[slug] ?? 0, score);
    write(PROGRESS_KEY, {
      ...current,
      scores: { ...current.scores, [slug]: best },
    });
  }, []);

  /** Clear all progress. Used by the reset control on the contents page. */
  const resetProgress = useCallback(() => {
    write(PROGRESS_KEY, EMPTY_PROGRESS);
  }, []);

  return { progress, ready, toggleDone, recordScore, resetProgress };
}

/* ------------------------------------------------------------------ *
 * Tasting journal
 * ------------------------------------------------------------------ */

/** One saved tasting note, as assembled by the guided tasting tool. */
export type TastingNote = {
  id: string;
  /** ISO timestamp of when it was saved. */
  savedAt: string;
  /** What the taster called the wine. Free text, may be empty. */
  wine: string;
  colour: 'red' | 'white' | 'rose' | 'sparkling';
  /** Appearance descriptors chosen. */
  appearance: string[];
  /** Aroma family slugs chosen. */
  families: string[];
  /** Specific aroma descriptors chosen. */
  aromas: string[];
  /** 0-4 indexes into SCALES below. */
  intensity: number;
  tannin: number;
  acidity: number;
  body: number;
  sweetness: number;
  /** Length in caudalies. */
  length: number;
  /** Overall rating out of 5. */
  rating: number;
  /** The generated prose note. */
  prose: string;
  /** Anything the taster typed themselves. */
  comment: string;
};

/**
 * The words for a note's 0-4 scales, shared by the tasting tool (which
 * writes them) and the journal (which shows them). The vocabulary follows
 * the conventional descriptors where there is a settled set, the intensity
 * and tannin scales in particular.
 */
export const SCALES = {
  intensity: ['Closed', 'Discreet', 'Open', 'Aromatic', 'Powerful'],
  tannin: ['Silky', 'Rounded', 'Firm', 'Structured', 'Astringent'],
  acidity: ['Soft', 'Rounded', 'Fresh', 'Crisp', 'Racy'],
  body: ['Light', 'Medium-light', 'Medium', 'Medium-full', 'Full'],
  sweetness: ['Bone dry', 'Dry', 'Off-dry', 'Medium sweet', 'Sweet'],
} as const;

/** Chapter-level constant, for the same stability reason as EMPTY_PROGRESS. */
const EMPTY_JOURNAL: TastingNote[] = [];

/** The saved tasting journal, newest first. */
export function useJournal() {
  const notes = useSyncExternalStore(
    subscribe,
    () => snapshot(JOURNAL_KEY, EMPTY_JOURNAL),
    () => EMPTY_JOURNAL,
  );
  const ready = useHydrated();

  /** Save a new note to the front of the journal. */
  const saveNote = useCallback((note: Omit<TastingNote, 'id' | 'savedAt'>) => {
    const current = readNow(JOURNAL_KEY, EMPTY_JOURNAL);
    const full: TastingNote = {
      ...note,
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      savedAt: new Date().toISOString(),
    };
    write(JOURNAL_KEY, [full, ...current]);
    return full;
  }, []);

  /** Remove one note by id. */
  const deleteNote = useCallback((id: string) => {
    const current = readNow(JOURNAL_KEY, EMPTY_JOURNAL);
    write(
      JOURNAL_KEY,
      current.filter((n) => n.id !== id),
    );
  }, []);

  return { notes, ready, saveNote, deleteNote };
}

/* ------------------------------------------------------------------ *
 * Theme
 * ------------------------------------------------------------------ */

/* THEME_KEY must match the key the inline script in app/layout.tsx reads. */
const THEME_KEY = 'wine.theme';
const THEME_EVENT = 'wine:theme';

/** Re-read the theme when it is toggled here or the system preference changes. */
function themeSubscribe(onChange: () => void): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  window.addEventListener(THEME_EVENT, onChange);
  media.addEventListener('change', onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    media.removeEventListener('change', onChange);
  };
}

/** The theme stamped on <html>, falling back to the system preference. */
function themeSnapshot(): 'light' | 'dark' {
  const stamped = document.documentElement.getAttribute('data-theme');
  if (stamped === 'dark' || stamped === 'light') return stamped;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * The active theme, read from the attribute the layout's inline script
 * stamps on the root element, plus a toggle that flips and saves it.
 * Read as an external store because it lives in the DOM and localStorage,
 * not in React.
 */
export function useTheme() {
  const theme = useSyncExternalStore(
    themeSubscribe,
    themeSnapshot,
    // The server cannot know the preference; light is the base palette.
    () => 'light' as const,
  );

  /* Flip the theme on <html> and remember the choice. */
  const toggle = useCallback(() => {
    const next = themeSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Storage blocked; the choice simply will not persist. */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { theme, toggle };
}
