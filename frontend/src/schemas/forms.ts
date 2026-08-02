import { z } from "zod";

const phoneSchema = z.string().trim().regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại chưa đúng định dạng");
const imageUrlSchema = z.string().refine((value) => {
  if (!value || value.startsWith("/")) return true;
  try { new URL(value); return true; } catch { return false; }
}, "Đường dẫn ảnh chưa hợp lệ");

export const addressSchema = z.object({
  recipientName: z.string().trim().min(2, "Vui lòng nhập tên người nhận"),
  phone: phoneSchema,
  province: z.string().trim().min(2, "Vui lòng nhập tỉnh hoặc thành phố"),
  district: z.string().trim().min(2, "Vui lòng nhập quận hoặc huyện"),
  ward: z.string().trim().min(2, "Vui lòng nhập phường hoặc xã"),
  detailAddress: z.string().trim().min(5, "Vui lòng nhập địa chỉ chi tiết"),
  isDefault: z.boolean(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(6, "Mật khẩu mới cần ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu mới"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Mật khẩu xác nhận chưa khớp",
    path: ["confirmPassword"],
  });

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  customerEmail: z.string().trim().email("Email chưa đúng định dạng"),
  customerPhone: phoneSchema,
  recipientName: z.string().trim().min(2, "Vui lòng nhập tên người nhận"),
  recipientPhone: phoneSchema,
  province: z.string().trim().min(2, "Vui lòng nhập tỉnh hoặc thành phố"),
  district: z.string().trim().min(2, "Vui lòng nhập quận hoặc huyện"),
  ward: z.string().trim().min(2, "Vui lòng nhập phường hoặc xã"),
  deliveryAddress: z.string().trim().min(5, "Vui lòng nhập địa chỉ giao hoa"),
  deliveryDate: z.string().min(1, "Vui lòng chọn ngày giao").refine((value) => value >= new Date(Date.now() + 86400000).toLocaleDateString("en-CA"), "Ngày giao cần từ ngày mai"),
  deliveryTimeSlot: z.string().min(1, "Vui lòng chọn khung giờ giao"),
  senderName: z.string().max(80, "Tên người gửi tối đa 80 ký tự").optional(),
  cardMessage: z.string().max(300, "Lời nhắn tối đa 300 ký tự").optional(),
  hideSenderName: z.boolean(),
  customerNote: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
  couponCode: z.string().max(40, "Mã giảm giá tối đa 40 ký tự").optional(),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER"]),
});

export const productVariantSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, "Vui lòng nhập tên biến thể"),
  sku: z.string().trim().min(1, "Vui lòng nhập SKU biến thể"),
  price: z.coerce.number().min(0, "Giá không thể âm"),
  salePrice: z.coerce.number().min(0, "Giá giảm không thể âm").optional(),
  stockQuantity: z.coerce.number().int().min(0, "Tồn kho không thể âm"),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  categoryId: z.coerce.number().int().positive("Vui lòng chọn danh mục"),
  name: z.string().trim().min(2, "Vui lòng nhập tên sản phẩm"),
  slug: z.string().trim().optional(),
  sku: z.string().trim().min(1, "Vui lòng nhập SKU"),
  shortDescription: z.string().max(240, "Mô tả ngắn tối đa 240 ký tự").optional(),
  description: z.string().optional(),
  basePrice: z.coerce.number().min(0, "Giá không thể âm"),
  salePrice: z.coerce.number().min(0, "Giá giảm không thể âm").optional(),
  mainImageUrl: imageUrlSchema.optional(),
  flowerType: z.string().optional(),
  mainColor: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(true),
  isBestSeller: z.boolean().default(false),
  isActive: z.boolean().default(true),
  variants: z.array(productVariantSchema).default([]),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên danh mục"),
  slug: z.string().trim().optional(),
  description: z.string().max(300, "Mô tả tối đa 300 ký tự").optional(),
  imageUrl: imageUrlSchema.optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.coerce.number().int().min(0, "Thứ tự không thể âm"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
