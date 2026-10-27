import Link from "next/link";

import words from "an-array-of-english-words";
import { commonWordFrequencies as wordFrequencyData } from "@/lib/word-frequencies";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordListFinder from "@/components/WordListFinder";

type FrequencyEntry = [string, number];

type PatternType =
  | "starts-with"
  | "ends-with"
  | "contains"
  | "position";

type FiveLetterPatternPageProps = {
  patternType: PatternType;
  letters: string;
  position?: number;
};

type PatternContent = {
  explanationTitle: string;
  explanation: string;
  strategyTitle: string;
  strategy: string;
};

const frequencyEntries =
  wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

function getCommonFiveLetterWords() {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.length === 5 &&
        frequencies.has(word)
    )
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index
    )
    .sort((a, b) => {
      const frequencyDifference =
        (frequencies.get(b) ?? -Infinity) -
        (frequencies.get(a) ?? -Infinity);

      if (frequencyDifference !== 0) {
        return frequencyDifference;
      }

      return a.localeCompare(b);
    });
}

function getOrdinal(position: number) {
  if (position === 1) return "First";
  if (position === 2) return "Second";
  if (position === 3) return "Third";
  if (position === 4) return "Fourth";
  if (position === 5) return "Fifth";

  return `${position}th`;
}

function getHeading(
  patternType: PatternType,
  letters: string,
  position?: number
) {
  const displayLetters = letters.toUpperCase();

  if (patternType === "starts-with") {
    return `5 Letter Words Starting With ${displayLetters}`;
  }

  if (patternType === "ends-with") {
    return `5 Letter Words Ending In ${displayLetters}`;
  }

  if (patternType === "contains") {
    return `5 Letter Words With ${displayLetters}`;
  }

  const ordinal =
    position !== undefined
      ? getOrdinal(position)
      : "";

  return `5 Letter Words With ${displayLetters} In The ${ordinal} Position`;
}

function getIntro(
  patternType: PatternType,
  letters: string,
  position?: number
) {
  const displayLetters = letters.toUpperCase();

  if (patternType === "starts-with") {
    return `Browse 5-letter words that start with ${displayLetters}. The starting clue is already applied, and you can add ending letters, required letters, exact positions, or excluded letters to narrow the results.`;
  }

  if (patternType === "ends-with") {
    return `Browse 5-letter words that end in ${displayLetters}. The ending clue is already applied, and you can combine it with starting letters, required letters, exact positions, or excluded letters.`;
  }

  if (patternType === "contains") {
    return `Browse 5-letter words containing ${displayLetters}. The required letter is already applied, and you can add a beginning, ending, exact positions, or excluded letters to make the search more specific.`;
  }

  const ordinal =
    position !== undefined
      ? getOrdinal(position).toLowerCase()
      : "";

  return `Browse 5-letter words with ${displayLetters} in the ${ordinal} position. That position is already filled in, so you can add the other clues you know without entering it again.`;
}

function buildInitialPositionLetters(
  letters: string,
  position?: number
) {
  const positions = Array(5).fill("");

  if (
    position === undefined ||
    position < 1 ||
    position > 5
  ) {
    return positions;
  }

  positions[position - 1] =
    letters.slice(0, 1);

  return positions;
}

function matchesPattern(
  word: string,
  patternType: PatternType,
  letters: string,
  position?: number
) {
  if (patternType === "starts-with") {
    return word.startsWith(letters);
  }

  if (patternType === "ends-with") {
    return word.endsWith(letters);
  }

  if (patternType === "contains") {
    return word.includes(letters);
  }

  if (
    position === undefined ||
    position < 1 ||
    position > 5
  ) {
    return false;
  }

  return word[position - 1] === letters.slice(0, 1);
}

