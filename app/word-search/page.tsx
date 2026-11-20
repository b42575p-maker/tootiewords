import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordSearchGame from "@/components/WordSearchGame";
import { WORD_SEARCH_THEMES } from "@/lib/word-search-themes";

const title = "Free Word Search Puzzles – Daily & Printable";
const description =
  "Play Tootie's free word search puzzles online or print them. A new themed puzzle every day in Easy, Medium, and Hard, plus unlimited bonus puzzles.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://tootiewords.com/word-search",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/word-search",
    siteName: "TootieWords",
    title,
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tootie's Word Search",
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
  name: "Tootie's Word Search",
  url: "https://tootiewords.com/word-search",
  applicationCategory: "GameApplication",
  operatingSystem: "Any",
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://tootiewords.com/#organization" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl font-black text-[#4a2e25] first:mt-0 sm:text-3xl">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-8 text-[#5f4a40]">{children}</p>;
}

export default function WordSearchPage() {
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
            🐾 New puzzle every day
          </div>
          <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
            Tootie&apos;s Word Search
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#755d52]">
            Find every hidden word in today&apos;s themed puzzle. Pick Easy,
            Medium, or Hard, play as many bonus puzzles as you like, or print
            one to solve with a pencil.
          </p>
        </div>

        <div className="mt-8">
          <WordSearchGame />
        </div>
      </section>

      <article className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <H2>How to Play</H2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">
            <li>Every word in the list is hidden in the grid in a straight line.</li>
            <li>Drag across a word with your finger or mouse, or tap its first letter and then its last letter.</li>
            <li>Found words are highlighted in the grid and crossed off the list.</li>
            <li>The timer starts when you make your first selection, so take a look around first if you like.</li>
            <li>Find every word to finish the puzzle and share your time.</li>
          </ul>

          <H2>Easy, Medium, and Hard</H2>
          <P>
            <strong>Easy</strong> puzzles use a 10×10 grid with 8 words that read
            left to right or top to bottom, which makes them a good fit for kids
            and quick breaks. <strong>Medium</strong> puzzles use a 12×12 grid
            with 10 words and add diagonals. <strong>Hard</strong> puzzles use a
            14×14 grid with 12 words that can run in any direction, including
            backward and diagonally upward.
          </P>

          <H2>A New Theme Every Day</H2>
          <P>
            The daily puzzle is the same for everyone, so you can compare times
            with friends. It changes at midnight your local time, and your
            progress is saved in your browser. When you finish, tap{" "}
            <strong>New puzzle</strong> for an unlimited supply of bonus puzzles.
            Tootie rotates through {WORD_SEARCH_THEMES.length} themes, including:
          </P>
          <div className="mt-4 flex flex-wrap gap-2">
            {WORD_SEARCH_THEMES.map((theme) => (
              <span
                key={theme.slug}
                className="rounded-full border-2 border-[#ead6c5] bg-[#fffaf4] px-3 py-1 text-sm font-bold text-[#5f4a40]"
              >
                {theme.emoji} {theme.name}
              </span>
            ))}
          </div>

          <H2>Printable Word Searches</H2>
          <P>
            Tap <strong>Print</strong> to get a clean black-and-white copy of the
            puzzle with a checklist of words. Printed puzzles are great for
            classrooms, waiting rooms, road trips, and anyone who prefers a pencil.
          </P>

          <H2>Word Search Tips</H2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">
            <li><strong>Hunt for rare letters.</strong> Words with J, K, V, W, or Y are easier to spot because those letters stand out.</li>
            <li><strong>Look for double letters.</strong> Pairs like the LL in BALLOON or the EE in SHEEP catch the eye quickly.</li>
            <li><strong>Scan one row at a time.</strong> Search for a word&apos;s first letter, then check all the directions around it.</li>
            <li><strong>Save long words for last.</strong> Once short words are crossed off, long words are easier to trace.</li>
          </ul>

          <div className="mt-10 rounded-[1.5rem] border-2 border-[#efd3ba] bg-[#fffaf4] p-6">
            <p className="leading-7 text-[#6f5549]">
              Want more puzzles? Try Tootie&apos;s Word Pounce, a daily game where
              you make as many words as you can from 7 letters.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/word-pounce"
                className="font-hand inline-flex rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
              >
                Play Word Pounce &rarr;
              </Link>
              <Link
                href="/games"
                className="font-hand inline-flex rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
              >
                All Games &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
