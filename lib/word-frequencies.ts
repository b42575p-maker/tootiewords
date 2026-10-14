import wordFrequencyData from "../data/wordfreq-en-25000-log.json";
import commonWordExclusions from "../data/common-word-exclusions.json";

export type FrequencyEntry = [string, number];

// Names, places, brands and other words that are almost always capitalized.
// They stay searchable in "All Words" but are left out of "Common Words".
// To change what is hidden, edit data/common-word-exclusions.json.
const excludedWords = new Set(
  (commonWordExclusions as string[]).map((word) => word.toLowerCase())
);

export const commonWordFrequencies = (
  wordFrequencyData as FrequencyEntry[]
).filter(([word]) => !excludedWords.has(word.toLowerCase()));
