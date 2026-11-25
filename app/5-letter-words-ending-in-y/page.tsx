import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In Y – Word Finder",
  description:
    "Browse 227 common 5-letter words ending in Y, like EVERY, MONEY, and HAPPY. Half use a double letter. See traps like _ERRY and filter your clues. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-y",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-y",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In Y – Word Finder",
    description:
    "Browse 227 common 5-letter words ending in Y, like EVERY, MONEY, and HAPPY. Half use a double letter. See traps like _ERRY and filter your clues. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In Y",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In Y – Word Finder",
    description:
    "Browse 227 common 5-letter words ending in Y, like EVERY, MONEY, and HAPPY. Half use a double letter. See traps like _ERRY and filter your clues. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInYPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="y"
      tip="Half of these words repeat a letter, usually right before the Y: HAPPY, SORRY, FUNNY, CARRY. If you're stuck, try doubling the fourth letter."
    />
  );
}