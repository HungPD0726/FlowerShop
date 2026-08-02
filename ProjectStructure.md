# PROJECT STRUCTURE – FLOWER SHOP E-COMMERCE

```text
flower-shop/
│
├── frontend/
├── backend/
├── database/
├── nginx/
├── docs/
├── scripts/
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
├── .gitignore
├── README.md
└── Makefile
```

---

# 1. Cấu trúc tổng thể

```text
flower-shop/
│
├── frontend/                     # Website khách hàng và trang quản trị
│
├── backend/                      # REST API Spring Boot
│
├── database/                     # Script SQL Server hỗ trợ
│
├── nginx/                        # Reverse proxy
│
├── docs/                         # Tài liệu hệ thống
│
├── scripts/                      # Script chạy, backup, deploy
│
├── docker-compose.yml            # Docker production
├── docker-compose.dev.yml        # Docker development
├── .env.example                  # Mẫu biến môi trường
├── .gitignore
├── README.md
└── Makefile
```

Luồng hoạt động:

```text
Client Browser
      │
      ▼
    Nginx
      │
      ├──────────────► Next.js Frontend
      │
      └──────────────► Spring Boot Backend
                              │
                              ▼
                         SQL Server
```

---

# 2. Frontend structure

Frontend sử dụng:

```text
Next.js
React
TypeScript
Tailwind CSS
TanStack Query
Zustand
React Hook Form
Zod
Axios
```

Cấu trúc:

```text
frontend/
│
├── public/
│   ├── images/
│   │   ├── banners/
│   │   ├── categories/
│   │   ├── products/
│   │   ├── placeholders/
│   │   └── logo/
│   │
│   ├── icons/
│   ├── favicon.ico
│   ├── robots.txt
│   └── site.webmanifest
│
├── src/
│   │
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── services/
│   ├── hooks/
│   ├── stores/
│   ├── schemas/
│   ├── types/
│   ├── constants/
│   ├── config/
│   ├── lib/
│   ├── utils/
│   ├── providers/
│   ├── styles/
│   └── middleware.ts
│
├── tests/
├── .env.local.example
├── components.json
├── Dockerfile
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# 3. Frontend app router

```text
frontend/src/app/
│
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── globals.css
├── sitemap.ts
├── robots.ts
│
├── (store)/
│   ├── layout.tsx
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   │
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── search/
│   │   └── page.tsx
│   │
│   ├── collections/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── success/
│   │       └── page.tsx
│   │
│   ├── track-order/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── policies/
│   │   ├── shipping/
│   │   │   └── page.tsx
│   │   ├── payment/
│   │   │   └── page.tsx
│   │   ├── return/
│   │   │   └── page.tsx
│   │   └── privacy/
│   │       └── page.tsx
│   │
│   └── faq/
│       └── page.tsx
│
├── (auth)/
│   ├── layout.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── forgot-password/
│   │   └── page.tsx
│   │
│   └── reset-password/
│       └── page.tsx
│
├── account/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── profile/
│   │   └── page.tsx
│   │
│   ├── addresses/
│   │   └── page.tsx
│   │
│   ├── orders/
│   │   ├── page.tsx
│   │   └── [orderCode]/
│   │       └── page.tsx
│   │
│   ├── reviews/
│   │   └── page.tsx
│   │
│   └── change-password/
│       └── page.tsx
│
└── admin/
    ├── layout.tsx
    ├── page.tsx
    │
    ├── dashboard/
    │   └── page.tsx
    │
    ├── products/
    │   ├── page.tsx
    │   ├── create/
    │   │   └── page.tsx
    │   └── [id]/
    │       └── edit/
    │           └── page.tsx
    │
    ├── categories/
    │   ├── page.tsx
    │   ├── create/
    │   │   └── page.tsx
    │   └── [id]/
    │       └── edit/
    │           └── page.tsx
    │
    ├── orders/
    │   ├── page.tsx
    │   └── [id]/
    │       └── page.tsx
    │
    ├── inventory/
    │   ├── page.tsx
    │   └── transactions/
    │       └── page.tsx
    │
    ├── coupons/
    │   ├── page.tsx
    │   ├── create/
    │   │   └── page.tsx
    │   └── [id]/
    │       └── edit/
    │           └── page.tsx
    │
    ├── users/
    │   ├── page.tsx
    │   └── [id]/
    │       └── page.tsx
    │
    ├── staff/
    │   ├── page.tsx
    │   └── create/
    │       └── page.tsx
    │
    ├── reviews/
    │   └── page.tsx
    │
    ├── reports/
    │   ├── page.tsx
    │   ├── revenue/
    │   │   └── page.tsx
    │   └── products/
    │       └── page.tsx
    │
    └── settings/
        └── page.tsx
