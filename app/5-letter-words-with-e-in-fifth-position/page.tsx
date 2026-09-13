import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With E In The Fifth Position",

  description:
    "Find 5 letter words with E in the fifth position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-with-e-in-fifth-position",
  },

  openGraph: {
    type: "website",
    url:
      "https://tootiewords.com/5-letter-words-with-e-in-fifth-position",
    siteName: "TootieWords",
    title:
      "5 Letter Words With E In The Fifth Position",
    description:
      "Find five-letter words with E in the fifth position and narrow the list with TootieWords filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "5 Letter Words With E In The Fifth Position",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5 Letter Words With E In The Fifth Position",
    description:
      "Find five-letter words with E in the fifth position using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithEInFifthPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="e"
      position={5}
    />
  );
}