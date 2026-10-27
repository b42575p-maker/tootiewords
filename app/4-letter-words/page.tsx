import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "4 Letter Words – Free Four Letter Word Finder",

  description:
    "Browse 1,679 common 4-letter words or search all 5,528. Enter the letters you know, set exact positions, and filter by start or ending. Free, no sign-up.",

  alternates: {
    canonical:
      "https://tootiewords.com/4-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/4-letter-words",
    siteName: "TootieWords",
    title:
      "4 Letter Words – Free Four Letter Word Finder",
    description:
      "Browse 1,679 common 4-letter words or search all 5,528. Enter the letters you know, set exact positions, and filter by start or ending. Free, no sign-up.",
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
      "4 Letter Words – Free Four Letter Word Finder",
    description:
      "Browse 1,679 common 4-letter words or search all 5,528. Enter the letters you know, set exact positions, and filter by start or ending. Free, no sign-up.",
    images: ["/opengraph-image.png"],
  },
};

export default function FourLetterWordsPage() {
  return <WordLengthPage wordLength={4} />;
}