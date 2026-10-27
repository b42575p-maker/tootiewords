import type { Metadata } from "next";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  badge: string;
};

export const guides: Guide[] = [
  {
    slug: "best-wordle-starting-words",
    title: "Best Wordle Starting Words",
    description:
      "Which letters show up most in five-letter words, where they usually sit, and which opening words uncover the most information.",
    badge: "5",
  },
  {
    slug: "how-to-unscramble-letters",
    title: "How to Unscramble Letters",
    description:
      "Practical tricks for turning a jumble of letters into words, from pulling off common endings to spotting letter pairs.",
    badge: "ABC",
  },
  {
    slug: "q-without-u-words",
    title: "Q Without U Words",
    description:
      "Every Q-without-U word in our list, where these unusual words come from, and how to remember the useful ones.",
    badge: "Q",
  },
  {
    slug: "words-without-vowels",
    title: "Words Without Vowels",
    description:
      "How English gets by without A, E, I, O, or U, the handful of words that skip Y too, and how to use them in word games.",
    badge: "Y?",
  },
  {
    slug: "two-letter-words",
    title: "Two-Letter Words Every Player Should Know",
    description:
      "All the two-letter words in our list, grouped by letter, plus the high-scoring ones with J, Q, X, and Z and the all-vowel words that rescue a bad rack.",
    badge: "2",
  },
];

export function guideMetadata(slug: string): Metadata {
  const guide = getGuide(slug);
  const url = `https://tootiewords.com/guides/${slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "TootieWords",
      title: `${guide.title} | TootieWords`,
      description: guide.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | TootieWords`,
      description: guide.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export function getGuide(slug: string): Guide {
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    throw new Error(`Unknown guide: ${slug}`);
  }

  return guide;
}
