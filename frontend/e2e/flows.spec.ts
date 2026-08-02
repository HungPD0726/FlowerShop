import { expect, Page, Route, test } from "@playwright/test";

const product = {
  id: 1,
  category: { id: 1, name: "Hoa sinh nhật", slug: "hoa-sinh-nhat", isActive: true, displayOrder: 1, createdAt: "2026-01-01" },
  name: "Bó hoa Kiêu Hãnh",
  slug: "bo-hoa-kieu-hanh",
  sku: "BH-001",
  shortDescription: "Thiết kế hoa theo mùa với sắc đỏ và trắng.",
  description: "Thiết kế thủ công theo từng đơn.",
  basePrice: 650000,
  mainImageUrl: "/images/campaign/hero-editorial.png",
  flowerType: "Hoa hồng",
  mainColor: "Đỏ",
  isFeatured: true,
  isNew: true,
  isBestSeller: false,
  isActive: true,
  soldCount: 4,
  averageRating: 4.8,
  reviewCount: 2,
  createdAt: "2026-01-01",
  images: [],
  variants: [{ id: 11, name: "Tiêu chuẩn", sku: "BH-001-S", price: 650000, stockQuantity: 8, isActive: true }],
};

const cart = {
  id: 1,
  subtotal: 650000,
  totalItems: 1,
  items: [{ id: 21, productId: 1, productName: product.name, productSlug: product.slug, mainImageUrl: product.mainImageUrl, variantId: 11, variantName: "Tiêu chuẩn", unitPrice: 650000, quantity: 1, totalPrice: 650000, stockQuantity: 8 }],
};

const order = {
  id: 31,
  orderCode: "FLW-20260802-0031",
  customerName: "Nguyễn An",
  customerEmail: "an@example.com",
  customerPhone: "0912345678",
  recipientName: "Minh Anh",
  recipientPhone: "0987654321",
  province: "TP. Hồ Chí Minh",
  district: "Quận 1",
  ward: "Bến Nghé",
  deliveryAddress: "12 Nguyễn Huệ",
  deliveryDate: "2026-08-04",
  deliveryTimeSlot: "08:00 - 12:00",
  hideSenderName: false,
  subtotal: 650000,
  shippingFee: 30000,
  discountAmount: 0,
  totalAmount: 680000,
  paymentMethod: "COD",
  paymentStatus: "UNPAID",
  orderStatus: "PENDING",
  createdAt: "2026-08-02T10:00:00",
  items: [{ id: 41, productId: 1, variantId: 11, productName: product.name, variantName: "Tiêu chuẩn", productSku: product.sku, imageUrl: product.mainImageUrl, unitPrice: 650000, quantity: 1, totalPrice: 650000 }],
};

const ok = (data: unknown) => ({ success: true, message: "ok", data, timestamp: "2026-08-02T10:00:00" });
const pageData = (content: unknown[]) => ({ content, page: 0, size: 10, totalElements: content.length, totalPages: 1, first: true, last: true });

async function mockApi(page: Page) {
  await page.route("**/api/v1/**", async (route: Route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname.replace("/api/v1", "");
    const method = request.method();
    let data: unknown = null;

    if (path === "/categories" || path === "/admin/categories") data = [product.category];
    else if ((path === "/products" || path === "/admin/products") && method === "GET") data = pageData([product]);
    else if ((path === `/products/${product.slug}` || path === "/admin/products/1") && method === "GET") data = product;
    else if (path === "/products/1/related") data = [];
    else if (path === "/products/1/reviews") data = pageData([]);
    else if (path === "/cart" && method === "GET") data = { id: 1, items: [], subtotal: 0, totalItems: 0 };
    else if (path === "/cart/items" && method === "POST") data = cart;
    else if (path === "/orders" && method === "POST") data = order;
    else if (path === "/orders/my-orders") data = pageData([order]);
    else if (path === "/auth/login" && method === "POST") {
      const body = request.postDataJSON() as { email: string };
      const admin = body.email.includes("admin");
      data = { accessToken: "access-token", refreshToken: "refresh-token", tokenType: "Bearer", id: admin ? 1 : 2, fullName: admin ? "Quản trị Lá & Hoa" : "Nguyễn An", email: body.email, roles: [admin ? "ROLE_ADMIN" : "ROLE_CUSTOMER"] };
    } else if (path === "/admin/dashboard/summary") data = { totalRevenue: 680000, totalOrders: 1, pendingOrders: 1, totalCustomers: 1, recentOrders: [order], lowStockProducts: [] };
    else if (path === "/admin/products" && method === "POST") data = product;
    else if (path === "/admin/products/1" && method === "PUT") data = { ...product, ...(request.postDataJSON() as object) };
    else if (path === "/admin/orders") data = pageData([order]);
    else if (path === "/admin/orders/31" && method === "GET") data = order;
    else if (path === "/admin/orders/31/status" && method === "PATCH") data = { ...order, orderStatus: (request.postDataJSON() as { status: string }).status };
    else return route.fulfill({ status: 404, contentType: "application/json", body: JSON.stringify({ success: false, message: `Unhandled ${method} ${path}`, data: null, timestamp: "" }) });

    return route.fulfill({ status: method === "POST" ? 201 : 200, contentType: "application/json", body: JSON.stringify(ok(data)) });
  });
}

