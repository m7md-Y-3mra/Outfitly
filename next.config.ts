import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "outfitly.fly.storage.tigris.dev",
      },
      {
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  devIndicators: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
