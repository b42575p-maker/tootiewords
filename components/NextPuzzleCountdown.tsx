"use client";

import { useEffect, useState } from "react";

import { msUntilMidnight } from "@/lib/games";

function format(ms: number) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

// "Next puzzle in 5h 12m": a small reason to come back tomorrow.
export default function NextPuzzleCountdown({ label = "Next puzzle in" }: { label?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(msUntilMidnight());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  if (left === null) return null;

  return (
    <p className="font-hand mt-3 text-sm font-bold text-[#9a5221]" aria-live="polite">
      ⏰ {label} {format(left)}
    </p>
  );
}
