import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title:
    "Words From Letters - Find Words Using Your Letters",

  description:
    "Use TootieWords to find words from your available letters. Discover matching words and narrow results by length, starting letters, endings, and required letters.",

  alternates: {
    canonical:
      "https://tootiewords.com/words-from-letters",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/words-from-letters",
    siteName: "TootieWords",
    title:
      "Words From Letters - Find Words Using Your Letters",
    description:
      "Find words you can make from your letters with the free TootieWords Words From Letters tool.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Words From Letters",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Words From Letters - Find Words Using Your Letters",
    description:
      "Find words you can make from your letters with the free TootieWords Words From Letters tool.",
    images: ["/opengraph-image.png"],
  },
};

export default function WordsFromLettersPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <WordFinder
        title="Words From Letters"
        description="Enter the letters you have available and find words of different lengths that can be built from them."
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Make Words From the Letters You Have
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            When you have a fixed group of letters,
            the challenge is figuring out which
            combinations form words. TootieWords
            checks the available letters against its
            word list and groups matching results by
            length so you can compare longer and
            shorter possibilities.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            You Do Not Have to Use Every Letter
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            A result can use some or all of the
            letters you enter, but it cannot use
            more copies of a letter than you have
            available. This makes the tool useful
            when you want to explore several word
            lengths from the same letter set.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Find a Specific Word Length
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            If the answer must contain a certain
            number of letters, choose that length
            before searching through the results.
            For example, a seven-letter set might
            produce a seven-letter word as well as
            several three-, four-, five-, and
            six-letter possibilities.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Add the Clues You Already Know
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Available letters are only one kind of
            clue. If you know how the answer starts
            or ends, add that information too. Must
            Contain is useful when a particular
            letter needs to appear in the result.
            Combining constraints reduces the number
            of possibilities you need to inspect.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            When to Use the Anagram Solver Instead
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Use Words From Letters when you want to
            explore words of several lengths from an
            available letter set. If your main goal
            is to rearrange every letter into another
            word of exactly the same length, the{" "}
            <Link
              href="/anagram-solver"
              className="font-bold text-[#a75b24] underline decoration-[#efc89f] underline-offset-4"
            >
              Anagram Solver
            </Link>{" "}
            puts exact anagrams front and center.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Explore by Word Length
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {[4, 5, 6, 7, 8].map((length) => (
              <Link
                key={length}
                href={`/${length}-letter-words`}
                className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
              >
                {length} Letter Words
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Specialty Word Searches
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
