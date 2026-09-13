import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "5 Letter Words - Five Letter Word Finder",

  description:
    "Find 5 letter words with TootieWords. Filter five-letter words by starting letters, ending letters, exact letter positions, letters they contain, or letters you want to exclude.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words",
    siteName: "TootieWords",
    title:
      "5 Letter Words - Five Letter Word Finder",
    description:
      "Find five-letter words and narrow the results by starting letters, ending letters, exact positions, included letters, and excluded letters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords 5 Letter Word Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5 Letter Words - Five Letter Word Finder",
    description:
      "Find five-letter words and narrow the results with TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsPage() {
  return <WordLengthPage wordLength={5} />;
}