```

---

# 4. Frontend components

```text
frontend/src/components/
│
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── radio-group.tsx
│   ├── dialog.tsx
│   ├── alert-dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── sheet.tsx
│   ├── tabs.tsx
│   ├── table.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── pagination.tsx
│   ├── skeleton.tsx
│   ├── tooltip.tsx
│   ├── toast.tsx
│   └── date-picker.tsx
│
├── layout/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── main-navigation.tsx
│   ├── mobile-navigation.tsx
│   ├── account-sidebar.tsx
│   ├── admin-sidebar.tsx
│   ├── admin-header.tsx
│   └── page-container.tsx
│
├── common/
│   ├── logo.tsx
│   ├── breadcrumb.tsx
│   ├── search-box.tsx
│   ├── loading-spinner.tsx
│   ├── loading-skeleton.tsx
│   ├── empty-state.tsx
│   ├── error-state.tsx
│   ├── confirm-dialog.tsx
│   ├── currency.tsx
│   ├── status-badge.tsx
│   ├── image-uploader.tsx
│   └── rich-text-editor.tsx
│
├── home/
│   ├── hero-banner.tsx
│   ├── featured-categories.tsx
│   ├── best-seller-section.tsx
│   ├── new-arrivals-section.tsx
│   ├── seasonal-collection.tsx
│   ├── shop-benefits.tsx
│   ├── testimonial-section.tsx
│   ├── instagram-gallery.tsx
│   └── newsletter-section.tsx
│
├── product/
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── product-list.tsx
│   ├── product-gallery.tsx
│   ├── product-info.tsx
│   ├── product-price.tsx
│   ├── product-filters.tsx
│   ├── product-sort.tsx
│   ├── product-variant-selector.tsx
│   ├── product-quantity-selector.tsx
│   ├── related-products.tsx
│   ├── product-rating.tsx
│   ├── product-reviews.tsx
│   └── add-to-cart-button.tsx
│
├── cart/
│   ├── cart-button.tsx
│   ├── cart-drawer.tsx
│   ├── cart-item.tsx
│   ├── cart-list.tsx
│   ├── cart-summary.tsx
│   ├── coupon-form.tsx
│   └── empty-cart.tsx
│
├── checkout/
│   ├── checkout-form.tsx
│   ├── customer-information-form.tsx
│   ├── recipient-information-form.tsx
│   ├── delivery-information-form.tsx
│   ├── payment-method-form.tsx
│   ├── card-message-form.tsx
│   ├── checkout-summary.tsx
│   └── checkout-success.tsx
│
├── order/
│   ├── order-card.tsx
│   ├── order-list.tsx
│   ├── order-detail.tsx
│   ├── order-items.tsx
│   ├── order-summary.tsx
│   ├── order-status-timeline.tsx
│   └── cancel-order-button.tsx
│
├── review/
│   ├── review-card.tsx
│   ├── review-list.tsx
│   ├── review-form.tsx
│   └── rating-stars.tsx
│
└── admin/
    ├── dashboard-stat-card.tsx
    ├── revenue-chart.tsx
    ├── recent-orders-table.tsx
    ├── best-selling-products.tsx
    ├── low-stock-products.tsx
    ├── product-table.tsx
    ├── product-form.tsx
    ├── category-table.tsx
    ├── category-form.tsx
    ├── order-table.tsx
    ├── order-detail-panel.tsx
    ├── order-status-form.tsx
    ├── inventory-table.tsx
    ├── inventory-adjustment-form.tsx
    ├── coupon-table.tsx
    ├── coupon-form.tsx
    ├── user-table.tsx
    └── review-moderation-table.tsx
```

---

# 5. Frontend feature modules

Mỗi feature chứa logic riêng của một chức năng.

```text
frontend/src/features/
│
├── auth/
│   ├── api/
│   │   └── auth.api.ts
│   ├── hooks/
│   │   ├── use-login.ts
│   │   ├── use-register.ts
│   │   ├── use-logout.ts
│   │   └── use-current-user.ts
│   ├── schemas/
│   │   ├── login.schema.ts
│   │   ├── register.schema.ts
│   │   └── change-password.schema.ts
│   └── types/
│       └── auth.types.ts
│
├── products/
│   ├── api/
│   │   └── products.api.ts
│   ├── hooks/
│   │   ├── use-products.ts
│   │   ├── use-product-detail.ts
│   │   └── use-related-products.ts
│   ├── schemas/
│   │   └── product.schema.ts
│   └── types/
│       └── product.types.ts
│
├── categories/
│   ├── api/
│   ├── hooks/
│   └── types/
│
├── cart/
│   ├── api/
│   ├── hooks/
│   ├── stores/
│   └── types/
│
├── checkout/
│   ├── api/
│   ├── hooks/
│   ├── schemas/
│   └── types/
│
├── orders/
│   ├── api/
│   ├── hooks/
│   └── types/
│
├── reviews/
│   ├── api/
│   ├── hooks/
│   └── types/
│
└── admin/
    ├── dashboard/
    ├── products/
    ├── categories/
    ├── orders/
    ├── inventory/
    ├── coupons/
    ├── users/
    └── reports/
