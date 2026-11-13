import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With F – Word Finder",
  description:
    "Browse 169 common 5-letter words starting with F, like FIRST, FOUND, and FLOOR. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-f",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-f",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With F – Word Finder",
    description:
      "Browse 169 common 5-letter words starting with F, like FIRST, FOUND, and FLOOR. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With F",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With F – Word Finder",
    description:
      "Browse 169 common 5-letter words starting with F, like FIRST, FOUND, and FLOOR. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithFPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="f"
      tip="FL is the most common start at 21%, as in FLOOR, FLASH, FLEET, and FLOOD. FA, FI, and FO follow closely, so if the second letter isn't L, test a vowel next."
    />
  );
}
