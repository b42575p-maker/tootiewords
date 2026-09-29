import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title:
    "Anagram Solver - Find Anagrams From Letters",

  description:
    "Use TootieWords' free anagram solver to find exact anagrams and other words from your letters. Enter a word or letter set and discover possible matches.",

  alternates: {
    canonical:
      "https://tootiewords.com/anagram-solver",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/anagram-solver",
    siteName: "TootieWords",
    title:
      "Anagram Solver - Find Anagrams From Letters",
    description:
      "Find exact anagrams and other words from your letters with the free TootieWords anagram solver.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Anagram Solver",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Anagram Solver - Find Anagrams From Letters",
    description:
      "Find exact anagrams and other words from your letters with the free TootieWords anagram solver.",
    images: ["/opengraph-image.png"],
  },
};

export default function AnagramSolverPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <WordFinder
        title="Anagram Solver"
        description="Enter a word or set of letters to find exact anagrams and other words that can be built from the same letters."
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            What Is an Anagram?
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            An anagram is made by rearranging the
            letters of a word to create another word
            while using the same letters the same
            number of times. For example,{" "}
            <strong>silent</strong> is an exact
            anagram of <strong>listen</strong>:
            both contain six letters, and their
            letter counts match exactly.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Exact Anagrams vs. Shorter Words
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            TootieWords separates exact anagrams
            from other results. An exact anagram
            must use every available letter. A
            shorter result can use only part of the
            letter set. That distinction lets you
            look for a true rearrangement first
            without losing other useful words that
            your letters can form.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Repeated Letters Must Match
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Letter counts matter when testing an
            exact anagram. If the original entry
            contains two copies of a letter, an
            exact anagram must also use two copies.
            Likewise, a candidate cannot introduce
            an extra copy of a letter that was not
            available in the original set.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Use Filters When You Know More
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Sometimes you know more than the source
            letters. You may know the answer begins
            with a particular letter, ends with a
            certain sequence, or must contain another
            letter in a specific position. Add those
            clues to reduce the possibilities rather
            than checking every result manually.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Anagrams Depend on the Word List
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Rearranging letters is mechanical, but
            deciding whether the resulting sequence
            counts as a word depends on the
            dictionary. TootieWords offers a
            frequency-based Common Words view and a
            broader All Words view. A particular
            puzzle or word game may use a different
            accepted-word list.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Related TootieWords Tools
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
              href="/6-letter-words"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              6 Letter Words
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
