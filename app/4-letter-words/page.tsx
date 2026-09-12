import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "4 Letter Words - Four Letter Word Finder",
  description:
    "Find 4 letter words with TootieWords. Filter four-letter words by starting letters, ending letters, included letters, or excluded letters.",
};

export default function FourLetterWordsPage() {
  return <WordLengthPage wordLength={4} />;
}