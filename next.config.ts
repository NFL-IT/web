import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@app": require("path").resolve(__dirname, "src/app"),
      "@/db": require("path").resolve(__dirname, "src/db"),
      "@utils": require("path").resolve(__dirname, "src/app/utils"),
    };
    return config;
  }
};

export default nextConfig;
