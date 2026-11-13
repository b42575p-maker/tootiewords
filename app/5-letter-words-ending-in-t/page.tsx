import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Ending In T – Word Finder",
  description:
    "Browse 181 common 5-letter words ending in T, like FIRST, POINT, and GREAT. Filter by letters you have, exact positions, or letters to exclude. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-ending-in-t",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-ending-in-t",
    siteName: "TootieWords",
    title: "5 Letter Words Ending In T – Word Finder",
    description:
      "Browse 181 common 5-letter words ending in T, like FIRST, POINT, and GREAT. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Ending In T",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Ending In T – Word Finder",
    description:
      "Browse 181 common 5-letter words ending in T, like FIRST, POINT, and GREAT. Filter by letters you have, exact positions, or letters to exclude. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsEndingInTPage() {
  return (
    <FiveLetterPatternPage
      patternType="ends-with"
      letters="t"
      tip="More than a third of common 5-letter words ending in T end in -ST or -NT (17% each), as in FIRST, TRUST, POINT, and PLANT. If T is last, check S and N for the fourth spot first."
    />
  );
}
