"use client";

import { useMemo, useState } from "react";
import words from "an-array-of-english-words";
import wordFrequencyData from "../data/wordfreq-en-25000-log.json";

type FrequencyEntry = [string, number];

type WordFinderProps = {
  title: string;
  description: string;
  defaultMode?: "common" | "all";
  heroMode?: boolean;
};

const frequencyEntries = wordFrequencyData as FrequencyEntry[];

const frequencies = new Map<string, number>(
  frequencyEntries.map(([word, score]) => [
    word.toLowerCase(),
    score,
  ])
);

export default function WordFinder({
  title,
  description,
  defaultMode = "common",
  heroMode = false,
}: WordFinderProps) {
  const [letters, setLetters] = useState("");
  const [wordLength, setWordLength] = useState("any");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [mustContain, setMustContain] = useState("");
  const [resultMode, setResultMode] =
    useState<"common" | "all">(defaultMode);

  const [results, setResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [searchedLetters, setSearchedLetters] = useState("");
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  function cleanInput(value: string) {
    return value.replace(/[^a-zA-Z]/g, "").toLowerCase();
  }

  function canMakeWord(
    word: string,
    availableLetters: string
  ) {
    const counts: Record<string, number> = {};

    for (const letter of availableLetters) {
      counts[letter] = (counts[letter] || 0) + 1;
    }

    for (const letter of word) {
      if (!counts[letter]) {
        return false;
      }

      counts[letter]--;
    }

    return true;
  }

  function getFrequency(word: string) {
    return frequencies.get(word) ?? -Infinity;
  }

  function isCommonWord(word: string) {
    return frequencies.has(word);
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const cleanLetters = cleanInput(letters);
    const cleanStartsWith = cleanInput(startsWith);
    const cleanEndsWith = cleanInput(endsWith);
    const cleanMustContain = cleanInput(mustContain);

    if (!cleanLetters) {
      setResults([]);
      setSearched(false);
      return;
    }

    const matches = words
      .map((word) => word.toLowerCase())
      .filter((word) => {
        if (!/^[a-z]+$/.test(word)) return false;
        if (word.length < 3) return false;
        if (word.length > cleanLetters.length) {
          return false;
        }

        if (!canMakeWord(word, cleanLetters)) {
          return false;
        }

        if (
          wordLength !== "any" &&
          word.length !== Number(wordLength)
        ) {
          return false;
        }

        if (
          cleanStartsWith &&
          !word.startsWith(cleanStartsWith)
        ) {
          return false;
        }

        if (
          cleanEndsWith &&
          !word.endsWith(cleanEndsWith)
        ) {
          return false;
        }

        if (
          cleanMustContain &&
          !word.includes(cleanMustContain)
        ) {
          return false;
        }

        if (
          resultMode === "common" &&
          !isCommonWord(word)
        ) {
          return false;
        }

        return true;
      })
      .filter(
        (word, index, array) =>
          array.indexOf(word) === index
      )
      .sort((a, b) => {
        if (b.length !== a.length) {
          return b.length - a.length;
        }

        const frequencyDifference =
          getFrequency(b) - getFrequency(a);

        if (frequencyDifference !== 0) {
          return frequencyDifference;
        }

        return a.localeCompare(b);
      });

    setResults(matches);
    setSearchedLetters(cleanLetters);
    setSearched(true);
    setCopiedWord(null);
    setCopiedAll(false);
  }

  function handleClear() {
    setLetters("");
    setWordLength("any");
    setStartsWith("");
    setEndsWith("");
    setMustContain("");
    setResultMode(defaultMode);
    setResults([]);
    setSearched(false);
    setSearchedLetters("");
  }

  async function copyWord(word: string) {
    await navigator.clipboard.writeText(word);
    setCopiedWord(word);

    window.setTimeout(() => {
      setCopiedWord(null);
    }, 1200);
  }

  async function copyAllWords() {
    if (!results.length) return;

    await navigator.clipboard.writeText(
      results.join("\n")
    );

    setCopiedAll(true);

    window.setTimeout(() => {
      setCopiedAll(false);
    }, 1500);
  }

  const exactAnagrams = useMemo(() => {
    if (!searchedLetters) return [];

    return results.filter(
      (word) =>
        word.length === searchedLetters.length &&
        word !== searchedLetters
    );
  }, [results, searchedLetters]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<number, string[]>>(
      (groups, word) => {
        const length = word.length;

        if (!groups[length]) {
          groups[length] = [];
        }

        groups[length].push(word);
        return groups;
      },
      {}
    );
  }, [results]);

  const lengths = Object.keys(groupedResults)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <section
        className={
          heroMode
            ? ""
            : "mx-auto max-w-4xl px-6 pb-12 pt-16 text-center"
        }
      >
        {!heroMode && (
          <>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
              🐾 Tootie&apos;s Word Finder
            </div>

            <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#755d52]">
              {description}
            </p>
          </>
        )}

        <form
          onSubmit={handleSubmit}
          className={`word-finder-card text-left ${
            heroMode
              ? "rounded-[2rem] p-5 sm:p-7"
              : "mx-auto mt-10 max-w-3xl rounded-[2rem] p-6 sm:p-8"
          }`}
        >
          {heroMode && (
            <div className="mb-5 text-center">
              <h2 className="whimsy-title text-3xl font-black text-[#4a2e25] sm:text-4xl">
                {title}
              </h2>

              <p className="mt-2 text-[#755d52]">
                {description}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              id={heroMode ? "hero-letters" : "letters"}
              type="text"
              value={letters}
              onChange={(e) =>
                setLetters(cleanInput(e.target.value))
              }
              placeholder="Enter letters, e.g. cat, listen, dream"
              autoComplete="off"
              aria-label="Enter your letters"
              className="w-full rounded-2xl border-2 border-[#e8d1bd] bg-white px-5 py-4 text-lg font-semibold text-[#4a2e25] shadow-inner outline-none transition focus:border-[#ef9a43] focus:ring-4 focus:ring-[#f5c996]/40"
            />

            <button
              type="submit"
              className="tootie-button rounded-2xl px-7 py-4 text-lg font-black text-white"
            >
              🐾 Find Words
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex rounded-xl bg-[#f7ece2] p-1">
              <button
                type="button"
                onClick={() =>
                  setResultMode("common")
                }
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  resultMode === "common"
                    ? "bg-white text-[#d66e18] shadow-sm"
                    : "text-[#80685c]"
                }`}
              >
                ✓ Common Words
              </button>

              <button
                type="button"
                onClick={() => setResultMode("all")}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  resultMode === "all"
                    ? "bg-white text-[#d66e18] shadow-sm"
                    : "text-[#80685c]"
                }`}
              >
                All Words
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              className="text-sm font-black text-[#9a5830] hover:text-[#d66e18]"
            >
              {showFilters
                ? "Hide filters ↑"
                : "More filters ↓"}
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 border-t-2 border-dashed border-[#ecd6c4] pt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FilterField label="Word Length">
                  <select
                    value={wordLength}
                    onChange={(e) =>
                      setWordLength(e.target.value)
                    }
                    className="tootie-input"
                  >
                    <option value="any">
                      Any length
                    </option>

                    {Array.from(
                      { length: 18 },
                      (_, i) => i + 3
                    ).map((length) => (
                      <option
                        key={length}
                        value={length}
                      >
                        {length} letters
                      </option>
                    ))}
                  </select>
                </FilterField>

                <FilterField label="Must Contain">
                  <input
                    value={mustContain}
                    onChange={(e) =>
                      setMustContain(
                        cleanInput(e.target.value)
                      )
                    }
                    placeholder="Example: st"
                    className="tootie-input"
                  />
                </FilterField>

                <FilterField label="Starts With">
                  <input
                    value={startsWith}
                    onChange={(e) =>
                      setStartsWith(
                        cleanInput(e.target.value)
                      )
                    }
                    placeholder="Example: s"
                    className="tootie-input"
                  />
                </FilterField>

                <FilterField label="Ends With">
                  <input
                    value={endsWith}
                    onChange={(e) =>
                      setEndsWith(
                        cleanInput(e.target.value)
                      )
                    }
                    placeholder="Example: t"
                    className="tootie-input"
                  />
                </FilterField>
              </div>

              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full border-2 border-[#e7cdb8] bg-white px-6 py-2.5 text-sm font-bold text-[#795b4c] hover:bg-[#fff4e8]"
                >
                  Clear everything
                </button>
              </div>
            </div>
          )}
        </form>
      </section>

      {searched && (
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border-2 border-[#efd3ba] bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(91,59,43,0.1)] sm:p-8">
            <div className="mb-8 flex flex-col gap-5 border-b-2 border-dashed border-[#ecd8c7] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.15em] text-[#d8741e]">
                  Tootie found
                </div>

                <h2 className="whimsy-title mt-2 text-3xl font-black text-[#4a2e25]">
                  Words From &quot;
                  {searchedLetters}&quot;
                </h2>

                <p className="mt-2 font-semibold text-[#846c60]">
                  {results.length}{" "}
                  {results.length === 1
                    ? "word"
                    : "words"}{" "}
                  found 🐾
                </p>
              </div>

              {results.length > 0 && (
                <button
                  type="button"
                  onClick={copyAllWords}
                  className="rounded-full border-2 border-[#efc89f] bg-[#fff4e6] px-5 py-3 text-sm font-black text-[#a85d25]"
                >
                  {copiedAll
                    ? "✓ Copied!"
                    : "Copy All Words"}
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-14 text-center">
                <div className="text-5xl">🐾</div>

                <h3 className="mt-4 text-2xl font-black text-[#4a2e25]">
                  Tootie couldn&apos;t find a match
                </h3>

                <p className="mt-2 text-[#846c60]">
                  Try different letters or loosen one
                  of the filters.
                </p>
              </div>
            ) : (
              <>
                {exactAnagrams.length > 0 && (
                  <div className="mb-10 rounded-[1.5rem] border-2 border-[#efb6c6] bg-[#fff1f5] p-5 sm:p-6">
                    <h3 className="text-xl font-black text-[#56352b]">
                      ★ Exact Anagrams
                    </h3>

                    <p className="mt-1 text-sm text-[#896c61]">
                      Same letters, brand-new word.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {exactAnagrams.map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() =>
                            copyWord(word)
                          }
                          className="word-chip border-[#efb6c6] bg-white hover:bg-[#ffe5ed]"
                        >
                          {copiedWord === word
                            ? "✓ Copied!"
                            : word}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-10">
                  {lengths.map((length) => (
                    <div key={length}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#f4a24a] px-3 font-black text-white shadow-sm">
                          {length}
                        </span>

                        <h3 className="text-xl font-black text-[#4a2e25]">
                          {length}-Letter Words
                        </h3>

                        <span className="rounded-full bg-[#f6ece3] px-3 py-1 text-sm font-bold text-[#8a7165]">
                          {
                            groupedResults[length]
                              .length
                          }
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {groupedResults[length].map(
                          (word) => (
                            <button
                              key={word}
                              type="button"
                              onClick={() =>
                                copyWord(word)
                              }
                              className="word-chip border-[#ead6c5] bg-[#fffaf4] hover:border-[#ef9b4a] hover:bg-[#fff0df]"
                            >
                              {copiedWord === word
                                ? "✓ Copied!"
                                : word}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#684b3f]">
        {label}
      </label>

      {children}
    </div>
  );
}