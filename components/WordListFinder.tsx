"use client";

import { useMemo, useState } from "react";

type WordListFinderProps = {
  words: string[];
  wordLength: number;
};

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export default function WordListFinder({
  words,
  wordLength,
}: WordListFinderProps) {
  const [startsWith, setStartsWith] = useState("");
  const [contains, setContains] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [exclude, setExclude] = useState("");
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  function cleanInput(value: string) {
    return value.replace(/[^a-zA-Z]/g, "").toLowerCase();
  }

  const filteredWords = useMemo(() => {
    const cleanStarts = cleanInput(startsWith);
    const cleanContains = cleanInput(contains);
    const cleanEnds = cleanInput(endsWith);
    const cleanExclude = cleanInput(exclude);

    return words.filter((word) => {
      if (cleanStarts && !word.startsWith(cleanStarts)) {
        return false;
      }

      if (cleanContains && !word.includes(cleanContains)) {
        return false;
      }

      if (cleanEnds && !word.endsWith(cleanEnds)) {
        return false;
      }

      if (
        cleanExclude &&
        [...cleanExclude].some((letter) => word.includes(letter))
      ) {
        return false;
      }

      return true;
    });
  }, [words, startsWith, contains, endsWith, exclude]);

  const visibleWords = showAll
    ? filteredWords
    : filteredWords.slice(0, 200);

  const filtersActive =
    startsWith.length > 0 ||
    contains.length > 0 ||
    endsWith.length > 0 ||
    exclude.length > 0;

  function clearFilters() {
    setStartsWith("");
    setContains("");
    setEndsWith("");
    setExclude("");
    setShowAll(false);
  }

  function chooseStartingLetter(letter: string) {
    setStartsWith(letter);
    setShowAll(false);

    window.setTimeout(() => {
      document
        .getElementById("word-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  async function copyWord(word: string) {
    await navigator.clipboard.writeText(word);
    setCopiedWord(word);

    window.setTimeout(() => {
      setCopiedWord(null);
    }, 1200);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-6">
      <div className="rounded-[2rem] border-2 border-[#efd3ba] bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(91,59,43,0.1)] sm:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
            🐾 Tootie&apos;s Word List
          </div>

          <p className="mx-auto max-w-2xl text-base leading-7 text-[#755d52] sm:text-lg">
            Use the filters below to narrow the list of{" "}
            {wordLength}-letter words.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterField label="Starts With">
            <input
              value={startsWith}
              onChange={(e) => {
                setStartsWith(cleanInput(e.target.value));
                setShowAll(false);
              }}
              placeholder="Example: s"
              className="tootie-input"
              maxLength={wordLength}
              aria-label="Starts with"
            />
          </FilterField>

          <FilterField label="Contains">
            <input
              value={contains}
              onChange={(e) => {
                setContains(cleanInput(e.target.value));
                setShowAll(false);
              }}
              placeholder="Example: ar"
              className="tootie-input"
              maxLength={wordLength}
              aria-label="Contains"
            />
          </FilterField>

          <FilterField label="Ends With">
            <input
              value={endsWith}
              onChange={(e) => {
                setEndsWith(cleanInput(e.target.value));
                setShowAll(false);
              }}
              placeholder="Example: e"
              className="tootie-input"
              maxLength={wordLength}
              aria-label="Ends with"
            />
          </FilterField>

          <FilterField label="Exclude Letters">
            <input
              value={exclude}
              onChange={(e) => {
                setExclude(cleanInput(e.target.value));
                setShowAll(false);
              }}
              placeholder="Example: xyz"
              className="tootie-input"
              aria-label="Exclude letters"
            />
          </FilterField>
        </div>

        <div className="mt-7 border-t-2 border-dashed border-[#ecd8c7] pt-6">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-[#9a5830]">
            Starts With
          </div>

          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => chooseStartingLetter(letter)}
                aria-label={`Show ${wordLength}-letter words starting with ${letter.toUpperCase()}`}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 font-black uppercase transition ${
                  startsWith === letter
                    ? "border-[#ef9b4a] bg-[#f4a24a] text-white"
                    : "border-[#ead6c5] bg-[#fffaf4] text-[#684b3f] hover:border-[#ef9b4a] hover:bg-[#fff0df]"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div
          id="word-results"
          className="mt-7 scroll-mt-6 border-t-2 border-dashed border-[#ecd8c7] pt-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.15em] text-[#d8741e]">
                Tootie found
              </div>

              <div className="mt-1 text-2xl font-black text-[#4a2e25]">
                {filteredWords.length.toLocaleString()}{" "}
                {wordLength}-letter{" "}
                {filteredWords.length === 1 ? "word" : "words"}
              </div>
            </div>

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border-2 border-[#e7cdb8] bg-white px-6 py-2.5 text-sm font-bold text-[#795b4c] hover:bg-[#fff4e8]"
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredWords.length === 0 ? (
            <div className="py-14 text-center">
              <div className="text-5xl">🐾</div>

              <h2 className="mt-4 text-2xl font-black text-[#4a2e25]">
                Tootie couldn&apos;t find a match
              </h2>

              <p className="mt-2 text-[#846c60]">
                Try removing one of your filters or using different
                letters.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {visibleWords.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => copyWord(word)}
                    className="word-chip border-[#ead6c5] bg-[#fffaf4] hover:border-[#ef9b4a] hover:bg-[#fff0df]"
                  >
                    {copiedWord === word
                      ? "✓ Copied!"
                      : word}
                  </button>
                ))}
              </div>

              {!showAll && filteredWords.length > 200 && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="tootie-button rounded-full px-7 py-3 font-black text-white"
                  >
                    Show All{" "}
                    {filteredWords.length.toLocaleString()} Words
                  </button>
                </div>
              )}

              {showAll && filteredWords.length > 200 && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAll(false);

                      document
                        .getElementById("word-results")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className="rounded-full border-2 border-[#e7cdb8] bg-white px-6 py-2.5 text-sm font-bold text-[#795b4c] hover:bg-[#fff4e8]"
                  >
                    Show Fewer Words
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
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