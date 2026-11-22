"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  FIRST_PUZZLE_DATE,
  MAX_HINTS,
  checkGuess,
  describeHint,
  maxPoints,
  nextRank,
  pickHint,
  rankFor,
  scoreFor,
  shareText,
  shiftDateKey,
  toDateKey,
  type DailyPuzzle,
} from "@/lib/word-pounce";

type SavedProgress = {
  found: string[];
  hints: string[];
  gaveUp?: boolean;
};

type SavedStats = {
  lastPlayed: string;
  streak: number;
  bestStreak: number;
};

const button =
  "font-hand rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-5 py-3 text-lg font-bold sm:text-base text-[#9a5221] transition hover:border-[#ef9b4a] hover:bg-[#ffe4c4] disabled:cursor-not-allowed disabled:opacity-50";

function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked (private browsing); the game still works.
  }
}

async function loadPuzzle(dateKey: string): Promise<DailyPuzzle | null> {
  try {
    const response = await fetch(`/word-pounce/${dateKey.slice(0, 7)}.json`);
    if (!response.ok) return null;
    const month = (await response.json()) as Record<string, DailyPuzzle>;
    return month[dateKey] ?? null;
  } catch {
    return null;
  }
}

function todayKey() {
  const key = toDateKey(new Date());
  return key < FIRST_PUZZLE_DATE ? FIRST_PUZZLE_DATE : key;
}

