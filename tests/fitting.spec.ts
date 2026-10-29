import { test, expect } from "@playwright/test";

test("road and keirin links lead to distinct fitting explanations", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "フィッティングを選ぶ" })
    .getByRole("link", { name: /ROAD BIKE/ })
    .click();
  await expect(page).toHaveURL(/\/bike-fitting#road$/);
  const road = page.locator("#road");
  await expect(road.getByRole("heading", { level: 2 })).toBeInViewport();
  await expect(road).toContainText("力みの少ない");
  await expect(road).toContainText("全身運動");
  await expect(road).toContainText("0.25mm");
  await expect(road).toContainText("ハンドルの高さ・位置");
  await expect(road).not.toContainText("高回転");
  await page
    .getByRole("navigation", { name: "フィッティングの種類" })
    .getByRole("link", { name: /競輪/ })
    .click();
  await expect(page).toHaveURL(/#keirin$/);
  const keirin = page.locator("#keirin");
  await expect(keirin.getByRole("heading", { level: 2 })).toBeInViewport();
  await expect(keirin).toContainText("打点");
  await expect(keirin).toContainText("上限の目安");
  await expect(keirin).toContainText("サドルを少し下げ");
  await expect(keirin).toContainText("戻れる位置");
  await expect(keirin).not.toContainText("0.25mm");
  await keirin.getByRole("link", { name: "競輪フィッティングの相談" }).click();
  await expect(page.locator('input[value="bike"]')).toBeChecked();
});
