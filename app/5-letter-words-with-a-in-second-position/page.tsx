import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With A In The Second Position",
  description:
    "Find 5 letter words with A in the second position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",
};

export default function FiveLetterWordsWithAInSecondPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="a"
      position={2}
    />
  );
}