import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "4 Letter Words - Four Letter Word Finder",

  description:
    "Find 4 letter words with TootieWords. Filter four-letter words by starting letters, ending letters, exact letter positions, included letters, or excluded letters.",

  alternates: {
    canonical:
      "https://tootiewords.com/4-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/4-letter-words",
    siteName: "TootieWords",
    title:
      "4 Letter Words - Four Letter Word Finder",
    description:
      "Find four-letter words and narrow the results by starting letters, ending letters, exact positions, included letters, and excluded letters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords 4 Letter Word Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "4 Letter Words - Four Letter Word Finder",
    description:
      "Find four-letter words and narrow the results with TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function FourLetterWordsPage() {
  return <WordLengthPage wordLength={4} />;
}