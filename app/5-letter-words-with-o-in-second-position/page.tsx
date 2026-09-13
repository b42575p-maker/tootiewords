import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With O In The Second Position",
  description:
    "Find 5 letter words with O in the second position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",
};

export default function FiveLetterWordsWithOInSecondPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="o"
      position={2}
    />
  );
}