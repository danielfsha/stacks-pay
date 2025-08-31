import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // use false if you want a temporary redirect
      },
    ];
  },
};

export default nextConfig;
