import Link from "next/link";

import words from "an-array-of-english-words";
import wordFrequencyData from "../data/wordfreq-en-25000-log.json";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordListFinder from "@/components/WordListFinder";

type FrequencyEntry = [string, number];

type WordLengthPageProps = {
  wordLength: number;
};

type LengthContent = {
  intro: string;
  sectionTitle: string;
  sectionText: string;
  strategyTitle: string;
  strategyText: string;
  exampleTitle: string;
  exampleText: string;
};

const frequencyEntries =
  wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

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

function getLengthContent(
  wordLength: number
): LengthContent {
  switch (wordLength) {
    case 4:
      return {
        intro:
          "Browse 4-letter words and narrow the list using the clues you already have. Search by starting or ending letters, require certain letters, exclude letters that cannot appear, or fill in exact positions.",
        sectionTitle:
          "Working With Four-Letter Words",
        sectionText:
          "With only four positions to fill, even one or two known letters can make a big difference. A known first letter immediately fixes one quarter of the pattern, while a known beginning and ending can leave only the two middle positions unresolved.",
        strategyTitle:
          "Use Short Patterns to Your Advantage",
        strategyText:
          "Start with the strongest clue you have. If you know an exact position, enter it first. Then add any letters that must appear and exclude letters you have already ruled out. Because the word is short, combining just a few clues can reduce the possibilities quickly.",
        exampleTitle:
          "Example Four-Letter Search",
        exampleText:
          "Suppose you need a four-letter word that begins with S and contains A. Set Starts With to S and Contains to A. If you also know that the word cannot use T or R, add those to Exclude Letters. Each clue removes possibilities without requiring you to guess the entire word.",
      };

    case 5:
      return {
        intro:
          "Browse 5-letter words and combine starting letters, endings, included or excluded letters, and exact positions to narrow a large list into more useful possibilities.",
        sectionTitle:
          "Finding Five-Letter Words",
        sectionText:
          "Five-letter searches become much easier when you separate what you know from what you have ruled out. A letter may be confirmed in an exact position, known to appear somewhere else, or known not to appear at all. TootieWords lets you use those clues together instead of searching them one at a time.",
        strategyTitle:
          "Combine Known Positions With Eliminated Letters",
        strategyText:
          "Enter letters with confirmed positions first. Next, use Contains for letters that belong in the word but whose positions are uncertain. Finally, use Exclude Letters for letters that cannot be part of the answer. Combining all three types of information is usually more useful than relying on a single filter.",
        exampleTitle:
          "Example Five-Letter Search",
        exampleText:
          "Imagine you know the second letter is A, the word also contains R, and it cannot contain E, I, or O. Put A in position two, enter R in Contains, and add EIO to Exclude Letters. The finder will keep only words that satisfy all of those clues at the same time.",
      };

    case 6:
      return {
        intro:
          "Explore 6-letter words and narrow the results with known beginnings, endings, included letters, excluded letters, and exact letter positions.",
        sectionTitle:
          "Solving Six-Letter Patterns",
        sectionText:
          "Six-letter words leave more possible arrangements than shorter words, so combining clues becomes increasingly valuable. A partial beginning or ending can identify a useful word pattern, while known internal letters help distinguish between words that share that pattern.",
        strategyTitle:
          "Build the Pattern From the Outside In",
        strategyText:
          "When you know part of the beginning or ending, enter that information before adding individual internal letters. Prefixes and endings can eliminate large groups of words at once. After that, use exact positions or Contains to refine the remaining possibilities.",
        exampleTitle:
          "Example Six-Letter Search",
        exampleText:
          "If you need a six-letter word beginning with C and ending in ER, enter C in Starts With and ER in Ends With. If you also know the word contains an A, add A to Contains. You can continue adding clues until the result list becomes manageable.",
      };

    case 7:
      return {
        intro:
          "Search 7-letter words by combining partial patterns with exact letter positions, required letters, and letters you want to eliminate.",
        sectionTitle:
          "Narrowing Seven-Letter Words",
        sectionText:
          "Seven positions allow many possible letter combinations, so broad searches can produce a long list. The most effective approach is usually to combine different kinds of clues rather than depending on one known letter.",
        strategyTitle:
          "Layer Several Clues Together",
        strategyText:
          "Begin with any confirmed starting or ending sequence. Add exact-position letters when you know them, then use Contains for letters that can appear in more than one possible position. Excluding impossible letters provides another useful layer and can remove many otherwise plausible matches.",
        exampleTitle:
          "Example Seven-Letter Search",
        exampleText:
          "Suppose you need a seven-letter word beginning with P, containing L and A, and ending in G. Enter P in Starts With, LA in Contains, and G in Ends With. If another letter has already been ruled out, add it to Exclude Letters to tighten the search further.",
      };

    case 8:
      return {
        intro:
          "Browse 8-letter words and use multiple filters together to turn a broad search into a focused list of matching possibilities.",
        sectionTitle:
          "Working With Longer Eight-Letter Words",
        sectionText:
          "Eight-letter searches often benefit from looking for larger pieces of the pattern. A two- or three-letter beginning, a recognizable ending, or several confirmed positions can be more informative than testing isolated letters individually.",
        strategyTitle:
          "Use Larger Known Pieces First",
        strategyText:
          "If you know a sequence of letters at the beginning or end, enter the whole sequence rather than only one letter. Then add internal letters and exact positions. Longer words provide more places for letters to occur, so combining filters helps prevent the result list from staying unnecessarily broad.",
        exampleTitle:
          "Example Eight-Letter Search",
        exampleText:
          "If an eight-letter word starts with RE and you know it also contains A and T, begin with RE in Starts With and AT in Contains. Add an ending or exact-position clue if you have one. Each additional confirmed detail makes the search more specific.",
      };

    default:
      return {
        intro: `Browse ${wordLength}-letter words and narrow the list using starting letters, endings, included letters, excluded letters, and exact positions.`,
        sectionTitle: `Finding ${wordLength}-Letter Words`,
        sectionText:
          "Use the clues you already know to reduce the number of possible matches.",
        strategyTitle:
          "Combine Your Strongest Clues",
        strategyText:
          "Start with confirmed positions or letter sequences, then add required and excluded letters to narrow the results.",
        exampleTitle:
          "Refine Your Search",
        exampleText:
          "Add clues one at a time and watch the result list become more focused.",
      };
  }
}

