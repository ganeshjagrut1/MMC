import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow externally-hosted images (e.g. faculty/leader photo URLs entered
    // in the admin panel, or images stored in Supabase Storage).
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
