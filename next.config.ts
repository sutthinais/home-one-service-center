import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true, // (optional)
  swcMinify: true,
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
