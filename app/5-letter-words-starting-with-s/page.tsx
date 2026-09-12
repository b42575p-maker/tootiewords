import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words Starting With S - Word Finder",
  description:
    "Find 5 letter words starting with S. Browse common and all five-letter words beginning with S and narrow the list with helpful filters.",
};

export default function FiveLetterWordsStartingWithSPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="s"
    />
  );
}