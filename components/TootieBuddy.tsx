"use client";

import Image from "next/image";

import { TOOTIE_POSES, type TootieMood } from "@/lib/tootie";

type Tone = "good" | "bad" | "info";

// Tootie peeking over a speech bubble. Changing `beat` replays the animation
// even when the mood stays the same (two good words in a row, for example).
export default function TootieBuddy({
  mood,
  text,
  tone = "info",
  beat,
  accessory,
}: {
  mood: TootieMood;
  text: string;
  tone?: Tone;
  beat: number;
  accessory?: { emoji: string; name: string } | null;
}) {
  const color = tone === "good" ? "text-[#2f7a3e]" : tone === "bad" ? "text-[#b23b4f]" : "text-[#5f4a40]";

  return (
    <div className="mt-5 flex items-end gap-3">
      <div className="relative h-[92px] w-[104px] shrink-0 sm:h-[112px] sm:w-[126px]">
        <div key={`${mood}-${beat}`} className={`tootie-buddy tootie-${mood} h-full w-full`}>
          <Image
            src={TOOTIE_POSES[mood]}
            alt="Tootie the cat"
            width={360}
            height={320}
            className="h-full w-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(74,46,37,0.18)]"
          />
          {mood === "sleepy" && (
            <span className="tootie-zzz absolute -right-1 -top-2 text-lg font-black text-[#9a8175]" aria-hidden="true">
              z<span className="text-sm">z</span>
            </span>
          )}
        </div>
        {accessory && (
          <span
            key={accessory.emoji}
            className="tootie-accessory absolute -top-3 left-[52%] -translate-x-1/2 text-[1.7rem] drop-shadow sm:text-[2rem]"
            title={`Tootie has ${accessory.name}`}
            aria-hidden="true"
          >
            {accessory.emoji}
          </span>
        )}
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`tootie-bubble relative mb-2 flex-1 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] px-4 py-3 text-left font-bold leading-6 ${color}`}
      >
        {text}
      </div>
    </div>
  );
}
