import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("storefront has no critical or serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Lá & Hoa, trang chủ/i })).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""))).toEqual([]);
});
