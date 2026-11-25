import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With O In The Second Position",

  description:
    "Browse 373 common 5-letter words with O as the second letter, like WORLD, HOUSE, and MONEY. See traps like _OUND and filter your clues. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-with-o-in-second-position",
  },

  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/5-letter-words-with-o-in-second-position",
    siteName: "TootieWords",
    title:
      "5 Letter Words With O In The Second Position",
    description:
    "Browse 373 common 5-letter words with O as the second letter, like WORLD, HOUSE, and MONEY. See traps like _OUND and filter your clues. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "5 Letter Words With O In The Second Position",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5 Letter Words With O In The Second Position",
    description:
    "Browse 373 common 5-letter words with O as the second letter, like WORLD, HOUSE, and MONEY. See traps like _OUND and filter your clues. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithOInSecondPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="o"
      position={2}
      tip="U and R are the most common letters right after the O (12% each), as in FOUND, HOUSE, WORLD, and NORTH."
    />
  );
}