import type { Metadata } from "next";

import WordLengthPage from "@/components/WordLengthPage";

export const metadata: Metadata = {
  title: "7 Letter Words - Seven Letter Word Finder",
  description:
    "Find 7 letter words with TootieWords. Filter seven-letter words by starting letters, ending letters, included letters, or excluded letters.",
};

export default function SevenLetterWordsPage() {
  return <WordLengthPage wordLength={7} />;
}