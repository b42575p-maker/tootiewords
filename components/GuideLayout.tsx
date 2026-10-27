import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { guides } from "@/lib/guides";
import CopyWordChip from "@/components/CopyWordChip";

type GuideLayoutProps = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
};

export default function GuideLayout({
  slug,
  title,
  intro,
  updated,
  children,
}: GuideLayoutProps) {
  const otherGuides = guides.filter((guide) => guide.slug !== slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro,
    dateModified: updated,
    mainEntityOfPage: `https://tootiewords.com/guides/${slug}`,
    author: {
      "@type": "Organization",
      name: "TootieWords",
      url: "https://tootiewords.com",
    },
    publisher: {
      "@id": "https://tootiewords.com/#organization",
    },
  };

  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center sm:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-sm font-bold text-[#9a8175]"
        >
          <Link href="/" className="hover:text-[#d8617f]">
            Home
          </Link>
          {" / "}
          <Link href="/guides" className="hover:text-[#d8617f]">
            Guides
          </Link>
        </nav>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-sm font-black text-[#a75b24]">
          🐾 Tootie&apos;s Word Game Guides
        </div>

        <h1 className="whimsy-title text-4xl font-black text-[#4a2e25] sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#755d52]">
          {intro}
        </p>

        <p className="mt-4 text-sm font-bold text-[#9a8175]">
          Updated{" "}
          {new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </section>

      <article className="border-t border-[#ecd8c7] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">{children}</div>
      </article>

      <section className="border-t border-[#ecd8c7] bg-[#fffaf4]">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="whimsy-title text-center text-3xl font-black text-[#4a2e25]">
            More Guides From Tootie
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {otherGuides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function GuideCard({
  slug,
  title,
  description,
  badge,
}: {
  slug: string;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <Link
      href={`/guides/${slug}`}
      className="group flex flex-col rounded-[1.75rem] border-2 border-[#efd3ba] bg-white p-6 shadow-[0_12px_30px_rgba(91,59,43,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#ef9b4a]"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0df] text-lg font-black text-[#d8741e]"
        aria-hidden="true"
      >
        {badge}
      </div>

      <h3 className="mt-4 text-xl font-black text-[#4a2e25]">{title}</h3>

      <p className="mt-2 leading-7 text-[#755d52]">{description}</p>

      <div className="mt-auto pt-5 font-black text-[#d8741e] transition group-hover:translate-x-1">
        Read the guide &rarr;
      </div>
    </Link>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 text-2xl font-black text-[#4a2e25] first:mt-0 sm:text-3xl">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-xl font-black text-[#4a2e25]">{children}</h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-8 text-[#5f4a40]">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-[#5f4a40] marker:text-[#ef9b4a]">
      {children}
    </ul>
  );
}

export function Words({ words }: { words: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {words.map((word) => (
        <CopyWordChip key={word} word={word} />
      ))}
    </div>
  );
}

export function Table({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-[#efd3ba]">
      <table className="w-full min-w-[420px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#fff0df] text-sm font-black uppercase tracking-wide text-[#9a5830]">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#5f4a40]">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-[#f0ded0] odd:bg-white even:bg-[#fffaf4]"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 ${
                    cellIndex === 0 ? "font-black uppercase text-[#4a2e25]" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TryTool({
  href,
  label,
  text,
}: {
  href: string;
  label: string;
  text: string;
}) {
  return (
    <div className="mt-8 rounded-[1.5rem] border-2 border-[#efb6c6] bg-[#fff1f5] p-6">
      <p className="leading-7 text-[#6f5549]">{text}</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#ef799a] to-[#f0527e] px-5 py-3 font-black text-white shadow-[0_6px_16px_rgba(240,82,126,0.25)] transition hover:-translate-y-0.5"
      >
        {label} &rarr;
      </Link>
    </div>
  );
}
