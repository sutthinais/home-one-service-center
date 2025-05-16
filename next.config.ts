import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.homeone.co.th',
        port: '',
        pathname: '/tmsapp/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;