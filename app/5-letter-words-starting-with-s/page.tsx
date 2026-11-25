import type { Metadata } from "next";

import FiveLetterPatternPage from "@/components/FiveLetterPatternPage";

export const metadata: Metadata = {
  title: "5 Letter Words Starting With S – Word Finder",
  description:
    "Browse 349 common 5-letter words starting with S, like STILL, STATE, and SMALL. See S word traps like SHA_E, smart guesses, and handy filters. Free.",

  alternates: {
    canonical:
      "https://tootiewords.com/5-letter-words-starting-with-s",
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com/5-letter-words-starting-with-s",
    siteName: "TootieWords",
    title: "5 Letter Words Starting With S – Word Finder",
    description:
    "Browse 349 common 5-letter words starting with S, like STILL, STATE, and SMALL. See S word traps like SHA_E, smart guesses, and handy filters. Free.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5 Letter Words Starting With S",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Letter Words Starting With S – Word Finder",
    description:
    "Browse 349 common 5-letter words starting with S, like STILL, STATE, and SMALL. See S word traps like SHA_E, smart guesses, and handy filters. Free.",
    images: ["/opengraph-image.png"],
  },
};

export default function FiveLetterWordsStartingWithSPage() {
  return (
    <FiveLetterPatternPage
      patternType="starts-with"
      letters="s"
      tip="71% of common S words put a consonant second. ST and SH alone start a third of the list, so test T and H before the vowels."
    />
  );
}