import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Element Detective moved to its own site (potentell-games repo); keep old links working.
  redirects() {
    return [
      {
        source: "/element-detective/:path*",
        destination: "https://games.potentell.com/element-detective/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
