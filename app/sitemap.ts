import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
// Static either way; required for the GitHub Pages export build.
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/roofing", "/roofing/what-we-do", "/roofing/products/roofing-sheets", "/construction-electricals", "/hotel", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
