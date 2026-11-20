"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { toDateKey } from "@/lib/word-pounce";
import { WORD_SEARCH_THEMES } from "@/lib/word-search-themes";
import {
  DIFFICULTIES,
  DIFFICULTY_ORDER,
  dailyPuzzle,
  formatTime,
  generatePuzzle,
  lineCells,
  matchSelection,
  randomTheme,
  shareText,
  type Cell,
  type Difficulty,
  type Puzzle,
} from "@/lib/word-search";

type Mode = { kind: "daily" } | { kind: "random"; seed: string; themeSlug: string };

type SavedDaily = {
  found: string[];
  startedAt: number | null;
  seconds: number | null;
};

const FOUND_COLORS = ["#ffd6a5", "#caffbf", "#9bf6ff", "#d9ccff", "#ffc6ff", "#fdffb6", "#ffadad", "#bde0fe", "#b9fbc0", "#ffcfd2", "#e2ece9", "#fde4cf"];

const pill =
  "font-hand rounded-full border-2 px-4 py-2 font-bold transition disabled:cursor-not-allowed disabled:opacity-50";
const pillIdle = "border-[#efc9a8] bg-[#fff0df] text-[#9a5221] hover:border-[#ef9b4a] hover:bg-[#ffe4c4]";
const pillActive = "border-[#d8741e] bg-[#ffd9ae] text-[#7a3f14]";

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

function sameCell(a: Cell | null, b: Cell | null) {
  return !!a && !!b && a[0] === b[0] && a[1] === b[1];
}

function cellFromPoint(x: number, y: number): Cell | null {
  const element = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-ws-cell]");
  if (!element) return null;
  return [Number(element.dataset.row), Number(element.dataset.col)];
}

