// Puzzle rules and generator for Tootie's Word Search. Kept free of React so
// the logic is easy to test.

import { WORD_SEARCH_THEMES, type WordSearchTheme } from "@/lib/word-search-themes";

export type Difficulty = "easy" | "medium" | "hard";
export type Cell = [row: number, col: number];

export type Placement = {
  word: string;
  cells: Cell[];
};

export type Puzzle = {
  theme: WordSearchTheme;
  difficulty: Difficulty;
  size: number;
  grid: string[][];
  placements: Placement[];
};

type Direction = [dRow: number, dCol: number];

const RIGHT: Direction = [0, 1];
const DOWN: Direction = [1, 0];
const DOWN_RIGHT: Direction = [1, 1];
const UP_RIGHT: Direction = [-1, 1];
const LEFT: Direction = [0, -1];
const UP: Direction = [-1, 0];
const UP_LEFT: Direction = [-1, -1];
const DOWN_LEFT: Direction = [1, -1];

export const DIFFICULTIES: Record<
  Difficulty,
  { label: string; size: number; count: number; maxLength: number; directions: Direction[]; blurb: string }
> = {
  easy: {
    label: "Easy",
    size: 10,
    count: 8,
    maxLength: 8,
    directions: [RIGHT, DOWN],
    blurb: "10×10 grid · 8 words · across and down",
  },
  medium: {
    label: "Medium",
    size: 12,
    count: 10,
    maxLength: 11,
    directions: [RIGHT, DOWN, DOWN_RIGHT, UP_RIGHT],
    blurb: "12×12 grid · 10 words · adds diagonals",
  },
  hard: {
    label: "Hard",
    size: 14,
    count: 12,
    maxLength: 13,
    directions: [RIGHT, DOWN, DOWN_RIGHT, UP_RIGHT, LEFT, UP, UP_LEFT, DOWN_LEFT],
    blurb: "14×14 grid · 12 words · any direction, even backward",
  },
};

export const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

// The first daily puzzle. Daily themes rotate from here.
export const FIRST_DAILY_DATE = "2026-11-19";

