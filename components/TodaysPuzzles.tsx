"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FIRST_PUZZLE_DATE, toDateKey, type DailyPuzzle } from "@/lib/word-pounce";
import { FIRST_DAILY_DATE, dailyTheme } from "@/lib/word-search";
import { loadLadders, type LadderDay } from "@/lib/games";

type Today = {
  label: string;
  pounce: DailyPuzzle | null;
  theme: { name: string; emoji: string } | null;
  ladder: LadderDay | null;
};

async function loadPounce(dateKey: string): Promise<DailyPuzzle | null> {
  try {
    const response = await fetch(`/word-pounce/${dateKey.slice(0, 7)}.json`);
    if (!response.ok) return null;
    const month = (await response.json()) as Record<string, DailyPuzzle>;
    return month[dateKey] ?? null;
  } catch {
    return null;
  }
}

async function loadLadder(dateKey: string): Promise<LadderDay | null> {
  try {
    const data = await loadLadders();
    return data.days[dateKey] ?? null;
  } catch {
    return null;
  }
}

const card =
  "group flex flex-col rounded-[1.75rem] border-2 border-[#efd3ba] bg-white p-6 text-left shadow-[0_12px_30px_rgba(91,59,43,0.08)] transition hover:-translate-y-1 hover:border-[#ef9b4a]";
const button =
  "font-hand mt-auto inline-flex self-start rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 font-bold text-[#9a5221] transition group-hover:border-[#ef9b4a] group-hover:bg-[#ffe4c4]";
const tile =
  "flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#d78935] bg-[#f4b56b] text-lg font-black text-[#663a18]";

export default function TodaysPuzzles() {
  const [today, setToday] = useState<Today | null>(null);

  useEffect(() => {
    let cancelled = false;
    const now = new Date();
    const key = toDateKey(now);
    const label = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const theme = key >= FIRST_DAILY_DATE ? dailyTheme(key) : null;

    Promise.all([
      key >= FIRST_PUZZLE_DATE ? loadPounce(key) : Promise.resolve(null),
      loadLadder(key),
    ]).then(([pounce, ladder]) => {
      if (!cancelled) {
        setToday({
          label,
          pounce,
          theme: theme ? { name: theme.name, emoji: theme.emoji } : null,
          ladder,
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Letters are shown in alphabetical order so the pounce word isn't given away.
  const pounceLetters = today?.pounce
    ? today.pounce.letters.toUpperCase().split("").sort()
    : null;

  return (
    <section aria-labelledby="todays-puzzles" className="mx-auto mb-10 max-w-6xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
        🗓️ {today ? today.label : "New puzzles every day"}
      </div>

      <h2 id="todays-puzzles" className="whimsy-title text-3xl font-black text-[#4a2e25] sm:text-4xl">
        Today&apos;s Puzzles
      </h2>

      <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#755d52]">
        Three fresh puzzles every day, the same for everyone, so you can compare
        with friends. They reset at midnight your time. Free, no sign-up.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Link href="/word-pounce" className={card}>
          <span className="text-sm font-black uppercase tracking-widest text-[#9a5830]">
            🐾 Word Pounce{today?.pounce ? ` #${today.pounce.number}` : ""}
          </span>
          <span className="mt-2 text-2xl font-black text-[#4a2e25]">
            Make words from 7 letters
          </span>
          <span className="mt-4 flex min-h-9 flex-wrap gap-1.5" aria-label={pounceLetters ? `Today's letters: ${pounceLetters.join(", ")}` : undefined}>
            {pounceLetters
              ? pounceLetters.map((letter, index) => (
                  <span key={`${letter}-${index}`} className={tile}>
                    {letter}
                  </span>
                ))
              : null}
          </span>
          <span className="mb-5 mt-4 leading-7 text-[#755d52]">
            One word uses all seven letters. Find it to pounce and climb to Top Cat.
          </span>
          <span className={button}>Play Word Pounce &rarr;</span>
        </Link>

        <Link href="/word-search" className={card}>
          <span className="text-sm font-black uppercase tracking-widest text-[#9a5830]">
            🔎 Word Search
          </span>
          <span className="mt-2 text-2xl font-black text-[#4a2e25]">
            {today?.theme ? (
              <>
                Today&apos;s theme: {today.theme.emoji} {today.theme.name}
              </>
            ) : (
              "A new theme every day"
            )}
          </span>
          <span className="mb-5 mt-4 leading-7 text-[#755d52]">
            Play in Easy, Medium, or Hard, or print it out for later. Unlimited
            bonus puzzles when you finish.
          </span>
          <span className={button}>Find today&apos;s words &rarr;</span>
        </Link>

        <Link href="/word-ladder" className={card}>
          <span className="text-sm font-black uppercase tracking-widest text-[#9a5830]">
            🪜 Word Ladder{today?.ladder ? ` #${today.ladder.number}` : ""}
          </span>
          <span className="mt-2 text-2xl font-black text-[#4a2e25]">
            {today?.ladder ? (
              <>
                {today.ladder.start.toUpperCase()} &rarr; {today.ladder.end.toUpperCase()}
              </>
            ) : (
              "Change one letter at a time"
            )}
          </span>
          <span className="mb-5 mt-4 leading-7 text-[#755d52]">
            {today?.ladder
              ? `Swap one letter per step, using real words. Can you do it in ${today.ladder.par} steps?`
              : "Turn one word into another by swapping one letter per step, using real words the whole way."}
          </span>
          <span className={button}>Climb the ladder &rarr;</span>
        </Link>
      </div>

      <p className="mt-6">
        <Link href="/games" className="font-hand font-bold text-[#d8741e] hover:underline">
          🎲 Plus 3 unlimited games: Unscramble Sprint, Letter Guess, and Missing Letter &rarr;
        </Link>
      </p>
    </section>
  );
}
