import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "6 Letter Words - Six Letter Word Finder",
  description:
    "Find 6 letter words with TootieWords. Filter six-letter words by starting letters, ending letters, included letters, or excluded letters.",
};

export default function SixLetterWordsPage() {
  return <WordLengthPage wordLength={6} />;
}