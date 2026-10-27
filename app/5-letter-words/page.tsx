import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "5 Letter Words – Finder With Position Filters",

  description:
    "Browse 2,421 common 5-letter words or search all 12,653. Lock letters in exact positions, include or exclude letters, and narrow your answer fast. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words",
    siteName: "TootieWords",
    title:
      "5 Letter Words – Finder With Position Filters",
    description:
      "Browse 2,421 common 5-letter words or search all 12,653. Lock letters in exact positions, include or exclude letters, and narrow your answer fast. Free.",
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
      "5 Letter Words – Finder With Position Filters",
    description:
      "Browse 2,421 common 5-letter words or search all 12,653. Lock letters in exact positions, include or exclude letters, and narrow your answer fast. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsPage() {
  return <WordLengthPage wordLength={5} />;
}