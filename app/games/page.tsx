import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const title = "Free Word Games – Daily Puzzles From Tootie";
const description =
  "Play free word games from TootieWords: Tootie's Word Pounce, a daily 7-letter word puzzle, and themed word searches you can play online or print.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://tootiewords.com/games",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/games",
    siteName: "TootieWords",
    title,
    description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "TootieWords games" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

const games = [
  {
    href: "/word-pounce",
    emoji: "🐾",
    name: "Tootie's Word Pounce",
    tag: "Daily",
    description:
      "Make as many words as you can from 7 letters. Find the word that uses them all and climb the cat ranks to Top Cat.",
  },
  {
    href: "/word-search",
    emoji: "🔎",
    name: "Tootie's Word Search",
    tag: "Daily + unlimited",
    description:
      "A new themed word search every day in Easy, Medium, and Hard. Play bonus puzzles anytime or print one to solve on paper.",
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <section className="mx-auto max-w-4xl px-6 pb-10 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Free to play, no signup
        </div>
        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">Tootie&apos;s Word Games</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#755d52]">
          Daily puzzles for word lovers. Every game works on your phone or
          computer, saves your progress in your browser, and gets a fresh puzzle
          at midnight.
        </p>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="group flex flex-col rounded-[1.75rem] border-2 border-[#efd3ba] bg-white p-6 shadow-[0_12px_30px_rgba(91,59,43,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#ef9b4a]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0df] text-3xl"
                  aria-hidden="true"
                >
                  {game.emoji}
                </span>
                <span className="rounded-full bg-[#ffe4c4] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#9a5221]">
                  {game.tag}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-black text-[#4a2e25]">{game.name}</h2>
              <p className="mt-2 leading-7 text-[#755d52]">{game.description}</p>
              <div className="mt-auto pt-5">
                <span className="font-hand inline-flex rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition group-hover:border-[#ef9b4a] group-hover:bg-[#ffe4c4]">
                  Play now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-[#9a8175]">More games are on the way. 🐱</p>
      </section>

      <article className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-black text-[#4a2e25] sm:text-3xl">Why Play Word Games?</h2>
          <p className="mt-4 leading-8 text-[#5f4a40]">
            A few minutes with a word puzzle is a fun way to wake up your brain.
            Word games build vocabulary and spelling, sharpen pattern spotting,
            and give you a small daily goal to look forward to. Daily puzzles are
            the same for everyone, so they are easy to share and compare with
            friends and family.
          </p>
          <h2 className="mt-10 text-2xl font-black text-[#4a2e25] sm:text-3xl">Need Help With Another Game?</h2>
          <p className="mt-4 leading-8 text-[#5f4a40]">
            Playing Scrabble, Words With Friends, Wordle, or a crossword? Tootie&apos;s
            tools can help. Use the{" "}
            <Link href="/word-unscrambler" className="font-bold text-[#d8741e] hover:underline">Word Unscrambler</Link>{" "}
            to sort out a jumble of letters, the{" "}
            <Link href="/5-letter-words" className="font-bold text-[#d8741e] hover:underline">5-letter word finder</Link>{" "}
            for Wordle-style clues, or browse the{" "}
            <Link href="/guides" className="font-bold text-[#d8741e] hover:underline">word game guides</Link>{" "}
            for tips and strategy.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
