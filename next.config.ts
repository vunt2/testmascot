import type { NextConfig } from "next";

// Next.js needs a repository subpath when served from GitHub Pages.
// Leave GITHUB_PAGES unset during local development or when integrating elsewhere.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubPages ? { basePath: "/testmascot" } : {}),
};

export default nextConfig;