```

---

# 6. Frontend services

```text
frontend/src/services/
│
├── api-client.ts
├── auth.service.ts
├── product.service.ts
├── category.service.ts
├── cart.service.ts
├── order.service.ts
├── address.service.ts
├── review.service.ts
├── coupon.service.ts
├── upload.service.ts
└── admin.service.ts
```

## api-client.ts

Chịu trách nhiệm:

* Cấu hình base URL.
* Thêm Access Token vào request.
* Gửi cookie Refresh Token.
* Xử lý lỗi 401.
* Gọi refresh token.
* Chuẩn hóa lỗi API.

---

# 7. Frontend stores

```text
frontend/src/stores/
│
├── auth.store.ts
├── cart.store.ts
├── checkout.store.ts
├── filter.store.ts
└── ui.store.ts
```

Chức năng:

```text
auth.store.ts
- Lưu thông tin người dùng.
- Lưu trạng thái đăng nhập.
- Không lưu Refresh Token trực tiếp.

cart.store.ts
- Quản lý giỏ hàng local.
- Đồng bộ giỏ hàng với backend.
- Tính tổng số sản phẩm.

checkout.store.ts
- Lưu tạm thông tin checkout.
- Lưu phương thức thanh toán.
- Lưu thông tin người nhận.

filter.store.ts
- Lưu bộ lọc sản phẩm.

ui.store.ts
- Điều khiển menu mobile.
- Điều khiển cart drawer.
- Điều khiển modal.
```

---

# 8. Frontend schemas

```text
frontend/src/schemas/
│
├── auth.schema.ts
├── product.schema.ts
├── cart.schema.ts
├── checkout.schema.ts
├── address.schema.ts
├── review.schema.ts
├── coupon.schema.ts
└── admin.schema.ts
```

Sử dụng Zod để validate form trước khi gửi backend.

---

# 9. Frontend types

```text
frontend/src/types/
│
├── api.types.ts
├── auth.types.ts
├── user.types.ts
├── product.types.ts
├── category.types.ts
├── cart.types.ts
├── order.types.ts
├── payment.types.ts
├── coupon.types.ts
├── review.types.ts
├── inventory.types.ts
└── dashboard.types.ts
```

Ví dụ:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
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
```

---

# 10. Frontend hooks

```text
frontend/src/hooks/
│
├── use-auth.ts
├── use-cart.ts
├── use-debounce.ts
├── use-media-query.ts
├── use-pagination.ts
├── use-permission.ts
├── use-query-params.ts
└── use-toast.ts
```

---

# 11. Frontend constants

```text
frontend/src/constants/
│
├── api.constants.ts
├── app.constants.ts
├── auth.constants.ts
├── order.constants.ts
├── payment.constants.ts
├── product.constants.ts
├── route.constants.ts
└── storage.constants.ts
```

---

# 12. Frontend configuration

```text
frontend/src/config/
│
├── env.ts
├── site.ts
├── navigation.ts
└── permissions.ts
```

Ví dụ `site.ts`:

```typescript
export const siteConfig = {
  name: "Lá & Hoa",
  description: "Trao hoa – Gửi trọn yêu thương",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};
```

---

# 13. Backend structure

Backend sử dụng:

```text
Java 21
Spring Boot
Spring Security
Spring Data JPA
SQL Server
Flyway
JWT
MapStruct
Lombok
Swagger
```

Cấu trúc:

```text
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── flowerstore/
│   │   │           ├── FlowerStoreApplication.java
│   │   │           ├── config/
│   │   │           ├── controller/
│   │   │           ├── dto/
│   │   │           ├── entity/
│   │   │           ├── enums/
│   │   │           ├── repository/
│   │   │           ├── service/
│   │   │           ├── mapper/
│   │   │           ├── security/
│   │   │           ├── exception/
│   │   │           ├── specification/
│   │   │           ├── util/
│   │   │           ├── validation/
│   │   │           ├── event/
│   │   │           └── scheduler/
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── logback-spring.xml
│   │       └── db/
│   │           └── migration/
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── flowerstore/
│
├── uploads/
├── Dockerfile
├── pom.xml
├── .env.example
└── README.md
```

---

# 14. Backend package structure

```text
backend/src/main/java/com/flowerstore/
│
├── FlowerStoreApplication.java
│
├── config/
│   ├── AsyncConfig.java
│   ├── CorsConfig.java
│   ├── JacksonConfig.java
│   ├── OpenApiConfig.java
│   ├── PasswordEncoderConfig.java
│   ├── SecurityConfig.java
│   └── WebMvcConfig.java
│
├── controller/
│   ├── publicapi/
│   │   ├── AuthController.java
│   │   ├── ProductController.java
│   │   ├── CategoryController.java
│   │   ├── ReviewController.java
│   │   └── ContactController.java
│   │
│   ├── customer/
│   │   ├── AccountController.java
│   │   ├── AddressController.java
│   │   ├── CartController.java
│   │   ├── OrderController.java
│   │   └── CustomerReviewController.java
│   │
│   └── admin/
│       ├── AdminDashboardController.java
│       ├── AdminProductController.java
│       ├── AdminCategoryController.java
│       ├── AdminOrderController.java
│       ├── AdminInventoryController.java
│       ├── AdminCouponController.java
│       ├── AdminUserController.java
│       ├── AdminStaffController.java
│       ├── AdminReviewController.java
│       └── AdminReportController.java
│
├── dto/
│   ├── request/
│   └── response/
│
├── entity/
├── enums/
├── repository/
├── service/
├── mapper/
├── security/
├── exception/
├── specification/
├── util/
├── validation/
├── event/
└── scheduler/
```

