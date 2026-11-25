"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { toDateKey } from "@/lib/word-pounce";
import {
  gameCard,
  ladderNeighbors,
  loadLadders,
  pillButton,
  primaryButton,
  readStorage,
  shareOrCopy,
  shortestLadder,
  vibrate,
  writeStorage,
  type LadderData,
  type LadderDay,
} from "@/lib/games";
import NextPuzzleCountdown from "@/components/NextPuzzleCountdown";

const FIRST_LADDER_DATE = "2026-11-19";
const MAX_HINTS = 3;

type Saved = { rungs: string[]; hints: number; gaveUp: boolean };

// A random practice ladder between two common words, 3 to 5 steps apart.
function makePracticeLadder(data: LadderData, dictionary: Set<string>, common: Set<string>): LadderDay | null {
  const pool = data.common;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const start = pool[Math.floor(Math.random() * pool.length)];
    const distance = new Map<string, number>([[start, 0]]);
    const queue = [start];
    for (let i = 0; i < queue.length; i += 1) {
      const word = queue[i];
      const d = distance.get(word) ?? 0;
      if (d >= 5) continue;
      for (const next of ladderNeighbors(word, common)) {
        if (!distance.has(next)) {
          distance.set(next, d + 1);
          queue.push(next);
        }
      }
    }
    const targets = [...distance].filter(([, d]) => d >= 3 && d <= 5).map(([word]) => word);
    if (!targets.length) continue;
    const end = targets[Math.floor(Math.random() * targets.length)];
    const solution = shortestLadder(start, end, dictionary, common);
    if (!solution) continue;
    return { number: 0, start, end, par: solution.length - 1, solution };
  }
  return null;
}

