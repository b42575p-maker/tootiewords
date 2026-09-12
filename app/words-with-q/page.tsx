import type { Metadata } from "next";
import Link from "next/link";

import words from "an-array-of-english-words";
import wordFrequencyData from "../../data/wordfreq-en-25000-log.json";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecialtyWordFinder from "@/components/SpecialtyWordFinder";

type FrequencyEntry = [string, number];

const frequencyEntries =
  wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

function getAllWordsWithQ() {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.includes("q")
    )
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index
    )
    .sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return a.localeCompare(b);
    });
}

function getCommonWordsWithQ() {
  return getAllWordsWithQ()
    .filter((word) =>
      frequencies.has(word)
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

export const metadata: Metadata = {
  title: "Words With Q - Word Finder",
  description:
    "Find words with Q using TootieWords. Browse common and all words containing Q and filter by word length, starting letters, ending letters, and more.",
};

export default function WordsWithQPage() {
  const allWordsWithQ =
    getAllWordsWithQ();

  const commonWordsWithQ =
    getCommonWordsWithQ();

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐱 Tootie&apos;s Word Helper
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With Q
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse words containing the letter Q.
          Choose a word length or use the
          filters to narrow the list by
          starting letters, ending letters,
          included letters, or letters you
          want to exclude.
        </p>
      </section>

      <SpecialtyWordFinder
        commonWords={commonWordsWithQ}
        allWords={allWordsWithQ}
        listLabel="words with Q"
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Find Words Containing Q
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Every word on this page contains
            the letter Q. Use the Word Length
            menu to focus on shorter or longer
            words, or combine the other
            filters when you already know part
            of the word you are looking for.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words or All Words
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words gives you a smaller
            list of more familiar vocabulary.
            Switch to All Words when you want
            to explore the larger dictionary,
            including less common entries.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Narrow Your Q Word Search
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            You can search for Q words that
            start or end with particular
            letters, require additional
            letters with the Contains box, or
            remove unwanted letters with
            Exclude Letters.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More TootieWords Tools
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
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

            <Link
              href="/5-letter-words"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              5 Letter Words
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}