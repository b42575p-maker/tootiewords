import type { Metadata } from "next";
import "./globals.css";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSense from "@/components/AdSense";

export const metadata: Metadata = {
  metadataBase: new URL("https://tootiewords.com"),

  title: {
    default: "TootieWords - Free Word Finder & Unscrambler",
    template: "%s | TootieWords",
  },

  description:
    "Find words from letters, unscramble words, and solve anagrams with free TootieWords word tools.",

  keywords: [
    "word finder",
    "word unscrambler",
    "anagram solver",
    "words from letters",
    "letter unscrambler",
    "word game helper",
  ],

  applicationName: "TootieWords",

  authors: [{ name: "TootieWords" }],
  creator: "TootieWords",
  publisher: "TootieWords",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: "https://tootiewords.com",
    siteName: "TootieWords",
    title: "TootieWords - Free Word Finder & Unscrambler",
    description:
      "Find words from letters, unscramble words, and solve anagrams with free TootieWords word tools.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TootieWords - Find More Words. More Fun.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TootieWords - Free Word Finder & Unscrambler",
    description:
      "Find words from letters, unscramble words, and solve anagrams with free TootieWords word tools.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <GoogleAnalytics />
        <AdSense />
      </body>
    </html>
  );
}