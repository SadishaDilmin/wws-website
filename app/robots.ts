import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
// Static either way; required for the GitHub Pages export build.
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
