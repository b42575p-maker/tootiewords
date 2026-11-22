import GamePage, { H2, List, P, gameMetadata, gameStructuredData } from "@/components/GamePage";
import MissingLetterGame from "@/components/MissingLetterGame";

const title = "Missing Letter – Fill in the Blank Word Game";
const description =
  "Play Tootie's free Missing Letter game. Fill in the blanks to spell real words across four rounds, from easy 4-letter words to two missing letters, with three lives.";

export const metadata = gameMetadata(title, description, "/missing-letter", "Tootie's Missing Letter");

export default function MissingLetterPage() {
  return (
    <GamePage
      path="/missing-letter"
      badge="🔤 Play as often as you like"
      title="Missing Letter"
      intro="Fill in the missing letters to spell real words. Four rounds, each harder than the last. You have three paws, so make each guess count!"
      structuredData={gameStructuredData("Tootie's Missing Letter", "/missing-letter", description)}
      game={<MissingLetterGame />}
    >
      <H2>How to Play</H2>
      <List>
        <li>Tap the letter that fills the blank tile, or type it.</li>
        <li>Any letter that makes a real word counts. For B_LL, A (BALL), E (BELL), I (BILL), and U (BULL) are all right.</li>
        <li>There are four rounds of 10 words: <strong>Warm-up</strong> (4-letter words), <strong>Tougher Words</strong> (5 letters, trickier blanks), <strong>Double Trouble</strong> (two missing letters), and <strong>Expert</strong> (6-letter words with two missing letters).</li>
        <li>With two blanks, type the letters left to right. Tap Undo if you change your mind about the first one.</li>
        <li>A wrong guess costs a paw and shows you the answer. Clearing a round wins a paw back. Lose all three and the game ends.</li>
        <li>Finish all four rounds to beat the game!</li>
      </List>

      <H2>Why It&apos;s Good Practice</H2>
      <P>
        Missing Letter trains the same skill you use in crosswords, Wordle, and
        word searches: spotting how letters fit together. It&apos;s quick enough
        for a coffee break and simple enough for young readers learning to spell.
      </P>

      <H2>Tips</H2>
      <List>
        <li><strong>Say it out loud.</strong> Sounding out the letters around the blank often makes the answer jump out.</li>
        <li><strong>Try vowels first.</strong> A blank between two consonants is usually a vowel.</li>
        <li><strong>Watch the ending.</strong> Blanks near the end are often part of a common ending like -ED, -ER, or -LY.</li>
        <li><strong>Take your time.</strong> There&apos;s no clock, so think it through before you tap.</li>
      </List>

      <P>Your best score is saved in your browser. Can you clear all 40 words?</P>
    </GamePage>
  );
}
