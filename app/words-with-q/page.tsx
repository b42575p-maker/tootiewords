import type { Metadata } from "next";
import Link from "next/link";

import words from "an-array-of-english-words";
import { commonWordFrequencies as wordFrequencyData } from "@/lib/word-frequencies";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecialtyWordFinder from "@/components/SpecialtyWordFinder";

type FrequencyEntry = [string, number];

const frequencyEntries =
  wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

function getAllWordsWithQ() {
  return words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.includes("q")
    )
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index
    )
    .sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return a.localeCompare(b);
    });
}

function getCommonWordsWithQ() {
  return getAllWordsWithQ()
    .filter((word) =>
      frequencies.has(word)
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

const title = "Words With Q – 4,165 Q Words & Finder";
const description =
  "Browse 226 common words with Q, like QUITE, QUICK, and SQUARE, or search all 4,165. See where Q shows up, short Q words, and word game tips.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://tootiewords.com/words-with-q",
  },
  openGraph: {
    type: "website",
    url: "https://tootiewords.com/words-with-q",
    siteName: "TootieWords",
    title,
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords Words With Q Finder",
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

const shortWords: [string, string[]][] = [
  ["2 letters", ["QI"]],
  ["3 letters", ["QAT", "QIS", "QUA", "SUQ"]],
  ["4 letters", ["QUIT", "QUIZ", "QUAD", "QUID", "AQUA", "QUAY"]],
  ["5 letters", ["QUITE", "QUICK", "QUEEN", "EQUAL", "QUIET", "SQUAD", "QUOTE", "QUEST", "QUEUE", "QUERY", "QUOTA", "SQUAT", "QUAKE", "EQUIP", "SQUID", "QUILT"]],
];

const faq = [
  {
    q: "How many English words have a Q?",
    a: "Our dictionary has 4,165 words with Q, about 1.5% of all words. Only 226 of them are in our Common Words list, led by QUESTION, QUITE, QUALITY, REQUIRED, and QUICKLY.",
  },
  {
    q: "Is Q always followed by U?",
    a: "Almost always in everyday words: 99.6% of our common Q words follow every Q with a U. The exceptions are mostly borrowed words like QI, QAT, and TRANQ, which have their own list.",
  },
  {
    q: "What is the shortest word with Q?",
    a: "QI, the two-letter word for life energy in Chinese philosophy. It is accepted in Scrabble and is one of the most-played Q words in the game.",
  },
  {
    q: "What 5-letter words have a Q?",
    a: "Common ones include QUITE, QUICK, QUEEN, EQUAL, QUIET, SQUAD, QUOTE, QUEST, QUEUE, and QUERY. Our list has 20 common 5-letter Q words and 106 in the full dictionary.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const pill =
  "font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4]";

const h2 = "mt-10 text-2xl font-black text-[#4a2e25]";
const p = "mt-4 leading-8 text-[#755d52]";

export default function WordsWithQPage() {
  const allWordsWithQ =
    getAllWordsWithQ();

  const commonWordsWithQ =
    getCommonWordsWithQ();

  return (
    <main className="min-h-screen bg-[#fffaf4] text-slate-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className="mx-auto max-w-5xl px-6 pb-7 pt-10 text-center sm:pt-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Tootie&apos;s Specialty Word List
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          Words With Q
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          Q is the rarest letter in most word games, but it hides in plenty of
          everyday words: QUITE, QUICK, SQUARE, UNIQUE, and EQUAL. Browse the
          common ones below or search all 4,165 words with Q.
        </p>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border-2 border-[#efd3ba] bg-white px-5 py-4 text-left">
          <p className="font-hand text-base font-bold text-[#9a5221]">
            🐾 Tootie&apos;s Tip
          </p>
          <p className="mt-1 leading-7 text-[#5f4a40]">
            If you have a Q, you almost certainly have a U right after it. Treat
            QU as a single unit and look for E, A, or I next: those three
            letters follow QU in over 95% of common words.
          </p>
        </div>
      </section>

      <SpecialtyWordFinder
        commonWords={commonWordsWithQ}
        allWords={allWordsWithQ}
        listLabel="words with Q"
      />

      <section className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="whimsy-title text-3xl font-black text-[#4a2e25]">
            Q Words by the Numbers
          </h2>

          <p className="mt-5 leading-8 text-[#755d52]">
            Only about 1.5% of English words contain a Q. Our dictionary has
            4,165 of them, and just 226 are common enough to make our Common
            Words list. Most Q words are long: the biggest group in the full
            dictionary is 9 letters, and there are only 7 common Q words with
            four letters or fewer.
          </p>

          <p className={p}>
            The U rule is strong. In 99.6% of common Q words, every Q is
            followed by a U. Even in the full dictionary, which includes many
            borrowed and technical words, it holds 97.8% of the time.
          </p>

          <h2 className={h2}>Where Q Shows Up in a Word</h2>

          <p className={p}>
            About a third of common Q words start with QU, like QUITE, QUALITY,
            and QUESTION. Another 8% start with SQU: SQUARE, SQUAD, SQUEEZE,
            SQUIRREL, SQUASH, and SQUID.
          </p>

          <p className={p}>
            At the other end, 8% of common Q words finish with the French
            ending -QUE, which sounds like K: UNIQUE, TECHNIQUE, ANTIQUE,
            BOUTIQUE, OPAQUE, PLAQUE, and CRITIQUE. In the middle, watch for
            the ACQ group, where the C is silent: ACQUIRE, ACQUAINT, and ACQUIT.
          </p>

          <p className={p}>
            Words that end in a bare Q are very rare. SUQ (a market), TALAQ,
            UMIAQ (a type of boat), and the slang TRANQ are among the few.
          </p>

          <h2 className={h2}>What Comes After QU?</h2>

          <p className={p}>
            When you know a word has QU, the next letter is almost always a
            vowel. In common words it is E about 35% of the time (QUEEN,
            QUESTION, REQUEST), A 31% (QUALITY, SQUARE, EQUAL), and I 29%
            (QUITE, QUICK, EQUIPMENT). QUO is much rarer, at about 5% (QUOTE,
            QUOTA, LIQUOR).
          </p>

          <h2 className={h2}>Short Q Words Worth Knowing</h2>

          <p className={p}>
            Short Q words are gold in Scrabble and Words With Friends, where Q
            is worth 10 points and there is only one Q tile. These are the
            short ones to remember:
          </p>

          <div className="mt-5 space-y-4">
            {shortWords.map(([label, list]) => (
              <div key={label}>
                <p className="text-sm font-black uppercase tracking-widest text-[#9a5830]">
                  {label}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {list.map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-[#efc89f] bg-[#fffaf4] px-3 py-1 font-bold text-[#6b4938]"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className={p}>
            QI, QAT, QIS, and SUQ are especially handy because they need no U.
            For the full list of those, see{" "}
            <Link href="/words-with-q-without-u" className="font-bold text-[#d8741e] hover:underline">
              words with Q without U
            </Link>
            .
          </p>

          <h2 className={h2}>Q in Wordle and Other Guessing Games</h2>

          <p className={p}>
            Q is rare in five-letter answers. Our Common Words list has only
            20 five-letter Q words, and almost all of them pair Q with U. If a
            guess turns up a Q, put a U right after it and focus on the
            remaining two or three letters. QUEUE is the odd one out: it uses
            U twice and E twice, so it can surprise you late in a game.
          </p>

          <h2 className={h2}>Long and Unusual Q Words</h2>

          <p className={p}>
            The longest common Q words are QUESTIONNAIRES, QUALIFICATIONS, and
            ACQUAINTANCES, each 13 or 14 letters. The full dictionary goes much
            further, with INCONSEQUENTIALITIES at 20 letters and
            HEMIDEMISEMIQUAVERS (a very short musical note) at 19.
          </p>

          <p className={p}>
            A few rare words even use Q twice, such as QUINQUAGENARIAN (someone
            in their fifties).
          </p>

          <h2 className={h2}>Questions About Q Words</h2>

          <dl className="mt-4 space-y-5">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-black text-[#4a2e25]">{q}</dt>
                <dd className="mt-1 leading-8 text-[#755d52]">{a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 rounded-2xl bg-[#fffaf4] px-5 py-4 text-sm leading-7 text-[#8a7166]">
            Counts use Tootie&apos;s Common Words list and full dictionary.
            Switch the finder to All Words to search every Q word. Your word
            game may accept a slightly different list.
          </p>

          <h2 className={h2}>More TootieWords Searches</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/words-with-q-without-u" className={pill}>
              Q Without U
            </Link>
            <Link href="/guides/q-without-u-words" className={pill}>
              Guide: Q Without U Words
            </Link>
            <Link href="/guides/two-letter-words" className={pill}>
              Two-Letter Words
            </Link>
            <Link href="/words-with-no-vowels" className={pill}>
              Words With No Vowels
            </Link>
            <Link href="/5-letter-words" className={pill}>
              5 Letter Words
            </Link>
            <Link href="/word-unscrambler" className={pill}>
              Word Unscrambler
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
