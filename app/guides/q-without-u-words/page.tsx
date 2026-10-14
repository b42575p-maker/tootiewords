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

const slug = "q-without-u-words";

export const metadata = guideMetadata(slug);

export default function QWithoutUWordsGuide() {
  return (
    <GuideLayout
      slug={slug}
      title="Q Without U Words"
      intro="In English, Q almost always travels with U. But our word list of about 275,000 words includes 91 entries where Q stands on its own. Here's where they come from and which ones are worth remembering."
      updated="2026-10-14"
    >
      <H2>Why Q Usually Needs U</H2>
      <P>
        English inherited the QU spelling from Latin and French, so familiar
        words like QUEEN, QUICK, and SQUARE all pair the two letters. Words
        with a Q but no U after it almost always came into English from
        another language, where Q stands for a different sound or a
        different letter entirely.
      </P>
      <P>
        That is also why these words are rare in everyday writing. Of the 91
        entries in our list, only <strong>QI</strong> is common enough to
        appear in our everyday-English frequency data.
      </P>

      <H2>The Short Ones Worth Learning</H2>
      <P>
        Short Q-without-U words are the most useful in word games because
        they fit into tight spaces. Here are the two- to four-letter words in
        our list:
      </P>
      <Words words={["qi", "qat", "qin", "suq", "fiqh", "qadi", "qaid", "qoph", "waqf"]} />

      <H3>Five-letter words</H3>
      <Words
        words={["burqa", "faqir", "guqin", "niqab", "qanat", "qibla", "qorma", "talaq", "tranq", "umiaq"]}
      />

      <H3>Six-letter words</H3>
      <Words
        words={["buqsha", "qabala", "qasida", "qawwal", "qigong", "qindar", "qintar", "qiviut", "qwerty", "sheqel", "yaqona"]}
      />
      <P>
        Plurals such as QIS, QATS, and NIQABS make up the rest of the 91.
      </P>

      <H2>Where These Words Come From</H2>
      <P>
        Grouping the words by origin makes them much easier to remember:
      </P>
      <Table
        caption="Q without U words grouped by language of origin"
        headers={["Origin", "Examples", "Meanings"]}
        rows={[
          [
            "Arabic",
            "QADI, QAID, SUQ, NIQAB, QIBLA, FAQIR",
            "A judge, a leader, a market, a face veil, the direction of prayer, a holy man",
          ],
          [
            "Chinese",
            "QI, QIN, GUQIN, QIGONG",
            "Life energy, two kinds of zither, a breathing exercise",
          ],
          ["Hebrew", "QOPH, SHEQEL", "A letter of the alphabet, a unit of money"],
          [
            "Inuit",
            "UMIAQ, QIVIUT",
            "A large open boat, the soft wool of the musk ox",
          ],
          ["Albanian", "QINDAR, QINTAR", "Small units of Albanian money"],
          ["Fijian", "YAQONA", "A drink made from the kava plant"],
          [
            "English",
            "TRANQ, QWERTY",
            "Short for tranquilizer, the standard keyboard layout",
          ],
        ]}
      />

      <H2>Tips for Word Games</H2>
      <List>
        <li>
          <strong>Learn QI first.</strong> It is just two letters, uses only
          one vowel, and lets you play a Q almost anywhere there is an open I.
        </li>
        <li>
          <strong>Add QAT, QAID, and QADI next.</strong> They use common
          letters (A, D, I, T) that you are likely to have on hand.
        </li>
        <li>
          <strong>Keep TRANQ and QWERTY in mind</strong> when you are short
          on vowels. TRANQ has only one, and QWERTY uses Y in place of a
          second one.
        </li>
        <li>
          <strong>Use Q on a bonus square.</strong> In many crossword-style
          tile games Q is worth 10 points, so a short Q word on a letter or
          word multiplier can score more than a long word elsewhere.
        </li>
        <li>
          <strong>Check your game&apos;s dictionary.</strong> Every game uses
          its own word list, and newer or less common entries such as NIQAB
          or QORMA may not be accepted everywhere.
        </li>
      </List>

      <TryTool
        href="/words-with-q-without-u"
        label="Search Q Without U Words"
        text="Use the Q Without U finder to filter all 91 entries by length, starting letters, ending letters, and letters you have."
      />
    </GuideLayout>
  );
}
