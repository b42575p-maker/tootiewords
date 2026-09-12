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

function getAllQWordsWithoutU() {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.includes("q") &&
        !word.includes("u")
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

function getCommonQWordsWithoutU() {
  return getAllQWordsWithoutU()
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
  title: "Words With Q Without U - Word Finder",
  description:
    "Find words with Q without U using TootieWords. Browse common and all words containing Q with no U anywhere in the word.",
};

export default function WordsWithQWithoutUPage() {
  const allWords =
    getAllQWordsWithoutU();

  const commonWords =
    getCommonQWordsWithoutU();

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐱 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With Q Without U
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse words that contain the letter Q
          but do not contain the letter U anywhere
          in the word. Use the filters to narrow
          the list by word length, starting letters,
          ending letters, included letters, or
          excluded letters.
        </p>
      </section>

      <SpecialtyWordFinder
        commonWords={commonWords}
        allWords={allWords}
        listLabel="words with Q without U"
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Find Q Words Without U
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Q is often paired with U in English,
            but some words contain Q without any U.
            Every result on this page includes Q
            and excludes U completely.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Filter by Word Length
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Use the Word Length menu when you know
            how many letters the word should have.
            You can also combine the length filter
            with Starts With, Contains, Ends With,
            and Exclude Letters.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words or All Words
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words shows a smaller list of
            more familiar vocabulary. Switch to
            All Words to explore a broader set of
            entries, including less common words.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More Specialty Searches
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/words-with-q"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words With Q
            </Link>

            <Link
              href="/words-from-letters"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words From Letters
            </Link>

            <Link
              href="/word-unscrambler"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Word Unscrambler
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}