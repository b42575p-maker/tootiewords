import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In H – Word Finder",
  description:
    "Browse 106 common 5-letter words ending in H, like WHICH, NORTH, and FRESH. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-h",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-h",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In H – Word Finder",
    description:
      "Browse 106 common 5-letter words ending in H, like WHICH, NORTH, and FRESH. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In H",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In H – Word Finder",
    description:
      "Browse 106 common 5-letter words ending in H, like WHICH, NORTH, and FRESH. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInHPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="h"
      tip="Almost every common 5-letter word ending in H ends in a letter pair: -CH (44%), -TH (30%), -SH (17%), or -GH (7%). So if H is last, the fourth letter is almost always C, T, S, or G, as in WATCH, NORTH, FRESH, or TOUGH."
    />
  );
}
