import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words Starting With A - Word Finder",
  description:
    "Find 5 letter words starting with A. Browse common and all five-letter words beginning with A and narrow the list with helpful filters.",
};

export default function FiveLetterWordsStartingWithAPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="a"
    />
  );
}