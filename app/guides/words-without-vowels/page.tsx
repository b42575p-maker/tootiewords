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
      updated="2026-11-12"
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

      <H2>Common Questions About Words Without Vowels</H2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there an English word with no vowels?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. If you count Y as a consonant, words like RHYTHM, GYM, MYTH, CRYPT, and SHY have no A, E, I, O, or U. A few words skip Y too, such as HMM, SHH, PSST, NTH, and the Welsh borrowings CWM and CRWTH."}}, {"@type": "Question", "name": "How many words have no vowels?", "acceptedAnswer": {"@type": "Answer", "text": "Our word list of about 275,000 words has 181 words of two or more letters with no A, E, I, O, or U. Of those, 149 use Y as a vowel and only 32 have no Y either."}}, {"@type": "Question", "name": "What words have no vowels other than Y?", "acceptedAnswer": {"@type": "Answer", "text": "Words with no A, E, I, O, U, or Y are rare. The best known are CWM (a bowl-shaped valley) and CRWTH (an old stringed instrument), where W acts as a vowel, plus sound words like HMM, SHH, PSST, BRR, PFFT, and TSK, and NTH."}}, {"@type": "Question", "name": "What 5-letter words have no vowels?", "acceptedAnswer": {"@type": "Answer", "text": "Common 5-letter words without A, E, I, O, or U include CRYPT, GLYPH, LYMPH, NYMPH, PSYCH, PYGMY, SYNTH, TRYST, MYRRH, SYLPH, DRYLY, SHYLY, SLYLY, and WRYLY. All of them use Y as a vowel."}}, {"@type": "Question", "name": "What is the longest word with no vowels?", "acceptedAnswer": {"@type": "Answer", "text": "In our word list, the longest are seven letters: RHYTHMS and TSKTSKS. Among six-letter words, RHYTHM and SYZYGY are well-known examples."}}, {"@type": "Question", "name": "Is Y a vowel?", "acceptedAnswer": {"@type": "Answer", "text": "Sometimes. Y acts as a consonant at the start of words like YES and YARN, and as a vowel in words like GYM, MY, and RHYTHM, where it makes an I or E sound. That is why most words without A, E, I, O, or U still contain a Y."}}]}),
        }}
      />
      <div className="mt-6 space-y-4">
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">Is there an English word with no vowels?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">Yes. If you count Y as a consonant, words like RHYTHM, GYM, MYTH, CRYPT, and SHY have no A, E, I, O, or U. A few words skip Y too, such as HMM, SHH, PSST, NTH, and the Welsh borrowings CWM and CRWTH.</p>
          </div>
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">How many words have no vowels?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">Our word list of about 275,000 words has 181 words of two or more letters with no A, E, I, O, or U. Of those, 149 use Y as a vowel and only 32 have no Y either.</p>
          </div>
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">What words have no vowels other than Y?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">Words with no A, E, I, O, U, or Y are rare. The best known are CWM (a bowl-shaped valley) and CRWTH (an old stringed instrument), where W acts as a vowel, plus sound words like HMM, SHH, PSST, BRR, PFFT, and TSK, and NTH.</p>
          </div>
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">What 5-letter words have no vowels?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">Common 5-letter words without A, E, I, O, or U include CRYPT, GLYPH, LYMPH, NYMPH, PSYCH, PYGMY, SYNTH, TRYST, MYRRH, SYLPH, DRYLY, SHYLY, SLYLY, and WRYLY. All of them use Y as a vowel.</p>
          </div>
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">What is the longest word with no vowels?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">In our word list, the longest are seven letters: RHYTHMS and TSKTSKS. Among six-letter words, RHYTHM and SYZYGY are well-known examples.</p>
          </div>
          <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
            <h3 className="text-lg font-black text-[#4a2e25]">Is Y a vowel?</h3>
            <p className="mt-2 leading-7 text-[#5f4a40]">Sometimes. Y acts as a consonant at the start of words like YES and YARN, and as a vowel in words like GYM, MY, and RHYTHM, where it makes an I or E sound. That is why most words without A, E, I, O, or U still contain a Y.</p>
          </div>
      </div>

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
