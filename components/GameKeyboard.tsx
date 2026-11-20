"use client";

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export type KeyState = "correct" | "wrong" | undefined;

export default function GameKeyboard({
  onKey,
  states = {},
  disabled = false,
}: {
  onKey: (letter: string) => void;
  states?: Record<string, KeyState>;
  disabled?: boolean;
}) {
  return (
    <div className="mx-auto mt-5 w-full max-w-[520px] select-none space-y-1.5" aria-label="Letter keyboard">
      {ROWS.map((row) => (
        <div key={row} className="flex justify-center gap-1 sm:gap-1.5">
          {[...row].map((letter) => {
            const state = states[letter];
            return (
              <button
                key={letter}
                type="button"
                onClick={() => onKey(letter)}
                disabled={disabled || state !== undefined}
                aria-label={`Letter ${letter.toUpperCase()}`}
                className={`flex h-12 min-w-0 flex-1 items-center justify-center rounded-lg text-lg font-black uppercase transition sm:h-14 sm:max-w-[46px] sm:text-xl ${
                  state === "correct"
                    ? "bg-[#9ad49e] text-[#24502a]"
                    : state === "wrong"
                      ? "bg-[#ece3dc] text-[#c4b3a8]"
                      : "bg-[#f5b05d] text-[#4e332a] shadow-sm hover:bg-[#f7a64a] active:translate-y-px"
                } disabled:cursor-default`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
