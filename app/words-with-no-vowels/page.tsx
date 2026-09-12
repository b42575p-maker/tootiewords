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

const vowels = /[aeiou]/;

function getAllWordsWithNoVowels() {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.length >= 2 &&
        !vowels.test(word)
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

function getCommonWordsWithNoVowels() {
  return getAllWordsWithNoVowels()
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
  title: "Words With No Vowels - Word Finder",
  description:
    "Find words with no vowels using TootieWords. Browse words without A, E, I, O, or U and filter them by length, starting letters, ending letters, and more.",
};

export default function WordsWithNoVowelsPage() {
  const allWords =
    getAllWordsWithNoVowels();

  const commonWords =
    getCommonWordsWithNoVowels();

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐱 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With No Vowels
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse words that do not contain A, E, I,
          O, or U. For this word list, Y is allowed,
          so words that use Y in place of the usual
          vowels can still appear.
        </p>
      </section>

      <SpecialtyWordFinder
        commonWords={commonWords}
        allWords={allWords}
        listLabel="words with no vowels"
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Find Words Without Vowels
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Every word in this list excludes the
            five letters A, E, I, O, and U. This
            makes the page useful when you are
            looking for unusual words or trying to
            solve a word puzzle with limited vowel
            choices.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Does Y Count as a Vowel?
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            On this page, Y is not included in the
            vowel filter. That means a word can
            contain Y and still appear in the
            results. The list specifically removes
            words containing A, E, I, O, or U.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Filter Words by Length and Letters
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Choose a word length to focus on shorter
            or longer words. You can also narrow the
            results using Starts With, Contains,
            Ends With, and Exclude Letters.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words or All Words
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words provides a smaller list of
            more familiar vocabulary. Switch to All
            Words to explore a broader dictionary
            list that may include less common
            entries.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More Specialty Word Searches
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/words-with-q"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words With Q
            </Link>

            <Link
              href="/words-with-q-without-u"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words With Q Without U
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