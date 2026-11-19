import { test, expect } from "@playwright/test";
import {
  isPublishedColumn,
  columns,
  canShowColumnDrafts,
} from "../lib/columns";
const drafts = canShowColumnDrafts();

test("unapproved drafts cannot be treated as published", () => {
  expect(isPublishedColumn({ ...columns[0], status: "draft" })).toBe(false);
  expect(
    isPublishedColumn({
      ...columns[0],
      status: "published",
      author: undefined,
      publishedAt: undefined,
    }),
  ).toBe(false);
  expect(
    isPublishedColumn({
      ...columns[0],
      status: "published",
      author: { name: "テスト著者", url: "/about" },
      publishedAt: "2026-11-11",
    }),
  ).toBe(true);
});

test("column listing and article visibility respect publication status", async ({
  page,
  request,
}) => {
  await page.goto("/columns");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "伊藤雅和のブログを読む" }),
  ).toHaveAttribute("href", "https://masakazu-ito.com/");
  const visible = columns.filter((a) => isPublishedColumn(a) || drafts);
  await expect(page.locator(".column-card")).toHaveCount(visible.length);
  if (!visible.length)
    await expect(page.getByText(/コラムは準備中です/)).toBeVisible();
  for (const article of columns) {
    const response = await request.get(`/columns/${article.slug}`);
    expect(response.status()).toBe(
      isPublishedColumn(article) || drafts ? 200 : 404,
    );
  }
  if (visible.length) {
    const article = visible[0];
    await page
      .locator(`.column-card a[href="/columns/${article.slug}"]`)
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      article.title,
    );
    if (!isPublishedColumn(article)) {
      await expect(page.getByRole("note")).toContainText("未公開");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
      await expect(
        page.locator('script[type="application/ld+json"]'),
      ).toHaveCount(0);
    } else {
      const schema = JSON.parse(
        await page.locator('script[type="application/ld+json"]').innerText(),
      );
      expect(schema.headline).toBe(article.title);
      expect(schema.author.name).toBe(article.author!.name);
      expect(schema.datePublished).toBe(article.publishedAt);
    }
    if (article.sections.length) {
      await page
        .getByRole("navigation", { name: "この記事の目次" })
        .getByRole("link")
        .first()
        .click();
      await expect(page).toHaveURL(/#section-1$/);
    }
    await page.getByRole("link", { name: "フィッティングを相談する" }).click();
    await expect(
      page.locator(`input[value="${article.contactType}"]`),
    ).toBeChecked();
  }
  expect((await request.get("/columns/unknown-slug")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const article of columns) {
    if (
      isPublishedColumn(article) &&
      process.env.SEARCH_INDEXING_ENABLED === "true"
    )
      expect(sitemap).toContain(`/columns/${article.slug}`);
    else expect(sitemap).not.toContain(`/columns/${article.slug}`);
  }
});

test("column page and visible articles fit the viewport", async ({ page }) => {
  for (const path of [
    "/columns",
    ...columns
      .filter((a) => isPublishedColumn(a) || drafts)
      .map((a) => `/columns/${a.slug}`),
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("hosting production never opts into draft visibility", () => {
  expect(canShowColumnDrafts({})).toBe(false);
  expect(canShowColumnDrafts({ SHOW_COLUMN_DRAFTS: "true" })).toBe(true);
  expect(
    canShowColumnDrafts({ SHOW_COLUMN_DRAFTS: "true", CONTEXT: "production" }),
  ).toBe(false);
  expect(
    canShowColumnDrafts({
      SHOW_COLUMN_DRAFTS: "true",
      VERCEL_ENV: "production",
    }),
  ).toBe(false);
});

test("user manuscript keeps every paragraph in order", async ({
  page,
  request,
}) => {
  const path = "/columns/tunique-bike-fitting";
  const article = columns.find((a) => a.slug === "tunique-bike-fitting")!;
  if (!drafts && !isPublishedColumn(article)) {
    expect((await request.get(path)).status()).toBe(404);
    return;
  }
  await page.goto(path);
  const { tuniqueBikeFittingBody } =
    await import("../content/columns/tunique-bike-fitting");
  expect(await page.locator(".column-prose > p").allTextContents()).toEqual(
    tuniqueBikeFittingBody,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "TUNIQUE BIKE FITTINGについて",
  );
  await expect(
    page.locator("header").filter({ has: page.locator("h1") }),
  ).toContainText("執筆：伊藤雅和");
  await expect(
    page.getByRole("navigation", { name: "この記事の目次" }),
  ).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    isPublishedColumn(article) && process.env.SEARCH_INDEXING_ENABLED === "true"
      ? "index, follow"
      : "noindex, nofollow",
  );
});
