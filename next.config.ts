import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  turbopack: {},
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
