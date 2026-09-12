import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordFinder from "@/components/WordFinder";

export const metadata: Metadata = {
  title: "Free Word Finder & Letter Unscrambler",
  description:
    "Find words from scrambled letters, discover hidden words, and solve anagrams with TootieWords' free online word finder.",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf4] text-[#3d2923]">
      <Header />

      {/* HERO */}
      <section className="hero-storybook relative overflow-hidden">
        <PawPrint className="left-[4%] top-[23%] -rotate-12" />
        <PawPrint className="left-[40%] top-[10%] rotate-12" />
        <PawPrint className="right-[5%] top-[27%] -rotate-6" />

        <div className="mx-auto max-w-[1420px] px-5 pb-8 pt-7 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">
          <div className="relative grid items-start gap-2 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-30 pt-3 lg:pt-9">
              <div className="hero-copy-column">
                <h1 className="hero-headline">
                  <span className="hero-headline-line hero-headline-line-one">
                    Turn Letters
                  </span>

                  <span className="hero-headline-line hero-headline-line-two">
                    Into Possibilities
                  </span>
                </h1>

                <div className="hero-swoosh" aria-hidden="true">
                  <span />
                </div>

                <p className="hero-description">
                  Find words, solve anagrams, and explore the magic hidden in
                  letters with TootieWords — your friendly word game helper.
                </p>

                <div className="hero-note hidden sm:block">
                  <span>
                    Same Letters.
                    <br />
                    More Fun! ♡
                  </span>

                  <div className="hero-note-line" />
                </div>
              </div>
            </div>

            <div className="relative z-20 flex min-h-[315px] items-end justify-center lg:min-h-[430px] lg:justify-end">
              <Tile
                letter="A"
                className="left-[10%] top-[10%] -rotate-12"
              />

              <Tile
                letter="P"
                className="right-[14%] top-[7%] rotate-12"
              />

              <Tile
                letter="W"
                pink
                className="right-[4%] top-[39%] rotate-[10deg]"
              />

              <Tile
                letter="R"
                className="right-[8%] bottom-[13%] rotate-12"
              />

              <Image
                src="/tootie-hero-optimized.webp"
                alt="Tootie peeking over the word finder"
                width={900}
                height={600}
                preload
                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 48px), 735px"
                className="pointer-events-none relative z-20 h-auto w-full max-w-[735px] translate-y-3 drop-shadow-[0_18px_22px_rgba(74,46,37,0.16)]"
              />
            </div>
          </div>

          <div className="home-hero-finder relative z-10 lg:-mt-[142px]">
            <WordFinder
              heroMode
              title="Find Words From Letters"
              description="Enter your letters and discover all the possible words!"
            />
          </div>
        </div>

        <div className="storybook-wave-bottom" />
      </section>

      {/* TOOL CARDS */}
      <section className="tool-section relative overflow-hidden px-5 pb-20 pt-12 sm:px-6">
        <PawPrint className="left-[3%] top-[20%] rotate-12 opacity-[0.08]" />
        <PawPrint className="right-[4%] bottom-[12%] -rotate-12 opacity-[0.08]" />

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-7 md:grid-cols-3">
            <ToolCard
              letters={["W", "O", "R", "D"]}
              title="Word Unscrambler"
              description="Unscramble letters to find all possible words."
              href="/word-unscrambler"
              variant="pink"
            />

            <ToolCard
              letters={["A", "B", "C"]}
              title="Anagram Solver"
              description="Find all anagrams from your letters."
              href="/anagram-solver"
              variant="orange"
            />

            <ToolCard
              letters={["C", "A", "T"]}
              title="Words From Letters"
              description="See every word you can make from your letters."
              href="/words-from-letters"
              variant="pink"
              lightbulb
            />
          </div>
        </div>

        <div className="tool-section-wave" />
      </section>

      {/* WORDS BY LENGTH */}
      <section className="relative overflow-hidden bg-[#fffaf4] px-5 py-16 sm:px-6 sm:py-20">
        <PawPrint className="left-[3%] top-[15%] -rotate-12 opacity-[0.07]" />
        <PawPrint className="right-[4%] bottom-[10%] rotate-12 opacity-[0.07]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
              🐾 Tootie&apos;s Word Lists
            </div>

            <h2 className="whimsy-title text-3xl font-black text-[#4a2e25] sm:text-4xl">
              Browse Words by Length
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#755d52] sm:text-lg">
              Tootie sorted the word pile for you. Choose a word length
              and start exploring.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[4, 5, 6, 7, 8].map((length) => (
              <Link
                key={length}
                href={`/${length}-letter-words`}
                className="group rounded-[1.75rem] border-2 border-[#efd3ba] bg-white px-4 py-7 text-center shadow-[0_12px_30px_rgba(91,59,43,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#ef9b4a] hover:bg-[#fff8ef] hover:shadow-[0_16px_35px_rgba(91,59,43,0.12)]"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0df] text-3xl font-black text-[#d8741e] transition group-hover:bg-[#f4a24a] group-hover:text-white">
                  {length}
                </div>

                <div className="mt-4 text-lg font-black text-[#4a2e25]">
                  {length} Letter Words
                </div>

                <div className="mt-2 text-sm font-bold text-[#a26b49]">
                  Explore words →
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-bold text-[#9b7b6b]">
            🐱 Pick a length and let Tootie help narrow the possibilities.
          </p>
        </div>
      </section>

      {/* COZY BOOK / QUOTE */}
      <section className="cozy-story-section relative overflow-hidden">
        <PawPrint className="left-[3%] top-[18%] -rotate-12 opacity-[0.12]" />
        <PawPrint className="left-[9%] bottom-[18%] rotate-12 opacity-[0.08]" />

        <div className="cozy-story-blob cozy-story-blob-left" />
        <div className="cozy-story-blob cozy-story-blob-right" />

        <div className="mx-auto grid max-w-[1380px] items-center gap-2 px-5 py-8 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-5">
          <div className="cozy-quote relative z-20">
            <div className="cozy-quote-mark" aria-hidden="true">
              “
            </div>

            <blockquote>
              A few letters can lead
              <br />
              to a lot of happy.
            </blockquote>

            <div className="cozy-signature">
              <span>— Tootie</span>
              <span className="cozy-signature-paw">🐾</span>
            </div>

            <div className="cozy-quote-scribble" aria-hidden="true" />
          </div>

          <div className="relative z-10 flex justify-center lg:justify-end">
            <Image
              src="/tootie-book-scene-optimized.webp"
              alt="Tootie with an open book, plants, and a warm drink"
              width={1200}
              height={400}
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 48px), 900px"
              className="cozy-book-image h-auto w-full max-w-[900px]"
            />
          </div>
        </div>

        <div className="cozy-bottom-wave" />
      </section>

      {/* BENEFITS */}
      <section className="benefits-section relative overflow-hidden px-5 pb-20 pt-16 sm:px-6">
        <PawPrint className="left-[2%] bottom-[10%] -rotate-12 opacity-[0.07]" />
        <PawPrint className="right-[3%] top-[17%] rotate-12 opacity-[0.07]" />

        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <Benefit
            icon="♥"
            title="Simple & Easy"
            text="Fast, clean tools that are easy to use."
            variant="pink"
          />

          <Benefit
            icon="🐾"
            title="Helpful Results"
            text="Find the words you need, quickly."
            variant="orange"
          />

          <Benefit
            icon="★"
            title="Word Game Friendly"
            text="Great for word games, puzzles, and more."
            variant="gold"
          />

          <Benefit
            icon="🍃"
            title="100% Free"
            text="All tools are free to use, always."
            variant="green"
          />
        </div>

        <div className="benefits-footer-wave" />
      </section>

      <Footer />
    </main>
  );
}

