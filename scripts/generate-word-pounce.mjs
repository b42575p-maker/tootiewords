// Generates daily puzzles for Tootie's Word Pounce.
//
// Usage (from the project folder):
//   node scripts/generate-word-pounce.mjs 2026-11-13 365
//
// Writes one JSON file per month to public/word-pounce/YYYY-MM.json.
// Each day has 7 letters, the scored answers (common words), and extra
// valid dictionary words that count as bonus words.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");

const allWords = require("an-array-of-english-words");
const frequencyData = JSON.parse(
  readFileSync(path.join(root, "data/wordfreq-en-25000-log.json"), "utf8")
);
const commonExclusions = new Set(
  JSON.parse(readFileSync(path.join(root, "data/common-word-exclusions.json"), "utf8"))
);
const blocked = new Set(
  JSON.parse(readFileSync(path.join(root, "data/word-pounce-blocklist.json"), "utf8"))
);
// Common-list entries that are abbreviations, names, slang, or British
// spellings. They are still accepted as bonus words but never scored answers.
const notAnswers = new Set(
  JSON.parse(readFileSync(path.join(root, "data/word-pounce-not-answers.json"), "utf8"))
);

const startDate = process.argv[2] ?? "2026-11-13";
const dayCount = Number(process.argv[3] ?? 365);

const MIN_ANSWERS = 18;
const MAX_ANSWERS = 60;

const commonWords = new Set(
  frequencyData
    .map(([word]) => word.toLowerCase())
    .filter(
      (word) =>
        !commonExclusions.has(word) &&
        !blocked.has(word) &&
        !notAnswers.has(word)
    )
);

const dictionary = [
  ...new Set(
    allWords
      .map((word) => word.toLowerCase())
      .filter((word) => /^[a-z]{3,7}$/.test(word) && !blocked.has(word))
  ),
];

function letterCounts(word) {
  const counts = {};
  for (const letter of word) counts[letter] = (counts[letter] ?? 0) + 1;
  return counts;
}

function canMake(word, counts) {
  const used = {};
  for (const letter of word) {
    used[letter] = (used[letter] ?? 0) + 1;
    if (used[letter] > (counts[letter] ?? 0)) return false;
  }
  return true;
}

// Simple seeded random number generator so puzzles are repeatable.
function mulberry32(seed) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20261113);

// Seed words: common 7-letter words that are not simple plurals or -ED forms.
const seedWords = dictionary.filter(
  (word) =>
    word.length === 7 &&
    commonWords.has(word) &&
    !/(s|ed)$/.test(word)
);

const puzzles = [];
const usedLetterSets = new Set();

for (const seed of seedWords) {
  const key = [...seed].sort().join("");
  if (usedLetterSets.has(key)) continue;

  const counts = letterCounts(seed);
  const valid = dictionary.filter((word) => canMake(word, counts));
  const answers = valid.filter((word) => commonWords.has(word)).sort();
  if (answers.length < MIN_ANSWERS || answers.length > MAX_ANSWERS) continue;

  usedLetterSets.add(key);
  const bonus = valid.filter((word) => !commonWords.has(word)).sort();
  puzzles.push({ key, answers, bonus });
}

// Shuffle the pool, then assign one puzzle per day.
for (let i = puzzles.length - 1; i > 0; i -= 1) {
  const j = Math.floor(random() * (i + 1));
  [puzzles[i], puzzles[j]] = [puzzles[j], puzzles[i]];
}

if (puzzles.length < dayCount) {
  throw new Error(`Only ${puzzles.length} puzzles available for ${dayCount} days.`);
}

function scramble(letters) {
  const list = [...letters];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.join("");
}

const months = {};
const start = new Date(`${startDate}T00:00:00Z`);

for (let day = 0; day < dayCount; day += 1) {
  const date = new Date(start.getTime() + day * 86400000);
  const iso = date.toISOString().slice(0, 10);
  const month = iso.slice(0, 7);
  const puzzle = puzzles[day];

  months[month] ??= {};
  months[month][iso] = {
    number: day + 1,
    letters: scramble(puzzle.key),
    answers: puzzle.answers,
    bonus: puzzle.bonus,
  };
}

const outDir = path.join(root, "public/word-pounce");
mkdirSync(outDir, { recursive: true });

for (const [month, days] of Object.entries(months)) {
  writeFileSync(path.join(outDir, `${month}.json`), JSON.stringify(days));
}

console.log(
  `Wrote ${dayCount} puzzles (${Object.keys(months).length} monthly files) from a pool of ${puzzles.length}.`
);
