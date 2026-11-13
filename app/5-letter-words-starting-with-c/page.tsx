import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With C – Word Finder",
  description:
    "Browse 199 common 5-letter words starting with C, like COULD, CHILD, and CROSS. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-c",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-c",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With C – Word Finder",
    description:
      "Browse 199 common 5-letter words starting with C, like COULD, CHILD, and CROSS. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With C",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With C – Word Finder",
    description:
      "Browse 199 common 5-letter words starting with C, like COULD, CHILD, and CROSS. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithCPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="c"
      tip="Nearly three out of four common 5-letter words starting with C begin with CO, CH, CR, or CA (21%, 19%, 18%, and 17%), as in COULD, CHILD, CROSS, and CARRY. If you know the C, test O, H, or R in the second spot next."
    />
  );
}
