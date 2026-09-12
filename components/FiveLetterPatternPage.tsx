import Link from "next/link";

import words from "an-array-of-english-words";
import wordFrequencyData from "../data/wordfreq-en-25000-log.json";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordListFinder from "@/components/WordListFinder";

type FrequencyEntry = [string, number];

type PatternType =
  | "starts-with"
  | "ends-with"
  | "contains";

type FiveLetterPatternPageProps = {
  patternType: PatternType;
  letters: string;
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

function getHeading(
  patternType: PatternType,
  letters: string
) {
  const displayLetters = letters.toUpperCase();

  if (patternType === "starts-with") {
    return `5 Letter Words Starting With ${displayLetters}`;
  }

  if (patternType === "ends-with") {
    return `5 Letter Words Ending In ${displayLetters}`;
  }

  return `5 Letter Words With ${displayLetters}`;
}

function getIntro(
  patternType: PatternType,
  letters: string
) {
  const displayLetters = letters.toUpperCase();

  if (patternType === "starts-with") {
    return `Browse 5-letter words that start with ${displayLetters}. Use TootieWords to narrow the list further by ending letters, included letters, or letters you want to exclude.`;
  }

  if (patternType === "ends-with") {
    return `Browse 5-letter words that end in ${displayLetters}. Use TootieWords to narrow the list further by starting letters, included letters, or letters you want to exclude.`;
  }

  return `Browse 5-letter words containing ${displayLetters}. Use TootieWords to narrow the list further by starting letters, ending letters, or excluded letters.`;
}

export default function FiveLetterPatternPage({
  patternType,
  letters,
}: FiveLetterPatternPageProps) {
  const cleanLetters = letters
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();

  const heading = getHeading(
    patternType,
    cleanLetters
  );

  const intro = getIntro(
    patternType,
    cleanLetters
  );

  const commonFiveLetterWords =
    getCommonFiveLetterWords();

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐱 Tootie&apos;s Word Helper
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          {heading}
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          {intro}
        </p>
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
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            {heading}
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            This word list starts with the
            pattern already filled in for you.
            You can add more filters to narrow
            the results or switch from Common
            Words to All Words for a larger
            dictionary.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Narrow the Results
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Add known starting or ending
            letters, require letters with the
            Contains box, or exclude letters
            that cannot appear in the answer.
            Combining filters can quickly
            reduce a long list to a handful of
            possibilities.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More Five-Letter Words
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/5-letter-words"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              All 5 Letter Words
            </Link>

            <Link
              href="/word-unscrambler"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Word Unscrambler
            </Link>

            <Link
              href="/words-from-letters"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
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