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
  title: "Words With Q - Q Word Finder",
  description:
    "Find words with Q using TootieWords. Browse Q words, explore common Q patterns, and filter by length, starting letters, endings, included letters, and excluded letters.",
  alternates: {
    canonical: "https://tootiewords.com/words-with-q",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/words-with-q",
    siteName: "TootieWords",
    title: "Words With Q - Q Word Finder",
    description:
      "Browse words containing Q and narrow the list with useful word filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Words With Q Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Words With Q - Q Word Finder",
    description:
      "Browse words containing Q and narrow the list with TootieWords.",
    images: ["/opengraph-image.png"],
  },
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
          🐾 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With Q
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse words containing the letter Q and
          narrow the list by word length, starting
          letters, endings, additional required
          letters, or letters you want to exclude.
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
            Finding Words That Contain Q
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Q is an unusual letter because it often
            appears as part of a recognizable letter
            pattern rather than by itself. Words such
            as <strong>queen</strong>,{" "}
            <strong>quick</strong>,{" "}
            <strong>quiet</strong>, and{" "}
            <strong>square</strong> pair Q with U.
            Starting with that pattern can be useful
            when you are trying to remember or solve
            a word containing Q.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Q Is Not Always Followed by U
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Although QU is familiar in English,
            it is not a rule that every Q must be
            followed by U. English also contains
            words in which Q appears without U.
            TootieWords has a separate list for
            those cases so you can explore that
            smaller and more unusual group directly.
          </p>

          <div className="mt-5">
            <Link
              href="/words-with-q-without-u"
              className="inline-flex rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Explore Words With Q Without U
            </Link>
          </div>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            How to Narrow a Q Word Search
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Start with word length if you know it.
            Then add any beginning or ending letters
            you already have. The Contains filter is
            useful for another confirmed letter,
            while Exclude Letters removes words that
            use letters you know cannot be part of
            the answer. Combining clues is usually
            more effective than scanning the entire
            Q-word list.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words and the Larger Dictionary
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words focuses on entries found in
            the frequency list used by TootieWords,
            which tends to surface more familiar
            vocabulary. All Words opens the broader
            dictionary and may include uncommon,
            specialized, or unfamiliar entries.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More TootieWords Searches
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/words-with-q-without-u"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Q Without U
            </Link>

            <Link
              href="/words-with-no-vowels"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words With No Vowels
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
