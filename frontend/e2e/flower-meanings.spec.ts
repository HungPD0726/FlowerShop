import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, type Route, test } from "@playwright/test";

const lotusProduct = {
  id: 88,
  category: {
    id: 8,
    name: "Hoa theo loài",
    slug: "hoa-theo-loai",
    isActive: true,
    displayOrder: 8,
    createdAt: "2026-01-01",
  },
  name: "Bó sen An Nhiên",
  slug: "bo-sen-an-nhien",
  sku: "SEN-AN-NHIEN",
  shortDescription: "Thiết kế hoa sen thanh nhã.",
  basePrice: 720000,
  flowerType: "Hoa Sen",
  mainImageUrl: "/images/flower-meanings/lotus.webp",
  isFeatured: false,
  isNew: false,
  isBestSeller: true,
  isActive: true,
  soldCount: 12,
  averageRating: 4.9,
  reviewCount: 7,
  createdAt: "2026-01-01",
  images: [],
  variants: [
    { id: 881, name: "Tiêu chuẩn", sku: "SEN-AN-NHIEN-S", price: 720000, stockQuantity: 6, isActive: true },
  ],
};

const ok = (data: unknown) => ({
  success: true,
  message: "OK",
  data,
  timestamp: "2026-08-05T00:00:00Z",
});

const pageData = (content: unknown[]) => ({
  content,
  page: 0,
  size: 4,
  totalElements: content.length,
  totalPages: content.length ? 1 : 0,
  first: true,
  last: true,
});

async function mockFlowerMeaningApi(page: Page) {
  await page.route("**/api/v1/**", async (route: Route) => {
    const requestUrl = new URL(route.request().url());
    const path = requestUrl.pathname.replace("/api/v1", "");
    let data: unknown;

    if (path === "/products") {
      data = requestUrl.searchParams.get("flowerType") === "Hoa Sen" ? pageData([lotusProduct]) : pageData([]);
    } else if (path === "/cart") {
      data = { id: 1, items: [], subtotal: 0, totalItems: 0 };
    } else if (path === `/products/${lotusProduct.slug}`) {
      data = lotusProduct;
    } else if (path === `/products/${lotusProduct.id}/related`) {
      data = [];
    } else if (path === `/products/${lotusProduct.id}/reviews`) {
      data = pageData([]);
    } else {
      return route.fulfill({ status: 404, contentType: "application/json", body: JSON.stringify(ok(null)) });
    }

    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(ok(data)) });
  });
}

test("deep link, intent filter, flower selector and product link stay synchronized", async ({ page }) => {
  await mockFlowerMeaningApi(page);
  await page.goto("/flower-meanings?flower=hoa-sen&intent=peace");

  const panel = page.getByRole("tabpanel");
  await expect(panel.getByRole("heading", { name: "Hoa sen" })).toBeVisible();
  const productLink = page.getByRole("link", { name: lotusProduct.name, exact: true });
  await expect(productLink).toBeVisible();

  await page.getByRole("button", { name: "Tình yêu" }).click();
  await expect(page).toHaveURL(/flower=hoa-hong&intent=love/);
  await expect(panel.getByRole("heading", { name: "Hoa hồng" })).toBeVisible();

  await page.getByRole("tab", { name: /Hoa tulip/i }).click();
  await expect(page).toHaveURL(/flower=hoa-tulip&intent=love/);

  await page.goto("/flower-meanings?flower=hoa-sen&intent=peace");
  await Promise.all([
    page.waitForURL(new RegExp(`/products/${lotusProduct.slug}$`), { timeout: 20_000 }),
    page.getByRole("link", { name: `Xem ${lotusProduct.name}`, exact: true }).click(),
  ]);
});

test("flower meanings has no critical or serious axe violations", async ({ page }) => {
  await mockFlowerMeaningApi(page);
  await page.goto("/flower-meanings?flower=hoa-sen&intent=peace");
  await expect(page.getByRole("tabpanel").getByRole("heading", { name: "Hoa sen" })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""))).toEqual([]);
});

test("flower guide stays usable without horizontal overflow at QA viewports", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Viewport matrix only needs one browser project.");
  await mockFlowerMeaningApi(page);

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/flower-meanings?flower=hoa-sen&intent=peace");
    await expect(page.getByRole("tabpanel").getByRole("heading", { name: "Hoa sen" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await expect(page.getByRole("button", { name: "Lên đầu trang" })).toHaveCount(0);

    await expect.poll(async () => {
      const selectedTabBox = await page.getByRole("tab", { selected: true }).boundingBox();
      if (!selectedTabBox || selectedTabBox.x < 0) return Number.POSITIVE_INFINITY;
      return Math.ceil(selectedTabBox.x + selectedTabBox.width);
    }).toBeLessThanOrEqual(viewport.width + 1);

    if (process.env.CAPTURE_QA === "1") {
      await page.screenshot({
        path: `output/playwright/flower-meanings-${viewport.width}x${viewport.height}.png`,
        fullPage: true,
      });
    }
  }
});