function shuffle(letters: string[]) {
  const copy = [...letters];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function WordPounceGame() {
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [puzzle, setPuzzle] = useState<DailyPuzzle | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [hints, setHints] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; tone: "good" | "bad" | "info" } | null>(null);
  const [stats, setStats] = useState<SavedStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [yesterday, setYesterday] = useState<DailyPuzzle | null | "hidden">("hidden");
  const [gaveUp, setGaveUp] = useState(false);
  const [confirmGiveUp, setConfirmGiveUp] = useState(false);

  // Pick today's puzzle from the player's local date, then switch to the
  // new puzzle automatically at local midnight.
  useEffect(() => {
    const checkDate = () => setDateKey(todayKey());
    let timer = 0;

    function scheduleMidnight() {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
      timer = window.setTimeout(() => {
        checkDate();
        scheduleMidnight();
      }, nextMidnight.getTime() - now.getTime());
    }

    function onVisible() {
      if (document.visibilityState === "visible") checkDate();
    }

    checkDate();
    scheduleMidnight();
    // Phones pause timers while the screen is off, so also check the date
    // whenever the player comes back to the page.
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", checkDate);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", checkDate);
    };
  }, []);

  // Load the puzzle (and any saved progress) whenever the date changes.
  useEffect(() => {
    if (!dateKey) return;
    let cancelled = false;

    setStatus("loading");
    loadPuzzle(dateKey).then((daily) => {
      if (cancelled) return;
      if (!daily) {
        setPuzzle(null);
        setStatus("missing");
        return;
      }

      const saved = readStorage<SavedProgress>(`word-pounce-${dateKey}`);
      setPuzzle(daily);
      setTiles(daily.letters.split(""));
      setSelected([]);
      setFound(saved?.found ?? []);
      setHints(saved?.hints ?? []);
      setGaveUp(saved?.gaveUp ?? false);
      setConfirmGiveUp(false);
      setMessage(null);
      setYesterday("hidden");
      setStats(readStorage<SavedStats>("word-pounce-stats"));
      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, [dateKey]);

  const guess = selected.map((index) => tiles[index]).join("");

  const score = useMemo(
    () => (puzzle ? scoreFor(found, puzzle) : { points: 0, answersFound: 0, bonusFound: 0 }),
    [found, puzzle]
  );
  const max = useMemo(() => (puzzle ? maxPoints(puzzle) : 0), [puzzle]);
  const rank = rankFor(score.points, max);
  const upcoming = nextRank(score.points, max);
  const pounced = puzzle ? found.some((word) => word.length === puzzle.letters.length) : false;

  const saveProgress = useCallback(
    (nextFound: string[], nextHints: string[], nextGaveUp = false) => {
      if (!dateKey) return;
      writeStorage(`word-pounce-${dateKey}`, { found: nextFound, hints: nextHints, gaveUp: nextGaveUp });
    },
    [dateKey]
  );

  const recordPlay = useCallback(() => {
    if (!dateKey) return;
    const current = readStorage<SavedStats>("word-pounce-stats");
    if (current?.lastPlayed === dateKey) return;

    const continued = current?.lastPlayed === shiftDateKey(dateKey, -1);
    const streak = continued ? current.streak + 1 : 1;
    const next = {
      lastPlayed: dateKey,
      streak,
      bestStreak: Math.max(streak, current?.bestStreak ?? 0),
    };

    writeStorage("word-pounce-stats", next);
    setStats(next);
  }, [dateKey]);

  const addLetter = useCallback(
    (index: number) => {
      if (gaveUp || selected.includes(index)) return;
      setSelected((current) => [...current, index]);
      setMessage(null);
    },
    [gaveUp, selected]
  );

  const removeLetter = useCallback(() => {
    setSelected((current) => current.slice(0, -1));
  }, []);

  const clearGuess = useCallback(() => setSelected([]), []);

  const submit = useCallback(() => {
    if (!puzzle || !guess || gaveUp) return;
    const result = checkGuess(guess, puzzle, found);

    if (result.kind === "answer" || result.kind === "bonus") {
      const nextFound = [...found, guess];
      setFound(nextFound);
      saveProgress(nextFound, hints);
      recordPlay();
    }

    switch (result.kind) {
      case "too-short":
        setMessage({ text: "Words need at least 3 letters.", tone: "bad" });
        break;
      case "already-found":
        setMessage({ text: `You already found ${guess.toUpperCase()}.`, tone: "info" });
        break;
      case "answer":
        setMessage({
          text: result.pounce
            ? `POUNCE! ${guess.toUpperCase()} uses every letter! +${result.points}`
            : `Nice! ${guess.toUpperCase()} +${result.points}`,
          tone: "good",
        });
        break;
      case "bonus":
        setMessage({ text: `${guess.toUpperCase()} is a rare bonus word! It counts toward your bonus total.`, tone: "good" });
        break;
      default:
        setMessage({ text: `${guess.toUpperCase()} isn't in Tootie's word list.`, tone: "bad" });
    }

    setSelected([]);
  }, [found, gaveUp, guess, hints, puzzle, recordPlay, saveProgress]);

  // Physical keyboard support.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (status !== "ready" || gaveUp || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "Enter") {
        event.preventDefault();
        submit();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        removeLetter();
      } else if (event.key === "Escape") {
        clearGuess();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        const letter = event.key.toLowerCase();
        const index = tiles.findIndex((tile, i) => tile === letter && !selected.includes(i));
        if (index !== -1) addLetter(index);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [addLetter, clearGuess, gaveUp, removeLetter, selected, status, submit, tiles]);

  function giveHint() {
    if (!puzzle || hints.length >= MAX_HINTS) return;
    const word = pickHint(puzzle, found, hints);
    if (!word) {
      setMessage({ text: "You've found every word. Tootie has no hints left to give!", tone: "info" });
      return;
    }
    const nextHints = [...hints, word];
    setHints(nextHints);
    saveProgress(found, nextHints);
  }

  function giveUp() {
    setGaveUp(true);
    setConfirmGiveUp(false);
    setSelected([]);
    saveProgress(found, hints, true);
    recordPlay();
    setMessage({ text: "Here are all of today's words. Come back tomorrow for a new puzzle!", tone: "info" });
  }

  async function share() {
    if (!puzzle) return;
    const text = shareText(puzzle, rank.name, score.answersFound, pounced, hints.length);

    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      // Fall back to copying if sharing is cancelled or unavailable.
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setMessage({ text: "Couldn't copy your result. Try again?", tone: "bad" });
    }
  }

  async function toggleYesterday() {
    if (yesterday !== "hidden") {
      setYesterday("hidden");
      return;
    }
    if (!dateKey) return;
    const previous = await loadPuzzle(shiftDateKey(dateKey, -1));
    setYesterday(previous);
  }

  if (status === "loading") {
    return (
      <div className="rounded-[2rem] border-2 border-[#efd3ba] bg-white p-10 text-center text-[#755d52]">
        🐾 Tootie is setting out today&apos;s letters...
      </div>
    );
  }

  if (status === "missing" || !puzzle) {
    return (
      <div className="rounded-[2rem] border-2 border-[#efd3ba] bg-white p-10 text-center text-[#755d52]">
        Today&apos;s puzzle isn&apos;t ready yet. Please check back soon!
      </div>
    );
  }

  const foundAnswers = found.filter((word) => puzzle.answers.includes(word));
  const foundBonus = found.filter((word) => puzzle.bonus.includes(word));
  const missedAnswers = gaveUp ? puzzle.answers.filter((word) => !found.includes(word)) : [];
  const missedByLength = missedAnswers.reduce<Record<number, string[]>>((groups, word) => {
    (groups[word.length] ??= []).push(word);
    return groups;
  }, {});
  const byLength = foundAnswers.reduce<Record<number, string[]>>((groups, word) => {
    (groups[word.length] ??= []).push(word);
    return groups;
  }, {});

  return (
    <div className="word-pounce-game rounded-[2rem] border-2 border-[#efd3ba] bg-white p-5 shadow-[0_18px_40px_rgba(86,51,36,0.08)] sm:p-8">
      {/* Score bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-hand text-sm font-bold text-[#9a5221]">Puzzle #{puzzle.number}</p>
          <p className="text-2xl font-black text-[#4a2e25]">{rank.name}</p>
          <p className="text-sm text-[#755d52]">
            {score.points} points
            {upcoming ? ` · ${upcoming.pointsNeeded} more for ${upcoming.name}` : " · Top rank reached!"}
          </p>
        </div>
        <div className="text-right text-sm text-[#755d52]">
          <p>
            <strong className="text-[#4a2e25]">{score.answersFound}</strong> of {puzzle.answers.length} words
          </p>
          {score.bonusFound > 0 && <p>+{score.bonusFound} bonus</p>}
          {stats && (
            <p>
              🔥 {stats.streak}-day streak
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f6e6d7]" aria-hidden="true">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] transition-all"
          style={{ width: `${Math.min(100, max ? (score.points / max) * 100 : 0)}%` }}
        />
      </div>

      {/* Current guess */}
      <div
        className="mt-6 flex min-h-[3.5rem] items-center justify-center rounded-2xl border-2 border-dashed border-[#ead6c5] bg-[#fffaf4] px-4 text-3xl font-black uppercase tracking-[0.2em] text-[#4a2e25]"
        aria-live="polite"
        aria-label={guess ? `Current word: ${guess}` : "No letters selected"}
      >
        {guess || <span className="text-base font-bold tracking-normal text-[#b59d8f]">Tap letters or type</span>}
      </div>

      {/* Letter tiles */}
      <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
        {tiles.map((letter, index) => {
          const used = selected.includes(index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => addLetter(index)}
              disabled={used || gaveUp}
              aria-label={`Letter ${letter.toUpperCase()}`}
              className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-black uppercase shadow-md transition sm:h-16 sm:w-16 ${
                used || gaveUp
                  ? "bg-[#f3e4d6] text-[#c9b3a4] shadow-none"
                  : "bg-[#f5b05d] text-[#4e332a] hover:-translate-y-0.5 hover:bg-[#f7a64a]"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
        <button type="button" onClick={removeLetter} disabled={!guess} className={button}>
          ⌫ Delete
        </button>
        <button type="button" onClick={() => { setTiles(shuffle(tiles)); setSelected([]); }} disabled={gaveUp} className={button}>
          🔀 Shuffle
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!guess || gaveUp}
          className="font-hand rounded-full border-2 border-[#d8741e] bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] px-6 py-3 text-lg font-bold sm:text-base text-[#4a2618] shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          🐾 Pounce!
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-4 text-center font-bold ${
            message.tone === "good" ? "text-[#2f7a3e]" : message.tone === "bad" ? "text-[#b23b4f]" : "text-[#755d52]"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Hints */}
      <div className="mt-8 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-hand font-bold text-[#9a5221]">🐱 Tootie&apos;s hints ({MAX_HINTS - hints.length} left today)</p>
          <button type="button" onClick={giveHint} disabled={hints.length >= MAX_HINTS || gaveUp} className={button}>
            Ask Tootie
          </button>
        </div>
        {hints.length > 0 && (
          <ul className="mt-3 space-y-1 text-[#5f4a40]">
            {hints.map((word) => (
              <li key={word}>
                {found.includes(word) ? "✓ " : "• "}
                {describeHint(word)}
                {found.includes(word) && ` (${word.toUpperCase()})`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Found words */}
      <div className="mt-8">
        <h2 className="text-xl font-black text-[#4a2e25]">Your words</h2>
        {foundAnswers.length === 0 ? (
          <p className="mt-2 text-[#755d52]">No words yet. Every puzzle has a word that uses all 7 letters!</p>
        ) : (
          <div className="mt-3 space-y-3">
            {Object.keys(byLength)
              .map(Number)
              .sort((a, b) => b - a)
              .map((length) => (
                <div key={length}>
                  <p className="text-sm font-bold text-[#9a8175]">{length} letters</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {byLength[length].sort().map((word) => (
                      <span key={word} className="word-chip border-[#ead6c5] bg-[#fffaf4] uppercase">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
        {foundBonus.length > 0 && (
          <p className="mt-4 text-sm text-[#755d52]">
            <strong>Bonus words:</strong> {foundBonus.map((word) => word.toUpperCase()).join(", ")}
          </p>
        )}
      </div>

      {/* Give up / missed words */}
      {gaveUp ? (
        <div className="mt-8 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5">
          <h2 className="text-xl font-black text-[#4a2e25]">Words you missed</h2>
          {missedAnswers.length === 0 ? (
            <p className="mt-2 text-[#755d52]">None! You found every word. 🎉</p>
          ) : (
            <div className="mt-3 space-y-3">
              {Object.keys(missedByLength)
                .map(Number)
                .sort((a, b) => b - a)
                .map((length) => (
                  <div key={length}>
                    <p className="text-sm font-bold text-[#9a8175]">
                      {length} letters{length === puzzle.letters.length ? " · the Pounce word!" : ""}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {missedByLength[length].sort().map((word) => (
                        <span key={word} className="word-chip border-dashed border-[#ead6c5] bg-white uppercase text-[#9a8175]">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
          <p className="mt-4 text-sm text-[#755d52]">A new puzzle arrives at midnight. 🐾</p>
        </div>
      ) : (
        score.answersFound < puzzle.answers.length && (
          <div className="mt-8 text-center">
            {confirmGiveUp ? (
              <div className="rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-4">
                <p className="font-bold text-[#4a2e25]">Show all the answers? You won&apos;t be able to keep playing today&apos;s puzzle.</p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={giveUp} className={button}>
                    Yes, show answers
                  </button>
                  <button type="button" onClick={() => setConfirmGiveUp(false)} className={button}>
                    Keep playing
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmGiveUp(true)} className={button}>
                🏳️ Give up &amp; show answers
              </button>
            )}
          </div>
        )
      )}

      {/* Share and yesterday */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-[#f0ded0] pt-6">
        <button type="button" onClick={share} disabled={score.answersFound === 0} className={button}>
          {copied ? "✓ Result copied!" : "📤 Share my result"}
        </button>
        <button type="button" onClick={toggleYesterday} className={button}>
          {yesterday === "hidden" ? "Yesterday's answers" : "Hide yesterday's answers"}
        </button>
      </div>

      {yesterday !== "hidden" && (
        <div className="mt-5 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-[#5f4a40]">
          {yesterday ? (
            <>
              <p className="font-bold text-[#4a2e25]">
                Puzzle #{yesterday.number}: {yesterday.letters.toUpperCase().split("").sort().join(" ")}
              </p>
              <p className="mt-2 leading-7">
                {yesterday.answers
                  .slice()
                  .sort((a, b) => b.length - a.length || a.localeCompare(b))
                  .map((word) => word.toUpperCase())
                  .join(", ")}
              </p>
            </>
          ) : (
            <p>Today is the very first puzzle, so there are no answers from yesterday yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
