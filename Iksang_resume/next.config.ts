import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // skip strict mode
  output: 'export',
  basePath: '/resume-portfolio',
  reactStrictMode: false,
  assetPrefix: '/resume-portfolio',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/resume-portfolio',
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  }
};

export default nextConfig;
