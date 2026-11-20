// Builds the word lists for Tootie's games.
//
// Usage (from the project folder):
//   node scripts/generate-game-words.mjs 2026-11-19 365
//
// Writes:
//   public/games/words.json   common words by length (most common first),
//                             used by Unscramble Sprint, Missing Letter,
//                             and Letter Guess
//   public/games/ladder.json  daily Word Ladder puzzles plus the 3- and
//                             4-letter dictionary used to check each step

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const readJson = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));

const allWords = require("an-array-of-english-words");
const frequencyData = readJson("data/wordfreq-en-25000-log.json");
const excluded = new Set([
  ...readJson("data/common-word-exclusions.json"),
  ...readJson("data/word-pounce-blocklist.json"),
  ...readJson("data/word-pounce-not-answers.json"),
  // Names, places, abbreviations and slang that slipped through the lists above.
  ...(existsSync(path.join(root, "data/game-not-answers.json")) ? readJson("data/game-not-answers.json") : []),
]);
const blocked = new Set(readJson("data/word-pounce-blocklist.json"));

const startDate = process.argv[2] ?? "2026-11-19";
const dayCount = Number(process.argv[3] ?? 365);

const dictionary = new Set(allWords.filter((word) => /^[a-z]+$/.test(word)));

// Common words in frequency order (most common first).
const common = [];
const seen = new Set();
for (const [raw] of frequencyData) {
  const word = raw.toLowerCase();
  if (seen.has(word) || !/^[a-z]+$/.test(word) || !dictionary.has(word) || excluded.has(word)) continue;
  seen.add(word);
  common.push(word);
}

const byLength = {};
for (const length of [3, 4, 5, 6, 7, 8]) {
  byLength[length] = common.filter((word) => word.length === length);
}

const outDir = path.join(root, "public/games");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  path.join(outDir, "words.json"),
  JSON.stringify({ 4: byLength[4], 5: byLength[5], 6: byLength[6], 7: byLength[7], 8: byLength[8] })
);

// ---------- Word Ladder ----------

function mulberry32(seed) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = mulberry32(20261119);

function neighbors(word, pool) {
  const out = [];
  for (let i = 0; i < word.length; i += 1) {
    for (let c = 97; c <= 122; c += 1) {
      const letter = String.fromCharCode(c);
      if (letter === word[i]) continue;
      const next = word.slice(0, i) + letter + word.slice(i + 1);
      if (pool.has(next)) out.push(next);
    }
  }
  return out;
}

// Shortest path between two words using only "pool" words.
function shortestPath(start, end, pool) {
  const previous = new Map([[start, null]]);
  const queue = [start];
  while (queue.length) {
    const word = queue.shift();
    if (word === end) break;
    for (const next of neighbors(word, pool)) {
      if (!previous.has(next)) {
        previous.set(next, word);
        queue.push(next);
      }
    }
  }
  if (!previous.has(end)) return null;
  const path = [];
  for (let word = end; word; word = previous.get(word)) path.unshift(word);
  return path;
}

// Puzzle words come from the most familiar words so the start, end and
// solution all feel fair. Plurals are skipped as start/end words.
const ladderPools = {
  3: new Set(byLength[3].slice(0, 700)),
  4: new Set(byLength[4].slice(0, 1600)),
};
const endpointPools = {
  3: byLength[3].slice(0, 450).filter((w) => !w.endsWith("s")),
  4: byLength[4].slice(0, 900).filter((w) => !w.endsWith("s")),
};

function makeLadder(length, minSteps, maxSteps, usedPairs) {
  const ends = endpointPools[length];
  for (let attempt = 0; attempt < 5000; attempt += 1) {
    const start = ends[Math.floor(random() * ends.length)];
    const end = ends[Math.floor(random() * ends.length)];
    const key = [start, end].sort().join("-");
    if (start === end || usedPairs.has(key)) continue;
    // No shared letters in the same spot, so every position has to change
    if ([...start].some((letter, i) => letter === end[i])) continue;
    const path = shortestPath(start, end, ladderPools[length]);
    if (!path) continue;
    const steps = path.length - 1;
    if (steps < minSteps || steps > maxSteps) continue;
    usedPairs.add(key);
    return { start, end, par: steps, solution: path };
  }
  throw new Error(`Could not make a ${length}-letter ladder`);
}

const days = {};
const usedPairs = new Set();
const start = new Date(`${startDate}T00:00:00Z`);
for (let day = 0; day < dayCount; day += 1) {
  const iso = new Date(start.getTime() + day * 86400000).toISOString().slice(0, 10);
  // Every third day is a gentler 3-letter ladder.
  const ladder = day % 3 === 2 ? makeLadder(3, 3, 4, usedPairs) : makeLadder(4, 4, 6, usedPairs);
  days[iso] = { number: day + 1, ...ladder };
}

// Steps may use any real 3- or 4-letter word, not just common ones.
const ladderDictionary = [...dictionary].filter((word) => (word.length === 3 || word.length === 4) && !blocked.has(word)).sort();

// Familiar words, used to suggest friendly hint steps.
const ladderCommon = [...ladderPools[3], ...ladderPools[4]].sort();

writeFileSync(path.join(outDir, "ladder.json"), JSON.stringify({ days, dictionary: ladderDictionary, common: ladderCommon }));

console.log(
  `Wrote words.json (${Object.entries(byLength).filter(([l]) => l >= 4).map(([l, w]) => `${l}:${w.length}`).join(" ")}) and ladder.json (${dayCount} days, ${ladderDictionary.length} dictionary words).`
);
