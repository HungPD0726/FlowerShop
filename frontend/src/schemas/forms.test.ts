import { describe, expect, it } from "vitest";
import { addressSchema, changePasswordSchema, checkoutSchema, productSchema } from "./forms";

describe("form schemas", () => {
  it("maps an invalid phone to the address field", () => {
    const result = addressSchema.safeParse({ recipientName: "An", phone: "123", province: "Hà Nội", district: "Ba Đình", ward: "Điện Biên", detailAddress: "12 Kim Mã", isDefault: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.phone).toBeDefined();
  });

  it("rejects a delivery date earlier than tomorrow", () => {
    const result = checkoutSchema.safeParse({ customerName: "Nguyễn An", customerEmail: "an@example.com", customerPhone: "0912345678", recipientName: "Minh Anh", recipientPhone: "0987654321", province: "Hà Nội", district: "Ba Đình", ward: "Điện Biên", deliveryAddress: "12 Kim Mã", deliveryDate: "2020-01-01", deliveryTimeSlot: "08:00 - 12:00", senderName: "", cardMessage: "", hideSenderName: false, customerNote: "", couponCode: "", paymentMethod: "COD" });
    expect(result.success).toBe(false);
  });

  it("rejects negative inventory in a product variant", () => {
    const result = productSchema.safeParse({ categoryId: 1, name: "Bó hoa mẫu", sku: "BH-01", basePrice: 500000, isFeatured: false, isNew: true, isBestSeller: false, isActive: true, variants: [{ name: "Tiêu chuẩn", sku: "BH-01-S", price: 500000, stockQuantity: -1, isActive: true }] });
    expect(result.success).toBe(false);
  });

  it("requires matching new passwords", () => {
    const result = changePasswordSchema.safeParse({ currentPassword: "current", newPassword: "newpass1", confirmPassword: "newpass2" });
    expect(result.success).toBe(false);
  });
});