function getPatternContent(
  patternType: PatternType,
  letters: string,
  position?: number
): PatternContent {
  const displayLetters = letters.toUpperCase();

  if (patternType === "starts-with") {
    return {
      explanationTitle:
        `What Does Starting With ${displayLetters} Tell You?`,
      explanation:
        `A known first letter fixes the beginning of the five-letter pattern immediately. That leaves four positions to solve. If you also know a letter elsewhere in the word or have eliminated several letters, combining those clues can reduce the possibilities much faster than searching by the first letter alone.`,
      strategyTitle:
        `How to Narrow Words Starting With ${displayLetters}`,
      strategy:
        `Keep ${displayLetters} in the starting field and add your strongest remaining clue. An exact-position letter is especially useful. If you do not know another position, add required letters with Contains or remove impossible letters with Exclude Letters.`,
    };
  }

  if (patternType === "ends-with") {
    return {
      explanationTitle:
        `What Does Ending In ${displayLetters} Tell You?`,
      explanation:
        `A known ending anchors the right side of the word. With the final letter or sequence already fixed, you can concentrate on the positions that come before it. Beginnings and internal letter positions are often the most useful next clues.`,
      strategyTitle:
        `How to Narrow Words Ending In ${displayLetters}`,
      strategy:
        `Leave ${displayLetters} in the ending field and add any known beginning or internal letters. If you have tested letters that cannot appear, exclude them as well. Using both an ending and one or two additional clues can turn a broad list into a much smaller set.`,
    };
  }

  if (patternType === "contains") {
    return {
      explanationTitle:
        `Finding Five-Letter Words That Contain ${displayLetters}`,
      explanation:
        `Knowing that ${displayLetters} appears somewhere in the word is useful, but it does not fix a position. The letter can occur near the beginning, middle, or end, so positional clues become especially valuable when you have them.`,
      strategyTitle:
        `How to Narrow Words Containing ${displayLetters}`,
      strategy:
        `Keep ${displayLetters} in Contains, then add any confirmed starting or ending letters. If you know where another letter belongs, fill in that exact position. Excluding letters that cannot appear is also helpful because the required ${displayLetters} clue by itself may still leave many matches.`,
    };
  }

  const ordinal =
    getOrdinal(position ?? 1).toLowerCase();

  return {
    explanationTitle:
      `${displayLetters} in the ${getOrdinal(position ?? 1)} Position`,
    explanation:
      `This search fixes ${displayLetters} in the ${ordinal} position of a five-letter word. Unlike a general Contains search, the letter cannot move to another position. Four positions remain open for additional clues.`,
    strategyTitle:
      `Build Around the Known ${ordinal} Letter`,
    strategy:
      `Keep ${displayLetters} fixed in position ${position ?? 1}, then add any known beginning or ending. Use Contains for letters that belong somewhere else in the word, and Exclude Letters for letters that have already been ruled out.`,
  };
}

type LetterShare = {
  letter: string;
  percent: number;
};

type PatternStats = {
  sharePercent: number;
  openPositions: {
    position: number;
    topLetters: LetterShare[];
  }[];
  topOtherLetters: LetterShare[];
  repeatedLetterPercent: number;
};

function toPercent(count: number, total: number) {
  return total === 0 ? 0 : Math.round((count / total) * 1000) / 10;
}

function getFixedPositions(
  patternType: PatternType,
  letters: string,
  position?: number
) {
  if (patternType === "starts-with") {
    return letters.split("").map((_, index) => index + 1);
  }

  if (patternType === "ends-with") {
    return letters
      .split("")
      .map((_, index) => 5 - letters.length + index + 1);
  }

  if (patternType === "position" && position !== undefined) {
    return [position];
  }

  return [];
}

function getPatternStats(
  matchingWords: string[],
  totalWords: number,
  patternType: PatternType,
  letters: string,
  position?: number
): PatternStats {
  const total = matchingWords.length;
  const fixedPositions = getFixedPositions(patternType, letters, position);

  const openPositions = [1, 2, 3, 4, 5]
    .filter((slot) => !fixedPositions.includes(slot))
    .map((slot) => {
      const counts = new Map<string, number>();

      for (const word of matchingWords) {
        const letter = word[slot - 1];
        counts.set(letter, (counts.get(letter) ?? 0) + 1);
      }

      const topLetters = [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 3)
        .map(([letter, count]) => ({
          letter,
          percent: toPercent(count, total),
        }));

      return { position: slot, topLetters };
    });

  const patternLetters = new Set(letters.split(""));
  const containsCounts = new Map<string, number>();

  for (const word of matchingWords) {
    for (const letter of new Set(word.split(""))) {
      if (!patternLetters.has(letter)) {
        containsCounts.set(letter, (containsCounts.get(letter) ?? 0) + 1);
      }
    }
  }

  const topOtherLetters = [...containsCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([letter, count]) => ({
      letter,
      percent: toPercent(count, total),
    }));

  const repeatedLetterWords = matchingWords.filter(
    (word) => new Set(word.split("")).size < word.length
  ).length;

  return {
    sharePercent: toPercent(total, totalWords),
    openPositions,
    topOtherLetters,
    repeatedLetterPercent: toPercent(repeatedLetterWords, total),
  };
}

function formatLetterShares(shares: LetterShare[]) {
  return shares
    .map(({ letter, percent }) => `${letter.toUpperCase()} (${percent}%)`)
    .join(", ");
}

