import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title:
    "Word Unscrambler - Unscramble Letters Into Words",

  description:
    "Use TootieWords' free word unscrambler to turn scrambled letters into words. Find words by length and narrow results with starting, ending, and required letters.",

  alternates: {
    canonical:
      "https://tootiewords.com/word-unscrambler",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/word-unscrambler",
    siteName: "TootieWords",
    title:
      "Word Unscrambler - Unscramble Letters Into Words",
    description:
      "Unscramble letters and find words you can make with the free TootieWords word unscrambler.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Word Unscrambler",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Word Unscrambler - Unscramble Letters Into Words",
    description:
      "Unscramble letters and find words you can make with the free TootieWords word unscrambler.",
    images: ["/opengraph-image.png"],
  },
};

export default function WordUnscramblerPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <WordFinder
        title="Word Unscrambler"
        description="Enter scrambled letters to find words you can make from them, then narrow the results with the clues you already know."
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            How to Unscramble Letters
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            A scrambled group of letters can produce
            several different words. TootieWords
            checks which words can be built from the
            letters you enter and groups the results
            by length, making longer possibilities
            easy to spot while still showing shorter
            words that use only part of your letter
            set.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Start With All of Your Available Letters
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Enter the complete group of letters you
            have, including duplicates. If your set
            contains two copies of a letter, the
            finder can use that letter twice. If it
            contains only one, a result cannot use
            two copies of it. This matters for words
            with repeated letters.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Example: Unscrambling LISTEN
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Entering <strong>listen</strong> can
            reveal six-letter rearrangements such as{" "}
            <strong>silent</strong> and{" "}
            <strong>enlist</strong>, along with
            shorter words that can be made from the
            same available letters. If you need an
            exact six-letter rearrangement, the
            Exact Anagrams section is the quickest
            place to look.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Narrow a Large Result List
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Use Word Length when you know how many
            letters the answer needs. Starts With
            and Ends With are useful when you know
            the edges of the word, while Must
            Contain can require another confirmed
            letter. Combining those clues can turn
            a long list into a much smaller group
            of possibilities.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Common Words or All Words?
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Common Words keeps the results focused
            on entries found in the frequency list
            used by TootieWords. All Words searches
            the broader dictionary and can surface
            less familiar vocabulary. If you are
            solving a particular word game, its own
            accepted-word list remains the final
            authority.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Related TootieWords Tools
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/anagram-solver"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Anagram Solver
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
