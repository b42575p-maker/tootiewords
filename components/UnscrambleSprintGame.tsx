"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  answerPool,
  gameCard,
  loadWords,
  pillButton,
  primaryButton,
  randomItem,
  readStorage,
  scrambleWord,
  shareOrCopy,
  sortedLetters,
  vibrate,
  writeStorage,
  type WordsByLength,
} from "@/lib/games";

type Phase = "ready" | "playing" | "done";
type Current = { word: string; tiles: string[] };

const ROUND_SECONDS = 60;
const SKIP_PENALTY = 5;
const BEST_KEY = "unscramble-sprint-best";

function lengthFor(solved: number): 4 | 5 | 6 {
  if (solved < 4) return 4;
  if (solved < 9) return 5;
  return 6;
}

export default function UnscrambleSprintGame() {
  const [words, setWords] = useState<WordsByLength | null>(null);
  const [failed, setFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [current, setCurrent] = useState<Current | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [solved, setSolved] = useState<string[]>([]);
  const [missed, setMissed] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [best, setBest] = useState(0);
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(0);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);
  const [copied, setCopied] = useState(false);
  const pointsRef = useRef(0);

  const valid = useMemo(() => {
    if (!words) return null;
    // Map sorted letters -> set of real words, so any anagram counts.
    const map = new Map<string, Set<string>>();
    for (const length of ["4", "5", "6"] as const) {
      for (const word of words[length]) {
        const key = sortedLetters(word);
        if (!map.has(key)) map.set(key, new Set());
        map.get(key)!.add(word);
      }
    }
    return map;
  }, [words]);

  useEffect(() => {
    setBest(readStorage<number>(BEST_KEY) ?? 0);
    loadWords()
      .then(setWords)
      .catch(() => setFailed(true));
  }, []);

  const nextWord = useCallback(
    (solvedCount: number) => {
      if (!words || !valid) return;
      const length = lengthFor(solvedCount);
      const word = randomItem(answerPool(words, length, length === 4 ? 700 : length === 5 ? 900 : 700));
      const anagrams = valid.get(sortedLetters(word)) ?? new Set([word]);
      setCurrent({ word, tiles: [...scrambleWord(word, anagrams)] });
      setSelected([]);
    },
    [words, valid]
  );

  const timeLeft = phase === "playing" ? Math.max(0, Math.ceil((endsAt - now) / 1000)) : phase === "done" ? 0 : ROUND_SECONDS;

  const finish = useCallback(() => {
    setPhase("done");
    if (current) setMissed((list) => [...list, current.word]);
    const final = pointsRef.current;
    setBest((previous) => {
      if (final > previous) {
        writeStorage(BEST_KEY, final);
        return final;
      }
      return previous;
    });
  }, [current]);

  // Countdown.
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && now >= endsAt) finish();
  }, [phase, now, endsAt, finish]);

  function start() {
    const startTime = Date.now();
    setSolved([]);
    setMissed([]);
    setPoints(0);
    pointsRef.current = 0;
    setCopied(false);
    setEndsAt(startTime + ROUND_SECONDS * 1000);
    setNow(startTime);
    setPhase("playing");
    nextWord(0);
  }

  const guess = current ? selected.map((index) => current.tiles[index]).join("") : "";

  const check = useCallback(
    (attempt: string) => {
      if (!current || !valid) return;
      const anagrams = valid.get(sortedLetters(current.word));
      if (anagrams?.has(attempt)) {
        vibrate(20);
        setFlash("good");
        const nextSolved = [...solved, attempt];
        setSolved(nextSolved);
        pointsRef.current += attempt.length;
        setPoints(pointsRef.current);
        window.setTimeout(() => {
          setFlash(null);
          nextWord(nextSolved.length);
        }, 250);
      } else {
        vibrate(60);
        setFlash("bad");
        window.setTimeout(() => {
          setFlash(null);
          setSelected([]);
        }, 350);
      }
    },
    [current, nextWord, solved, valid]
  );

  const addTile = useCallback(
    (index: number) => {
      if (phase !== "playing" || !current || flash || selected.includes(index)) return;
      const nextSelected = [...selected, index];
      setSelected(nextSelected);
      if (nextSelected.length === current.tiles.length) {
        check(nextSelected.map((i) => current.tiles[i]).join(""));
      }
    },
    [check, current, flash, phase, selected]
  );

  function skip() {
    if (!current || phase !== "playing") return;
    setMissed((list) => [...list, current.word]);
    setEndsAt((time) => time - SKIP_PENALTY * 1000);
    nextWord(solved.length);
  }

  function shuffleTiles() {
    if (!current) return;
    const remaining = current.tiles.filter((_, i) => !selected.includes(i));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    setCurrent({ ...current, tiles: [...selected.map((i) => current.tiles[i]), ...shuffled] });
    setSelected(selected.map((_, i) => i));
  }

  // Physical keyboard.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (phase !== "playing") {
        if (event.key === "Enter" && words) start();
        return;
      }
      if (!current) return;
      if (event.key === "Backspace") {
        event.preventDefault();
        setSelected((list) => list.slice(0, -1));
      } else if (event.key === " ") {
        event.preventDefault();
        skip();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        const letter = event.key.toLowerCase();
        const index = current.tiles.findIndex((tile, i) => tile === letter && !selected.includes(i));
        if (index !== -1) addTile(index);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  async function share() {
    const text = [
      "Tootie's Unscramble Sprint ⏱️",
      `${solved.length} word${solved.length === 1 ? "" : "s"} in 60 seconds · ${points} points`,
      "tootiewords.com/unscramble-sprint",
    ].join("\n");
    if ((await shareOrCopy(text)) === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  if (failed) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>The word list didn&apos;t load. Please refresh the page.</div>;
  }

  if (phase === "ready") {
    return (
      <div className={`${gameCard} text-center`}>
        <p className="text-5xl" aria-hidden="true">⏱️</p>
        <p className="mt-3 text-2xl font-black text-[#4a2e25]">60 seconds. How many can you unscramble?</p>
        <p className="mx-auto mt-2 max-w-md leading-7 text-[#755d52]">
          Words start at 4 letters and get longer as you go. Longer words score more points.
          Skipping costs {SKIP_PENALTY} seconds.
        </p>
        {best > 0 && <p className="mt-2 font-bold text-[#9a5221]">Your best: {best} points</p>}
        <button type="button" onClick={start} disabled={!words} className={`${primaryButton} mt-5 text-lg`}>
          {words ? "🐾 Start sprint" : "Loading words..."}
        </button>
      </div>
    );
  }

  return (
    <div className={gameCard}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#755d52]">
          <strong className="text-2xl text-[#4a2e25]">{points}</strong> pts · {solved.length} words
        </p>
        <p
          className={`rounded-full px-4 py-1 text-2xl font-black tabular-nums ${
            timeLeft <= 10 ? "bg-[#ffc9d1] text-[#8f2338]" : "bg-[#fff0df] text-[#4a2e25]"
          }`}
          aria-live="off"
        >
          ⏱ {timeLeft}
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f6e6d7]" aria-hidden="true">
        <div className="h-full rounded-full bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] transition-all" style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }} />
      </div>

      {phase === "playing" && current && (
        <>
          <div
            className={`mt-6 flex min-h-[3.75rem] items-center justify-center rounded-2xl border-2 border-dashed px-4 text-3xl font-black uppercase tracking-[0.25em] transition-colors ${
              flash === "good"
                ? "border-[#9ad49e] bg-[#e9f7ea] text-[#24502a]"
                : flash === "bad"
                  ? "border-[#e9a0ae] bg-[#ffeef1] text-[#8f2338]"
                  : "border-[#ead6c5] bg-[#fffaf4] text-[#4a2e25]"
            }`}
            aria-live="polite"
          >
            {guess || <span className="text-base font-bold tracking-normal text-[#b59d8f]">Tap the letters in order</span>}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
            {current.tiles.map((letter, index) => {
              const used = selected.includes(index);
              return (
                <button
                  key={`${current.word}-${index}`}
                  type="button"
                  onClick={() => addTile(index)}
                  disabled={used}
                  aria-label={`Letter ${letter.toUpperCase()}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl text-3xl font-black uppercase shadow-md transition sm:h-16 sm:w-16 ${
                    used ? "bg-[#f3e4d6] text-[#c9b3a4] shadow-none" : "bg-[#f5b05d] text-[#4e332a] hover:-translate-y-0.5"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setSelected((list) => list.slice(0, -1))} disabled={!guess} className={pillButton}>
              ⌫ Undo
            </button>
            <button type="button" onClick={shuffleTiles} className={pillButton}>
              🔀 Shuffle
            </button>
            <button type="button" onClick={skip} className={pillButton}>
              ⏭ Skip (−{SKIP_PENALTY}s)
            </button>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="mt-6 text-center">
          <p className="text-2xl font-black text-[#4a2e25]">⏱ Time&apos;s up! {points} points</p>
          <p className="mt-1 text-[#755d52]">
            {points > 0 && points >= best ? "That's a new best! 🎉" : `Your best is ${best} points.`}
          </p>
          {solved.length > 0 && (
            <p className="mt-4 text-[#5f4a40]">
              <strong>Solved:</strong> {solved.map((w) => w.toUpperCase()).join(", ")}
            </p>
          )}
          {missed.length > 0 && (
            <p className="mt-2 text-[#755d52]">
              <strong>Missed:</strong> {missed.map((w) => w.toUpperCase()).join(", ")}
            </p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={start} className={primaryButton}>
              🐾 Play again
            </button>
            <button type="button" onClick={share} className={pillButton}>
              {copied ? "✓ Copied!" : "📤 Share"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
