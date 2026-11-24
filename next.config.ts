import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The altcore sample demo (public/altcore-demo) is a single-page app: any deep link inside it
  // that isn't a real file loads its index.html. Built by scripts/build-altcore-demo.sh.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: "/altcore-demo", destination: "/altcore-demo/index.html" },
        { source: "/altcore-demo/:path*", destination: "/altcore-demo/index.html" },
      ],
    };
  },
};

export default nextConfig;
