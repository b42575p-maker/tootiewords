import type { Metadata } from "next";

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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <WordFinder
        title="Anagram Solver"
        description="Enter letters or a word to discover anagrams and other words you can create."
      />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Find Anagrams From Letters
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            An anagram rearranges the letters of a word or phrase to
            create another word. TootieWords highlights exact anagrams
            that use every letter you entered.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Exact Anagrams
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Exact anagrams use the same number of letters as your
            original entry. For example, <strong>silent</strong> is an
            anagram of <strong>listen</strong> because both words use
            exactly the same six letters.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Other Words From Your Letters
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            TootieWords also displays shorter words beneath the exact
            anagrams, giving you additional possibilities when solving
            word puzzles.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}