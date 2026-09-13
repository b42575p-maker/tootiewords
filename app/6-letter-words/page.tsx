import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "6 Letter Words - Six Letter Word Finder",

  description:
    "Find 6 letter words with TootieWords. Filter six-letter words by starting letters, ending letters, exact letter positions, included letters, or excluded letters.",

  alternates: {
    canonical:
      "https://tootiewords.com/6-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/6-letter-words",
    siteName: "TootieWords",
    title:
      "6 Letter Words - Six Letter Word Finder",
    description:
      "Find six-letter words and narrow the results by starting letters, ending letters, exact positions, included letters, and excluded letters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords 6 Letter Word Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "6 Letter Words - Six Letter Word Finder",
    description:
      "Find six-letter words and narrow the results with TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function SixLetterWordsPage() {
  return <WordLengthPage wordLength={6} />;
}