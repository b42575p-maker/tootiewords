import Link from "next/link";

import words from "an-array-of-english-words";
import wordFrequencyData from "../data/wordfreq-en-25000-log.json";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordListFinder from "@/components/WordListFinder";

type FrequencyEntry = [string, number];

const frequencyEntries =
  wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

type WordLengthPageProps = {
  wordLength: number;
};

function getWordsByLength(wordLength: number) {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.length === wordLength &&
        frequencies.has(word)
    )
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index
    )
    .sort((a, b) => {
      const frequencyDifference =
        (frequencies.get(b) ?? -Infinity) -
        (frequencies.get(a) ?? -Infinity);

      if (frequencyDifference !== 0) {
        return frequencyDifference;
      }

      return a.localeCompare(b);
    });
}

export default function WordLengthPage({
  wordLength,
}: WordLengthPageProps) {
  const matchingWords =
    getWordsByLength(wordLength);

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐱 Tootie&apos;s Word Helper
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          {wordLength} Letter Words
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Browse {wordLength}-letter words and
          quickly narrow the list by starting
          letters, ending letters, included
          letters, exact letter positions, or
          letters you want to exclude.
        </p>
      </section>

      <WordListFinder
        words={matchingWords}
        wordLength={wordLength}
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Find the Right {wordLength}-Letter
            Word
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            {wordLength}-letter words appear in
            many word games and puzzles.
            TootieWords helps you narrow the
            possibilities when you already know
            some of the letters in the answer.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Search by Starting or Ending
            Letters
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            If you know how the word begins or
            ends, enter those letters in the
            Starts With or Ends With boxes. You
            can combine both filters when you
            know more than one part of the word.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Search by Exact Letter Position
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            If you know exactly where a letter
            belongs, enter it in the matching
            numbered position. You can combine
            exact positions with the other
            filters to narrow the results even
            further.
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Include or Exclude Letters
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            Use Contains for letters you know
            belong in the answer. Use Exclude
            Letters to remove words containing
            letters you know cannot be used.
          </p>

          {wordLength === 5 && (
            <>
              <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
                Popular 5-Letter Word Searches
              </h2>

              <p className="mt-4 leading-8 text-[#755d52]">
                Jump directly to some useful
                five-letter word patterns, then
                use the filters to narrow the
                results even further.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/5-letter-words-starting-with-a"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  5 Letter Words Starting With A
                </Link>

                <Link
                  href="/5-letter-words-starting-with-s"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  5 Letter Words Starting With S
                </Link>

                <Link
                  href="/5-letter-words-ending-in-e"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  5 Letter Words Ending In E
                </Link>

                <Link
                  href="/5-letter-words-ending-in-y"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  5 Letter Words Ending In Y
                </Link>

                <Link
                  href="/5-letter-words-with-a"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  5 Letter Words With A
                </Link>
              </div>

              <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
                Exact Letter Position Searches
              </h2>

              <p className="mt-4 leading-8 text-[#755d52]">
                Use these searches when you
                already know the exact position
                of one letter in a five-letter
                word.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/5-letter-words-with-a-in-second-position"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  A in Second Position
                </Link>

                <Link
                  href="/5-letter-words-with-e-in-fifth-position"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  E in Fifth Position
                </Link>

                <Link
                  href="/5-letter-words-with-r-in-third-position"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  R in Third Position
                </Link>

                <Link
                  href="/5-letter-words-with-o-in-second-position"
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
                >
                  O in Second Position
                </Link>
              </div>
            </>
          )}

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            Browse Words by Length
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {[4, 5, 6, 7, 8].map((length) => (
              <Link
                key={length}
                href={`/${length}-letter-words`}
                className={`rounded-full border-2 px-5 py-3 font-black ${
                  length === wordLength
                    ? "border-[#ef9b4a] bg-[#f4a24a] text-white"
                    : "border-[#efc89f] bg-[#fff4e6] text-[#9a5830] hover:bg-[#ffe9d0]"
                }`}
              >
                {length} Letter Words
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            More TootieWords Tools
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/word-unscrambler"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Word Unscrambler
            </Link>

            <Link
              href="/anagram-solver"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Anagram Solver
            </Link>

            <Link
              href="/words-from-letters"
              className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 font-black text-[#9a5830] hover:bg-[#ffe9d0]"
            >
              Words From Letters
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}