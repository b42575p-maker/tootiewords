import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With R In The Third Position",
  description:
    "Find 5 letter words with R in the third position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",
};

export default function FiveLetterWordsWithRInThirdPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="r"
      position={3}
    />
  );
}