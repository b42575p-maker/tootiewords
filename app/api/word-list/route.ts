import { NextRequest, NextResponse } from "next/server";

import words from "an-array-of-english-words";
import wordFrequencyData from "../../../data/wordfreq-en-25000-log.json";

type FrequencyEntry = [string, number];

const frequencyEntries = wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

export async function GET(request: NextRequest) {
  const lengthParam = request.nextUrl.searchParams.get("length");
  const wordLength = Number(lengthParam);

  if (
    !Number.isInteger(wordLength) ||
    wordLength < 2 ||
    wordLength > 20
  ) {
    return NextResponse.json(
      { error: "Invalid word length." },
      { status: 400 }
    );
  }

  const matchingWords = words
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        /^[a-z]+$/.test(word) &&
        word.length === wordLength
    )
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index
    )
    .sort((a, b) => {
      const aIsCommon = frequencies.has(a);
      const bIsCommon = frequencies.has(b);

      if (aIsCommon && !bIsCommon) return -1;
      if (!aIsCommon && bIsCommon) return 1;

      if (aIsCommon && bIsCommon) {
        const frequencyDifference =
          (frequencies.get(b) ?? -Infinity) -
          (frequencies.get(a) ?? -Infinity);

        if (frequencyDifference !== 0) {
          return frequencyDifference;
        }
      }

      return a.localeCompare(b);
    });

  return NextResponse.json(
    {
      wordLength,
      count: matchingWords.length,
      words: matchingWords,
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}