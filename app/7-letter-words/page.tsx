import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "7 Letter Words – Find Them With Your Letters",

  description:
    "Browse 3,179 common 7-letter words or search all 33,296. Find seven-letter words with these letters, a known start or ending, or exact positions. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/7-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/7-letter-words",
    siteName: "TootieWords",
    title:
      "7 Letter Words – Find Them With Your Letters",
    description:
      "Browse 3,179 common 7-letter words or search all 33,296. Find seven-letter words with these letters, a known start or ending, or exact positions. Free.",
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
      "7 Letter Words – Find Them With Your Letters",
    description:
      "Browse 3,179 common 7-letter words or search all 33,296. Find seven-letter words with these letters, a known start or ending, or exact positions. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function SevenLetterWordsPage() {
  return <WordLengthPage wordLength={7} />;
}