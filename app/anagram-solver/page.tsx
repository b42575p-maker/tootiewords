import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";
import CopyWordChip from "@/components/CopyWordChip";

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
            How Common Are Anagrams?
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            We checked every common word of three or more letters in the
            TootieWords word list, 19,941 words in all. Only 2,380 of them
            (about 12%) can be rearranged into another common word. Short
            words are far more likely to have a partner:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-[#efd3ba]">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <caption className="sr-only">
                Share of common words that have at least one common-word anagram, by word length
              </caption>
              <thead className="bg-[#fff0df] text-sm font-black uppercase tracking-wide text-[#9a5830]">
                <tr>
                  <th scope="col" className="px-4 py-3">Word length</th>
                  <th scope="col" className="px-4 py-3">Common words</th>
                  <th scope="col" className="px-4 py-3">Have an anagram</th>
                </tr>
              </thead>
              <tbody className="text-[#5f4a40]">
                {[
                  ["3 letters", "683", "44.5%"],
                  ["4 letters", "1,679", "34.6%"],
                  ["5 letters", "2,421", "24.2%"],
                  ["6 letters", "2,993", "14.2%"],
                  ["7 letters", "3,179", "9.1%"],
                  ["8 letters", "2,879", "3.9%"],
                ].map(([length, count, share]) => (
                  <tr
                    key={length}
                    className="border-t border-[#f0ded0] odd:bg-white even:bg-[#fffaf4]"
                  >
                    <td className="px-4 py-3 font-black text-[#4a2e25]">{length}</td>
                    <td className="px-4 py-3">{count}</td>
                    <td className="px-4 py-3">{share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-8 text-[#755d52]">
            That is why the solver shows shorter words too. If you enter seven
            or eight letters, there is a good chance no common word uses all
            of them, but plenty of shorter words will.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            The Biggest Anagram Families
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Some letter sets are surprisingly flexible. These groups of common
            words all use exactly the same letters. Click any word to copy it.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["least", "steal", "tales", "slate", "stale"],
              ["risen", "resin", "siren", "rinse", "reins"],
              ["stop", "post", "spot", "tops", "pots"],
              ["relating", "integral", "triangle", "altering"],
              ["plates", "staple", "petals", "pastel"],
              ["trace", "react", "cater", "crate"],
              ["races", "cares", "acres", "scare"],
              ["large", "glare", "regal", "lager"],
              ["team", "meat", "mate", "tame"],
              ["garden", "danger", "ranged"],
            ].map((family) => (
              <div key={family[0]} className="flex flex-wrap gap-2">
                {family.map((word) => (
                  <CopyWordChip key={word} word={word} />
                ))}
              </div>
            ))}
          </div>

          <p className="mt-4 leading-8 text-[#755d52]">
            Notice the letters they share. E, A, R, S, and T show up again and
            again, because they are among the most common letters in English
            and combine in many orders.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            The Longest Anagram Pairs
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Long anagrams are rare, which makes them fun to find. The longest
            pair among our common words is twelve letters long:
          </p>

          <ul className="mt-4 space-y-2 leading-8 text-[#755d52]">
            <li>
              <strong className="text-[#4a2e25]">CONSERVATION</strong> and{" "}
              <strong className="text-[#4a2e25]">CONVERSATION</strong> (12
              letters)
            </li>
            <li>
              <strong className="text-[#4a2e25]">COORDINATES</strong> and{" "}
              <strong className="text-[#4a2e25]">DECORATIONS</strong> (11)
            </li>
            <li>
              <strong className="text-[#4a2e25]">DESCRIPTION</strong> and{" "}
              <strong className="text-[#4a2e25]">PREDICTIONS</strong> (11)
            </li>
            <li>
              <strong className="text-[#4a2e25]">IMPRESSIONS</strong> and{" "}
              <strong className="text-[#4a2e25]">PERMISSIONS</strong> (11)
            </li>
            <li>
              <strong className="text-[#4a2e25]">ANTAGONIST</strong> and{" "}
              <strong className="text-[#4a2e25]">STAGNATION</strong> (10)
            </li>
            <li>
              <strong className="text-[#4a2e25]">DEALERSHIP</strong> and{" "}
              <strong className="text-[#4a2e25]">LEADERSHIP</strong> (10)
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Tips for Solving Anagram Puzzles
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#755d52] marker:text-[#ef9b4a]">
            <li>
              <strong>Look for a common ending first.</strong> Pull out -ING,
              -ED, or -ER if your letters allow it, then rearrange what is
              left.
            </li>
            <li>
              <strong>Swap the first letter.</strong> Many anagram families,
              like STOP, POST, SPOT, and TOPS, differ mainly in which letter
              leads.
            </li>
            <li>
              <strong>Count your vowels.</strong> Common words average roughly
              one vowel for every three letters, so a set with no vowels or
              almost all vowels will have few answers.
            </li>
            <li>
              <strong>Try the solver for confirmation.</strong> Enter your
              letters above and check the Exact Anagrams section at the top
              of the results.
            </li>
          </ul>

          <p className="mt-4 leading-8 text-[#755d52]">
            For a step-by-step method, read our{" "}
            <Link
              href="/guides/how-to-unscramble-letters"
              className="font-bold text-[#d8617f] underline decoration-[#ef9ab2] underline-offset-4"
            >
              guide to unscrambling letters
            </Link>
            .
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
              className="font-hand rounded-full border-2 border-[#ead6c5] bg-[#fffaf4] px-5 py-3 font-bold text-[#51372c] transition hover:border-[#ef9b4a] hover:bg-[#fff0df]"
            >
              Word Unscrambler
            </Link>

            <Link
              href="/words-from-letters"
              className="font-hand rounded-full border-2 border-[#ead6c5] bg-[#fffaf4] px-5 py-3 font-bold text-[#51372c] transition hover:border-[#ef9b4a] hover:bg-[#fff0df]"
            >
              Words From Letters
            </Link>

            <Link
              href="/6-letter-words"
              className="font-hand rounded-full border-2 border-[#ead6c5] bg-[#fffaf4] px-5 py-3 font-bold text-[#51372c] transition hover:border-[#ef9b4a] hover:bg-[#fff0df]"
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
