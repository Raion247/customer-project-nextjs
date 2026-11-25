import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      // Contact form images: up to 12 MB of files (see src/lib/attachments.ts)
      // plus form fields and multipart overhead.
      bodySizeLimit: "16mb",
    },
  },
};

export default nextConfig;
