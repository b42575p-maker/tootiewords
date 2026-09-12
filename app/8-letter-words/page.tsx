import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "8 Letter Words - Eight Letter Word Finder",
  description:
    "Find 8 letter words with TootieWords. Filter eight-letter words by starting letters, ending letters, included letters, or excluded letters.",
};

export default function EightLetterWordsPage() {
  return <WordLengthPage wordLength={8} />;
}