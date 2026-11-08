import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static preview for https://sadishadilmin.github.io/wws-website/
// (see .github/workflows/pages.yml). Normal builds (local dev, Vercel) are unchanged.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = "/wws-website";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: "true" },
      // No image optimiser on static hosting: a tiny loader serves the original files under the sub-path.
      images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
    }
  : { images: { formats: ["image/avif", "image/webp"] } };

export default nextConfig;
