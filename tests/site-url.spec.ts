import { test, expect } from "@playwright/test";
import { resolveSiteUrl } from "../lib/site-url";

test("metadata uses the configured origin, the preview host, or local fallback", () => {
  expect(resolveSiteUrl({}).origin).toBe("http://localhost:3000");
  expect(resolveSiteUrl({ VERCEL_URL: "preview.example.com" }).origin).toBe(
    "https://preview.example.com",
  );
  expect(
    resolveSiteUrl({
      SITE_URL: "https://site.example.com",
      VERCEL_URL: "preview.example.com",
    }).origin,
  ).toBe("https://site.example.com");
});
