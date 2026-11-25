import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In E – Word Finder",
  description:
    "Browse 335 common 5-letter words ending in E, like THERE, HOUSE, and WHITE. Learn the silent-E pattern, spot word traps, and filter your clues. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-e",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-e",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In E – Word Finder",
    description:
    "Browse 335 common 5-letter words ending in E, like THERE, HOUSE, and WHITE. Learn the silent-E pattern, spot word traps, and filter your clues. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In E",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In E – Word Finder",
    description:
    "Browse 335 common 5-letter words ending in E, like THERE, HOUSE, and WHITE. Learn the silent-E pattern, spot word traps, and filter your clues. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInEPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="e"
      tip="In 62% of these words the final E is silent and makes the earlier vowel long, as in PLACE, WHITE, and PHONE. Find that middle vowel next."
    />
  );
}