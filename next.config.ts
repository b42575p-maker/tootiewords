import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
