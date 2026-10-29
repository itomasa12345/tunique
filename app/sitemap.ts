import type { MetadataRoute } from "next";
import { searchIndexingEnabled } from "@/lib/publication";
import { resolveSiteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!searchIndexingEnabled) return [];
  return [
    "/",
    "/bike-fitting",
    "/life-planning",
    "/about",
    "/contact",
    "/privacy",
  ].map((pathname) => ({ url: new URL(pathname, resolveSiteUrl()).href }));
}