function Rung({ word, previous, tone }: { word: string; previous?: string; tone: "start" | "step" | "end" | "ghost" }) {
  return (
    <div className="flex justify-center gap-1.5">
      {[...word].map((letter, index) => {
        const changed = previous !== undefined && previous[index] !== letter;
        return (
          <span
            key={index}
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black uppercase sm:h-14 sm:w-14 sm:text-3xl ${
              tone === "start"
                ? "bg-[#f5b05d] text-[#4e332a] shadow-md"
                : tone === "end"
                  ? "bg-[#9ad49e] text-[#24502a] shadow-md"
                  : tone === "ghost"
                    ? "border-2 border-dashed border-[#9ad49e] bg-[#f3fbf3] text-[#6aa871]"
                    : changed
                      ? "bg-[#ffd9ae] text-[#7a3f14] ring-2 ring-[#ef9b4a]"
                      : "bg-[#fff0df] text-[#4a2e25]"
            }`}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

export default function WordLadderGame() {
  const [data, setData] = useState<LadderData | null>(null);
  const [failed, setFailed] = useState(false);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [rungs, setRungs] = useState<string[]>([]);
  const [hints, setHints] = useState(0);
  const [gaveUp, setGaveUp] = useState(false);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<{ text: string; tone: "good" | "bad" | "info" } | null>(null);
  const [copied, setCopied] = useState(false);
  const [practice, setPractice] = useState<LadderDay | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let key = toDateKey(new Date());
    if (key < FIRST_LADDER_DATE) key = FIRST_LADDER_DATE;
    setDateKey(key);
    loadLadders()
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const daily = data && dateKey ? data.days[dateKey] : null;
  const puzzle = practice ?? daily;
  const dictionary = useMemo(() => (data ? new Set(data.dictionary) : new Set<string>()), [data]);
  const common = useMemo(() => (data ? new Set(data.common) : new Set<string>()), [data]);
  // Practice ladders aren't saved.
  const storageKey = dateKey && !practice ? `word-ladder-${dateKey}` : null;

  // Restore today's progress (or start a fresh practice ladder).
  useEffect(() => {
    if (!puzzle) return;
    const saved = storageKey ? readStorage<Saved>(storageKey) : null;
    setMessage(null);
    setInput("");
    setRungs(saved?.rungs?.length ? saved.rungs : [puzzle.start]);
    setHints(saved?.hints ?? 0);
    setGaveUp(saved?.gaveUp ?? false);
  }, [puzzle, storageKey]);

  const last = rungs[rungs.length - 1];
  const solved = !!puzzle && last === puzzle.end;
  const finished = solved || gaveUp;
  const steps = rungs.length - 1;

  // Fewest steps left from the current word (live, so players know what they're aiming for).
  const stepsLeft = useMemo(() => {
    if (!puzzle || finished || !last) return null;
    // Same everyday-word path that par and hints use, so the numbers agree.
    const path = shortestLadder(last, puzzle.end, dictionary, common);
    return path ? path.length - 1 : null;
  }, [puzzle, finished, last, dictionary, common]);

  function startPractice() {
    if (!data) return;
    const next = makePracticeLadder(data, dictionary, common);
    if (!next) {
      setMessage({ text: "Tootie couldn't build a practice ladder. Try again?", tone: "info" });
      return;
    }
    setCopied(false);
    setPractice(next);
  }

  function save(next: Partial<Saved>) {
    if (!storageKey) return;
    writeStorage(storageKey, { rungs, hints, gaveUp, ...next });
  }

  function addRung(word: string, usedHint = false) {
    const nextRungs = [...rungs, word];
    const nextHints = hints + (usedHint ? 1 : 0);
    setRungs(nextRungs);
    setHints(nextHints);
    save({ rungs: nextRungs, hints: nextHints });
    if (puzzle && word === puzzle.end) {
      vibrate(40);
      setMessage(null);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!puzzle || finished) return;
    const word = input.trim().toLowerCase();
    setInput("");
    inputRef.current?.focus();

    const shown = word.toUpperCase();
    const current = last.toUpperCase();
    const changed = [...word].filter((letter, index) => letter !== last[index]).length;

    if (word.length !== puzzle.start.length) {
      setMessage({ text: `Almost! Every word in this ladder has ${puzzle.start.length} letters.`, tone: "bad" });
    } else if (word === last) {
      setMessage({ text: `That's the same word! Change one letter of ${current} to make a new word.`, tone: "bad" });
    } else if (changed > 1) {
      setMessage({
        text: `Oops, ${shown} changes ${changed} letters. Only one letter of ${current} can change at a time.`,
        tone: "bad",
      });
    } else if (rungs.includes(word)) {
      setMessage({ text: `You already climbed through ${shown}. Try a different letter.`, tone: "bad" });
    } else if (!dictionary.has(word)) {
      setMessage({
        text: `Hmm, Tootie doesn't think ${shown} is a real word. Try changing a different letter of ${current}.`,
        tone: "bad",
      });
    } else {
      setMessage(word === puzzle.end ? null : { text: `${word.toUpperCase()} works! 🐾`, tone: "good" });
      addRung(word);
      return;
    }
    vibrate(50);
  }

  function undo() {
    if (rungs.length <= 1 || finished) return;
    const nextRungs = rungs.slice(0, -1);
    setRungs(nextRungs);
    save({ rungs: nextRungs });
    setMessage(null);
  }

  function hint() {
    if (!puzzle || finished || hints >= MAX_HINTS) return;
    const path = shortestLadder(last, puzzle.end, dictionary, common);
    if (!path || path.length < 2) {
      setMessage({ text: "Tootie can't find a way from here. Try undoing a step.", tone: "info" });
      return;
    }
    setMessage({ text: `Tootie suggests ${path[1].toUpperCase()}. 💡`, tone: "info" });
    addRung(path[1], true);
  }

  function giveUp() {
    setGaveUp(true);
    save({ gaveUp: true });
  }

  const solutionFromHere = useMemo(() => {
    if (!puzzle || !gaveUp || solved) return null;
    return shortestLadder(last, puzzle.end, dictionary, common);
  }, [puzzle, gaveUp, solved, last, dictionary, common]);

  async function share() {
    if (!puzzle) return;
    const rating = steps < puzzle.par ? "🏆 Beat par!" : steps === puzzle.par ? "⭐ On par!" : `(par ${puzzle.par})`;
    // One square per step: green up to par, orange for extra steps.
    const squares = "🟩".repeat(Math.min(steps, puzzle.par)) + "🟧".repeat(Math.max(0, steps - puzzle.par));
    const text = [
      `Tootie's Word Ladder #${puzzle.number} 🪜`,
      `${puzzle.start.toUpperCase()} ${squares} ${puzzle.end.toUpperCase()}`,
      `${steps} step${steps === 1 ? "" : "s"} ${rating}${hints ? ` · 💡${hints}` : ""}`,
      "https://tootiewords.com/word-ladder?ref=share",
    ].join("\n");
    if ((await shareOrCopy(text, "word-ladder")) === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  if (failed) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>Today&apos;s ladder didn&apos;t load. Please refresh the page.</div>;
  }
  if (!data || !dateKey) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>🐾 Tootie is setting up the ladder...</div>;
  }
  if (!puzzle) {
    return <div className={`${gameCard} text-center text-[#755d52]`}>Today&apos;s ladder isn&apos;t ready yet. Please check back soon!</div>;
  }

  return (
    <div className={gameCard}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-hand text-sm font-bold text-[#9a5221]">
            {practice ? "Practice ladder" : `Ladder #${puzzle.number}`}
          </p>
          <p className="text-xl font-black text-[#4a2e25]">
            {puzzle.start.toUpperCase()} → {puzzle.end.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-[#fff0df] px-3 py-1 font-bold text-[#9a5221]" title="The fewest steps Tootie found">
            Par {puzzle.par}
          </span>
          <span className="rounded-full bg-[#fff0df] px-3 py-1 font-bold text-[#9a5221]">Steps {steps}</span>
          <span className="rounded-full bg-[#fff0df] px-3 py-1 font-bold text-[#9a5221]">💡 {MAX_HINTS - hints} left</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {rungs.map((word, index) => (
          <Rung
            key={`${word}-${index}`}
            word={word}
            previous={index > 0 ? rungs[index - 1] : undefined}
            tone={index === 0 ? "start" : solved && index === rungs.length - 1 ? "end" : "step"}
          />
        ))}

        {!finished && (
          <>
            <form onSubmit={submit} className="mx-auto flex max-w-[320px] gap-2 pt-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value.replace(/[^a-zA-Z]/g, "").slice(0, puzzle.start.length))}
                maxLength={puzzle.start.length}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                aria-label="Next word"
                placeholder="next word"
                className="min-w-0 flex-1 rounded-xl border-2 border-[#ef9b4a] bg-white px-3 py-2 text-center text-2xl font-black uppercase tracking-[0.3em] text-[#4a2e25] outline-none placeholder:text-base placeholder:font-bold placeholder:normal-case placeholder:tracking-normal placeholder:text-[#c9b3a4] focus:ring-4 focus:ring-[#ffe4c4]"
              />
              <button type="submit" className={primaryButton} disabled={!input}>
                Go
              </button>
            </form>
            <div className="pt-1">
              <Rung word={puzzle.end} tone="ghost" />
            </div>
          </>
        )}

        {solutionFromHere && (
          <div className="space-y-2 opacity-70">
            {solutionFromHere.slice(1).map((word, index) => (
              <Rung key={word} word={word} previous={solutionFromHere[index]} tone={word === puzzle.end ? "end" : "step"} />
            ))}
          </div>
        )}
      </div>

      {message && !finished && (
        <p
          role="status"
          className={`mt-4 text-center font-bold ${
            message.tone === "good" ? "text-[#2f7a3e]" : message.tone === "bad" ? "text-[#b23b4f]" : "text-[#755d52]"
          }`}
        >
          {message.text}
        </p>
      )}

      {!finished && stepsLeft !== null && (
        <p className="mt-4 text-center text-sm font-bold text-[#755d52]">
          🐾 Shortest way from {last.toUpperCase()}: {stepsLeft} more step{stepsLeft === 1 ? "" : "s"}
          <span className="block font-normal text-[#9a8175]">
            Par {puzzle.par} = the whole ladder in {puzzle.par} steps
          </span>
        </p>
      )}
      {!finished && stepsLeft === null && rungs.length > 1 && (
        <p className="mt-4 text-center text-sm font-bold text-[#b23b4f]">
          There&apos;s no way to {puzzle.end.toUpperCase()} from {last.toUpperCase()}. Try undoing a step.
        </p>
      )}

      {!finished && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={undo} disabled={rungs.length <= 1} className={pillButton}>
            ↩ Undo
          </button>
          <button type="button" onClick={hint} disabled={hints >= MAX_HINTS} className={pillButton}>
            💡 Hint
          </button>
          <button type="button" onClick={giveUp} className={pillButton}>
            Show answer
          </button>
        </div>
      )}

      {finished && (
        <div className="mt-6 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-center">
          {solved ? (
            <>
              <p className="text-xl font-black text-[#4a2e25]">
                🎉 You climbed it in {steps} step{steps === 1 ? "" : "s"}!
              </p>
              <p className="mt-1 text-[#755d52]">
                {steps < puzzle.par
                  ? "Wow, you beat par! Top Cat climbing. 🐱"
                  : steps === puzzle.par
                    ? "Right on par. Purr-fect! ⭐"
                    : `Par was ${puzzle.par}. Tootie's way: ${puzzle.solution.map((w) => w.toUpperCase()).join(" → ")}`}
              </p>
              {!practice && (
                <button type="button" onClick={share} className={`${pillButton} mt-4`}>
                  {copied ? "✓ Result copied!" : "📤 Share my ladder"}
                </button>
              )}
            </>
          ) : (
            <p className="font-bold text-[#4a2e25]">
              Here&apos;s one way to finish. Tootie&apos;s full ladder: {puzzle.solution.map((w) => w.toUpperCase()).join(" → ")}
            </p>
          )}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={startPractice} className={pillButton}>
              🪜 {practice ? "Another practice ladder" : "Try a practice ladder"}
            </button>
            {practice && (
              <button type="button" onClick={() => setPractice(null)} className={pillButton}>
                📅 Back to today&apos;s ladder
              </button>
            )}
          </div>
          {practice ? (
            <p className="mt-3 text-sm text-[#9a8175]">
              Practice ladders are unlimited. A new daily ladder arrives at midnight your local time.
            </p>
          ) : (
            <NextPuzzleCountdown label="Next ladder in" />
          )}
        </div>
      )}

      {!finished && (
        <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-[#f0ded0] pt-4 text-sm">
          {practice ? (
            <>
              <button type="button" onClick={startPractice} className={pillButton}>
                🔀 New practice ladder
              </button>
              <button type="button" onClick={() => setPractice(null)} className={pillButton}>
                📅 Today&apos;s ladder
              </button>
            </>
          ) : (
            <button type="button" onClick={startPractice} className={pillButton}>
              🪜 Practice ladder
            </button>
          )}
        </div>
      )}
    </div>
  );
}
