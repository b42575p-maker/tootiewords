import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With A In The Second Position",

  description:
    "Browse 386 common 5-letter words with A as the second letter, like WATER, PARTY, and MAKES. See traps like _ATCH and filter your clues. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-with-a-in-second-position",
  },

  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/5-letter-words-with-a-in-second-position",
    siteName: "TootieWords",
    title:
      "5 Letter Words With A In The Second Position",
    description:
    "Browse 386 common 5-letter words with A as the second letter, like WATER, PARTY, and MAKES. See traps like _ATCH and filter your clues. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "5 Letter Words With A In The Second Position",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5 Letter Words With A In The Second Position",
    description:
    "Browse 386 common 5-letter words with A as the second letter, like WATER, PARTY, and MAKES. See traps like _ATCH and filter your clues. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithAInSecondPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="a"
      position={2}
      tip="R, N, and T are the most common letters right after the A, as in PARTY, HANDS, and WATCH."
    />
  );
}