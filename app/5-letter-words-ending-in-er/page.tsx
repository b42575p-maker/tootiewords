import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In ER – Word Finder",
  description:
    "Browse 107 common 5-letter words ending in ER, like OTHER, WATER, and NEVER. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-er",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-er",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In ER – Word Finder",
    description:
      "Browse 107 common 5-letter words ending in ER, like OTHER, WATER, and NEVER. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In ER",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In ER – Word Finder",
    description:
      "Browse 107 common 5-letter words ending in ER, like OTHER, WATER, and NEVER. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInErPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="er"
      tip="With -ER fixed, only three letters are left to find. In 73% of these words the second letter is a vowel, as in WATER, NEVER, and POWER, and T and V are the most common third letters (OTHER, AFTER, NEVER, COVER)."
    />
  );
}
