"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GameKeyboard from "@/components/GameKeyboard";
import {
  answerPool,
  gameCard,
  loadWords,
  pillButton,
  primaryButton,
  randomItem,
  readStorage,
  shareOrCopy,
  vibrate,
  writeStorage,
  type WordsByLength,
} from "@/lib/games";

type Length = 4 | 5 | 6;

type RoundSettings = {
  name: string;
  blurb: string;
  length: Length;
  // Which slice of the common-word list (most common first) to draw from.
  from: number;
  to: number;
  blanks: 1 | 2;
  // Tricky rounds hide the letter (or letters) with the fewest possible answers.
  tricky: boolean;
};

export const ROUNDS: RoundSettings[] = [
  { name: "Warm-up", blurb: "Everyday 4-letter words", length: 4, from: 0, to: 600, blanks: 1, tricky: false },
  { name: "Tougher Words", blurb: "Trickier 5-letter words", length: 5, from: 150, to: 1500, blanks: 1, tricky: true },
  { name: "Double Trouble", blurb: "Two letters are missing", length: 5, from: 0, to: 900, blanks: 2, tricky: false },
  { name: "Expert", blurb: "6-letter words, two letters missing", length: 6, from: 0, to: 1500, blanks: 2, tricky: true },
];

export const WORDS_PER_ROUND = 10;
const LIVES = 3;
const BEST_KEY = "missing-letter-best-v2";

type Word = { word: string; blanks: number[] };
type Result = { guess: string; correct: boolean } | null;
type Phase = "intro" | "playing" | "won";
type Best = { score: number; rounds: number };

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function fill(word: string, blanks: number[], letters: string) {
  const chars = [...word];
  blanks.forEach((position, i) => {
    chars[position] = letters[i] ?? "";
  });
  return chars.join("");
}

// How many letter choices complete the word (1 or 2 blanks).
function countAnswers(word: string, blanks: number[], valid: Set<string>) {
  let count = 0;
  if (blanks.length === 1) {
    for (const a of LETTERS) if (valid.has(fill(word, blanks, a))) count += 1;
  } else {
    for (const a of LETTERS) for (const b of LETTERS) if (valid.has(fill(word, blanks, a + b))) count += 1;
  }
  return count;
}

function randomBlanks(length: number, count: 1 | 2) {
  const first = Math.floor(Math.random() * length);
  if (count === 1) return [first];
  let second = first;
  while (second === first) second = Math.floor(Math.random() * length);
  return [first, second].sort((a, b) => a - b);
}

