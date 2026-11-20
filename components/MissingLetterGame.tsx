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

type Round = { word: string; blank: number; answers: string[] };
type Result = { letter: string; correct: boolean } | null;

const LIVES = 3;
const BEST_KEY = "missing-letter-best";

function lengthForScore(score: number): 4 | 5 | 6 {
  if (score < 5) return 4;
  if (score < 12) return 5;
  return 6;
}

export default function MissingLetterGame() {
  const [words, setWords] = useState<WordsByLength | null>(null);
  const [failed, setFailed] = useState(false);
  const [round, setRound] = useState<Round | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, setBest] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const validByLength = useMemo(() => {
    if (!words) return null;
    return {
      4: new Set(words["4"]),
      5: new Set(words["5"]),
      6: new Set(words["6"]),
    } as Record<4 | 5 | 6, Set<string>>;
  }, [words]);

  const makeRound = useCallback(
    (forScore: number): Round | null => {
      if (!words || !validByLength) return null;
      const length = lengthForScore(forScore);
      const pool = answerPool(words, length, length === 4 ? 600 : length === 5 ? 700 : 500);
      const word = randomItem(pool);
      const blank = Math.floor(Math.random() * word.length);
      const answers: string[] = [];
      for (let c = 97; c <= 122; c += 1) {
        const letter = String.fromCharCode(c);
        if (validByLength[length].has(word.slice(0, blank) + letter + word.slice(blank + 1))) answers.push(letter);
      }
      return { word, blank, answers };
    },
    [words, validByLength]
  );

  useEffect(() => {
    setBest(readStorage<number>(BEST_KEY) ?? 0);
    loadWords()
      .then(setWords)
      .catch(() => setFailed(true));
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (words && !round) setRound(makeRound(0));
  }, [words, round, makeRound]);

  const gameOver = lives <= 0;

  const next = useCallback(
    (forScore: number) => {
      setResult(null);
      setRound(makeRound(forScore));
    },
    [makeRound]
  );

  const answer = useCallback(
    (letter: string) => {
      if (!round || result || gameOver) return;
      const correct = round.answers.includes(letter);
      setResult({ letter, correct });

      if (correct) {
        vibrate(20);
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > best) {
          setBest(newScore);
          writeStorage(BEST_KEY, newScore);
        }
        timer.current = window.setTimeout(() => next(newScore), 850);
      } else {
        vibrate(60);
        setLives((current) => current - 1);
      }
    },
    [best, gameOver, next, result, round, score]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[a-zA-Z]$/.test(event.key)) answer(event.key.toLowerCase());
      else if (event.key === "Enter" && result && !result.correct && !gameOver) next(score);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answer, gameOver, next, result, score]);

  function restart() {
    setScore(0);
    setLives(LIVES);
    setCopied(false);
    next(0);
  }

  async function share() {
    const text = [
      "Tootie's Missing Letter 🔤",
      `I filled in ${score} word${score === 1 ? "" : "s"} in a row! (Best: ${best})`,
      "tootiewords.com/missing-letter",
    ].join("\n");
    if ((await shareOrCopy(text)) === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  if (failed) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>The word list didn&apos;t load. Please refresh the page.</div>;
  }
  if (!round) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>🐾 Tootie is hiding a letter...</div>;
  }

  const filled = result ? (result.correct ? result.letter : round.answers[0]) : null;
  const otherAnswers = result ? round.answers.filter((letter) => letter !== filled) : [];

  return (
    <div className={gameCard}>
      <div className="flex items-center justify-between gap-3 text-[#755d52]">
        <p>
          Score <strong className="text-2xl text-[#4a2e25]">{score}</strong>
          <span className="ml-3 text-sm">Best {best}</span>
        </p>
        <p className="text-2xl" aria-label={`${lives} lives left`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <span key={i} className={i < lives ? "" : "opacity-20 grayscale"}>
              🐾
            </span>
          ))}
        </p>
      </div>

      <p className="mt-2 text-center text-sm font-bold text-[#9a8175]">
        {round.word.length}-letter words · fill in the missing letter
      </p>

      <div className="mt-4 flex justify-center gap-1.5 sm:gap-2" aria-live="polite">
        {[...round.word].map((letter, index) => {
          const isBlank = index === round.blank;
          const shown = isBlank ? filled : letter;
          return (
            <span
              key={index}
              className={`flex h-14 w-12 items-center justify-center rounded-xl text-3xl font-black uppercase sm:h-16 sm:w-14 sm:text-4xl ${
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
        {result?.correct && <p className="font-bold text-[#2f7a3e]">Yes! {round.word.slice(0, round.blank)}{result.letter}{round.word.slice(round.blank + 1)} 🐾</p>}
        {result && !result.correct && (
          <p className="font-bold text-[#b23b4f]">
            Not {result.letter.toUpperCase()}. The answer was{" "}
            {(round.word.slice(0, round.blank) + filled + round.word.slice(round.blank + 1)).toUpperCase()}
            {otherAnswers.length > 0 && (
              <span className="block text-sm font-normal text-[#755d52]">
                Also correct: {otherAnswers.map((l) => l.toUpperCase()).join(", ")}
              </span>
            )}
          </p>
        )}
      </div>

      {gameOver ? (
        <div className="mt-2 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-center">
          <p className="text-xl font-black text-[#4a2e25]">Game over! You scored {score}.</p>
          <p className="mt-1 text-[#755d52]">{score >= best && score > 0 ? "That's a new best! 🎉" : `Your best is ${best}.`}</p>
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
          <button type="button" onClick={() => next(score)} className={primaryButton}>
            Next word &rarr;
          </button>
        </div>
      ) : (
        <GameKeyboard onKey={answer} disabled={!!result} />
      )}
    </div>
  );
}
