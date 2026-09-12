import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title: "Words From Letters",
  description:
    "Enter letters and find words you can make with TootieWords' free Words From Letters tool.",
};

export default function WordsFromLettersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <WordFinder
        title="Words From Letters"
        description="Enter your available letters and discover words of different lengths you can build."
      />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Make Words From Your Letters
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Enter any collection of letters and TootieWords will search
            for words that can be created from them. Results are
            organized by length, making it easy to find longer words
            first or browse shorter possibilities.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Find Words of a Specific Length
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Use the Word Length filter when you know exactly how many
            letters the answer should contain. You can search for
            three-letter, four-letter, five-letter words, and more.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Narrow Down Your Search
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            If you already know part of the answer, use Starts With,
            Ends With, or Must Contain to reduce the number of possible
            matches.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Specialty Word Searches
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Looking for a more specific kind of word? Browse one of
            TootieWords&apos; specialty word lists.
          </p>

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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}