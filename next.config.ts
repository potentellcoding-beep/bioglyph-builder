import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Element Detective game is a static page in public/element-detective/.
  // Send the folder URL to its index.html so the page's relative tile paths resolve.
  redirects() {
    return [
      {
        source: "/element-detective",
        destination: "/element-detective/index.html",
        permanent: false,
      },
      {
        // games.potentell.com has one game so far; send its homepage there.
        source: "/",
        has: [{ type: "host", value: "games.potentell.com" }],
        destination: "/element-detective/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
