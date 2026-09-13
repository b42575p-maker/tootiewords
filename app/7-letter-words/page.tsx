import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "7 Letter Words - Seven Letter Word Finder",

  description:
    "Find 7 letter words with TootieWords. Filter seven-letter words by starting letters, ending letters, exact letter positions, included letters, or excluded letters.",

  alternates: {
    canonical:
      "https://tootiewords.com/7-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/7-letter-words",
    siteName: "TootieWords",
    title:
      "7 Letter Words - Seven Letter Word Finder",
    description:
      "Find seven-letter words and narrow the results by starting letters, ending letters, exact positions, included letters, and excluded letters.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords 7 Letter Word Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "7 Letter Words - Seven Letter Word Finder",
    description:
      "Find seven-letter words and narrow the results with TootieWords.",
    images: ["/opengraph-image.png"],
  },
};

export default function SevenLetterWordsPage() {
  return <WordLengthPage wordLength={7} />;
}