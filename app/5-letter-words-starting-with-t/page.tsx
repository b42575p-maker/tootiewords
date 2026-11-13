import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With T – Word Finder",
  description:
    "Browse 167 common 5-letter words starting with T, like THINK, THREE, and TRUST. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-t",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-t",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With T – Word Finder",
    description:
      "Browse 167 common 5-letter words starting with T, like THINK, THREE, and TRUST. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With T",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With T – Word Finder",
    description:
      "Browse 167 common 5-letter words starting with T, like THINK, THREE, and TRUST. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithTPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="t"
      tip="TR is the most common start at 21%, as in TRUST and TRAIN. TH words make up only 13% of the list, but they include some of the most common words in English: THEIR, THERE, THESE, THINK, and THREE."
    />
  );
}
