import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tootiewords.com";

  const routes = [
    {
      path: "",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/word-unscrambler",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/anagram-solver",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/words-from-letters",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/4-letter-words",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/5-letter-words",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/5-letter-words-starting-with-a",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-starting-with-s",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-ending-in-e",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-ending-in-y",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-with-a",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-with-a-in-second-position",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-with-e-in-fifth-position",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-with-o-in-second-position",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/5-letter-words-with-r-in-third-position",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/6-letter-words",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/7-letter-words",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/8-letter-words",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/words-with-q",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/words-with-q-without-u",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/words-with-no-vowels",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/terms",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
