export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  emailVerified: boolean;
  roles: string[];
  createdAt: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  id: number;
  fullName: string;
  email: string;
  roles: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface ProductVariantRequestData {
  id?: number;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface ProductRequestData {
  categoryId: number;
  name: string;
  slug?: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  basePrice: number;
  salePrice?: number;
  mainImageUrl?: string;
  flowerType?: string;
  mainColor?: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  variants: ProductVariantRequestData[];
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  basePrice: number;
  salePrice?: number;
  mainImageUrl?: string;
  flowerType?: string;
  mainColor?: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  soldCount: number;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  mainImageUrl?: string;
  variantId?: number;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  cardMessage?: string;
  stockQuantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  variantId?: number;
  productName: string;
  variantName?: string;
  productSku: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  cardMessage?: string;
}

export interface Order {
  id: number;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  province: string;
  district: string;
  ward: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  senderName?: string;
  cardMessage?: string;
  hideSenderName: boolean;
  customerNote?: string;
  internalNote?: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  assignedStaffName?: string;
  createdAt: string;
  completedAt?: string;
  items: OrderItem[];
}

export interface Coupon {
  id: number;
  code: string;
  title: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usagePerUser: number;
  usedCount: number;
  isActive: boolean;
}

export interface CouponRequestData {
  code: string;
  title: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usagePerUser: number;
  isActive: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Address {
  id: number;
  recipientName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  recentOrders: Order[];
  lowStockProducts: Product[];
}
