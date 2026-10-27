import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "6 Letter Words – Free Six Letter Word Finder",

  description:
    "Browse 2,993 common 6-letter words or search all 22,418. Find six-letter words with the letters you have, a known start or ending, or exact positions.",

  alternates: {
    canonical:
      "https://tootiewords.com/6-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/6-letter-words",
    siteName: "TootieWords",
    title:
      "6 Letter Words – Free Six Letter Word Finder",
    description:
      "Browse 2,993 common 6-letter words or search all 22,418. Find six-letter words with the letters you have, a known start or ending, or exact positions.",
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
      "6 Letter Words – Free Six Letter Word Finder",
    description:
      "Browse 2,993 common 6-letter words or search all 22,418. Find six-letter words with the letters you have, a known start or ending, or exact positions.",
    images: ["/opengraph-image.png"],
  },
};

export default function SixLetterWordsPage() {
  return <WordLengthPage wordLength={6} />;
}