export default function MissingLetterGame() {
  const [words, setWords] = useState<WordsByLength | null>(null);
  const [failed, setFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [wordInRound, setWordInRound] = useState(0);
  const [current, setCurrent] = useState<Word | null>(null);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, setBest] = useState<Best>({ score: 0, rounds: 0 });
  const [result, setResult] = useState<Result>(null);
  const [copied, setCopied] = useState(false);
  const used = useRef(new Set<string>());
  const timer = useRef<number | null>(null);

  const round = ROUNDS[roundIndex];

  const validByLength = useMemo(() => {
    if (!words) return null;
    return { 4: new Set(words["4"]), 5: new Set(words["5"]), 6: new Set(words["6"]) } as Record<Length, Set<string>>;
  }, [words]);

  const makeWord = useCallback(
    (settings: RoundSettings): Word | null => {
      if (!words || !validByLength) return null;
      const valid = validByLength[settings.length];
      const pool = answerPool(words, settings.length, settings.to).slice(settings.from);
      const fresh = pool.filter((word) => !used.current.has(word));
      const word = randomItem(fresh.length ? fresh : pool);
      used.current.add(word);

      if (!settings.tricky) return { word, blanks: randomBlanks(word.length, settings.blanks) };

      // Try a few blank spots and keep the one with the fewest answers.
      let bestBlanks = randomBlanks(word.length, settings.blanks);
      let fewest = countAnswers(word, bestBlanks, valid);
      for (let attempt = 0; attempt < 6 && fewest > 1; attempt += 1) {
        const blanks = randomBlanks(word.length, settings.blanks);
        const count = countAnswers(word, blanks, valid);
        if (count < fewest) {
          fewest = count;
          bestBlanks = blanks;
        }
      }
      return { word, blanks: bestBlanks };
    },
    [words, validByLength]
  );

  useEffect(() => {
    const saved = readStorage<Best>(BEST_KEY);
    if (saved && typeof saved.score === "number") setBest(saved);
    loadWords()
      .then(setWords)
      .catch(() => setFailed(true));
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const gameOver = lives <= 0;

  const saveBest = useCallback(
    (nextScore: number, roundsCleared: number) => {
      if (nextScore > best.score || (nextScore === best.score && roundsCleared > best.rounds)) {
        const next = { score: nextScore, rounds: roundsCleared };
        setBest(next);
        writeStorage(BEST_KEY, next);
      }
    },
    [best]
  );

  const startRound = useCallback(
    (index: number) => {
      setRoundIndex(index);
      setWordInRound(0);
      setResult(null);
      setTyped("");
      setCurrent(makeWord(ROUNDS[index]));
      setPhase("playing");
    },
    [makeWord]
  );

  // Move on after a word: the next word, the next round, or the finish.
  const advance = useCallback(
    (nextScore: number) => {
      setResult(null);
      setTyped("");
      const nextWord = wordInRound + 1;
      if (nextWord < WORDS_PER_ROUND) {
        setWordInRound(nextWord);
        setCurrent(makeWord(round));
        return;
      }
      const cleared = roundIndex + 1;
      saveBest(nextScore, cleared);
      if (cleared >= ROUNDS.length) {
        setPhase("won");
        return;
      }
      // Clearing a round wins back one paw.
      setLives((value) => Math.min(LIVES, value + 1));
      setRoundIndex(cleared);
      setPhase("intro");
    },
    [makeWord, round, roundIndex, saveBest, wordInRound]
  );

  const check = useCallback(
    (guess: string) => {
      if (!current || !validByLength) return;
      const correct = validByLength[round.length].has(fill(current.word, current.blanks, guess));
      setResult({ guess, correct });

      if (correct) {
        vibrate(20);
        const nextScore = score + 1;
        setScore(nextScore);
        saveBest(nextScore, roundIndex);
        timer.current = window.setTimeout(() => advance(nextScore), 850);
      } else {
        vibrate(60);
        const left = lives - 1;
        setLives(left);
        if (left <= 0) saveBest(score, roundIndex);
      }
    },
    [advance, current, lives, round, roundIndex, saveBest, score, validByLength]
  );

  const answer = useCallback(
    (letter: string) => {
      if (phase !== "playing" || !current || result || gameOver) return;
      const guess = typed + letter;
      if (guess.length < current.blanks.length) {
        setTyped(guess);
        return;
      }
      setTyped(guess);
      check(guess);
    },
    [check, current, gameOver, phase, result, typed]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[a-zA-Z]$/.test(event.key)) {
        answer(event.key.toLowerCase());
      } else if (event.key === "Backspace" && typed && !result) {
        event.preventDefault();
        setTyped("");
      } else if (event.key === "Enter") {
        if (phase === "intro" && !gameOver) startRound(roundIndex);
        else if (result && !result.correct && !gameOver) advance(score);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance, answer, gameOver, phase, result, roundIndex, score, startRound, typed]);

  function restart() {
    if (timer.current) window.clearTimeout(timer.current);
    used.current = new Set();
    setScore(0);
    setLives(LIVES);
    setCopied(false);
    setResult(null);
    setTyped("");
    setRoundIndex(0);
    setPhase("intro");
  }

  async function share() {
    const finished = phase === "won";
    const text = [
      "Tootie's Missing Letter 🔤",
      finished
        ? `I cleared all ${ROUNDS.length} rounds with ${score} of ${ROUNDS.length * WORDS_PER_ROUND} words! 🏆`
        : `I made it to Round ${roundIndex + 1} (${round.name}) with ${score} word${score === 1 ? "" : "s"}!`,
      "https://tootiewords.com/missing-letter?ref=share",
    ].join("\n");
    if ((await shareOrCopy(text, "missing-letter")) === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  if (failed) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>The word list didn&apos;t load. Please refresh the page.</div>;
  }
  if (!words) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>🐾 Tootie is hiding a letter...</div>;
  }

  const paws = (
    <p className="text-2xl" aria-label={`${lives} lives left`}>
      {Array.from({ length: LIVES }, (_, i) => (
        <span key={i} className={i < lives ? "" : "opacity-20 grayscale"}>
          🐾
        </span>
      ))}
    </p>
  );

  const header = (
    <div className="flex items-center justify-between gap-3 text-[#755d52]">
      <p>
        Score <strong className="text-2xl text-[#4a2e25]">{score}</strong>
        <span className="ml-3 text-sm">Best {best.score}</span>
      </p>
      {paws}
    </div>
  );

  const roundTrack = (
    <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
      {ROUNDS.map((item, index) => (
        <span
          key={item.name}
          className={`h-2 w-10 rounded-full ${
            index < roundIndex || phase === "won" ? "bg-[#ef9b4a]" : index === roundIndex ? "bg-[#f5c48f]" : "bg-[#f3e4d6]"
          }`}
        />
      ))}
    </div>
  );

  if (phase === "won") {
    return (
      <div className={gameCard}>
        {header}
        {roundTrack}
        <div className="mt-5 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-6 text-center">
          <p className="text-4xl">🏆</p>
          <p className="mt-2 text-2xl font-black text-[#4a2e25]">You beat all {ROUNDS.length} rounds!</p>
          <p className="mt-1 text-[#755d52]">
            {score} of {ROUNDS.length * WORDS_PER_ROUND} words. Tootie is impressed!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={restart} className={primaryButton}>
              🐾 Play again
            </button>
            <button type="button" onClick={share} className={pillButton}>
              {copied ? "✓ Copied!" : "📤 Share"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    const regained = roundIndex > 0;
    return (
      <div className={gameCard}>
        {header}
        {roundTrack}
        <div className="mt-5 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-6 text-center">
          {regained && <p className="font-bold text-[#2f7a3e]">Round {roundIndex} cleared! 🎉</p>}
          <p className="mt-1 font-hand text-sm font-bold text-[#9a5221]">
            Round {roundIndex + 1} of {ROUNDS.length}
          </p>
          <p className="text-2xl font-black text-[#4a2e25]">{round.name}</p>
          <p className="mt-1 text-[#755d52]">
            {round.blurb} · {WORDS_PER_ROUND} words
          </p>
          {regained && <p className="mt-1 text-sm text-[#755d52]">Clearing a round wins back a paw (up to {LIVES}).</p>}
          <button type="button" onClick={() => startRound(roundIndex)} className={`${primaryButton} mt-4`}>
            {roundIndex === 0 ? "🐾 Start" : "Next round →"}
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const blanks = current.blanks;
  const solved = result ? (result.correct ? result.guess : blanks.map((position) => current.word[position]).join("")) : null;
  const shownWord = solved ? fill(current.word, blanks, solved) : null;

  return (
    <div className={gameCard}>
      {header}
      {roundTrack}

      <p className="mt-2 text-center text-sm font-bold text-[#9a8175]">
        Round {roundIndex + 1}: {round.name} · word {wordInRound + 1} of {WORDS_PER_ROUND}
      </p>
      <p className="text-center text-sm text-[#9a8175]">
        {blanks.length === 2 ? "Fill in both missing letters, left to right" : "Fill in the missing letter"}
      </p>

      <div className="mt-4 flex justify-center gap-1.5 sm:gap-2" aria-live="polite">
        {[...current.word].map((letter, index) => {
          const blankIndex = blanks.indexOf(index);
          const isBlank = blankIndex !== -1;
          const shown = isBlank ? (solved ? solved[blankIndex] : typed[blankIndex]) : letter;
          return (
            <span
              key={index}
              className={`flex h-14 w-11 items-center justify-center rounded-xl text-3xl font-black uppercase sm:h-16 sm:w-14 sm:text-4xl ${
                isBlank
                  ? result
                    ? result.correct
                      ? "bg-[#9ad49e] text-[#24502a]"
                      : "bg-[#ffc9d1] text-[#8f2338]"
                    : "border-4 border-dashed border-[#ef9b4a] bg-[#fffaf4] text-[#4a2e25]"
                  : "bg-[#f5b05d] text-[#4e332a] shadow-md"
              }`}
            >
              {shown ?? ""}
            </span>
          );
        })}
      </div>

      <div className="mt-4 min-h-[3rem] text-center" role="status">
        {result?.correct && shownWord && <p className="font-bold text-[#2f7a3e]">Yes! {shownWord.toUpperCase()} 🐾</p>}
        {result && !result.correct && shownWord && (
          <p className="font-bold text-[#b23b4f]">
            Not {fill(current.word, blanks, result.guess).toUpperCase()}. The answer was {shownWord.toUpperCase()}.
          </p>
        )}
        {!result && typed && (
          <button type="button" onClick={() => setTyped("")} className="text-sm font-bold text-[#9a5221] underline">
            Undo {typed.toUpperCase()}
          </button>
        )}
      </div>

      {gameOver ? (
        <div className="mt-2 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-center">
          <p className="text-xl font-black text-[#4a2e25]">
            Game over in Round {roundIndex + 1}! You scored {score}.
          </p>
          <p className="mt-1 text-[#755d52]">
            {score >= best.score && score > 0 ? "That's a new best! 🎉" : `Your best is ${best.score}.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={restart} className={primaryButton}>
              🐾 Play again
            </button>
            <button type="button" onClick={share} className={pillButton}>
              {copied ? "✓ Copied!" : "📤 Share"}
            </button>
          </div>
        </div>
      ) : result && !result.correct ? (
        <div className="mt-2 text-center">
          <button type="button" onClick={() => advance(score)} className={primaryButton}>
            Next word &rarr;
          </button>
        </div>
      ) : (
        <GameKeyboard onKey={answer} disabled={!!result} />
      )}
    </div>
  );
}
