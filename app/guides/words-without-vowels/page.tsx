import GuideLayout, {
  H2,
  H3,
  P,
  List,
  Words,
  TryTool,
} from "@/components/GuideLayout";
import { guideMetadata } from "@/lib/guides";

const slug = "words-without-vowels";

export const metadata = guideMetadata(slug);

export default function WordsWithoutVowelsGuide() {
  return (
    <GuideLayout
      slug={slug}
      title="Words Without Vowels"
      intro="Every English word needs a vowel, right? Not quite. Our word list has 181 words of two or more letters with no A, E, I, O, or U. Here's how they manage it, and how to use them when your tile rack is all consonants."
      updated="2026-10-14"
    >
      <H2>How a Word Gets By Without A, E, I, O, or U</H2>
      <P>
        Most vowel-free words aren&apos;t breaking the rules. They use another
        letter to do a vowel&apos;s job. In our list, 149 of the 181
        vowel-free words rely on <strong>Y</strong>, which can sound like the
        I in MY or the I in GYM. The other 32 get by in three ways:
      </P>
      <List>
        <li>
          <strong>Sound words</strong> that spell out a noise, such as HMM,
          SHH, PSST, BRR, PFFT, and ZZZ.
        </li>
        <li>
          <strong>Welsh borrowings</strong> where W is a vowel. CWM (a bowl-
          shaped valley) is pronounced roughly &quot;koom,&quot; and CRWTH is
          an old stringed instrument.
        </li>
        <li>
          <strong>Abbreviation-style words</strong> such as NTH, as in
          &quot;to the nth degree.&quot;
        </li>
      </List>

      <H2>Everyday Words With Y Doing the Work</H2>
      <P>
        These are the vowel-free words you already use. All of them appear in
        our everyday-English frequency data:
      </P>
      <Words
        words={["by", "my", "why", "try", "fly", "dry", "sky", "cry", "gym", "spy", "shy", "fry", "sly", "myth", "hymn", "sync", "rhythm", "crypt", "psych", "lymph", "synth"]}
      />

      <H3>Longer vowel-free words</H3>
      <P>
        The longest entries in our list are seven letters long:
        RHYTHMS and TSKTSKS (the sound of repeated tutting). Six-letter
        options include:
      </P>
      <Words words={["glyphs", "nymphs", "crypts", "lymphs", "myrrhs", "tsktsk"]} />

      <H2>The Rare Words With No Y Either</H2>
      <P>
        Only 32 entries in our list avoid A, E, I, O, U, <em>and</em> Y. Most
        are sounds or Welsh words:
      </P>
      <Words
        words={["hm", "mm", "sh", "brr", "cwm", "hmm", "nth", "pst", "shh", "tsk", "zzz", "psst", "pfft", "grrl", "crwth", "cwtch"]}
      />
      <P>
        Plurals and longer spellings such as BRRR, GRRRL, CWMS, and TSKS make
        up the rest.
      </P>

      <H2>Tips for Word Games</H2>
      <List>
        <li>
          <strong>Look for a Y first.</strong> With a Y on your rack, words
          like SHY, SPY, GYM, MYTH, and HYMN can clear out consonants without
          waiting for a vowel.
        </li>
        <li>
          <strong>Remember the two-letter sounds.</strong> HM, MM, and SH can
          squeeze into tight spots on a crowded board.
        </li>
        <li>
          <strong>Keep CWM and CRWTH in your back pocket.</strong> They are
          famous among word-game players precisely because they look
          impossible.
        </li>
        <li>
          <strong>Use RHYTHM-style words to dump hard letters.</strong>{" "}
          RHYTHM, PSYCH, and LYMPH each use four or more consonants at once.
        </li>
        <li>
          <strong>Check your game&apos;s dictionary.</strong> Sound words and
          Welsh borrowings are accepted in some games and not others, and
          spellings like PST versus PSST can vary.
        </li>
      </List>

      <TryTool
        href="/words-with-no-vowels"
        label="Search Words With No Vowels"
        text="Use the Words With No Vowels finder to filter all 181 entries by length, starting letters, ending letters, and letters you have."
      />
    </GuideLayout>
  );
}
