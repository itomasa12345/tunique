import { test, expect } from "@playwright/test";

test.skip(
  process.env.CONTACT_SUBMISSION_TEST !== "1",
  "Requires a local build with NEXT_PUBLIC_CONTACT_FORM_ENABLED=true.",
);
async function fill(page: import("@playwright/test").Page) {
  await page.goto("/contact?type=travel");
  await page.getByLabel("お名前").fill("テスト 太郎");
  await page.getByLabel("メールアドレス").fill("test@example.com");
  await page.getByLabel("希望する地域").fill("東京都");
  await page.getByLabel("お問い合わせ内容").fill("ローカル動作確認です。");
  await page.getByRole("checkbox").check();
}

test("enabled form waits for acknowledgement and prevents duplicate requests", async ({
  page,
}) => {
  let requests = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/__forms.html", async (route) => {
    requests++;
    const body = new URLSearchParams(route.request().postData() || "");
    expect(body.get("form-name")).toBe("tunique-contact");
    expect(body.get("type")).toBe("全国出張フィッティングの依頼");
    expect(body.get("email")).toBe("test@example.com");
    expect(body.get("consent")).toContain("同意");
    await gate;
    await route.fulfill({ status: 200, body: "ok" });
  });
  await fill(page);
  await page.getByRole("button", { name: "お問い合わせを送信する" }).click();
  await expect(page.getByRole("button", { name: "送信中…" })).toBeDisabled();
  await expect(page.getByRole("status")).not.toContainText("受け付けました");
  release();
  await expect(page.getByRole("status")).toContainText("受け付けました");
  await expect(page.getByRole("button", { name: "送信済み" })).toBeDisabled();
  expect(requests).toBe(1);
});
test("failed request preserves input and allows retry", async ({ page }) => {
  await page.route("**/__forms.html", (r) =>
    r.fulfill({ status: 503, body: "unavailable" }),
  );
  await fill(page);
  await page.getByRole("button", { name: "お問い合わせを送信する" }).click();
  await expect(page.getByRole("status")).toContainText(
    "送信結果を確認できませんでした",
  );
  await expect(page.getByLabel("お問い合わせ内容")).toHaveValue(
    "ローカル動作確認です。",
  );
  await expect(
    page.getByRole("button", { name: "お問い合わせを送信する" }),
  ).toBeEnabled();
});
test("invalid enabled form never posts", async ({ page }) => {
  let posts = 0;
  page.on("request", (r) => {
    if (r.method() === "POST") posts++;
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "お問い合わせを送信する" }).click();
  await expect(page.getByText("お名前を入力してください。")).toBeVisible();
  expect(posts).toBe(0);
});
