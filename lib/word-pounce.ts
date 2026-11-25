// Shared game rules for Tootie's Word Pounce. Kept free of React so the
// logic is easy to test.

export type DailyPuzzle = {
  number: number;
  letters: string;
  answers: string[];
  bonus: string[];
};

export const FIRST_PUZZLE_DATE = "2026-11-13";
export const MAX_HINTS = 3;

export const RANKS: { name: string; threshold: number }[] = [
  { name: "Curious Kitten", threshold: 0 },
  { name: "Playful Kitten", threshold: 0.1 },
  { name: "Clever Cat", threshold: 0.25 },
  { name: "Sharp-Eyed Cat", threshold: 0.45 },
  { name: "Super Pouncer", threshold: 0.65 },
  { name: "Top Cat", threshold: 0.8 },
];

export function pointsFor(word: string, letterCount = 7) {
  if (word.length >= letterCount) return 10;
  return Math.max(1, word.length - 2);
}

export function maxPoints(puzzle: DailyPuzzle) {
  return puzzle.answers.reduce(
    (sum, word) => sum + pointsFor(word, puzzle.letters.length),
    0
  );
}

export function rankFor(points: number, max: number) {
  const share = max === 0 ? 0 : points / max;
  let current = RANKS[0];

  for (const rank of RANKS) {
    if (share >= rank.threshold) current = rank;
  }

  return current;
}

export function nextRank(points: number, max: number) {
  const share = max === 0 ? 0 : points / max;
  const upcoming = RANKS.find((rank) => rank.threshold > share);

  if (!upcoming) return null;

  return {
    name: upcoming.name,
    pointsNeeded: Math.ceil(upcoming.threshold * max) - points,
  };
}

export function canMakeWord(word: string, letters: string) {
  const available: Record<string, number> = {};

  for (const letter of letters) {
    available[letter] = (available[letter] ?? 0) + 1;
  }

  for (const letter of word) {
    if (!available[letter]) return false;
    available[letter] -= 1;
  }

  return true;
}

export type GuessResult =
  | { kind: "too-short" }
  | { kind: "not-possible" }
  | { kind: "already-found" }
  | { kind: "answer"; points: number; pounce: boolean }
  | { kind: "bonus" }
  | { kind: "not-a-word" };

export function checkGuess(
  rawGuess: string,
  puzzle: DailyPuzzle,
  found: string[]
): GuessResult {
  const guess = rawGuess.toLowerCase();

  if (guess.length < 3) return { kind: "too-short" };
  if (!canMakeWord(guess, puzzle.letters)) return { kind: "not-possible" };
  if (found.includes(guess)) return { kind: "already-found" };

  if (puzzle.answers.includes(guess)) {
    return {
      kind: "answer",
      points: pointsFor(guess, puzzle.letters.length),
      pounce: guess.length === puzzle.letters.length,
    };
  }

  if (puzzle.bonus.includes(guess)) return { kind: "bonus" };

  return { kind: "not-a-word" };
}

export function scoreFor(found: string[], puzzle: DailyPuzzle) {
  let points = 0;
  let answersFound = 0;
  let bonusFound = 0;

  for (const word of found) {
    if (puzzle.answers.includes(word)) {
      points += pointsFor(word, puzzle.letters.length);
      answersFound += 1;
    } else if (puzzle.bonus.includes(word)) {
      bonusFound += 1;
    }
  }

  return { points, answersFound, bonusFound };
}

// Picks the next hint: an unfound answer, preferring longer words, and
// reveals its length and first two letters.
export function pickHint(puzzle: DailyPuzzle, found: string[], usedHints: string[]) {
  const candidates = puzzle.answers
    .filter((word) => !found.includes(word) && !usedHints.includes(word))
    .sort((a, b) => b.length - a.length || a.localeCompare(b));

  const word = candidates.find((candidate) => candidate.length >= 4) ?? candidates[0];
  return word ?? null;
}

export function describeHint(word: string) {
  return `${word.length}-letter word starting with ${word.slice(0, 2).toUpperCase()}`;
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function shiftDateKey(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return toDateKey(new Date(year, month - 1, day + days));
}

const KEYCAPS: Record<number, string> = {
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
};

function shareRow(filled: number, total: number, max = 8) {
  let f = filled;
  let t = total;
  if (total > max) {
    f = Math.round((filled / total) * max);
    if (filled > 0 && f === 0) f = 1;
    if (filled < total && f === max) f = max - 1;
    t = max;
  }
  return "🟧".repeat(f) + "⬜".repeat(t - f);
}

// Wordle-style result: one row of squares per word length, so friends can
// compare without seeing any answers.
export function shareText(
  puzzle: DailyPuzzle,
  rank: string,
  answersFound: number,
  pounced: boolean,
  hintsUsed: number,
  found: string[] = []
) {
  const lengths = [...new Set(puzzle.answers.map((word) => word.length))].sort((a, b) => b - a);
  const rows = found.length
    ? lengths.map((length) => {
        const total = puzzle.answers.filter((word) => word.length === length).length;
        const got = found.filter((word) => word.length === length && puzzle.answers.includes(word)).length;
        return `${KEYCAPS[length] ?? `${length}`} ${shareRow(got, total)}`;
      })
    : [];

  return [
    `Tootie's Word Pounce #${puzzle.number} 🐾`,
    `${rank} · ${answersFound}/${puzzle.answers.length} words${pounced ? " · Pounce! ✓" : ""}${hintsUsed ? ` · 💡${hintsUsed}` : ""}`,
    ...rows,
    "https://tootiewords.com/word-pounce?ref=share",
  ].join("\n");
}
