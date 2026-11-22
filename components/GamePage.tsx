import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const GAMES = [
  { href: "/word-pounce", emoji: "🐾", name: "Word Pounce", tag: "Daily", blurb: "Make as many words as you can from 7 letters." },
  { href: "/word-search", emoji: "🔎", name: "Word Search", tag: "Daily + unlimited", blurb: "Themed word searches in Easy, Medium, and Hard. Printable too." },
  { href: "/word-ladder", emoji: "🪜", name: "Word Ladder", tag: "Daily", blurb: "Change one word into another, one letter at a time." },
  { href: "/unscramble-sprint", emoji: "⏱️", name: "Unscramble Sprint", tag: "Unlimited", blurb: "Unscramble as many words as you can in 60 seconds." },
  { href: "/letter-guess", emoji: "🧶", name: "Letter Guess", tag: "Unlimited", blurb: "Guess the hidden word before Tootie knocks the yarn off the table." },
  { href: "/missing-letter", emoji: "🔤", name: "Missing Letter", tag: "Unlimited", blurb: "Fill in the blanks across four rounds that get harder as you go." },
];

export function gameStructuredData(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `https://tootiewords.com${path}`,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": "https://tootiewords.com/#organization" },
  };
}

export function gameMetadata(title: string, description: string, path: string, alt: string) {
  const url = `https://tootiewords.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      siteName: "TootieWords",
      title,
      description,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl font-black text-[#4a2e25] first:mt-0 sm:text-3xl">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-8 text-[#5f4a40]">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">{children}</ul>
  );
}

export default function GamePage({
  path,
  badge,
  title,
  intro,
  structuredData,
  game,
  children,
}: {
  path: string;
  badge: string;
  title: string;
  intro: string;
  structuredData: object;
  game: React.ReactNode;
  children: React.ReactNode;
}) {
  const others = GAMES.filter((item) => item.href !== path);

  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="mx-auto max-w-3xl px-3 pb-10 pt-8 sm:px-6 sm:pt-12">
        <div className="px-2 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
            {badge}
          </div>
          <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#755d52]">{intro}</p>
        </div>

        <div className="mt-8">{game}</div>
      </section>

      <article className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {children}

          <h2 className="mt-12 text-2xl font-black text-[#4a2e25] sm:text-3xl">More Games From Tootie</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {others.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl border-2 border-[#efd3ba] bg-[#fffaf4] p-4 transition hover:-translate-y-0.5 hover:border-[#ef9b4a]"
              >
                <span className="text-3xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <span>
                  <span className="block font-black text-[#4a2e25]">{item.name}</span>
                  <span className="block text-sm leading-6 text-[#755d52]">{item.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
