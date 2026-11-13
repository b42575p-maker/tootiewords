import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With P – Word Finder",
  description:
    "Browse 160 common 5-letter words starting with P, like PLACE, POINT, and PRICE. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-p",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-p",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With P – Word Finder",
    description:
      "Browse 160 common 5-letter words starting with P, like PLACE, POINT, and PRICE. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With P",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With P – Word Finder",
    description:
      "Browse 160 common 5-letter words starting with P, like PLACE, POINT, and PRICE. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithPPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="p"
      tip="P words often end in -CH: PITCH, PUNCH, PATCH, PORCH, PINCH, PEACH, POUCH, and PERCH all fit. If you have a P up front and an H at the end, try C in the fourth spot."
    />
  );
}