---

# 15. Backend DTO structure

```text
backend/src/main/java/com/flowerstore/dto/
│
├── request/
│   ├── auth/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── RefreshTokenRequest.java
│   │   ├── ChangePasswordRequest.java
│   │   └── ForgotPasswordRequest.java
│   │
│   ├── user/
│   │   ├── UpdateProfileRequest.java
│   │   ├── CreateAddressRequest.java
│   │   └── UpdateAddressRequest.java
│   │
│   ├── product/
│   │   ├── CreateProductRequest.java
│   │   ├── UpdateProductRequest.java
│   │   ├── CreateProductVariantRequest.java
│   │   └── ProductFilterRequest.java
│   │
│   ├── category/
│   │   ├── CreateCategoryRequest.java
│   │   └── UpdateCategoryRequest.java
│   │
│   ├── cart/
│   │   ├── AddCartItemRequest.java
│   │   └── UpdateCartItemRequest.java
│   │
│   ├── order/
│   │   ├── CreateOrderRequest.java
│   │   ├── UpdateOrderStatusRequest.java
│   │   ├── AssignOrderRequest.java
│   │   └── CancelOrderRequest.java
│   │
│   ├── coupon/
│   │   ├── ApplyCouponRequest.java
│   │   ├── CreateCouponRequest.java
│   │   └── UpdateCouponRequest.java
│   │
│   ├── inventory/
│   │   └── InventoryAdjustmentRequest.java
│   │
│   └── review/
│       ├── CreateReviewRequest.java
│       └── UpdateReviewRequest.java
│
└── response/
    ├── common/
    │   ├── ApiResponse.java
    │   ├── PageResponse.java
    │   └── ErrorResponse.java
    │
    ├── auth/
    │   ├── LoginResponse.java
    │   ├── TokenResponse.java
    │   └── CurrentUserResponse.java
    │
    ├── user/
    │   ├── UserResponse.java
    │   └── AddressResponse.java
    │
    ├── product/
    │   ├── ProductSummaryResponse.java
    │   ├── ProductDetailResponse.java
    │   ├── ProductVariantResponse.java
    │   └── ProductImageResponse.java
    │
    ├── category/
    │   └── CategoryResponse.java
    │
    ├── cart/
    │   ├── CartResponse.java
    │   └── CartItemResponse.java
    │
    ├── order/
    │   ├── OrderSummaryResponse.java
    │   ├── OrderDetailResponse.java
    │   ├── OrderItemResponse.java
    │   └── OrderStatusHistoryResponse.java
    │
    ├── coupon/
    │   └── CouponResponse.java
    │
    ├── inventory/
    │   └── InventoryTransactionResponse.java
    │
    ├── review/
    │   └── ReviewResponse.java
    │
    └── dashboard/
        ├── DashboardSummaryResponse.java
        ├── RevenueResponse.java
        └── TopProductResponse.java
```

---

# 16. Backend entities

```text
backend/src/main/java/com/flowerstore/entity/
│
├── BaseEntity.java
│
├── User.java
├── Role.java
├── UserRole.java
├── RefreshToken.java
├── Address.java
│
├── Category.java
├── Product.java
├── ProductImage.java
├── ProductVariant.java
│
├── Cart.java
├── CartItem.java
│
├── Order.java
├── OrderItem.java
├── OrderStatusHistory.java
├── Payment.java
│
├── InventoryTransaction.java
│
├── Coupon.java
├── CouponUsage.java
│
└── Review.java
```

## BaseEntity.java

Chứa các trường dùng chung:

```text
id
createdAt
updatedAt
```

Entity cần soft delete:

```text
Product
User
Category
Coupon
```

Có thể bổ sung:

```text
deletedAt
deleted
```

---

# 17. Backend enums

```text
backend/src/main/java/com/flowerstore/enums/
│
├── RoleName.java
├── OrderStatus.java
├── PaymentStatus.java
├── PaymentMethod.java
├── InventoryTransactionType.java
├── DiscountType.java
├── TokenType.java
└── AccountStatus.java
```

Ví dụ:

```java
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    DELIVERING,
    COMPLETED,
    CANCELLED,
    REFUNDED
}
```

---

# 18. Backend repositories

