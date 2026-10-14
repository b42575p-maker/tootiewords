import GuideLayout, {
  H2,
  H3,
  P,
  List,
  Words,
  Table,
  TryTool,
} from "@/components/GuideLayout";
import { guideMetadata } from "@/lib/guides";

const slug = "best-wordle-starting-words";

export const metadata = guideMetadata(slug);

export default function BestWordleStartingWordsGuide() {
  return (
    <GuideLayout
      slug={slug}
      title="Best Wordle Starting Words"
      intro="A good first guess doesn't need luck. It needs the right letters. We counted every letter in 1,823 common five-letter words to find which letters matter most, where they tend to sit, and which opening words uncover the most."
      updated="2026-10-14"
    >
      <H2>The Short Answer</H2>
      <P>
        If you just want a strong opener, try <strong>STARE</strong>,{" "}
        <strong>RAISE</strong>, <strong>AROSE</strong>, or{" "}
        <strong>SLATE</strong>. In our count, each of these finds close to two
        letters of a typical answer on the very first guess. The rest of this
        guide explains why, and how to pick a second word that covers the
        letters your opener missed.
      </P>

      <H2>How We Counted</H2>
      <P>
        We started with the five-letter words in the TootieWords word list
        that also appear in our everyday-English frequency data, and left out
        names, places, and brands. We also removed simple plurals and -S verb
        forms such as CARTS or MAKES, since daily five-letter puzzles rarely
        use them as answers. That left 1,823 familiar five-letter words.
      </P>
      <P>
        For each letter, we counted how many of those words contain it and how
        often it appears in each of the five spots. These numbers describe
        everyday five-letter words in general. They are not a copy of any
        game&apos;s official answer list.
      </P>

      <H2>The Most Useful Letters</H2>
      <P>
        Nearly half of all common five-letter words contain an E. After that,
        A and R are the strongest letters, followed by a tight group of O, T,
        I, S, L, and N.
      </P>
      <Table
        caption="Share of common five-letter words containing each letter"
        headers={["Letter", "Words containing it"]}
        rows={[
          ["E", "49.6%"],
          ["A", "40.8%"],
          ["R", "37.0%"],
          ["O", "29.9%"],
          ["T", "29.2%"],
          ["I", "28.6%"],
          ["S", "27.4%"],
          ["L", "25.6%"],
          ["N", "24.4%"],
          ["D", "19.7%"],
        ]}
      />
      <P>
        At the other end, Q (1.0%), J (1.1%), Z (1.4%), and X (2.1%) each show
        up in only a handful of answers. Spending an early guess on them
        almost never pays off.
      </P>

      <H2>Where Letters Like to Sit</H2>
      <P>
        Knowing that a letter is common is only half the story. Each position
        in a five-letter word has its own favorites:
      </P>
      <Table
        caption="Most common letters in each position of common five-letter words"
        headers={["Position", "Most common letters"]}
        rows={[
          ["1st", "S 15.4%, C 8.1%, B 7.7%, T 6.7%, F 6.6%"],
          ["2nd", "A 14.6%, O 13.7%, R 11.6%, E 10.6%, I 9.9%"],
          ["3rd", "A 12.8%, I 10.9%, O 9.5%, R 7.6%, E 7.5%"],
          ["4th", "E 17.6%, N 8.2%, I 7.3%, S 7.0%, R 6.9%"],
          ["5th", "E 18.4%, Y 12.5%, T 9.9%, D 9.5%, R 8.8%"],
        ]}
      />
      <List>
        <li>
          <strong>S is the top opening letter</strong>, starting roughly 15%
          of common five-letter words even with plurals removed.
        </li>
        <li>
          <strong>Vowels cluster in the middle.</strong> A, O, and I dominate
          the second and third spots.
        </li>
        <li>
          <strong>E loves the end.</strong> It is the most common letter in
          both the fourth and fifth positions.
        </li>
        <li>
          <strong>Y is a strong final letter.</strong> About one in eight
          common five-letter words ends in Y.
        </li>
      </List>

      <H2>How the Popular Openers Compare</H2>
      <P>
        We scored each opener two ways. <strong>Letters found</strong> is the
        average number of its letters that appear somewhere in a typical
        answer (yellow or green tiles). <strong>Right spot</strong> is the
        average number of letters that land in exactly the right position
        (green tiles).
      </P>
      <Table
        caption="Average letters found and letters in the right spot for popular starting words"
        headers={["Opener", "Letters found", "Right spot"]}
        rows={[
          ["AROSE", "1.85", "0.52"],
          ["STARE", "1.84", "0.57"],
          ["RAISE", "1.83", "0.55"],
          ["ARISE", "1.83", "0.54"],
          ["LATER", "1.82", "0.51"],
          ["SNARE", "1.79", "0.57"],
          ["CRATE", "1.75", "0.57"],
          ["TRACE", "1.75", "0.56"],
          ["SLATE", "1.73", "0.60"],
          ["CRANE", "1.70", "0.59"],
          ["ADIEU", "1.55", "0.35"],
          ["AUDIO", "1.35", "0.27"],
        ]}
      />

      <H3>What the numbers say</H3>
      <List>
        <li>
          <strong>AROSE, STARE, and RAISE</strong> find the most letters
          overall because they pack in E, A, R, S, and one more top letter.
        </li>
        <li>
          <strong>STARE</strong> is the best all-rounder in our count, near the
          top for letters found and strong for right spot.
        </li>
        <li>
          <strong>SLATE and CRANE</strong> find slightly fewer letters but
          place more of them correctly, thanks to S or C up front and E at the
          end.
        </li>
        <li>
          <strong>ADIEU and AUDIO</strong> are popular because they test four
          vowels at once, but they trail every consonant-balanced opener.
          U is in only 16% of common five-letter words, and most answers have
          just one or two vowels.
        </li>
      </List>

      <H2>Pick a Second Word That Fills the Gaps</H2>
      <P>
        If your opener comes back mostly gray, a second word with five new
        letters often teaches you more than a guess that reuses the first
        one&apos;s letters. Here are strong follow-ups from our count:
      </P>
      <Table
        caption="Suggested second guesses that use five new letters"
        headers={["If you open with", "Try next", "Also good"]}
        rows={[
          ["SLATE", "RHINO", "IRONY"],
          ["CRANE", "HOIST", "SOLID"],
          ["STARE", "LOGIN", "CLOUD"],
          ["RAISE", "CLOTH", "DONUT"],
        ]}
      />
      <P>
        Together, SLATE and RHINO test all nine of the most common letters
        in our count (E, A, R, O, T, I, S, L, and N) plus H, in just two
        guesses.
      </P>

      <H2>More Patterns Worth Knowing</H2>
      <List>
        <li>
          <strong>Repeated letters are common.</strong> About 31.5% of common
          five-letter words use at least one letter twice, as in SPEED or
          LEVEL. If you are stuck, consider a double.
        </li>
        <li>
          <strong>Most words have two vowels.</strong> 61.5% have exactly two
          of A, E, I, O, and U, and 28.8% have only one. Just 9.2% have three.
        </li>
        <li>
          <strong>Check the ending.</strong> 18.4% of common five-letter words
          end in E and 12.5% end in Y.
        </li>
      </List>

      <TryTool
        href="/5-letter-words"
        label="Open the 5 Letter Word Finder"
        text="Have some green and yellow letters already? Enter them in the 5 Letter Word Finder to see every common word that still fits, with letters in exact positions, letters to include, and letters to exclude."
      />

      <p className="mt-10 border-t border-[#f0ded0] pt-6 text-sm leading-6 text-[#92796d]">
        Wordle is a trademark of The New York Times Company. TootieWords is an
        independent site and is not affiliated with or endorsed by The New
        York Times. This guide is based on our own analysis of common English
        words, not on any official answer list.
      </p>
    </GuideLayout>
  );
}
