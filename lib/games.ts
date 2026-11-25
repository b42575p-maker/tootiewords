// Shared helpers for Tootie's games: word list loading, random picks, and
// browser storage. Kept free of React so they are easy to test.

export type WordsByLength = Record<"4" | "5" | "6" | "7" | "8", string[]>;

export type LadderDay = {
  number: number;
  start: string;
  end: string;
  par: number;
  solution: string[];
};

export type LadderData = {
  days: Record<string, LadderDay>;
  dictionary: string[];
  common: string[];
};

let wordsPromise: Promise<WordsByLength> | null = null;
let ladderPromise: Promise<LadderData> | null = null;

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return (await response.json()) as T;
}

export function loadWords() {
  wordsPromise ??= getJson<WordsByLength>("/games/words.json").catch((error) => {
    wordsPromise = null;
    throw error;
  });
  return wordsPromise;
}

export function loadLadders() {
  ladderPromise ??= getJson<LadderData>("/games/ladder.json").catch((error) => {
    ladderPromise = null;
    throw error;
  });
  return ladderPromise;
}

export function randomItem<T>(items: T[], random: () => number = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function shuffle<T>(items: T[], random: () => number = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sortedLetters(word: string) {
  return [...word].sort().join("");
}

// Familiar "answer" words: the most common words of a length, skipping
// simple plurals and -ed forms so answers feel natural.
export function answerPool(words: WordsByLength, length: 4 | 5 | 6 | 7 | 8, size: number) {
  return words[String(length) as keyof WordsByLength]
    .filter((word) => !/(s|ed)$/.test(word))
    .slice(0, size);
}

// Scrambles a word so it doesn't spell itself or another valid word.
export function scrambleWord(word: string, valid: Set<string>, random: () => number = Math.random) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const letters = shuffle([...word], random).join("");
    if (letters !== word && !valid.has(letters)) return letters;
  }
  return [...word].reverse().join("");
}

export function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked (private browsing); the games still work.
  }
}

// Full, clickable link for share messages. ?ref=share lets Google Analytics
// show how many visitors arrive from shared results.
export function shareUrl(path: string) {
  return `https://tootiewords.com${path}?ref=share`;
}

// Records a "share" event in Google Analytics (if it has loaded).
export function trackShare(game: string, method: "shared" | "copied") {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "share", { method, content_type: "game", item_id: game });
  } catch {
    // Analytics is optional.
  }
}

export async function shareOrCopy(text: string, game?: string) {
  try {
    if (navigator.share) {
      await navigator.share({ text });
      if (game) trackShare(game, "shared");
      return "shared" as const;
    }
  } catch {
    // Fall back to copying.
  }
  try {
    await navigator.clipboard.writeText(text);
    if (game) trackShare(game, "copied");
    return "copied" as const;
  } catch {
    return "failed" as const;
  }
}

// Milliseconds until the next local midnight, when daily puzzles reset.
export function msUntilMidnight(now = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function vibrate(ms = 25) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    // Not supported everywhere.
  }
}

// Words one letter different from "word" that are in the dictionary.
export function ladderNeighbors(word: string, dictionary: Set<string>) {
  const out: string[] = [];
  for (let i = 0; i < word.length; i += 1) {
    for (let c = 97; c <= 122; c += 1) {
      const letter = String.fromCharCode(c);
      if (letter === word[i]) continue;
      const next = word.slice(0, i) + letter + word.slice(i + 1);
      if (dictionary.has(next)) out.push(next);
    }
  }
  return out;
}

export function differsByOneLetter(a: string, b: string) {
  if (a.length !== b.length) return false;
  let differences = 0;
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) differences += 1;
  return differences === 1;
}

// Shortest ladder from start to end. Prefers "preferred" (common) words so
// hints suggest familiar steps, falling back to the full dictionary.
export function shortestLadder(start: string, end: string, dictionary: Set<string>, preferred?: Set<string>) {
  const search = (pool: Set<string>) => {
    const previous = new Map<string, string | null>([[start, null]]);
    const queue = [start];
    for (let i = 0; i < queue.length; i += 1) {
      const word = queue[i];
      if (word === end) break;
      for (const next of ladderNeighbors(word, pool)) {
        if (!previous.has(next)) {
          previous.set(next, word);
          queue.push(next);
        }
      }
    }
    if (!previous.has(end)) return null;
    const path: string[] = [];
    for (let word: string | null = end; word; word = previous.get(word) ?? null) path.unshift(word);
    return path;
  };

  if (preferred) {
    const pool = new Set(preferred);
    pool.add(start);
    pool.add(end);
    const path = search(pool);
    if (path) return path;
  }
  return search(dictionary);
}

export const pillButton =
  "font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4] disabled:cursor-not-allowed disabled:opacity-50";

export const primaryButton =
  "font-hand rounded-full border-2 border-[#d8741e] bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] px-6 py-3 font-bold text-[#4a2618] shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";

export const gameCard =
  "game-card rounded-[2rem] border-2 border-[#efd3ba] bg-white p-4 shadow-[0_18px_40px_rgba(86,51,36,0.08)] sm:p-8";
