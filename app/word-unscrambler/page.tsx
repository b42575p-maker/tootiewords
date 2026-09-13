import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title:
    "Word Unscrambler - Unscramble Letters Into Words",

  description:
    "Use TootieWords' free word unscrambler to turn scrambled letters into words. Filter results by word length, starting letters, ending letters, and more.",

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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <WordFinder
        title="Word Unscrambler"
        description="Enter scrambled letters to find valid words you can make from them."
      />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Unscramble Letters Into Words
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            The TootieWords Word Unscrambler takes a group of mixed-up
            letters and searches for words that can be created using
            those letters. Longer words are displayed first so you can
            quickly spot useful matches.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            How the Word Unscrambler Works
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Enter your letters in the search box and select Find
            Words. TootieWords checks each possible word against the
            letters you supplied. If your letters contain duplicates,
            those duplicates are handled automatically.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            You can narrow the results by word length or specify
            letters that a word must contain, start with, or end with.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Example
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Entering <strong>listen</strong> can reveal words such as{" "}
            <strong>silent</strong>, <strong>enlist</strong>, and
            numerous shorter words made from the same letters.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}