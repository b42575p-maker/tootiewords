import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GuideCard } from "@/components/GuideLayout";
import { guides } from "@/lib/guides";

const description =
  "Word game guides from TootieWords: Wordle starting words, how to unscramble letters, Q without U words, and words without vowels, backed by real word-list data.";

export const metadata: Metadata = {
  title: "Word Game Guides",
  description,
  alternates: {
    canonical: "https://tootiewords.com/guides",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/guides",
    siteName: "TootieWords",
    title: "Word Game Guides | TootieWords",
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Word Game Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Game Guides | TootieWords",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <section className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Tootie&apos;s Word Game Guides
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Word Game Guides
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Tips and strategies for word games, built from the same word list
          that powers our tools. When we say a letter is common or a word is
          a strong opener, we counted it ourselves.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} {...guide} />
          ))}
        </div>

        <div className="mt-12 rounded-[1.75rem] border-2 border-[#efd3ba] bg-white p-7 text-center">
          <h2 className="text-xl font-black text-[#4a2e25]">
            Want to put a tip into practice?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#755d52]">
            Every guide links to the matching TootieWords tool so you can try
            the idea on your own letters.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/5-letter-words"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              5 Letter Word Finder
            </Link>
            <Link
              href="/word-unscrambler"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Word Unscrambler
            </Link>
            <Link
              href="/words-with-q-without-u"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Q Without U Finder
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
