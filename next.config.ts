import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Send www.tootiewords.com to tootiewords.com so Google sees one
        // copy of every page instead of two.
        source: "/:path*",
        has: [{ type: "host", value: "www.tootiewords.com" }],
        destination: "https://tootiewords.com/:path*",
        permanent: true,
      },
      {
        // Same word list as "ending in E", so send visitors and search
        // engines to that page instead of keeping a duplicate.
        source: "/5-letter-words-with-e-in-fifth-position",
        destination: "/5-letter-words-ending-in-e",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
