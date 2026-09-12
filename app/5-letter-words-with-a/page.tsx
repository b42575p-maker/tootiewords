import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With A - Word Finder",
  description:
    "Find 5 letter words with A. Browse common and all five-letter words containing A and narrow the list with helpful filters.",
};

export default function FiveLetterWordsWithAPage() {
  return (
    <FiveLetterPatternPage
      patternType="contains"
      letters="a"
    />
  );
}