```text
backend/src/main/java/com/flowerstore/repository/
│
├── UserRepository.java
├── RoleRepository.java
├── RefreshTokenRepository.java
├── AddressRepository.java
│
├── CategoryRepository.java
├── ProductRepository.java
├── ProductImageRepository.java
├── ProductVariantRepository.java
│
├── CartRepository.java
├── CartItemRepository.java
│
├── OrderRepository.java
├── OrderItemRepository.java
├── OrderStatusHistoryRepository.java
├── PaymentRepository.java
│
├── InventoryTransactionRepository.java
│
├── CouponRepository.java
├── CouponUsageRepository.java
│
└── ReviewRepository.java
```

Repository chỉ chịu trách nhiệm:

* Truy vấn database.
* Query theo tên method.
* JPQL.
* Native query khi thực sự cần.
* Specification cho tìm kiếm động.

Không viết nghiệp vụ trong Repository.

---

# 19. Backend services

```text
backend/src/main/java/com/flowerstore/service/
│
├── AuthService.java
├── UserService.java
├── AddressService.java
├── ProductService.java
├── CategoryService.java
├── CartService.java
├── OrderService.java
├── PaymentService.java
├── InventoryService.java
├── CouponService.java
├── ReviewService.java
├── DashboardService.java
├── ReportService.java
├── StorageService.java
├── EmailService.java
└── OrderCodeGenerator.java
```

Implementation:

```text
backend/src/main/java/com/flowerstore/service/impl/
│
├── AuthServiceImpl.java
├── UserServiceImpl.java
├── AddressServiceImpl.java
├── ProductServiceImpl.java
├── CategoryServiceImpl.java
├── CartServiceImpl.java
├── OrderServiceImpl.java
├── PaymentServiceImpl.java
├── InventoryServiceImpl.java
├── CouponServiceImpl.java
├── ReviewServiceImpl.java
├── DashboardServiceImpl.java
├── ReportServiceImpl.java
├── LocalStorageServiceImpl.java
├── CloudinaryStorageServiceImpl.java
├── EmailServiceImpl.java
└── OrderCodeGeneratorImpl.java
```

---

# 20. Backend mappers

```text
backend/src/main/java/com/flowerstore/mapper/
│
├── UserMapper.java
├── AddressMapper.java
├── ProductMapper.java
├── CategoryMapper.java
├── CartMapper.java
├── OrderMapper.java
├── CouponMapper.java
├── InventoryMapper.java
└── ReviewMapper.java
```

Sử dụng MapStruct.

Ví dụ:

```java
@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductSummaryResponse toSummaryResponse(Product product);

    ProductDetailResponse toDetailResponse(Product product);
}
```

---

# 21. Backend security

```text
backend/src/main/java/com/flowerstore/security/
│
├── jwt/
│   ├── JwtAuthenticationFilter.java
│   ├── JwtTokenProvider.java
│   ├── JwtProperties.java
│   └── JwtAuthenticationEntryPoint.java
│
├── service/
│   ├── CustomUserDetailsService.java
│   └── CustomUserPrincipal.java
│
├── handler/
│   ├── CustomAccessDeniedHandler.java
│   ├── AuthenticationSuccessHandler.java
│   └── AuthenticationFailureHandler.java
│
└── annotation/
    ├── CurrentUser.java
    └── IsAdmin.java
```

Chức năng:

```text
JwtTokenProvider
- Tạo Access Token.
- Kiểm tra token.
- Đọc user ID và role.
- Kiểm tra hạn token.

JwtAuthenticationFilter
- Đọc Bearer Token.
- Xác thực người dùng.
- Gắn authentication vào SecurityContext.

CustomUserDetailsService
- Tải thông tin người dùng từ database.
```

---

# 22. Backend exceptions

```text
backend/src/main/java/com/flowerstore/exception/
│
├── GlobalExceptionHandler.java
├── ResourceNotFoundException.java
├── BadRequestException.java
├── UnauthorizedException.java
├── ForbiddenException.java
├── DuplicateResourceException.java
├── BusinessException.java
├── InvalidTokenException.java
├── InsufficientStockException.java
├── InvalidCouponException.java
├── OrderCannotCancelException.java
└── FileStorageException.java
```

---

# 23. Backend specifications

```text
backend/src/main/java/com/flowerstore/specification/
│
├── ProductSpecification.java
├── OrderSpecification.java
├── UserSpecification.java
└── CouponSpecification.java
```

Sử dụng để tìm kiếm động.

Ví dụ ProductSpecification hỗ trợ:

```text
keyword
categoryId
categorySlug
minPrice
maxPrice
flowerType
mainColor
inStock
isFeatured
isBestSeller
isActive
```

---

# 24. Backend validations

```text
backend/src/main/java/com/flowerstore/validation/
│
├── annotation/
│   ├── UniqueEmail.java
│   ├── UniqueSku.java
│   ├── ValidDeliveryDate.java
│   └── PasswordMatches.java
│
└── validator/
    ├── UniqueEmailValidator.java
    ├── UniqueSkuValidator.java
    ├── DeliveryDateValidator.java
    └── PasswordMatchesValidator.java
```

---

# 25. Backend utilities

