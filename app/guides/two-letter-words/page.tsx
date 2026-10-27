import GuideLayout, {
  H2,
  H3,
  P,
  List,
  Words,
  Table,
  TryTool,
} from "@/components/GuideLayout";
import Link from "next/link";

import { guideMetadata } from "@/lib/guides";

const slug = "two-letter-words";

export const metadata = guideMetadata(slug);

const wordsByLetter: [string, string[]][] = [
  ["A", ["aa", "ab", "ad", "ae", "ag", "ah", "ai", "al", "am", "an", "ar", "as", "at", "aw", "ax", "ay"]],
  ["B", ["ba", "be", "bi", "bo", "by"]],
  ["C", ["ch"]],
  ["D", ["da", "de", "di", "do"]],
  ["E", ["ea", "ed", "ee", "ef", "eh", "el", "em", "en", "er", "es", "et", "ex"]],
  ["F", ["fa", "fe", "fy"]],
  ["G", ["gi", "go", "gu"]],
  ["H", ["ha", "he", "hi", "hm", "ho"]],
  ["I", ["id", "if", "in", "io", "is", "it"]],
  ["J", ["ja", "jo"]],
  ["K", ["ka", "ki", "ko", "ky"]],
  ["L", ["la", "li", "lo"]],
  ["M", ["ma", "me", "mi", "mm", "mo", "mu", "my"]],
  ["N", ["na", "ne", "no", "nu", "ny"]],
  ["O", ["ob", "od", "oe", "of", "oh", "oi", "om", "on", "oo", "op", "or", "os", "ou", "ow", "ox", "oy"]],
  ["P", ["pa", "pe", "pi", "po"]],
  ["Q", ["qi"]],
  ["R", ["re"]],
  ["S", ["sh", "si", "so", "st"]],
  ["T", ["ta", "te", "ti", "to"]],
  ["U", ["ug", "uh", "um", "un", "up", "ur", "us", "ut"]],
  ["W", ["we", "wo"]],
  ["X", ["xi", "xu"]],
  ["Y", ["ya", "ye", "yo", "yu"]],
  ["Z", ["za", "zo"]],
];

export default function TwoLetterWordsGuide() {
  return (
    <GuideLayout
      slug={slug}
      title="Two-Letter Words Every Player Should Know"
      intro="Two-letter words are the secret weapon of crossword-style tile games. They let you squeeze plays into tight spots, score in two directions at once, and dump awkward letters. Here is every two-letter word in our list, plus the ones worth memorizing first."
      updated="2026-10-26"
    >
      <H2>Why Two-Letter Words Matter</H2>
      <P>
        Long words get the glory, but two-letter words win games. When you
        place a tile next to another word, every new pair of letters it forms
        has to be a real word. Knowing which pairs are allowed opens up
        parallel plays, where a single word lays alongside another and scores
        several small words at the same time.
      </P>

      <H2>Two-Letter Words by the Numbers</H2>
      <List>
        <li>
          Our word list has <strong>124</strong> two-letter words. We left out
          a handful of abbreviations, such as UK and SJ, that most games
          don&apos;t accept.
        </li>
        <li>
          Every letter of the alphabet starts at least one two-letter word
          except <strong>V</strong>.
        </li>
        <li>
          <strong>A</strong> and <strong>O</strong> are the most flexible
          starting letters, with 16 two-letter words each.
        </li>
        <li>
          <strong>C</strong>, <strong>Q</strong>, and <strong>R</strong> start
          only one each: CH, QI, and RE.
        </li>
      </List>

      <H2>Start With the Everyday Ones</H2>
      <P>
        You already know these. They are among the most common words in
        English, so you will rarely have to wonder whether they count:
      </P>
      <Words
        words={["am", "an", "as", "at", "be", "by", "do", "go", "he", "hi", "if", "in", "is", "it", "me", "my", "no", "of", "oh", "on", "or", "so", "to", "up", "us", "we"]}
      />

      <H2>High-Scoring Letters: J, Q, X, and Z</H2>
      <P>
        These are the two-letter words to memorize first. In many tile games,
        J, Q, X, and Z are worth 8 to 10 points each, so a two-letter play on
        a bonus square can outscore a much longer word.
      </P>
      <Table
        caption="Two-letter words that use J, Q, X, or Z"
        headers={["Letter", "Words", "Tip"]}
        rows={[
          ["Q", "QI", "The best-known way to play a Q without a U."],
          ["X", "AX, EX, OX, XI, XU", "X pairs with almost every vowel, so it is easy to place."],
          ["Z", "ZA, ZO", "ZA is a casual word for pizza."],
          ["J", "JO, JA", "JO is the safer choice; JA is accepted in fewer games."],
        ]}
      />
      <Words words={["qi", "ax", "ex", "ox", "xi", "xu", "za", "zo", "jo", "ja"]} />

      <H2>All-Vowel Words for a Vowel-Heavy Rack</H2>
      <P>
        Stuck with too many vowels? These two-letter words use no consonants
        at all, so they help you clear your rack without wasting a turn:
      </P>
      <Words words={["aa", "ae", "ai", "ea", "ee", "io", "oe", "oi", "oo", "ou"]} />
      <P>
        AA (a type of lava), AI (a three-toed sloth), and OE (a whirlwind)
        are the most widely accepted.
      </P>

      <H2>No-Vowel Words for a Consonant-Heavy Rack</H2>
      <P>
        The opposite problem has answers too. These use no A, E, I, O, or U:
      </P>
      <Words words={["by", "my", "hm", "mm", "sh", "ch", "fy", "ky", "ny", "st"]} />
      <P>
        BY and MY are everyday words. HM, MM, and SH are sounds, and the rest
        are less common, so check that your game accepts them. Our{" "}
        <Link
          href="/guides/words-without-vowels"
          className="font-bold text-[#d8617f] underline decoration-[#ef9ab2] underline-offset-4"
        >
          guide to words without vowels
        </Link>{" "}
        has longer options.
      </P>

      <H2>Sounds and Exclamations</H2>
      <P>
        Many two-letter words are just sounds people make. They are easy to
        forget because they rarely appear in writing:
      </P>
      <Words words={["ah", "aw", "eh", "ha", "hm", "mm", "oh", "oi", "ow", "sh", "uh", "um"]} />

      <H2>Every Two-Letter Word, A to Z</H2>
      <P>
        Here is the complete list from our word list, grouped by first
        letter. Click any word to copy it.
      </P>
      {wordsByLetter.map(([letter, list]) => (
        <div key={letter}>
          <H3>
            {letter} ({list.length})
          </H3>
          <Words words={list} />
        </div>
      ))}

      <H2>Tips for Learning Them</H2>
      <List>
        <li>
          <strong>Learn by vowel.</strong> Most two-letter words are a vowel
          plus one other letter. Run through each vowel and ask which letters
          can go before and after it.
        </li>
        <li>
          <strong>Memorize the high-scorers first.</strong> QI, ZA, XI, XU,
          and JO give the biggest payoff for the least effort.
        </li>
        <li>
          <strong>Check your game.</strong> Every game uses its own
          dictionary, so a few words here may not be accepted everywhere.
        </li>
      </List>

      <TryTool
        href="/words-from-letters"
        label="Find Words From Your Letters"
        text="Have a rack full of letters? Enter them in Words From Letters to see every word of three or more letters you can make, then use the list above for your two-letter plays."
      />
    </GuideLayout>
  );
}
