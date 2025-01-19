import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: Enables React Strict Mode
  swcMinify: true, // Optional: Enables SWC Minification
  experimental: {
    turbopack: false, // Disable Turbopack if it's causing issues
  },
};

export default nextConfig;