export default function WordLengthPage({
  wordLength,
}: WordLengthPageProps) {
  const matchingWords =
    getWordsByLength(wordLength);

  const content =
    getLengthContent(wordLength);

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Tootie&apos;s Word Helper
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          {wordLength} Letter Words
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          {content.intro}
        </p>
      </section>

      <WordListFinder
        words={matchingWords}
        wordLength={wordLength}
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            {content.sectionTitle}
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            {content.sectionText}
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            {content.strategyTitle}
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            {content.strategyText}
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            {content.exampleTitle}
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            {content.exampleText}
          </p>

          <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
            How the Filters Work
          </h2>

          <p className="mt-4 leading-8 text-[#755d52]">
            <strong>Starts With</strong> keeps words
            that begin with the letters you enter.{" "}
            <strong>Ends With</strong> does the same
            for the end of the word.{" "}
            <strong>Contains</strong> requires the
            letters you enter to appear somewhere
            in the word, while{" "}
            <strong>Exclude Letters</strong> removes
            words containing letters you know cannot
            be used. Exact-position boxes are useful
            when you already know where a particular
            letter belongs.
          </p>

          {wordLength === 5 && (
            <>
              <h2 className="mt-10 text-2xl font-black text-[#4a2e25]">
                Popular 5-Letter Word Searches
              </h2>

              <p className="mt-4 leading-8 text-[#755d52]">
                If you already know part of the
                five-letter pattern, start with one
                of these more focused searches. Each
                page opens with that clue already
                applied so you can add the remaining
                information you know.
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
                Search by Exact Letter Position
              </h2>

              <p className="mt-4 leading-8 text-[#755d52]">
                Exact-position searches are useful
                when a clue tells you not only which
                letter belongs in the word, but
                exactly where it belongs. Start with
                that fixed position and then combine
                it with other known or excluded
                letters.
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

          <p className="mt-4 leading-8 text-[#755d52]">
            Looking for a different word length?
            Jump directly to another list and use
            the same filters to narrow its results.
          </p>

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

          <p className="mt-4 leading-8 text-[#755d52]">
            If word length is not your main clue,
            try one of the broader TootieWords
            tools. You can unscramble a set of
            letters, look for anagrams, or find
            words that can be made from the letters
            you have available.
          </p>

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
