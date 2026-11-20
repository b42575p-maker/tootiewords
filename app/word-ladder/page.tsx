import GamePage, { H2, List, P, gameMetadata, gameStructuredData } from "@/components/GamePage";
import WordLadderGame from "@/components/WordLadderGame";

const title = "Word Ladder – Free Daily Word Puzzle";
const description =
  "Play Tootie's free daily Word Ladder. Change one word into another by swapping one letter at a time, using real words at every step. Can you match par?";

export const metadata = gameMetadata(title, description, "/word-ladder", "Tootie's Word Ladder");

export default function WordLadderPage() {
  return (
    <GamePage
      path="/word-ladder"
      badge="🪜 A new ladder every day"
      title="Tootie's Word Ladder"
      intro="Climb from the top word to the bottom word by changing one letter at a time. Every step has to be a real word."
      structuredData={gameStructuredData("Tootie's Word Ladder", "/word-ladder", description)}
      game={<WordLadderGame />}
    >
      <H2>How to Play</H2>
      <List>
        <li>Start with the top word. Type a new word that changes exactly one letter, then press Go.</li>
        <li>Keep going, one letter at a time, until you reach the target word at the bottom.</li>
        <li>Letters stay in the same spots. You can&apos;t add, remove, or rearrange letters.</li>
        <li>Every step must be a real English word. Changed letters are highlighted so you can follow your path.</li>
        <li>Stuck? Use up to 3 hints, undo a step, or reveal the answer.</li>
      </List>

      <H2>What Is Par?</H2>
      <P>
        Par is the fewest steps Tootie needed to solve the ladder using everyday
        words. Finishing in par is a great result, and beating it means you found
        a clever shortcut. Longer ladders still count. There&apos;s no step limit.
      </P>

      <H2>An Example Ladder</H2>
      <P>
        To turn <strong>CAT</strong> into <strong>DOG</strong>, you could go CAT →
        COT → DOT → DOG. Each step changes one letter: A to O, C to D, then T to G.
        That&apos;s a 3-step ladder.
      </P>

      <H2>Tips for Climbing</H2>
      <List>
        <li><strong>Look at the target.</strong> Try to lock in letters from the bottom word early so you don&apos;t have to change them again.</li>
        <li><strong>Vowels are bridges.</strong> Swapping a vowel (BAT → BIT → BIG) often opens up new paths.</li>
        <li><strong>Work backward.</strong> Think of words that are one letter away from the target, then aim for one of those.</li>
        <li><strong>Don&apos;t fear detours.</strong> Sometimes a step that seems to move away from the target is the only way through.</li>
      </List>

      <P>
        Word ladders were invented by Lewis Carroll, the author of <em>Alice&apos;s
        Adventures in Wonderland</em>, who called them &quot;Doublets.&quot; A new
        ladder arrives every day at midnight your local time, and your progress is
        saved in your browser.
      </P>
    </GamePage>
  );
}