function dateLabel(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function printPuzzle(puzzle: Puzzle, title: string) {
  const popup = window.open("", "_blank", "width=820,height=1000");
  if (!popup) return false;

  const rows = puzzle.grid
    .map((row) => `<tr>${row.map((letter) => `<td>${letter}</td>`).join("")}</tr>`)
    .join("");
  const words = puzzle.placements.map((placement) => `<li>${placement.word}</li>`).join("");
  const cellSize = Math.floor(560 / puzzle.size);

  popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: "Comic Sans MS", "Comic Neue", Arial, sans-serif; color: #000; margin: 32px; text-align: center; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  p { margin: 0 0 20px; font-size: 15px; }
  table { border-collapse: collapse; margin: 0 auto 24px; }
  td { width: ${cellSize}px; height: ${cellSize}px; text-align: center; font-size: ${Math.round(cellSize * 0.55)}px; font-weight: bold; border: 1px solid #ccc; }
  ul { list-style: none; padding: 0; margin: 0 auto; max-width: 600px; columns: 3; font-size: 18px; text-align: left; }
  li { margin: 6px 0; padding-left: 26px; position: relative; }
  li::before { content: ""; position: absolute; left: 0; top: 3px; width: 14px; height: 14px; border: 2px solid #000; border-radius: 3px; }
  footer { margin-top: 28px; font-size: 13px; color: #444; }
</style></head><body>
<h1>${puzzle.theme.name} Word Search</h1>
<p>${DIFFICULTIES[puzzle.difficulty].label} · Find all ${puzzle.placements.length} words</p>
<table>${rows}</table>
<ul>${words}</ul>
<footer>Free printable word search from TootieWords · Play online at tootiewords.com/word-search</footer>
<script>window.onload = function () { window.print(); };</script>
</body></html>`);
  popup.document.close();
  return true;
}

export default function WordSearchGame() {
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<Mode>({ kind: "daily" });
  const [found, setFound] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedSeconds, setFinishedSeconds] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [anchor, setAnchor] = useState<Cell | null>(null);
  const [hover, setHover] = useState<Cell | null>(null);
  const [message, setMessage] = useState<{ text: string; tone: "good" | "info" } | null>(null);
  const [copied, setCopied] = useState(false);
  const dragging = useRef(false);
  const moved = useRef(false);

  // Pick the date and the player's last difficulty on the client.
  useEffect(() => {
    setDateKey(toDateKey(new Date()));
    const saved = readStorage<Difficulty>("word-search-difficulty");
    if (saved && saved in DIFFICULTIES) setDifficulty(saved);
  }, []);

  const puzzle = useMemo(() => {
    if (!dateKey) return null;
    if (mode.kind === "daily") return dailyPuzzle(dateKey, difficulty);
    const theme = WORD_SEARCH_THEMES.find((item) => item.slug === mode.themeSlug) ?? WORD_SEARCH_THEMES[0];
    return generatePuzzle(theme, difficulty, mode.seed);
  }, [dateKey, difficulty, mode]);

  const storageKey = mode.kind === "daily" && dateKey ? `word-search-${dateKey}-${difficulty}` : null;

  // Load saved progress whenever the puzzle changes.
  useEffect(() => {
    setAnchor(null);
    setHover(null);
    setMessage(null);
    setCopied(false);
    const saved = storageKey ? readStorage<SavedDaily>(storageKey) : null;
    setFound(saved?.found ?? []);
    setStartedAt(saved?.startedAt ?? null);
    setFinishedSeconds(saved?.seconds ?? null);
  }, [puzzle, storageKey]);

  // Tick the timer once a second while playing.
  useEffect(() => {
    if (!startedAt || finishedSeconds !== null) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [startedAt, finishedSeconds]);

  const elapsed =
    finishedSeconds ?? (startedAt ? Math.max(0, Math.floor(((now || Date.now()) - startedAt) / 1000)) : 0);

  const save = useCallback(
    (next: SavedDaily) => {
      if (storageKey) writeStorage(storageKey, next);
    },
    [storageKey]
  );

  const foundColor = useMemo(() => {
    const colors = new Map<string, string>();
    if (!puzzle) return colors;
    found.forEach((word, index) => {
      const placement = puzzle.placements.find((item) => item.word === word);
      placement?.cells.forEach(([r, c]) => colors.set(`${r}-${c}`, FOUND_COLORS[index % FOUND_COLORS.length]));
    });
    return colors;
  }, [found, puzzle]);

  const selecting = useMemo(() => {
    if (!anchor) return new Set<string>();
    const cells = lineCells(anchor, hover ?? anchor) ?? [anchor];
    return new Set(cells.map(([r, c]) => `${r}-${c}`));
  }, [anchor, hover]);

  const complete = !!puzzle && found.length === puzzle.placements.length;

  function startTimer() {
    if (startedAt || complete) return startedAt;
    const start = Date.now();
    setStartedAt(start);
    save({ found, startedAt: start, seconds: null });
    return start;
  }

  function finishSelection(start: Cell, end: Cell) {
    if (!puzzle) return;
    const cells = lineCells(start, end);
    setAnchor(null);
    setHover(null);
    if (!cells || cells.length < 2) return;

    const word = matchSelection(puzzle, cells, found);
    if (!word) {
      setMessage({ text: "Not one of the words. Keep looking!", tone: "info" });
      return;
    }

    const start0 = startedAt ?? Date.now();
    const nextFound = [...found, word];
    const done = nextFound.length === puzzle.placements.length;
    const seconds = done ? Math.max(1, Math.round((Date.now() - start0) / 1000)) : null;

    setFound(nextFound);
    if (done) setFinishedSeconds(seconds);
    save({ found: nextFound, startedAt: start0, seconds });
    setMessage({ text: done ? "🎉 You found them all!" : `Found ${word}! 🐾`, tone: "good" });
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (complete) return;
    const cell = cellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    event.preventDefault();
    startTimer();
    dragging.current = true;
    moved.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);

    // Second tap of a tap-tap selection.
    if (anchor && !sameCell(anchor, cell)) {
      finishSelection(anchor, cell);
      dragging.current = false;
      return;
    }
    // Tapping the selected letter again cancels it.
    if (anchor && sameCell(anchor, cell)) {
      setAnchor(null);
      setHover(null);
      dragging.current = false;
      return;
    }
    setAnchor(cell);
    setHover(cell);
    setMessage(null);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || !anchor) return;
    const cell = cellFromPoint(event.clientX, event.clientY);
    if (!cell || sameCell(cell, hover)) return;
    moved.current = true;
    setHover(cell);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const cell = cellFromPoint(event.clientX, event.clientY) ?? hover;
    if (anchor && cell && moved.current && !sameCell(anchor, cell)) {
      finishSelection(anchor, cell);
    }
    // Otherwise keep the first letter selected so the player can tap the last letter.
  }

  function chooseDifficulty(next: Difficulty) {
    setDifficulty(next);
    writeStorage("word-search-difficulty", next);
  }

  function newRandomPuzzle() {
    const current = puzzle?.theme.slug;
    const theme = randomTheme(Math.random, current);
    setMode({ kind: "random", seed: `r-${Date.now()}-${Math.random()}`, themeSlug: theme.slug });
  }

  async function share() {
    if (!puzzle || finishedSeconds === null) return;
    const text = shareText(puzzle, mode.kind === "daily" && dateKey ? `Daily ${dateLabel(dateKey)}` : null, finishedSeconds);
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      // Fall back to copying.
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setMessage({ text: "Couldn't copy your result. Try again?", tone: "info" });
    }
  }

  function print() {
    if (!puzzle) return;
    if (!printPuzzle(puzzle, `${puzzle.theme.name} Word Search – TootieWords`)) {
      setMessage({ text: "Please allow pop-ups to print the puzzle.", tone: "info" });
    }
  }

  if (!puzzle || !dateKey) {
    return (
      <div className="rounded-[2rem] border-2 border-[#efd3ba] bg-white p-10 text-center text-[#755d52]">
        🐾 Tootie is hiding today&apos;s words...
      </div>
    );
  }

  const fontSize = `calc(min(100vw - 4.5rem, 560px) / ${puzzle.size} * 0.52)`;

  return (
    <div className="word-search-game rounded-[2rem] border-2 border-[#efd3ba] bg-white p-4 shadow-[0_18px_40px_rgba(86,51,36,0.08)] sm:p-8">
      {/* Puzzle info */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-hand text-sm font-bold text-[#9a5221]">
            {mode.kind === "daily" ? `Daily puzzle · ${dateLabel(dateKey)}` : "Bonus puzzle"}
          </p>
          <p className="text-2xl font-black text-[#4a2e25]">
            {puzzle.theme.emoji} {puzzle.theme.name}
          </p>
          <p className="text-sm text-[#755d52]">{DIFFICULTIES[difficulty].blurb}</p>
        </div>
        <div className="text-right text-sm text-[#755d52]">
          <p>
            <strong className="text-[#4a2e25]">{found.length}</strong> of {puzzle.placements.length} found
          </p>
          <p>⏱ {formatTime(elapsed)}</p>
        </div>
      </div>

      {/* Difficulty */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Difficulty">
        {DIFFICULTY_ORDER.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => chooseDifficulty(level)}
            aria-pressed={difficulty === level}
            className={`${pill} ${difficulty === level ? pillActive : pillIdle}`}
          >
            {DIFFICULTIES[level].label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="mx-auto mt-5 grid w-full max-w-[560px] touch-none select-none overflow-hidden rounded-2xl border-2 border-[#ead6c5] bg-[#fffaf4]"
        style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        role="grid"
        aria-label={`${puzzle.theme.name} word search grid`}
      >
        {puzzle.grid.map((row, r) =>
          row.map((letter, c) => {
            const key = `${r}-${c}`;
            const isSelecting = selecting.has(key);
            const color = foundColor.get(key);
            return (
              <div
                key={key}
                data-ws-cell=""
                data-row={r}
                data-col={c}
                role="gridcell"
                className={`flex aspect-square items-center justify-center font-black uppercase transition-colors ${
                  isSelecting ? "bg-[#f5b05d] text-[#4e332a]" : "text-[#4a2e25]"
                } ${complete ? "" : "cursor-pointer"}`}
                style={{ fontSize, backgroundColor: isSelecting ? undefined : color }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <p className="mt-3 text-center text-sm text-[#9a8175]">
        Drag across a word, or tap its first and last letters.
      </p>

      {message && (
        <p
          role="status"
          className={`mt-2 text-center font-bold ${message.tone === "good" ? "text-[#2f7a3e]" : "text-[#755d52]"}`}
        >
          {message.text}
        </p>
      )}

      {/* Word list */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {puzzle.placements.map((placement) => {
          const index = found.indexOf(placement.word);
          const isFound = index !== -1;
          return (
            <span
              key={placement.word}
              className={`rounded-full border-2 px-3 py-1 text-sm font-bold tracking-wide sm:text-base ${
                isFound ? "border-transparent text-[#9a8175] line-through" : "border-[#ead6c5] bg-[#fffaf4] text-[#4a2e25]"
              }`}
              style={isFound ? { backgroundColor: FOUND_COLORS[index % FOUND_COLORS.length] } : undefined}
            >
              {placement.word}
            </span>
          );
        })}
      </div>

      {/* Finished */}
      {complete && finishedSeconds !== null && (
        <div className="mt-6 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-5 text-center">
          <p className="text-xl font-black text-[#4a2e25]">
            🐾 Puzzle complete in {formatTime(finishedSeconds)}!
          </p>
          <p className="mt-1 text-[#755d52]">
            {difficulty !== "hard"
              ? "Ready for a challenge? Try the next level up."
              : "Top Cat work! Try a bonus puzzle for more."}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={share} className={`${pill} ${pillIdle}`}>
              {copied ? "✓ Result copied!" : "📤 Share my time"}
            </button>
            {difficulty !== "hard" && (
              <button
                type="button"
                onClick={() => chooseDifficulty(DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(difficulty) + 1])}
                className={`${pill} ${pillIdle}`}
              >
                Try {DIFFICULTIES[DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(difficulty) + 1]].label}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-[#f0ded0] pt-5">
        {mode.kind === "random" && (
          <button type="button" onClick={() => setMode({ kind: "daily" })} className={`${pill} ${pillIdle}`}>
            📅 Today&apos;s puzzle
          </button>
        )}
        <button type="button" onClick={newRandomPuzzle} className={`${pill} ${pillIdle}`}>
          🔀 New puzzle
        </button>
        <button type="button" onClick={print} className={`${pill} ${pillIdle}`}>
          🖨️ Print
        </button>
      </div>
    </div>
  );
}
