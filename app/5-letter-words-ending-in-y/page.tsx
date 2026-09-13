import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In Y - Word Finder",
  description:
    "Find 5 letter words ending in Y. Browse common and all five-letter words that end with Y and narrow the list with helpful filters.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-y",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-y",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In Y - Word Finder",
    description:
      "Find five-letter words that end in Y and narrow the results with TootieWords filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In Y",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In Y - Word Finder",
    description:
      "Find five-letter words that end in Y using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInYPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="y"
    />
  );
}