function ToolCard({
  letters,
  title,
  description,
  href,
  variant,
  lightbulb = false,
}: {
  letters: string[];
  title: string;
  description: string;
  href: string;
  variant: "pink" | "orange";
  lightbulb?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`tool-card group ${
        variant === "pink" ? "tool-card-pink" : "tool-card-orange"
      }`}
    >
      <div className="tool-card-art">
        {lightbulb ? (
          <div className="tool-lightbulb" aria-hidden="true">
            <span className="tool-lightbulb-rays">✦</span>
            <span className="tool-lightbulb-bulb">💡</span>
            <span className="tool-lightbulb-paw">🐾</span>
          </div>
        ) : (
          <div className="tool-tiles">
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`letter-tile tool-letter-${index + 1}`}
              >
                {letter}
              </span>
            ))}
          </div>
        )}
      </div>

      <h2 className="tool-card-title">{title}</h2>

      <p className="tool-card-description">{description}</p>

      <div
        className={`tool-card-button ${
          variant === "pink"
            ? "tool-card-button-pink"
            : "tool-card-button-orange"
        }`}
      >
        <span>Try It Now</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

function Benefit({
  icon,
  title,
  text,
  variant,
}: {
  icon: string;
  title: string;
  text: string;
  variant: "pink" | "orange" | "gold" | "green";
}) {
  return (
    <div className="benefit-card">
      <div className={`benefit-icon benefit-icon-${variant}`}>{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function Tile({
  letter,
  pink = false,
  className = "",
}: {
  letter: string;
  pink?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-black shadow-lg ${
        pink ? "bg-[#ef82a0] text-white" : "bg-[#f5b05d] text-[#4e332a]"
      } ${className}`}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}

function PawPrint({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute text-5xl opacity-[0.11] ${className}`}
      aria-hidden="true"
    >
      🐾
    </div>
  );
}