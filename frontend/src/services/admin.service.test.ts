import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/setup";
import { adminService } from "./admin.service";

describe("admin service", () => {
  it("keeps the category CRUD request contract", async () => {
    server.use(http.post("http://localhost:8080/api/v1/admin/categories", async ({ request }) => {
      const body = await request.json() as Record<string, unknown>;
      expect(body.name).toBe("Hoa theo mùa");
      expect(body.displayOrder).toBe(2);
      return HttpResponse.json({ success: true, message: "ok", data: { id: 9, ...body, slug: "hoa-theo-mua", createdAt: "" }, timestamp: "" });
    }));
    const response = await adminService.createCategory({ name: "Hoa theo mùa", slug: "", description: "", imageUrl: "", isActive: true, displayOrder: 2 });
    expect(response.success).toBe(true);
    expect(response.data.id).toBe(9);
  });
});
