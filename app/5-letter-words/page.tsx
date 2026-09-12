import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "5 Letter Words - Five Letter Word Finder",
  description:
    "Find 5 letter words with TootieWords. Filter five-letter words by starting letters, ending letters, letters they contain, or letters you want to exclude.",
};

export default function FiveLetterWordsPage() {
  return <WordLengthPage wordLength={5} />;
}