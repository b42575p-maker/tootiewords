import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In E - Word Finder",
  description:
    "Find 5 letter words ending in E. Browse common and all five-letter words that end with E and narrow the list with helpful filters.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-e",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-e",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In E - Word Finder",
    description:
      "Find five-letter words that end in E and narrow the results with TootieWords filters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In E",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In E - Word Finder",
    description:
      "Find five-letter words that end in E using TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInEPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="e"
    />
  );
}