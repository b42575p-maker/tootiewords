import GamePage, { H2, List, P, gameMetadata, gameStructuredData } from "@/components/GamePage";
import LetterGuessGame from "@/components/LetterGuessGame";

const title = "Letter Guess – Free Word Guessing Game";
const description =
  "Guess the hidden word one letter at a time before Tootie knocks the yarn off the table. A free, kid-friendly word guessing game with Easy and Hard levels.";

export const metadata = gameMetadata(title, description, "/letter-guess", "Tootie's Letter Guess");

export default function LetterGuessPage() {
  return (
    <GamePage
      path="/letter-guess"
      badge="🧶 Play as often as you like"
      title="Tootie's Letter Guess"
      intro="Guess the hidden word one letter at a time. Every wrong guess nudges the yarn closer to the edge. Solve it before Tootie knocks it off the table!"
      structuredData={gameStructuredData("Tootie's Letter Guess", "/letter-guess", description)}
      game={<LetterGuessGame />}
    >
      <H2>How to Play</H2>
      <List>
        <li>Tap a letter on the keyboard, or type it, to guess.</li>
        <li>If the letter is in the word, every place it appears is filled in.</li>
        <li>If it isn&apos;t, the yarn rolls closer to the edge of the table. Six misses and it falls!</li>
        <li>Fill in the whole word to win and build your streak.</li>
      </List>

      <H2>Easy and Hard</H2>
      <P>
        <strong>Easy</strong> words have 5 or 6 letters and come from everyday
        English, which makes them a nice fit for kids and quick breaks.{" "}
        <strong>Hard</strong> words have 7 or 8 letters. Longer words reveal more
        letters with each correct guess, but they have more letters to find.
      </P>

      <H2>Tips for Guessing Well</H2>
      <List>
        <li><strong>Start with vowels.</strong> E and A appear in most words. Try E, A, then O or I.</li>
        <li><strong>Then try common consonants.</strong> R, S, T, L, and N are the most frequent letters in English words.</li>
        <li><strong>Look for patterns.</strong> Once a few letters appear, think about endings like -ING, -ER, -TION, and -LY.</li>
        <li><strong>Save rare letters.</strong> Leave J, Q, X, and Z until you have a strong idea of the word.</li>
      </List>

      <P>
        This is Tootie&apos;s gentle, cat-themed twist on a classic pencil-and-paper
        guessing game. Your streak and best streak are saved in your browser.
      </P>
    </GamePage>
  );
}
