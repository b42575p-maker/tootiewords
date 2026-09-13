import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title:
    "5 Letter Words With O In The Second Position",

  description:
    "Find 5 letter words with O in the second position. Use TootieWords to filter by starting letters, ending letters, included letters, excluded letters, and exact letter positions.",

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
      "Find five-letter words with O in the second position and narrow the list with TootieWords filters.",
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
      "Find five-letter words with O in the second position using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsWithOInSecondPositionPage() {
  return (
    <FiveLetterPatternPage
      patternType="position"
      letters="o"
      position={2}
    />
  );
}