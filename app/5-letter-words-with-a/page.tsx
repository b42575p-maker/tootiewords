import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words With A – Word Finder",
  description:
    "Browse 951 common 5-letter words with A, like WATER, PLACE, and GREAT. See where A usually sits, common traps, and smart guesses. Free word finder.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-with-a",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-with-a",
    siteName: "TootieWords",
    title: "5 Letter Words With A – Word Finder",
    description:
    "Browse 951 common 5-letter words with A, like WATER, PLACE, and GREAT. See where A usually sits, common traps, and smart guesses. Free word finder.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words With A",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words With A – Word Finder",
    description:
    "Browse 951 common 5-letter words with A, like WATER, PLACE, and GREAT. See where A usually sits, common traps, and smart guesses. Free word finder.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithAPage() {
  return (
    <FiveLetterPatternPage
      patternType="contains"
      letters="a"
      tip="A is usually the second letter (41%) or the third (33%). If your A is yellow, try those two spots first."
    />
  );
}