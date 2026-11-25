"use client";

import { useCallback, useEffect, useState } from "react";

import GameKeyboard, { type KeyState } from "@/components/GameKeyboard";
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

type Level = "easy" | "hard";
type Stats = { streak: number; best: number; wins: number; played: number };

const MAX_MISSES = 6;
const STATS_KEY = "letter-guess-stats";

function poolFor(words: WordsByLength, level: Level) {
  return level === "easy"
    ? [...answerPool(words, 5, 700), ...answerPool(words, 6, 500)]
    : [...answerPool(words, 7, 700), ...answerPool(words, 8, 600)];
}

export default function LetterGuessGame() {
  const [words, setWords] = useState<WordsByLength | null>(null);
  const [failed, setFailed] = useState(false);
  const [level, setLevel] = useState<Level>("easy");
  const [answer, setAnswer] = useState("");
  const [guessed, setGuessed] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({ streak: 0, best: 0, wins: 0, played: 0 });
  const [copied, setCopied] = useState(false);

  const newWord = useCallback((list: WordsByLength, nextLevel: Level) => {
    setAnswer(randomItem(poolFor(list, nextLevel)));
    setGuessed([]);
    setCopied(false);
  }, []);

  useEffect(() => {
    const savedLevel = readStorage<Level>("letter-guess-level") ?? "easy";
    setLevel(savedLevel);
    setStats(readStorage<Stats>(STATS_KEY) ?? { streak: 0, best: 0, wins: 0, played: 0 });
    loadWords()
      .then((list) => {
        setWords(list);
        newWord(list, savedLevel);
      })
      .catch(() => setFailed(true));
  }, [newWord]);

  const misses = guessed.filter((letter) => !answer.includes(letter)).length;
  const won = !!answer && [...answer].every((letter) => guessed.includes(letter));
  const lost = misses >= MAX_MISSES;
  const over = won || lost;

  const guess = useCallback(
    (letter: string) => {
      if (!answer || over || guessed.includes(letter)) return;
      const next = [...guessed, letter];
      setGuessed(next);

      const nowWon = [...answer].every((l) => next.includes(l));
      const nowLost = next.filter((l) => !answer.includes(l)).length >= MAX_MISSES;
      if (!answer.includes(letter)) vibrate(15);
      if (nowWon || nowLost) {
        setStats((current) => {
          const streak = nowWon ? current.streak + 1 : 0;
          const updated = {
            streak,
            best: Math.max(current.best, streak),
            wins: current.wins + (nowWon ? 1 : 0),
            played: current.played + 1,
          };
          writeStorage(STATS_KEY, updated);
          return updated;
        });
      }
    },
    [answer, guessed, over]
  );

  // Physical keyboard support.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[a-zA-Z]$/.test(event.key)) guess(event.key.toLowerCase());
      else if (event.key === "Enter" && over && words) newWord(words, level);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guess, level, newWord, over, words]);

  function chooseLevel(next: Level) {
    setLevel(next);
    writeStorage("letter-guess-level", next);
    if (words) newWord(words, next);
  }

  async function share() {
    const text = [
      "Tootie's Letter Guess 🧶",
      won ? `Solved a ${answer.length}-letter word with ${misses} miss${misses === 1 ? "" : "es"}!` : "Tootie knocked the yarn off the table this time!",
      `🔥 Streak: ${stats.streak} · Best: ${stats.best}`,
      "https://tootiewords.com/letter-guess?ref=share",
    ].join("\n");
    if ((await shareOrCopy(text, "letter-guess")) === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  if (failed) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>The word list didn&apos;t load. Please refresh the page.</div>;
  }
  if (!words || !answer) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>🐾 Tootie is picking a word...</div>;
  }

  const states: Record<string, KeyState> = {};
  guessed.forEach((letter) => {
    states[letter] = answer.includes(letter) ? "correct" : "wrong";
  });

  // The yarn rolls toward the table edge with each miss, then falls.
  const yarnLeft = 8 + (Math.min(misses, MAX_MISSES - 1) / (MAX_MISSES - 1)) * 74;

  return (
    <div className={gameCard}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="group" aria-label="Difficulty">
          {(["easy", "hard"] as Level[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => chooseLevel(option)}
              aria-pressed={level === option}
              className={`font-hand rounded-full border-2 px-4 py-2 font-bold transition ${
                level === option
                  ? "border-[#d8741e] bg-[#ffd9ae] text-[#7a3f14]"
                  : "border-[#efc9a8] bg-[#fff0df] text-[#9a5221] hover:bg-[#ffe4c4]"
              }`}
            >
              {option === "easy" ? "Easy (5–6 letters)" : "Hard (7–8 letters)"}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#755d52]">
          🔥 Streak <strong className="text-[#4a2e25]">{stats.streak}</strong> · Best{" "}
          <strong className="text-[#4a2e25]">{stats.best}</strong>
        </p>
      </div>

      {/* Table and yarn */}
      <div className="relative mx-auto mt-6 h-28 w-full max-w-[420px]" aria-hidden="true">
        <span className="absolute bottom-[34px] left-0 text-4xl">🐈</span>
        <span
          className="absolute bottom-[34px] text-4xl transition-all duration-500"
          style={
            lost
              ? { left: "92%", transform: "translateY(70px) rotate(200deg)", opacity: 0.85 }
              : { left: `${yarnLeft}%` }
          }
        >
          🧶
        </span>
        <div className="absolute bottom-6 left-0 h-3 w-[90%] rounded-full bg-[#c98d5c]" />
        <div className="absolute bottom-0 left-[6%] h-6 w-2 rounded-b bg-[#b37847]" />
        <div className="absolute bottom-0 left-[80%] h-6 w-2 rounded-b bg-[#b37847]" />
      </div>
      <p className="text-center text-sm font-bold text-[#9a8175]">
        {lost ? "Oh no! The yarn fell off the table." : `${MAX_MISSES - misses} miss${MAX_MISSES - misses === 1 ? "" : "es"} left before the yarn falls`}
      </p>

      {/* Word */}
      <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2" aria-live="polite">
        {[...answer].map((letter, index) => {
          const shown = guessed.includes(letter) || lost;
          return (
            <span
              key={index}
              className={`flex h-12 w-9 items-end justify-center border-b-4 pb-1 text-3xl font-black uppercase sm:h-14 sm:w-11 sm:text-4xl ${
                shown ? (guessed.includes(letter) ? "border-[#ef9b4a] text-[#4a2e25]" : "border-[#e9a0ae] text-[#b23b4f]") : "border-[#d9c3b4] text-transparent"
              }`}
            >
              {shown ? letter : "_"}
            </span>
          );
        })}
      </div>

      {over ? (
        <div className="mt-6 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-center">
          <p className="text-xl font-black text-[#4a2e25]">
            {won ? `🎉 You got it: ${answer.toUpperCase()}!` : `The word was ${answer.toUpperCase()}.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => newWord(words, level)} className={primaryButton}>
              🐾 Next word
            </button>
            <button type="button" onClick={share} className={pillButton}>
              {copied ? "✓ Copied!" : "📤 Share"}
            </button>
          </div>
        </div>
      ) : (
        <GameKeyboard onKey={guess} states={states} />
      )}
    </div>
  );
}
