import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With A – Word Finder",
  description:
    "Browse 116 common 5-letter words starting with A, like ABOUT, AFTER, and AGAIN. See common traps, smart guesses, and filter by the letters you know. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-a",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-a",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With A – Word Finder",
    description:
    "Browse 116 common 5-letter words starting with A, like ABOUT, AFTER, and AGAIN. See common traps, smart guesses, and filter by the letters you know. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With A",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With A – Word Finder",
    description:
    "Browse 116 common 5-letter words starting with A, like ABOUT, AFTER, and AGAIN. See common traps, smart guesses, and filter by the letters you know. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithAPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="a"
      tip="92% of common 5-letter A words put a consonant second. AL and AR are the most common starts, as in ALONG, ALLOW, AREAS, and ARMED."
    />
  );
}