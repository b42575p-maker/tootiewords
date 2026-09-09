import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TootieWords, a free collection of word tools for finding words, solving anagrams, and having more fun with letters.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-[#efd5be] bg-white p-7 shadow-[0_18px_40px_rgba(86,51,36,0.08)] sm:p-10">
            <p className="font-hand text-lg font-bold text-[#d85b7c]">
              About TootieWords 🐾
            </p>

            <h1 className="whimsy-title mt-2 text-4xl font-black text-[#4a2118] sm:text-5xl">
              Words are more fun with Tootie.
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#6f5549]">
              TootieWords is a free collection of simple word tools designed
              to help you find words from letters, solve anagrams, and explore
              new word possibilities.
            </p>

            <p className="mt-5 leading-8 text-[#6f5549]">
              Whether you are working on a word game, solving a puzzle, or
              simply curious about what words can be made from a set of
              letters, TootieWords is designed to make the process quick,
              friendly, and easy to use.
            </p>

            <p className="mt-5 leading-8 text-[#6f5549]">
              The site is named after Tootie, the tortoiseshell cat who serves
              as the mascot and inspiration behind the playful look of the
              site.
            </p>

            <div className="mt-10 border-t border-[#f0ded0] pt-8">
              <h2 className="text-xl font-black text-[#4a2e25]">
                Word Data & Attribution
              </h2>

              <p className="mt-4 leading-7 text-[#766056]">
                TootieWords uses word-frequency data from the
                {" "}
                <a
                  href="https://github.com/aparrish/wordfreq-en-25000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#d8617f] underline decoration-[#ef9ab2] underline-offset-4"
                >
                  wordfreq-en-25000
                </a>
                {" "}
                dataset, which was created from the
                {" "}
                <a
                  href="https://github.com/rspeer/wordfreq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#d8617f] underline decoration-[#ef9ab2] underline-offset-4"
                >
                  wordfreq
                </a>
                {" "}
                project by Robyn Speer.
              </p>

              <p className="mt-4 leading-7 text-[#766056]">
                The word-frequency data is made available under the
                {" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#d8617f] underline decoration-[#ef9ab2] underline-offset-4"
                >
                  Creative Commons Attribution-ShareAlike 4.0 International
                  License
                </a>
                .
              </p>

              <p className="mt-4 text-sm leading-6 text-[#92796d]">
                TootieWords is not affiliated with or endorsed by the
                creators of those projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}