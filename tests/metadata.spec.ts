import { test, expect } from "@playwright/test";
const paths = [
  "/",
  "/bike-fitting",
  "/life-planning",
  "/about",
  "/contact",
  "/privacy",
];
const indexed = process.env.SEARCH_INDEXING_ENABLED === "true";
const origin = process.env.SITE_URL || "http://localhost:3000";
test("all pages share search policy and render canonical metadata in initial HTML", async ({
  request,
}) => {
  for (const path of paths) {
    for (const agent of ["Mozilla/5.0", "Googlebot"]) {
      const response = await request.get(path, {
        headers: { "User-Agent": agent },
      });
      expect(response.status()).toBe(200);
      const html = await response.text();
      const head = html.split("</head>")[0];
      expect(head).toContain(
        `name="robots" content="${indexed ? "index, follow" : "noindex, nofollow"}"`,
      );
      expect(html).not.toContain('name="robots" content="noindex"');
      expect(head).toContain(
        `rel="canonical" href="${new URL(path, origin).href.replace(/\/$/, "")}"`,
      );
      expect(head).toContain(
        `property="og:url" content="${new URL(path, origin).href.replace(/\/$/, "")}"`,
      );
    }
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(indexed ? "Allow: /" : "Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) || []).length).toBe(indexed ? 6 : 0);
  if (indexed)
    for (const path of paths)
      expect(sitemap).toContain(`<loc>${new URL(path, origin).href}</loc>`);
});
