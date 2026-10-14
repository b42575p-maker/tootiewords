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

const slug = "how-to-unscramble-letters";

export const metadata = guideMetadata(slug);

export default function HowToUnscrambleLettersGuide() {
  return (
    <GuideLayout
      slug={slug}
      title="How to Unscramble Letters"
      intro="Staring at a jumble of tiles rarely works. Breaking the letters into familiar chunks does. Here are the techniques that help most, backed by letter patterns we counted across more than 19,000 common English words."
      updated="2026-10-14"
    >
      <H2>Why Chunks Beat Staring</H2>
      <P>
        English words are built from repeating pieces: endings like -ING and
        -ED, starts like RE- and CON-, and letter pairs like TH and ST. Once
        you pull a familiar chunk out of your letters, the rest gets much
        shorter and easier to rearrange. To see which chunks matter most, we
        looked at 19,258 common words of four letters or more from the
        TootieWords word list.
      </P>

      <H2>Step 1: Pull Off a Common Ending</H2>
      <P>
        Endings are the fastest win because so many words share them. In our
        count:
      </P>
      <Table
        caption="Most common word endings among common English words of four or more letters"
        headers={["Ending", "Share of common words"]}
        rows={[
          ["-ED", "9.9%"],
          ["-ING", "8.2%"],
          ["-ES", "6.8%"],
          ["-ER", "4.1%"],
          ["-ION", "3.6%"],
          ["-LY", "3.0%"],
        ]}
      />
      <P>
        If your letters include I, N, and G, set them aside as -ING and work
        with what is left. Have an E and a D? Try -ED. An S can often go on
        the end of a word you have already found.
      </P>

      <H3>Worked example: T G N R I A E</H3>
      <List>
        <li>
          Spot I, N, and G and set them aside as <strong>-ING</strong>.
        </li>
        <li>
          That leaves T, R, A, and E, which make <strong>TEAR</strong>.
        </li>
        <li>
          Put them together: <strong>TEARING</strong>.
        </li>
        <li>
          Then shuffle the full set to find the other seven-letter answers.
        </li>
      </List>
      <Words words={["tearing", "granite", "ingrate", "tangier", "gratine"]} />
      <P>
        All five use exactly the same seven letters. Finding one word first
        often makes the others easier to see.
      </P>

      <H2>Step 2: Try a Common Start</H2>
      <P>
        Prefixes work the same way at the front of a word. The most common
        opening letter pairs in our count are CO (5.0% of common words), RE
        (4.1%), and IN (3.0%). The most common three-letter starts are CON,
        PRO, COM, and DIS.
      </P>
      <P>
        If you have R and E, try putting RE- in front and unscrambling the
        rest. With C, O, and N, test CON-.
      </P>

      <H2>Step 3: Look for Letter Pairs That Stick Together</H2>
      <P>
        Some pairs show up again and again inside words. The most frequent
        pairs in our count are:
      </P>
      <Table
        caption="Most common two-letter pairs inside common English words"
        headers={["Pair", "Share of words containing it"]}
        rows={[
          ["IN", "16.6%"],
          ["ER", "13.6%"],
          ["TI", "11.7%"],
          ["ES", "11.5%"],
          ["RE", "11.3%"],
          ["ED", "11.2%"],
          ["ON", "10.9%"],
          ["TE", "10.3%"],
          ["NG", "10.1%"],
          ["AT", "9.6%"],
        ]}
      />
      <P>
        Consonant teams like <strong>TH</strong>, <strong>CH</strong>,{" "}
        <strong>SH</strong>, <strong>ST</strong>, and <strong>NG</strong> act
        almost like single letters. Grouping them early cuts down the number
        of pieces you need to arrange.
      </P>

      <H2>Step 4: Alternate Vowels and Consonants</H2>
      <P>
        Write your vowels and consonants in two separate rows, then try
        building a word that alternates between them. Most short English
        words follow a loose consonant-vowel rhythm, such as CA-BIN or
        TI-GER. Long runs of consonants are rare unless they form a team like
        STR or NGTH.
      </P>

      <H2>Step 5: Build Small, Then Grow</H2>
      <List>
        <li>
          Find any short word in your letters, even just three letters long.
        </li>
        <li>
          Try adding one leftover letter at a time to the front, the end, or
          the middle.
        </li>
        <li>
          Physically shuffle the letters (or write them in a circle) to break
          your brain&apos;s first impression.
        </li>
        <li>
          Say possible chunks out loud. Your ear often catches a word your
          eyes miss.
        </li>
      </List>

      <H2>When You&apos;re Truly Stuck</H2>
      <P>
        Sometimes a set of letters hides an uncommon word you would never
        think of. That is where a word unscrambler helps. Enter your letters
        and it lists every word they can make, with exact anagrams (words that
        use every letter) shown first.
      </P>

      <TryTool
        href="/word-unscrambler"
        label="Open the Word Unscrambler"
        text="Type your letters into the TootieWords Word Unscrambler to see every word they make, from exact anagrams down to short words, with filters for length, starting letters, and ending letters."
      />
    </GuideLayout>
  );
}
