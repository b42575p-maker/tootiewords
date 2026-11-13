import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With B – Word Finder",
  description:
    "Browse 186 common 5-letter words starting with B, like BEING, BLACK, and BRING. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-b",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-b",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With B – Word Finder",
    description:
      "Browse 186 common 5-letter words starting with B, like BEING, BLACK, and BRING. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With B",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With B – Word Finder",
    description:
      "Browse 186 common 5-letter words starting with B, like BEING, BLACK, and BRING. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithBPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="b"
      tip="About a third of common 5-letter B words start with a consonant blend: BR (18%), as in BRING and BREAK, or BL (15%), as in BLACK and BLOOD. If your second letter isn't a vowel, R or L is the best bet."
    />
  );
}
