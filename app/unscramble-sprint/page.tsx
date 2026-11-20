import Link from "next/link";

import GamePage, { H2, List, P, gameMetadata, gameStructuredData } from "@/components/GamePage";
import UnscrambleSprintGame from "@/components/UnscrambleSprintGame";

const title = "Unscramble Sprint – 60-Second Word Scramble Game";
const description =
  "How many scrambled words can you solve in 60 seconds? Play Tootie's free Unscramble Sprint: words get longer as you go, and longer words score more.";

export const metadata = gameMetadata(title, description, "/unscramble-sprint", "Tootie's Unscramble Sprint");

export default function UnscrambleSprintPage() {
  return (
    <GamePage
      path="/unscramble-sprint"
      badge="⏱️ Play as often as you like"
      title="Unscramble Sprint"
      intro="You have 60 seconds. Unscramble each word as fast as you can. Words start at 4 letters and get longer the more you solve."
      structuredData={gameStructuredData("Tootie's Unscramble Sprint", "/unscramble-sprint", description)}
      game={<UnscrambleSprintGame />}
    >
      <H2>How to Play</H2>
      <List>
        <li>Press <strong>Start sprint</strong> and the 60-second clock begins.</li>
        <li>Tap the letter tiles in order to spell the word, or type on your keyboard.</li>
        <li>When every tile is used, Tootie checks your word. Right answers move you to the next word right away.</li>
        <li>Any real word that uses all the letters counts, even if it isn&apos;t the one Tootie picked.</li>
        <li>Stuck? Shuffle the tiles for a fresh look, or skip the word for a 5-second penalty.</li>
      </List>

      <H2>Scoring</H2>
      <P>
        Each word is worth one point per letter: 4 points for a 4-letter word, 5 for
        a 5-letter word, and 6 for a 6-letter word. Your first few words are 4
        letters, then they grow to 5 and 6 letters as you solve more. Your best
        score is saved in your browser so you can try to beat it.
      </P>

      <H2>Tips for a Faster Sprint</H2>
      <List>
        <li><strong>Find the ending first.</strong> Look for endings like -ER, -LY, -ING, and -EST, then build the start of the word.</li>
        <li><strong>Pair up consonants.</strong> Blends like ST, TR, CH, and SH usually go together.</li>
        <li><strong>Place the vowels.</strong> Most short words have a consonant-vowel pattern, so try putting vowels in the middle.</li>
        <li><strong>Skip wisely.</strong> Five seconds is cheaper than staring at a tough word for fifteen.</li>
      </List>

      <P>
        Need help with a real game instead? Tootie&apos;s{" "}
        <Link href="/word-unscrambler" className="font-bold text-[#d8741e] hover:underline">
          Word Unscrambler
        </Link>{" "}
        finds every word you can make from your letters.
      </P>
    </GamePage>
  );
}