export default function FiveLetterPatternPage({
  patternType,
  letters,
  position,
}: FiveLetterPatternPageProps) {
  const cleanLetters = letters
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();

  const heading = getHeading(
    patternType,
    cleanLetters,
    position
  );

  const intro = getIntro(
    patternType,
    cleanLetters,
    position
  );

  const commonFiveLetterWords =
    getCommonFiveLetterWords();

  const matchingCommonWords =
    commonFiveLetterWords.filter((word) =>
      matchesPattern(
        word,
        patternType,
        cleanLetters,
        position
      )
    );

  const exampleWords =
    matchingCommonWords.slice(0, 8);

  const stats = getPatternStats(
    matchingCommonWords,
    commonFiveLetterWords.length,
    patternType,
    cleanLetters,
    position
  );

  const content =
    getPatternContent(
      patternType,
      cleanLetters,
      position
    );

  const initialPositionLetters =
    patternType === "position"
      ? buildInitialPositionLetters(
          cleanLetters,
          position
        )
      : [];

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Tootie&apos;s Word Helper
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          {heading}
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          {intro}
        </p>

        {patternType === "position" &&
          cleanLetters === "o" &&
          position === 2 && (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-[#f1d5bb] bg-white px-4 py-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#9a5830]">
                Five-Letter Word Pattern
              </p>

              <div className="mt-4 flex justify-center gap-2">
                {["?", "O", "?", "?", "?"].map((letter, index) => (
                  <div
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 text-xl font-black sm:h-14 sm:w-14 ${
                      index === 1
                        ? "border-[#d78935] bg-[#f4b56b] text-[#663a18]"
                        : "border-[#ead6c5] bg-[#fffaf4] text-[#846c60]"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm leading-6 text-[#755d52]">
                O is always the second letter. The other four letters can vary.
              </p>
            </div>
          )}
      </section>

      <WordListFinder
        words={commonFiveLetterWords}
        wordLength={5}
        initialStartsWith={
          patternType === "starts-with"
            ? cleanLetters
            : ""
        }
        initialEndsWith={
          patternType === "ends-with"
            ? cleanLetters
            : ""
        }
        initialContains={
          patternType === "contains"
            ? cleanLetters
            : ""
        }
        initialPositionLetters={
          initialPositionLetters
        }
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            {content.explanationTitle}
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            {content.explanation}
          </p>

          <div className="mt-8 rounded-3xl border-2 border-[#f1d5bb] bg-[#fffaf4] p-6">
            <h2 className="text-xl font-black text-[#4a2e25]">
              Examples From This List
            </h2>

            <p className="mt-3 leading-7 text-[#755d52]">
              The current Common Words list contains{" "}
              <strong>
                {matchingCommonWords.length}
              </strong>{" "}
              five-letter{" "}
              {matchingCommonWords.length === 1
                ? "word"
                : "words"}{" "}
              matching this pattern.
              {exampleWords.length > 0
                ? " Here are a few examples:"
                : ""}
            </p>

            {exampleWords.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {exampleWords.map((word) => (
                  <span
                    key={word}
                    className="rounded-full border border-[#efc89f] bg-white px-4 py-2 font-bold text-[#6b4938]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>

          {matchingCommonWords.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
                This Pattern by the Numbers
              </h2>

              <p className="mt-4 leading-8 text-[#755d52]">
                These {matchingCommonWords.length.toLocaleString()} words make
                up {stats.sharePercent}% of the{" "}
                {commonFiveLetterWords.length.toLocaleString()} common
                five-letter words in our list. Here is how the open spots
                tend to fill in:
              </p>

              <ul className="mt-4 space-y-2 leading-8 text-[#755d52]">
                {stats.openPositions.map(({ position: slot, topLetters }) => (
                  <li key={slot}>
                    <strong className="text-[#4a2e25]">
                      {getOrdinal(slot)} letter:
                    </strong>{" "}
                    {formatLetterShares(topLetters)}
                  </li>
                ))}
              </ul>

              {stats.topOtherLetters.length > 0 && (
                <p className="mt-4 leading-8 text-[#755d52]">
                  Besides {cleanLetters.toUpperCase()}, the letters that show up
                  most often in these words are{" "}
                  {formatLetterShares(stats.topOtherLetters)}. If you have not
                  tested those letters yet, they are good candidates for your
                  next guess.
                </p>
              )}

              <p className="mt-4 leading-8 text-[#755d52]">
                {stats.repeatedLetterPercent}% of the words matching this
                pattern use at least one letter twice, so do not rule out
                doubles too early.
              </p>
            </>
          )}

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            {content.strategyTitle}
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            {content.strategy}
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words and All Words
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words focuses on entries found
            in the frequency list used by
            TootieWords. Switch to All Words in the
            finder when you want to search the
            broader dictionary, which may include
            less familiar vocabulary. A particular
            word game may use its own accepted-word
            list.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More Five-Letter Searches
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/5-letter-words"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              All 5 Letter Words
            </Link>

            <Link
              href="/5-letter-words-starting-with-a"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Starting With A
            </Link>

            <Link
              href="/5-letter-words-ending-in-e"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Ending In E
            </Link>

            <Link
              href="/5-letter-words-with-a"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Words With A
            </Link>

            <Link
              href="/5-letter-words-with-r-in-third-position"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              R in Third Position
            </Link>

            <Link
              href="/guides/best-wordle-starting-words"
              className="rounded-full border-2 border-[#efb6c6] bg-[#fff1f5] px-5 py-3 font-black text-[#c24d6e] hover:bg-[#ffe4ec]"
            >
              Guide: Best Wordle Starting Words
            </Link>
          </div>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More TootieWords Tools
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/word-unscrambler"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Word Unscrambler
            </Link>

            <Link
              href="/anagram-solver"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Anagram Solver
            </Link>

            <Link
              href="/words-from-letters"
              className="font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
            >
              Words From Letters
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
