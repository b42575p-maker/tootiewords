import type { Metadata } from "next";
import "./globals.css";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSense from "@/components/AdSense";

export const metadata: Metadata = {
  metadataBase: new URL("https://tootiewords.com"),

  title: {
    default:
      "Free Word Finder, Unscrambler & Anagram Solver | TootieWords",
    template: "%s | TootieWords",
  },

  description:
    "Find words from letters, unscramble letters, solve anagrams, and narrow word-game answers with free TootieWords word tools.",

  applicationName: "TootieWords",

  authors: [
    {
      name: "TootieWords",
      url: "https://tootiewords.com",
    },
  ],

  creator: "TootieWords",
  publisher: "TootieWords",

  category: "games",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tootiewords.com",
    siteName: "TootieWords",

    title:
      "Free Word Finder, Unscrambler & Anagram Solver | TootieWords",

    description:
      "Find words from letters, unscramble letters, solve anagrams, and narrow word-game answers with free TootieWords word tools.",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords - Free Word Finder and Letter Unscrambler",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Free Word Finder, Unscrambler & Anagram Solver | TootieWords",

    description:
      "Find words from letters, unscramble letters, solve anagrams, and narrow word-game answers with free TootieWords word tools.",

    images: ["/opengraph-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tootiewords.com/#organization",

      name: "TootieWords",

      url: "https://tootiewords.com",

      logo: {
        "@type": "ImageObject",
        url: "https://tootiewords.com/icon.png",
      },
    },

    {
      "@type": "WebSite",
      "@id": "https://tootiewords.com/#website",

      url: "https://tootiewords.com",

      name: "TootieWords",

      description:
        "Free word finder, word unscrambler, anagram solver, and word-game tools.",

      publisher: {
        "@id": "https://tootiewords.com/#organization",
      },

      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {children}

        <GoogleAnalytics />
        <AdSense />
      </body>
    </html>
  );
}