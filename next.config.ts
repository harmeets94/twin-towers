import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;
