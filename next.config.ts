import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the project's existing AGENTS.md under source control only.
  agentRules: false,
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/logo/favicon.ico" }];
  },
};

export default nextConfig;
