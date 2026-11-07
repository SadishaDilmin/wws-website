import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/roofing", "/roofing/what-we-do", "/roofing/products/roofing-sheets", "/construction-electricals", "/hotel", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