```text
backend/src/main/java/com/flowerstore/util/
│
├── SecurityUtils.java
├── DateTimeUtils.java
├── MoneyUtils.java
├── SlugUtils.java
├── FileUtils.java
├── CookieUtils.java
├── PaginationUtils.java
└── OrderCodeUtils.java
```

---

# 26. Backend events

Có thể dùng Spring Events để tách nghiệp vụ phụ.

```text
backend/src/main/java/com/flowerstore/event/
│
├── order/
│   ├── OrderCreatedEvent.java
│   ├── OrderCancelledEvent.java
│   ├── OrderCompletedEvent.java
│   └── OrderEventListener.java
│
├── user/
│   ├── UserRegisteredEvent.java
│   └── UserEventListener.java
│
└── inventory/
    ├── LowStockEvent.java
    └── LowStockEventListener.java
```

Ví dụ:

```text
OrderCreatedEvent
- Gửi email xác nhận.
- Ghi log.
- Thông báo admin.

OrderCancelledEvent
- Hoàn tồn kho.
- Gửi email hủy đơn.

LowStockEvent
- Thông báo sản phẩm sắp hết hàng.
```

---

# 27. Backend schedulers

```text
backend/src/main/java/com/flowerstore/scheduler/
│
├── ExpiredCouponScheduler.java
├── RefreshTokenCleanupScheduler.java
├── PendingOrderScheduler.java
└── InventoryNotificationScheduler.java
```

Chức năng:

```text
ExpiredCouponScheduler
- Tắt coupon hết hạn.

RefreshTokenCleanupScheduler
- Xóa Refresh Token hết hạn.

PendingOrderScheduler
- Có thể tự hủy đơn chưa xác nhận sau khoảng thời gian cấu hình.

InventoryNotificationScheduler
- Kiểm tra sản phẩm sắp hết hàng.
```

---

# 28. Backend resources

```text
backend/src/main/resources/
│
├── application.yml
├── application-dev.yml
├── application-test.yml
├── application-prod.yml
├── logback-spring.xml
│
├── templates/
│   └── email/
│       ├── order-confirmation.html
│       ├── order-status-updated.html
│       ├── reset-password.html
│       └── welcome.html
│
└── db/
    └── migration/
        ├── V1__create_users_and_roles.sql
        ├── V2__create_categories.sql
        ├── V3__create_products.sql
        ├── V4__create_product_variants_and_images.sql
        ├── V5__create_carts.sql
        ├── V6__create_orders.sql
        ├── V7__create_payments.sql
        ├── V8__create_inventory_transactions.sql
        ├── V9__create_coupons.sql
        ├── V10__create_reviews.sql
        ├── V11__create_indexes.sql
        └── V12__insert_seed_data.sql
```

---

# 29. Backend test structure

```text
backend/src/test/java/com/flowerstore/
│
├── controller/
│   ├── AuthControllerIntegrationTest.java
│   ├── ProductControllerIntegrationTest.java
│   ├── CartControllerIntegrationTest.java
│   ├── OrderControllerIntegrationTest.java
│   └── AdminOrderControllerIntegrationTest.java
│
├── service/
│   ├── AuthServiceTest.java
│   ├── ProductServiceTest.java
│   ├── CartServiceTest.java
│   ├── OrderServiceTest.java
│   ├── InventoryServiceTest.java
│   └── CouponServiceTest.java
│
├── repository/
│   ├── ProductRepositoryTest.java
│   └── OrderRepositoryTest.java
│
├── security/
│   ├── JwtTokenProviderTest.java
│   └── AuthorizationTest.java
│
└── fixture/
    ├── UserFixture.java
    ├── ProductFixture.java
    ├── OrderFixture.java
    └── CouponFixture.java
```

---

# 30. Database support structure

Flyway migration chính nằm trong backend. Thư mục database ngoài root dùng cho các thao tác quản trị.

```text
database/
│
├── scripts/
│   ├── create-database.sql
│   ├── create-login.sql
│   ├── create-backup-job.sql
│   └── cleanup-development-data.sql
│
├── seed/
│   ├── categories.sql
│   ├── products.sql
│   ├── users.sql
│   └── orders.sql
│
├── backup/
│   └── .gitkeep
│
└── diagrams/
    ├── flower-shop-erd.drawio
    └── flower-shop-erd.png
```

Không lưu file backup thật lên Git.

---

# 31. Nginx structure

```text
nginx/
│
├── nginx.conf
├── conf.d/
│   ├── default.conf
│   ├── frontend.conf
│   └── backend.conf
│
└── ssl/
    └── .gitkeep
```

Routing đề xuất:

```text
/             → frontend:3000
/api/         → backend:8080
/swagger-ui/  → backend:8080
/v3/api-docs/ → backend:8080
/uploads/     → backend hoặc storage service
```

---

# 32. Documentation structure

