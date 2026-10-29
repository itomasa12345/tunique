import type { MetadataRoute } from "next";
import { searchIndexingEnabled } from "@/lib/publication";
import { resolveSiteUrl } from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots {
  return searchIndexingEnabled
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", resolveSiteUrl()).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
