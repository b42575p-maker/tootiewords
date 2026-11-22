import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordPounceGame from "@/components/WordPounceGame";

const title = "Tootie's Word Pounce – Free Daily Word Game";
const description =
  "Play Tootie's Word Pounce, a free daily word puzzle. Make as many words as you can from 7 letters, find the word that uses them all, and climb to Top Cat.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://tootiewords.com/word-pounce",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/word-pounce",
    siteName: "TootieWords",
    title,
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tootie's Word Pounce daily word game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tootie's Word Pounce",
  url: "https://tootiewords.com/word-pounce",
  applicationCategory: "GameApplication",
  operatingSystem: "Any",
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://tootiewords.com/#organization" },
};

const ranks = [
  ["Curious Kitten", "Just getting started"],
  ["Playful Kitten", "10% of the day's points"],
  ["Clever Cat", "25% of the points"],
  ["Sharp-Eyed Cat", "45% of the points"],
  ["Super Pouncer", "65% of the points"],
  ["Top Cat", "80% of the points"],
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl font-black text-[#4a2e25] first:mt-0 sm:text-3xl">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-8 text-[#5f4a40]">{children}</p>;
}

export default function WordPouncePage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6 sm:pt-12">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
            🐾 A new puzzle every day
          </div>
          <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
            Tootie&apos;s Word Pounce
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#755d52]">
            Make as many words as you can from today&apos;s 7 letters. Every
            puzzle hides at least one word that uses all of them. Find it to
            pounce!
          </p>
          <p className="font-hand mx-auto mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-bold text-[#9a5221]">
            🕛 The puzzle resets at midnight your local time. Come back tomorrow for new letters!
          </p>
        </div>

        <div className="mt-8">
          <WordPounceGame />
        </div>
      </section>

      <article className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <H2>How to Play</H2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">
            <li>Tap the letter tiles or type on your keyboard to spell a word.</li>
            <li>Words must be at least 3 letters long.</li>
            <li>Each tile can be used once per word, so a word can only repeat a letter if that letter appears twice in the puzzle.</li>
            <li>Press <strong>Pounce!</strong> or Enter to submit. Backspace removes a letter and Shuffle mixes up the tiles for a fresh look.</li>
            <li>A new puzzle appears at midnight your local time, and your progress for the day is saved in your browser.</li>
          </ul>

          <H2>Scoring</H2>
          <P>
            Longer words earn more points. A 3-letter word is worth 1 point, a
            4-letter word 2 points, a 5-letter word 3 points, and a 6-letter
            word 4 points. A word that uses all 7 letters is a <strong>pounce</strong>{" "}
            and is worth 10 points.
          </P>
          <P>
            Scored words are everyday English words. Tootie also accepts rarer
            dictionary words as <strong>bonus words</strong>. They don&apos;t add
            points, but they are counted separately so you get credit for knowing
            them.
          </P>

          <H2>Cat Ranks</H2>
          <P>Your rank is based on your share of the day&apos;s total points:</P>
          <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-[#efd3ba]">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Word Pounce ranks</caption>
              <thead className="bg-[#fff0df] text-sm font-black uppercase tracking-wide text-[#9a5830]">
                <tr>
                  <th scope="col" className="px-4 py-3">Rank</th>
                  <th scope="col" className="px-4 py-3">You need</th>
                </tr>
              </thead>
              <tbody className="text-[#5f4a40]">
                {ranks.map(([name, need]) => (
                  <tr key={name} className="border-t border-[#f0ded0] odd:bg-white even:bg-[#fffaf4]">
                    <td className="px-4 py-3 font-black text-[#4a2e25]">{name}</td>
                    <td className="px-4 py-3">{need}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2>Tootie&apos;s Hints</H2>
          <P>
            Stuck? Ask Tootie for up to 3 hints a day. Each hint tells you the
            length and first two letters of a word you haven&apos;t found yet,
            starting with the longest ones. Done for the day? Tap{" "}
            <strong>Give up &amp; show answers</strong> to see every word you missed.
          </P>

          <H2>Tips for a Better Score</H2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">
            <li><strong>Hunt for endings.</strong> Look for -ING, -ER, -EST, and -LY first. They often unlock the 7-letter pounce.</li>
            <li><strong>Shuffle often.</strong> Seeing the letters in a new order helps your brain spot words it missed.</li>
            <li><strong>Build families.</strong> Once you find a word, try adding or swapping a letter: TAR, STAR, START.</li>
            <li><strong>Pair consonants.</strong> Look for blends like ST, TR, CH, and SH that begin many words.</li>
            <li><strong>Check yesterday&apos;s answers.</strong> Reviewing the words you missed is a great way to learn new patterns.</li>
          </ul>

          <div className="mt-10 rounded-[1.5rem] border-2 border-[#efd3ba] bg-[#fffaf4] p-6">
            <p className="leading-7 text-[#6f5549]">
              Want to practice outside the daily puzzle? Enter any letters in the
              Words From Letters tool, or read Tootie&apos;s guides for word-game strategy.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/words-from-letters"
                className="font-hand inline-flex rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
              >
                Words From Letters &rarr;
              </Link>
              <Link
                href="/guides"
                className="font-hand inline-flex rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
              >
                Word Game Guides &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
