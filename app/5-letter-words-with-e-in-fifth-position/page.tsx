import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With E In The Fifth Position",
  description:
    "Find 5 letter words with E in the fifth position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",
};

export default function FiveLetterWordsWithEInFifthPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="e"
      position={5}
    />
  );
}