```text
docs/
│
├── architecture/
│   ├── system-architecture.md
│   ├── frontend-architecture.md
│   ├── backend-architecture.md
│   └── deployment-architecture.md
│
├── database/
│   ├── database-design.md
│   ├── erd.md
│   └── data-dictionary.md
│
├── api/
│   ├── authentication-api.md
│   ├── product-api.md
│   ├── order-api.md
│   └── admin-api.md
│
├── business/
│   ├── order-flow.md
│   ├── inventory-flow.md
│   ├── payment-flow.md
│   └── coupon-rules.md
│
├── security/
│   ├── authentication.md
│   ├── authorization.md
│   └── security-checklist.md
│
└── deployment/
    ├── docker.md
    ├── nginx.md
    ├── sql-server.md
    └── production-checklist.md
```

---

# 33. Scripts structure

```text
scripts/
│
├── development/
│   ├── start-dev.sh
│   ├── stop-dev.sh
│   └── reset-database.sh
│
├── deployment/
│   ├── deploy.sh
│   ├── rollback.sh
│   └── health-check.sh
│
├── database/
│   ├── backup.sh
│   ├── restore.sh
│   └── migrate.sh
│
└── windows/
    ├── start-dev.ps1
    ├── stop-dev.ps1
    └── reset-database.ps1
```

---

# 34. Environment variables

## Root `.env.example`

```env
COMPOSE_PROJECT_NAME=flower-shop

SQLSERVER_PORT=1433
SQLSERVER_DATABASE=flower_shop
SQLSERVER_USERNAME=sa
SQLSERVER_PASSWORD=YourStrongPassword123!

BACKEND_PORT=8080
FRONTEND_PORT=3000
NGINX_PORT=80
```

## Backend `.env.example`

```env
SPRING_PROFILES_ACTIVE=dev

DB_HOST=localhost
DB_PORT=1433
DB_NAME=flower_shop
DB_USERNAME=sa
DB_PASSWORD=YourStrongPassword123!

JWT_SECRET=replace-with-a-secure-random-secret
JWT_ACCESS_TOKEN_EXPIRATION=900000
JWT_REFRESH_TOKEN_EXPIRATION=604800000

FRONTEND_URL=http://localhost:3000

STORAGE_TYPE=local
UPLOAD_DIRECTORY=uploads

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

## Frontend `.env.local.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_APP_NAME=Lá & Hoa

NEXT_PUBLIC_ZALO_URL=
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
```

---

# 35. Docker Compose structure

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server
    container_name: flower-shop-sqlserver
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: ${SQLSERVER_PASSWORD}
    ports:
      - "${SQLSERVER_PORT}:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
    networks:
      - flower-shop-network

  backend:
    build:
      context: ./backend
    container_name: flower-shop-backend
    depends_on:
      - sqlserver
    environment:
      DB_HOST: sqlserver
      DB_PORT: 1433
      DB_NAME: ${SQLSERVER_DATABASE}
      DB_USERNAME: ${SQLSERVER_USERNAME}
      DB_PASSWORD: ${SQLSERVER_PASSWORD}
    ports:
      - "${BACKEND_PORT}:8080"
    networks:
      - flower-shop-network

  frontend:
    build:
      context: ./frontend
    container_name: flower-shop-frontend
    depends_on:
      - backend
    ports:
      - "${FRONTEND_PORT}:3000"
    networks:
      - flower-shop-network

  nginx:
    image: nginx:alpine
    container_name: flower-shop-nginx
    depends_on:
      - frontend
      - backend
    ports:
      - "${NGINX_PORT}:80"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
    networks:
      - flower-shop-network

volumes:
  sqlserver_data:

networks:
  flower-shop-network:
    driver: bridge
```

---

# 36. API route organization

```text
/api/v1/auth
/api/v1/products
/api/v1/categories
/api/v1/cart
/api/v1/orders
/api/v1/addresses
/api/v1/reviews
/api/v1/coupons

/api/v1/admin/dashboard
/api/v1/admin/products
/api/v1/admin/categories
/api/v1/admin/orders
/api/v1/admin/inventory
/api/v1/admin/coupons
/api/v1/admin/users
/api/v1/admin/staff
/api/v1/admin/reviews
/api/v1/admin/reports
```

---

# 37. Luồng nghiệp vụ đặt hàng

```text
Frontend gửi CreateOrderRequest
             │
             ▼
OrderController
             │
             ▼
OrderService
             │
             ├── Kiểm tra khách hàng
             ├── Kiểm tra sản phẩm
             ├── Kiểm tra biến thể
             ├── Kiểm tra tồn kho
             ├── Kiểm tra coupon
             ├── Tính subtotal
             ├── Tính phí giao hàng
             ├── Tính giảm giá
             ├── Tính tổng tiền
             ├── Tạo Order
             ├── Tạo OrderItem
             ├── Trừ tồn kho
             ├── Tạo InventoryTransaction
             ├── Tạo OrderStatusHistory
             ├── Tạo Payment
             └── Phát OrderCreatedEvent
```

Toàn bộ thao tác cần nằm trong một transaction.

```java
@Transactional
public OrderDetailResponse createOrder(CreateOrderRequest request) {
    // Xử lý tạo đơn
}
```

---

# 38. Luồng hủy đơn

