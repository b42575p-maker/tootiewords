import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With R In The Third Position",

  description:
    "Browse 197 common 5-letter words with R as the third letter, like FIRST, WORLD, and PARTY. See common endings, traps, and smart guesses. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-with-r-in-third-position",
  },

  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/5-letter-words-with-r-in-third-position",
    siteName: "TootieWords",
    title:
      "5 Letter Words With R In The Third Position",
    description:
    "Browse 197 common 5-letter words with R as the third letter, like FIRST, WORLD, and PARTY. See common endings, traps, and smart guesses. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "5 Letter Words With R In The Third Position",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5 Letter Words With R In The Third Position",
    description:
    "Browse 197 common 5-letter words with R as the third letter, like FIRST, WORLD, and PARTY. See common endings, traps, and smart guesses. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithRInThirdPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="r"
      position={3}
      tip="A vowel comes right before the R in 87% of these words, most often A or O, as in PARTY, NORTH, and WORLD."
    />
  );
}