import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words Ending In E - Word Finder",
  description:
    "Find 5 letter words ending in E. Browse common and all five-letter words that end in E and narrow the list with helpful filters.",
};

export default function FiveLetterWordsEndingInEPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="e"
    />
  );
}