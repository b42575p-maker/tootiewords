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
      title={`Copy ${word}`}
      aria-label={copied ? `${word} copied` : `Copy ${word}`}
      className={`word-chip border-[#efc89f] bg-white transition hover:-translate-y-0.5 hover:border-[#ef9b4a] hover:bg-[#fff0df] ${className}`}
    >
      {copied ? "✓ Copied!" : word}
    </button>
  );
}