```text
Khách hàng hoặc Admin yêu cầu hủy
                │
                ▼
Kiểm tra trạng thái hiện tại
                │
                ▼
Cập nhật CANCELLED
                │
                ├── Hoàn tồn kho
                ├── Tạo InventoryTransaction
                ├── Lưu OrderStatusHistory
                ├── Cập nhật Payment nếu cần
                └── Phát OrderCancelledEvent
```

Phải kiểm tra để không hoàn kho hai lần.

---

# 39. Quy tắc phân quyền

```text
PUBLIC
- Xem sản phẩm.
- Xem danh mục.
- Xem đánh giá.
- Đăng ký.
- Đăng nhập.

CUSTOMER
- Quản lý hồ sơ.
- Quản lý địa chỉ.
- Quản lý giỏ hàng.
- Đặt hàng.
- Xem đơn của chính mình.
- Hủy đơn hợp lệ.
- Đánh giá sản phẩm đã mua.

STAFF
- Xem đơn hàng.
- Xác nhận đơn.
- Chuẩn bị đơn.
- Cập nhật giao hàng.
- Xem khách hàng liên quan đến đơn.

ADMIN
- Có toàn bộ quyền STAFF.
- Quản lý sản phẩm.
- Quản lý danh mục.
- Quản lý tồn kho.
- Quản lý coupon.
- Quản lý người dùng.
- Quản lý nhân viên.
- Xem báo cáo.
```

---

# 40. Cấu trúc Git branch

```text
main
develop

feature/auth
feature/products
feature/cart
feature/orders
feature/admin-dashboard

fix/order-stock
fix/login-refresh-token

release/v1.0.0
hotfix/payment-error
```

Quy tắc:

```text
main
- Code production ổn định.

develop
- Code đang phát triển.

feature/*
- Chức năng mới.

fix/*
- Sửa lỗi.

release/*
- Chuẩn bị release.

hotfix/*
- Sửa lỗi production khẩn cấp.
```

---

# 41. Quy ước commit

```text
feat: add product detail page
fix: prevent duplicate inventory rollback
refactor: extract order pricing service
docs: update API documentation
test: add order service tests
chore: update Docker configuration
style: format admin product table
perf: optimize product search query
```

---

# 42. Thứ tự triển khai project

## Giai đoạn 1: Khởi tạo

```text
- Tạo repository.
- Tạo frontend Next.js.
- Tạo backend Spring Boot.
- Cấu hình SQL Server.
- Cấu hình Docker.
- Cấu hình Nginx.
```

## Giai đoạn 2: Database

```text
- Tạo Flyway migration.
- Tạo Entity.
- Tạo Repository.
- Tạo dữ liệu mẫu.
```

## Giai đoạn 3: Authentication

```text
- Register.
- Login.
- JWT.
- Refresh Token.
- Logout.
- Role authorization.
```

## Giai đoạn 4: Product

```text
- Category CRUD.
- Product CRUD.
- Variant CRUD.
- Upload ảnh.
- Tìm kiếm.
- Bộ lọc.
- Phân trang.
```

## Giai đoạn 5: Cart

```text
- Local cart.
- Server cart.
- Đồng bộ giỏ hàng.
- Thêm, sửa, xóa sản phẩm.
```

## Giai đoạn 6: Order

```text
- Checkout.
- Tạo đơn.
- Trừ kho.
- Coupon.
- Payment.
- Hủy đơn.
- Hoàn kho.
```

## Giai đoạn 7: Admin

```text
- Dashboard.
- Product management.
- Order management.
- Inventory management.
- Coupon management.
- User management.
```

## Giai đoạn 8: Hoàn thiện

```text
- Unit test.
- Integration test.
- SEO.
- Responsive.
- Docker production.
- Logging.
- Security review.
- README.
```

---

# 43. Cấu trúc rút gọn để bắt đầu nhanh

Trong giai đoạn đầu, có thể bắt đầu với cấu trúc đơn giản hơn:

```text
flower-shop/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── src/main/java/com/flowerstore/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── security/
│   │   ├── exception/
│   │   └── mapper/
│   │
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
├── .env.example
└── README.md
```

Sau khi các chức năng chính hoạt động ổn định, tiếp tục tách thành các module chi tiết như cấu trúc đầy đủ ở trên.

---

# 44. Kết luận cấu trúc đề xuất

Cấu trúc chính thức nên là:

```text
flower-shop/
├── frontend/        Next.js + TypeScript
├── backend/         Spring Boot + Spring Security
├── database/        SQL Server scripts
├── nginx/           Reverse proxy
├── docs/            Tài liệu dự án
├── scripts/         Script hỗ trợ
├── docker-compose.yml
└── README.md
```

Kiến trúc này phù hợp cho:

* Đồ án tốt nghiệp.
* Website bán hoa thực tế.
* Dự án nhiều thành viên.
* Có frontend và backend tách biệt.
* Có trang quản trị.
* Có thể triển khai bằng Docker.
* Có thể mở rộng thêm thanh toán online, email, vận chuyển và thông báo.
