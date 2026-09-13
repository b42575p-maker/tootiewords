import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With S - Word Finder",
  description:
    "Find 5 letter words starting with S. Browse common and all five-letter words beginning with S and narrow the list with helpful filters.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-s",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-s",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With S - Word Finder",
    description:
      "Find five-letter words that start with S and narrow the results with TootieWords filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With S",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With S - Word Finder",
    description:
      "Find five-letter words that start with S using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithSPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="s"
    />
  );
}