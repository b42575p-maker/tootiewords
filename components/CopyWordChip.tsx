"use client";

import { useState } from "react";

type CopyWordChipProps = {
  word: string;
  className?: string;
};

export default function CopyWordChip({
  word,
  className = "",
}: CopyWordChipProps) {
  const [copied, setCopied] = useState(false);

  async function copyWord() {
    try {
      await navigator.clipboard.writeText(word);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard access can be blocked by the browser; leave the word as is.
    }
  }

  return (
    <button
      type="button"
      onClick={copyWord}
      title={`Copy ${word.toUpperCase()}`}
      aria-label={copied ? `${word} copied` : `Copy ${word}`}
      className={`cursor-pointer rounded-xl border-2 border-[#ead6c5] bg-[#fffaf4] px-3 py-1 font-black uppercase tracking-wide text-[#684b3f] transition hover:-translate-y-0.5 hover:border-[#ef9b4a] hover:bg-[#fff0df] ${className}`}
    >
      {copied ? "✓ Copied!" : word}
    </button>
  );
}