test("browse, filter, product, cart and checkout", async ({ page }) => {
  await mockApi(page);
  await page.goto("/products");
  if ((page.viewportSize()?.width || 1280) < 1024) await page.getByRole("button", { name: "Bộ lọc" }).click();
  await page.getByRole("textbox", { name: "Tìm kiếm" }).fill("Kiêu Hãnh");
  await expect(page).toHaveURL(/keyword=Ki%C3%AAu(?:\+|%20)H%C3%A3nh/);
  if (await page.getByRole("dialog").isVisible().catch(() => false)) await page.getByRole("button", { name: "Đóng" }).click();
  await page.getByRole("link", { name: product.name, exact: true }).click();
  await expect(page.getByRole("heading", { name: product.name })).toBeVisible();
  await page.getByLabel("Ngày giao hoa").fill(new Date(Date.now() + 172800000).toLocaleDateString("en-CA"));
  await page.getByRole("button", { name: /Thêm vào giỏ/ }).click();
  await expect(page.getByRole("dialog", { name: "Giỏ hàng" })).toBeVisible();
  await page.getByRole("link", { name: "Thanh toán" }).click();
  await page.getByLabel("Họ và tên").fill("Nguyễn An");
  await page.getByLabel("Email").fill("an@example.com");
  await page.getByLabel("Số điện thoại", { exact: true }).fill("0912345678");
  await page.getByLabel("Tên người nhận").fill("Minh Anh");
  await page.getByLabel("Số điện thoại người nhận").fill("0987654321");
  await page.getByLabel("Quận hoặc huyện").fill("Quận 1");
  await page.getByLabel("Phường hoặc xã").fill("Bến Nghé");
  await page.getByLabel("Số nhà và tên đường").fill("12 Nguyễn Huệ");
  await page.getByRole("button", { name: "Xác nhận đặt hàng" }).click();
  await expect(page.getByRole("heading", { name: "Đơn hoa đã được ghi nhận." })).toBeVisible();
});

test("customer login reaches protected order history", async ({ page }) => {
  await mockApi(page);
  await page.goto("/login");
  await page.getByLabel("Email").fill("an@example.com");
  await page.getByRole("textbox", { name: "Mật khẩu" }).fill("Password@123456");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page).toHaveURL(/\/account\/orders/);
  await expect(page.getByText(order.orderCode)).toBeVisible();
});

test("admin creates and edits a product, then updates an order", async ({ page }) => {
  await mockApi(page);
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@lahoa.vn");
  await page.getByRole("textbox", { name: "Mật khẩu" }).fill("Password@123456");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page).toHaveURL(/\/admin\/dashboard/);

  await page.goto("/admin/products/create");
  await page.getByLabel("Tên sản phẩm").fill(product.name);
  await page.getByLabel("SKU", { exact: true }).fill(product.sku);
  await page.getByLabel("Danh mục").selectOption("1");
  await page.getByLabel("Giá gốc").fill("650000");
  await page.getByRole("button", { name: "Tạo sản phẩm" }).click();
  await expect(page).toHaveURL(/\/admin\/products$/);

  await page.goto("/admin/products/1/edit");
  await page.getByLabel("Tên sản phẩm").fill("Bó hoa Kiêu Hãnh mới");
  await page.getByRole("button", { name: "Lưu thay đổi" }).click();
  await expect(page).toHaveURL(/\/admin\/products$/);

  await page.goto("/admin/orders/31");
  await page.getByLabel("Trạng thái").selectOption("CONFIRMED");
  await page.getByRole("button", { name: "Lưu trạng thái" }).click();
  await expect(page.getByText("Trạng thái đơn đã cập nhật.")).toBeVisible();
});
