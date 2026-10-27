import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "8 Letter Words – Find Them With Your Letters",

  description:
    "Browse 2,879 common 8-letter words or search all 40,649. Find eight-letter words with these letters, a known start or ending, or exact positions. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/8-letter-words",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/8-letter-words",
    siteName: "TootieWords",
    title:
      "8 Letter Words – Find Them With Your Letters",
    description:
      "Browse 2,879 common 8-letter words or search all 40,649. Find eight-letter words with these letters, a known start or ending, or exact positions. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords 8 Letter Word Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "8 Letter Words – Find Them With Your Letters",
    description:
      "Browse 2,879 common 8-letter words or search all 40,649. Find eight-letter words with these letters, a known start or ending, or exact positions. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function EightLetterWordsPage() {
  return <WordLengthPage wordLength={8} />;
}