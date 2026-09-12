import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words Ending In Y - Word Finder",
  description:
    "Find 5 letter words ending in Y. Browse common and all five-letter words that end in Y and narrow the list with helpful filters.",
};

export default function FiveLetterWordsEndingInYPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="y"
    />
  );
}