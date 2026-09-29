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
    "Find words with no A, E, I, O, or U using TootieWords. Explore words that use Y or consonant-heavy patterns and filter the results by length and letters.",
  alternates: {
    canonical:
      "https://tootiewords.com/words-with-no-vowels",
  },
  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/words-with-no-vowels",
    siteName: "TootieWords",
    title: "Words With No Vowels - Word Finder",
    description:
      "Browse words without A, E, I, O, or U and narrow the list with TootieWords filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Words With No Vowels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Words With No Vowels - Word Finder",
    description:
      "Browse words without A, E, I, O, or U using TootieWords.",
    images: ["/opengraph-image.png"],
  },
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
          🐾 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With No Vowels
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse words that contain none of the five
          letters A, E, I, O, or U. For this list,
          Y is allowed, so words that rely on Y can
          still appear in the results.
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
            What Does &quot;No Vowels&quot; Mean Here?
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            On TootieWords, this page uses a precise
            letter-based definition: a result cannot
            contain <strong>A, E, I, O, or U</strong>.
            That makes the list predictable and easy
            to filter. It does not mean that every
            result is pronounced without a vowel
            sound; spelling and pronunciation are
            different questions.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Why Y Is Allowed
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Y can behave differently depending on
            the word. In words such as{" "}
            <strong>myth</strong>,{" "}
            <strong>rhythm</strong>, and{" "}
            <strong>crypt</strong>, Y represents a
            vowel sound even though it is not one
            of the five vowel letters used by this
            filter. Because this page is based on
            letters rather than sounds, Y remains
            allowed.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Useful Patterns in Vowelless Spellings
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Many familiar English words without
            A, E, I, O, or U depend on Y to carry
            the syllable. Short expressions and
            borrowed or specialized entries can
            create other patterns as well. The All
            Words view is therefore likely to contain
            entries that are much less familiar than
            those shown under Common Words.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Narrow the List With Other Clues
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Choose Word Length when you know how many
            letters you need. Starts With and Ends
            With can identify a known edge of the
            pattern, while Contains requires another
            letter to appear somewhere in the word.
            Exclude Letters is useful when you have
            additional consonants or Y ruled out.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            A Note About Word Lists
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Dictionaries do not always contain
            exactly the same vocabulary, especially
            when unusual spellings, abbreviations,
            borrowed words, or specialized terms are
            involved. TootieWords provides a Common
            Words view and a broader All Words view.
            If you are solving a particular game or
            puzzle, check its own accepted-word rules
            when validity matters.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Related Word Searches
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
