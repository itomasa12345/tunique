import { test, expect } from "@playwright/test";
const pages = [
  "/",
  "/bike-fitting",
  "/life-planning",
  "/about",
  "/contact",
  "/privacy",
];
test("all pages render without overflow, runtime errors, or broken internal links", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of pages) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => [
        ...new Set(nodes.map((n) => n.getAttribute("href")!.split(/[?#]/)[0])),
      ]);
    for (const href of links) expect(pages).toContain(href);
    expect(await page.locator("body").innerText()).not.toMatch(
      /[¥￥]\s*[\d,]+|\d[\d,]*\s*円/,
    );
  }
  expect(errors).toEqual([]);
});
test("navigation and service-specific contact routes work", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await expect(page.locator("#mobile-nav a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "メニューを開く" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: "BIKE FITTING" })
      .click();
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
  } else
    await page
      .getByRole("navigation", { name: "メインナビゲーション", exact: true })
      .getByRole("link", { name: "BIKE FITTING" })
      .click();
  await expect(page).toHaveURL(/bike-fitting/);
  await page.getByRole("link", { name: "予約・相談する" }).click();
  await expect(page.locator('input[value="bike"]')).toBeChecked();
  await page.goto("/contact?type=life");
  await expect(page.locator('input[value="life"]')).toBeChecked();
});
test("FAQ can be expanded", async ({ page }) => {
  await page.goto("/bike-fitting");
  const faq = page.locator("details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator("p")).toBeVisible();
});
test("form validates fields and never sends or stores personal information", async ({
  page,
}) => {
  await page.goto("/contact?type=travel");
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") requests.push(r.url());
  });
  await expect(page.getByText("お問い合わせ受付は準備中です")).toBeVisible();
  await page
    .getByRole("button", { name: "入力項目を確認する（送信されません）" })
    .click();
  await expect(page.getByText("お名前を入力してください。")).toBeVisible();
  await expect(
    page.getByText("出張を希望する地域を入力してください。"),
  ).toBeVisible();
  await page.getByLabel("お名前").fill("テスト 太郎");
  await page.getByLabel("メールアドレス").fill("test@example.com");
  await page.getByLabel("希望する地域").fill("東京都");
  await page.getByLabel("お問い合わせ内容").fill("出張の相談です。");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "入力項目を確認する（送信されません）" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "送信・保存は行っていません",
  );
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});
test("OG image and missing-page response", async ({ request }) => {
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const missing = await request.get("/no-such-page");
  expect(missing.status()).toBe(404);
});
