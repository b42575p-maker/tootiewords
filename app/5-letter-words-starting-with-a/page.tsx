import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With A - Word Finder",
  description:
    "Find 5 letter words starting with A. Browse common and all five-letter words beginning with A and narrow the list with helpful filters.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-a",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-a",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With A - Word Finder",
    description:
      "Find five-letter words that start with A and narrow the results with TootieWords filters.",
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
    title: "5 Letter Words Starting With A - Word Finder",
    description:
      "Find five-letter words that start with A using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithAPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="a"
    />
  );
}