// Small, fast seeded random number generator so the daily puzzle is the
// same for everyone.
function hashSeed(text: string) {
  let h = 1779033703 ^ text.length;
  for (let i = 0; i < text.length; i += 1) {
    h = Math.imul(h ^ text.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function makeRandom(seed: string) {
  let state = hashSeed(seed);
  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], random: () => number) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function daysBetween(fromKey: string, toKey: string) {
  const [y1, m1, d1] = fromKey.split("-").map(Number);
  const [y2, m2, d2] = toKey.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

// Each day gets one theme (the same for every difficulty). Themes follow a
// fixed shuffled order so they don't repeat until all of them have been used.
export function dailyTheme(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const bySlug = (slug: string) => WORD_SEARCH_THEMES.find((theme) => theme.slug === slug)!;

  // Holiday themes on the day itself.
  const firstOfNovemberWeekday = new Date(Date.UTC(year, 10, 1)).getUTCDay();
  const thanksgiving = 1 + ((4 - firstOfNovemberWeekday + 7) % 7) + 21; // 4th Thursday
  if (month === 11 && day === thanksgiving) return bySlug("thanksgiving");
  if (month === 12 && (day === 24 || day === 25)) return bySlug("holidays");

  const order = shuffled(WORD_SEARCH_THEMES, makeRandom("tootie-word-search-themes"));
  const index = ((daysBetween(FIRST_DAILY_DATE, dateKey) % order.length) + order.length) % order.length;
  return order[index];
}

export function randomTheme(random: () => number = Math.random, exceptSlug?: string) {
  const choices = WORD_SEARCH_THEMES.filter((theme) => theme.slug !== exceptSlug);
  return choices[Math.floor(random() * choices.length)];
}

function tryPlace(grid: string[][], word: string, directions: Direction[], random: () => number): Cell[] | null {
  const size = grid.length;

  for (let attempt = 0; attempt < 250; attempt += 1) {
    const [dRow, dCol] = directions[Math.floor(random() * directions.length)];
    const row = Math.floor(random() * size);
    const col = Math.floor(random() * size);
    const endRow = row + dRow * (word.length - 1);
    const endCol = col + dCol * (word.length - 1);
    if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

    const cells: Cell[] = [];
    let fits = true;
    for (let i = 0; i < word.length; i += 1) {
      const r = row + dRow * i;
      const c = col + dCol * i;
      const existing = grid[r][c];
      if (existing && existing !== word[i]) {
        fits = false;
        break;
      }
      cells.push([r, c]);
    }
    if (!fits) continue;

    cells.forEach(([r, c], i) => {
      grid[r][c] = word[i];
    });
    return cells;
  }

  return null;
}

export function generatePuzzle(theme: WordSearchTheme, difficulty: Difficulty, seed: string): Puzzle {
  const settings = DIFFICULTIES[difficulty];
  const random = makeRandom(`${seed}|${theme.slug}|${difficulty}`);
  const usable = theme.words.filter((word) => word.length >= 3 && word.length <= settings.maxLength);

  let best: { grid: string[][]; placements: Placement[] } | null = null;

  for (let round = 0; round < 30; round += 1) {
    const grid: string[][] = Array.from({ length: settings.size }, () => Array(settings.size).fill(""));
    const placements: Placement[] = [];
    // Place longer words first; they are the hardest to fit.
    const chosen = shuffled(usable, random)
      .slice(0, settings.count + 4)
      .sort((a, b) => b.length - a.length);

    for (const word of chosen) {
      if (placements.length >= settings.count) break;
      const cells = tryPlace(grid, word, settings.directions, random);
      if (cells) placements.push({ word, cells });
    }

    if (!best || placements.length > best.placements.length) best = { grid, placements };
    if (placements.length >= settings.count) break;
  }

  const { grid, placements } = best!;
  const alphabet = "ABCDEFGHIJKLMNOPRSTUVWY"; // skip Q, X, Z so filler doesn't stand out
  for (const row of grid) {
    for (let c = 0; c < row.length; c += 1) {
      if (!row[c]) row[c] = alphabet[Math.floor(random() * alphabet.length)];
    }
  }

  placements.sort((a, b) => a.word.localeCompare(b.word));
  return { theme, difficulty, size: settings.size, grid, placements };
}

export function dailyPuzzle(dateKey: string, difficulty: Difficulty) {
  return generatePuzzle(dailyTheme(dateKey), difficulty, `daily-${dateKey}`);
}

// Cells on the straight line from start to end, or null if the two cells
// aren't in a straight row, column, or diagonal.
export function lineCells(start: Cell, end: Cell): Cell[] | null {
  const dRow = end[0] - start[0];
  const dCol = end[1] - start[1];
  if (dRow !== 0 && dCol !== 0 && Math.abs(dRow) !== Math.abs(dCol)) return null;

  const steps = Math.max(Math.abs(dRow), Math.abs(dCol));
  const stepRow = Math.sign(dRow);
  const stepCol = Math.sign(dCol);
  return Array.from({ length: steps + 1 }, (_, i) => [start[0] + stepRow * i, start[1] + stepCol * i] as Cell);
}

// Returns the puzzle word matching the selected cells (read in either
// direction), or null.
export function matchSelection(puzzle: Puzzle, cells: Cell[], found: string[]) {
  if (cells.length < 2) return null;
  const text = cells.map(([r, c]) => puzzle.grid[r][c]).join("");
  const reversed = text.split("").reverse().join("");

  const match = puzzle.placements.find(
    (placement) => !found.includes(placement.word) && (placement.word === text || placement.word === reversed)
  );
  return match ? match.word : null;
}

export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function shareText(puzzle: Puzzle, dateLabel: string | null, seconds: number) {
  return [
    `Tootie's Word Search ${puzzle.theme.emoji}`,
    `${dateLabel ? `${dateLabel} · ` : ""}${puzzle.theme.name} (${DIFFICULTIES[puzzle.difficulty].label})`,
    `Found all ${puzzle.placements.length} words in ${formatTime(seconds)} 🐾`,
    "tootiewords.com/word-search",
  ].join("\n");
}
