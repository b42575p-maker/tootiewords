import type { Metadata } from "next";
import Link from "next/link";

import words from "an-array-of-english-words";
import { commonWordFrequencies as wordFrequencyData } from "@/lib/word-frequencies";

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
        /q(?!u)/.test(word)
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
  title: "Words With Q Without U - Q Word Finder",
  description:
    "Find words containing Q without U. Browse common and uncommon Q-without-U words and narrow the list by length, starting letters, endings, and other letter clues.",
  alternates: {
    canonical:
      "https://tootiewords.com/words-with-q-without-u",
  },
  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/words-with-q-without-u",
    siteName: "TootieWords",
    title:
      "Words With Q Without U - Q Word Finder",
    description:
      "Explore words where Q appears without the U that usually follows it.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Words With Q Without U",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Words With Q Without U - Q Word Finder",
    description:
      "Explore words containing Q without the letter U.",
    images: ["/opengraph-image.png"],
  },
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
          🐾 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With Q Without U
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Explore words where Q appears without
          the U that usually follows it. Then use
          the filters to narrow the list with the
          other clues you know.
        </p>
      </section>

      <SpecialtyWordFinder
        commonWords={commonWords}
        allWords={allWords}
        listLabel="words with Q without U"
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="mb-12 rounded-[1.5rem] border-2 border-[#efb6c6] bg-[#fff1f5] p-6">
            <h2 className="text-xl font-black text-[#4a2e25]">
              Q Without U by the Numbers
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 leading-7 text-[#6f5549] marker:text-[#ef799a]">
            <li>Our word list has 91 words where Q is not followed by U, counting plurals.</li>
            <li>Only <strong>QI</strong> is common enough to appear in everyday English.</li>
            <li>Most of these words came into English from Arabic, Chinese, Hebrew, and Inuit languages.</li>
            <li>Short ones like <strong>QI</strong>, <strong>QAT</strong>, and <strong>QAID</strong> are the most useful in word games.</li>
            </ul>
            <Link
              href="/guides/q-without-u-words"
              className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#ef799a] to-[#f0527e] px-5 py-3 font-black text-white shadow-[0_6px_16px_rgba(240,82,126,0.25)] transition hover:-translate-y-0.5"
            >
              Read the Q Without U guide &rarr;
            </Link>
          </div>

          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Can Q Appear Without U?
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Yes. The familiar QU combination appears
            in many English words, but Q can occur
            without U as well. Some examples entered
            English from languages whose spelling
            patterns use Q differently, while other
            entries are names for foods, places,
            cultural terms, or specialized concepts
            that became part of English vocabulary.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Examples of Q Without U
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Familiar examples include{" "}
            <strong>qi</strong>, a term associated
            with vital energy in Chinese philosophy,
            and <strong>qadi</strong>, a judge in
            Islamic law. Depending on the dictionary
            being used, you may encounter additional
            borrowed or specialized Q words without
            U. That is one reason the Common Words
            and All Words views can produce noticeably
            different lists.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Search the List More Efficiently
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            If you know the word length, choose it
            first. Add a known beginning or ending
            next, then use Contains for any other
            required letters. Exclude Letters can
            remove possibilities that conflict with
            clues you have already tested. Every
            result will continue to include at
            least one Q that is not followed by U.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Why the Dictionary Matters
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Unusual letter combinations are especially
            sensitive to dictionary choice. A word
            can be valid in one reference and absent
            from another. TootieWords therefore
            separates a frequency-based Common Words
            view from the broader All Words dictionary.
            For a particular word game or puzzle,
            its official word list remains the final
            authority on whether an entry is accepted.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Related Word Searches
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/words-with-q"
              className="rounded-full border-2 border-[#bfaee6] bg-[#efeafb] px-5 py-3 font-black text-[#4f3a86] transition hover:border-[#a693db] hover:bg-[#e3dbf7]"
            >
              All Words With Q
            </Link>

            <Link
              href="/words-with-no-vowels"
              className="rounded-full border-2 border-[#bfaee6] bg-[#efeafb] px-5 py-3 font-black text-[#4f3a86] transition hover:border-[#a693db] hover:bg-[#e3dbf7]"
            >
              Words With No Vowels
            </Link>

            <Link
              href="/words-from-letters"
              className="rounded-full border-2 border-[#bfaee6] bg-[#efeafb] px-5 py-3 font-black text-[#4f3a86] transition hover:border-[#a693db] hover:bg-[#e3dbf7]"
            >
              Words From Letters
            </Link>

            <Link
              href="/word-unscrambler"
              className="rounded-full border-2 border-[#bfaee6] bg-[#efeafb] px-5 py-3 font-black text-[#4f3a86] transition hover:border-[#a693db] hover:bg-[#e3dbf7]"
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
