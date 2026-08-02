Bạn là một Senior Full-stack Developer và Software Architect. Hãy thiết kế và xây dựng một website thương mại điện tử bán hoa hoàn chỉnh, có giao diện hiện đại, hỗ trợ khách hàng đặt hoa trực tuyến và có trang quản trị dành cho nhân viên, quản trị viên.

## 1. Thông tin dự án

Tên dự án: Flower Shop E-commerce

Tên thương hiệu hiển thị mẫu: Lá & Hoa

Thông điệp thương hiệu:

“Trao hoa – Gửi trọn yêu thương”

Mục tiêu của hệ thống:

* Bán các sản phẩm hoa trực tuyến.
* Cho phép khách hàng tìm kiếm, xem và đặt hoa.
* Quản lý sản phẩm, danh mục, tồn kho và đơn hàng.
* Có hệ thống đăng nhập và phân quyền.
* Có giao diện quản trị riêng.
* Có thể triển khai thực tế và mở rộng về sau.

Website cần có thiết kế thanh lịch, nhẹ nhàng, hiện đại, phù hợp với một cửa hàng hoa cao cấp.

## 2. Công nghệ bắt buộc

### Frontend

Sử dụng:

* Next.js phiên bản ổn định mới nhất.
* React.
* TypeScript.
* Tailwind CSS.
* App Router.
* Axios hoặc Fetch API.
* React Hook Form.
* Zod để kiểm tra dữ liệu form.
* Zustand hoặc Context API để quản lý giỏ hàng.
* TanStack Query để quản lý dữ liệu từ API nếu cần.
* Lucide React cho icon.

Frontend chạy độc lập và giao tiếp với backend thông qua REST API.

### Backend

Sử dụng:

* Java 21.
* Spring Boot.
* Spring Web.
* Spring Data JPA.
* Spring Security.
* Bean Validation.
* JWT Authentication.
* Refresh Token.
* Lombok.
* MapStruct.
* Springdoc OpenAPI hoặc Swagger.
* Flyway để quản lý database migration.
* Maven.

### Cơ sở dữ liệu

Sử dụng:

* Microsoft SQL Server.
* Microsoft JDBC Driver for SQL Server.

Không sử dụng MySQL, PostgreSQL, MongoDB hoặc Firebase.

### Triển khai

Chuẩn bị cấu hình để có thể triển khai bằng:

* Docker.
* Docker Compose.
* Nginx.
* SQL Server container hoặc SQL Server cài trên máy chủ.

## 3. Kiến trúc tổng thể

Xây dựng dự án theo mô hình tách riêng frontend và backend:

```text
flower-shop/
├── frontend/
└── backend/
```

Frontend gọi backend qua REST API:

```text
Next.js Frontend
        ↓
Spring Boot REST API
        ↓
SQL Server Database
```

Backend phải áp dụng kiến trúc phân tầng rõ ràng:

```text
backend/
├── src/main/java/com/flowerstore/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   │   ├── request/
│   │   └── response/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   │   └── impl/
│   ├── security/
│   ├── exception/
│   ├── mapper/
│   ├── specification/
│   ├── util/
│   └── FlowerStoreApplication.java
│
└── src/main/resources/
    ├── application.yml
    └── db/migration/
```

Không trả trực tiếp Entity từ Controller. Phải sử dụng DTO cho request và response.

## 4. Vai trò người dùng

Hệ thống có ba vai trò:

### CUSTOMER

* Đăng ký tài khoản.
* Đăng nhập.
* Xem sản phẩm.
* Thêm sản phẩm vào giỏ hàng.
* Đặt hàng.
* Theo dõi đơn hàng.
* Xem lịch sử mua hàng.
* Quản lý địa chỉ nhận hàng.
* Đánh giá sản phẩm đã mua.

### STAFF

* Xem đơn hàng.
* Xác nhận đơn hàng.
* Cập nhật trạng thái đơn hàng.
* Quản lý thông tin giao hàng.
* Xem thông tin khách hàng liên quan đến đơn hàng.

### ADMIN

Có toàn bộ quyền của STAFF và thêm các quyền:

* Quản lý sản phẩm.
* Quản lý danh mục.
* Quản lý biến thể sản phẩm.
* Quản lý tồn kho.
* Quản lý mã giảm giá.
* Quản lý người dùng.
* Quản lý nhân viên.
* Xem báo cáo doanh thu.
* Xem sản phẩm bán chạy.
* Khóa hoặc mở khóa tài khoản.

## 5. Chức năng dành cho khách hàng

### Trang chủ

Trang chủ phải có:

* Header.
* Logo thương hiệu.
* Thanh tìm kiếm.
* Menu danh mục.
* Icon tài khoản.
* Icon giỏ hàng.
* Banner lớn.
* Nút “Đặt hoa ngay”.
* Danh mục hoa nổi bật.
* Sản phẩm bán chạy.
* Sản phẩm mới.
* Bộ sưu tập theo dịp.
* Phần giới thiệu cửa hàng.
* Chính sách giao hàng.
* Đánh giá khách hàng.
* Footer.
* Nút liên hệ Zalo hoặc Messenger.

Banner chính hiển thị:

“Trao hoa – Gửi trọn yêu thương”

Mô tả:

“Những bó hoa tươi được thiết kế thủ công cho từng khoảnh khắc đáng nhớ.”

### Danh mục sản phẩm

Các danh mục mẫu:

* Hoa sinh nhật.
* Hoa tình yêu.
* Hoa khai trương.
* Hoa cưới.
* Hoa chúc mừng.
* Hoa chia buồn.
* Hoa bó.
* Giỏ hoa.
* Hộp hoa.
* Hoa theo mùa.

### Trang danh sách sản phẩm

Cho phép:

* Tìm kiếm theo tên sản phẩm.
* Lọc theo danh mục.
* Lọc theo mức giá.
* Lọc theo màu sắc.
* Lọc theo loại hoa.
* Lọc sản phẩm còn hàng.
* Sắp xếp theo giá tăng dần.
* Sắp xếp theo giá giảm dần.
* Sắp xếp theo sản phẩm mới.
* Sắp xếp theo bán chạy.
* Phân trang.

### Trang chi tiết sản phẩm

Hiển thị:

* Tên sản phẩm.
* Slug.
* Bộ ảnh sản phẩm.
* Giá gốc.
* Giá khuyến mãi.
* Mô tả ngắn.
* Mô tả chi tiết.
* Danh mục.
* Loại hoa.
* Màu sắc chủ đạo.
* Số lượng tồn kho.
* Trạng thái còn hàng.
* Số lượng đã bán.
* Đánh giá trung bình.
* Danh sách đánh giá.
* Sản phẩm liên quan.

Cho phép khách hàng chọn:

* Kích thước bó hoa.
* Số lượng.
* Ngày giao.
* Khung giờ giao.
* Lời nhắn trên thiệp.
* Tên người gửi.
* Tên người nhận.
* Số điện thoại người nhận.
* Có hiển thị tên người gửi hay không.

Các kích thước mẫu:

* Nhỏ.
* Vừa.
* Lớn.
* Cao cấp.

Mỗi kích thước có thể có giá và số lượng tồn kho riêng.

### Giỏ hàng

Cho phép:

* Thêm sản phẩm.
* Xóa sản phẩm.
* Cập nhật số lượng.
* Chọn biến thể.
* Nhập lời nhắn.
* Chọn ngày giao.
* Chọn giờ giao.
* Áp dụng mã giảm giá.
* Hiển thị tạm tính.
* Hiển thị phí giao hàng.
* Hiển thị số tiền giảm.
* Hiển thị tổng thanh toán.

Giỏ hàng có thể được lưu ở localStorage khi khách hàng chưa đăng nhập.

Sau khi khách hàng đăng nhập, có thể đồng bộ giỏ hàng với backend.

### Thanh toán và đặt hàng

Trang thanh toán gồm:

* Thông tin người đặt.
* Thông tin người nhận.
* Địa chỉ giao hàng.
* Tỉnh hoặc thành phố.
* Quận hoặc huyện.
* Phường hoặc xã.
* Địa chỉ chi tiết.
* Ngày giao.
* Khung giờ giao.
* Ghi chú đơn hàng.
* Phương thức thanh toán.
* Mã giảm giá.
* Tổng tiền.

Phương thức thanh toán giai đoạn đầu:

* Thanh toán khi nhận hàng, COD.
* Chuyển khoản ngân hàng.

Thiết kế code để có thể tích hợp VNPay hoặc MoMo sau này.

### Quản lý tài khoản

Khách hàng có thể:

* Xem và sửa thông tin cá nhân.
* Đổi mật khẩu.
* Quản lý danh sách địa chỉ.
* Xem lịch sử đặt hàng.
* Xem chi tiết đơn hàng.
* Hủy đơn hàng khi đơn chưa được xác nhận.
* Đánh giá sản phẩm sau khi đơn đã hoàn thành.

## 6. Chức năng quản trị

Xây dựng khu vực quản trị tại đường dẫn:

```text
/admin
```

Giao diện admin gồm:

* Sidebar.
* Header.
* Dashboard.
* Biểu đồ doanh thu.
* Thống kê đơn hàng.
* Thống kê khách hàng.
* Sản phẩm sắp hết hàng.
* Đơn hàng mới nhất.
* Sản phẩm bán chạy.

### Quản lý sản phẩm

Admin có thể:

* Xem danh sách sản phẩm.
* Thêm sản phẩm.
* Sửa sản phẩm.
* Xóa mềm sản phẩm.
* Khôi phục sản phẩm.
* Bật hoặc tắt trạng thái bán.
* Tải lên nhiều ảnh.
* Chọn ảnh đại diện.
* Thêm biến thể.
* Cập nhật giá.
* Cập nhật tồn kho.
* Gắn sản phẩm vào danh mục.
* Gắn nhãn nổi bật.
* Gắn nhãn bán chạy.
* Gắn nhãn sản phẩm mới.

### Quản lý đơn hàng

Admin và Staff có thể:

* Xem danh sách đơn.
* Tìm kiếm theo mã đơn.
* Tìm kiếm theo khách hàng.
* Lọc theo trạng thái.
* Lọc theo ngày.
* Xem chi tiết đơn.
* Cập nhật trạng thái.
* Ghi chú nội bộ.
* Gán nhân viên xử lý.
* Cập nhật mã vận chuyển.
* Hủy đơn.
* Hoàn tiền thủ công.
* In thông tin đơn hàng.

Trạng thái đơn hàng:

```text
PENDING
CONFIRMED
PREPARING
DELIVERING
COMPLETED
CANCELLED
REFUNDED
```

Mỗi lần thay đổi trạng thái phải được lưu vào lịch sử trạng thái đơn hàng.

### Quản lý tồn kho

Hệ thống không chỉ lưu một cột số lượng đơn giản.

Phải có bảng lịch sử giao dịch tồn kho, bao gồm:

* Nhập kho.
* Bán hàng.
* Hoàn kho do hủy đơn.
* Điều chỉnh tăng.
* Điều chỉnh giảm.

Mỗi giao dịch phải lưu:

* Sản phẩm hoặc biến thể.
* Số lượng thay đổi.
* Loại giao dịch.
* Số lượng trước thay đổi.
* Số lượng sau thay đổi.
* Người thực hiện.
* Thời gian.
* Ghi chú.
* Mã đơn hàng liên quan nếu có.

### Quản lý mã giảm giá

Mã giảm giá có:

* Mã coupon.
* Tên chương trình.
* Loại giảm giá.
* Giảm theo phần trăm.
* Giảm số tiền cố định.
* Giá trị giảm.
* Giá trị đơn tối thiểu.
* Số tiền giảm tối đa.
* Ngày bắt đầu.
* Ngày kết thúc.
* Số lần sử dụng tối đa.
* Số lần mỗi khách hàng được sử dụng.
* Trạng thái hoạt động.

## 7. Thiết kế cơ sở dữ liệu SQL Server

Thiết kế các bảng chính:

```text
users
roles
user_roles
refresh_tokens
addresses

categories
products
product_images
product_variants

carts
cart_items

orders
order_items
order_status_history
payments

inventory_transactions

coupons
coupon_usages

reviews
```

### Bảng users

Các trường cơ bản:

```text
id
full_name
email
phone
password_hash
avatar_url
is_active
email_verified
created_at
updated_at
deleted_at
```

Email phải là duy nhất.

Mật khẩu phải được mã hóa bằng BCrypt.

### Bảng categories

```text
id
name
slug
description
image_url
is_active
display_order
created_at
updated_at
```

### Bảng products

```text
id
category_id
name
slug
sku
short_description
description
base_price
sale_price
main_image_url
flower_type
main_color
is_featured
is_new
is_best_seller
is_active
sold_count
created_at
updated_at
deleted_at
```

### Bảng product_images

```text
id
product_id
image_url
alt_text
display_order
is_primary
created_at
```

### Bảng product_variants

```text
id
product_id
name
sku
price
sale_price
stock_quantity
is_active
created_at
updated_at
```

Ví dụ variant:

```text
Nhỏ
Vừa
Lớn
Cao cấp
```

### Bảng orders

```text
id
order_code
user_id
customer_name
customer_email
customer_phone
recipient_name
recipient_phone
province
district
ward
delivery_address
delivery_date
delivery_time_slot
sender_name
card_message
hide_sender_name
customer_note
internal_note
subtotal
shipping_fee
discount_amount
total_amount
coupon_id
payment_method
payment_status
order_status
assigned_staff_id
created_at
updated_at
cancelled_at
completed_at
```

Mã đơn hàng phải dễ đọc, ví dụ:

```text
FLW-20260801-0001
```

### Bảng order_items

Phải lưu lại thông tin sản phẩm tại thời điểm đặt hàng, không phụ thuộc hoàn toàn vào dữ liệu sản phẩm hiện tại.

Các trường:

```text
id
order_id
product_id
variant_id
product_name
variant_name
product_sku
image_url
unit_price
quantity
total_price
delivery_date
delivery_time_slot
card_message
created_at
```

### Bảng payments

```text
id
order_id
payment_method
transaction_code
amount
status
paid_at
created_at
updated_at
```

Trạng thái thanh toán:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

### Bảng reviews

```text
id
user_id
product_id
order_item_id
rating
comment
is_approved
created_at
updated_at
```

Khách hàng chỉ được đánh giá sản phẩm khi đã mua và đơn hàng ở trạng thái COMPLETED.

## 8. REST API

API sử dụng prefix:

```text
/api/v1
```

### Authentication API

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/change-password
```

### Product API công khai

```text
GET /api/v1/products
GET /api/v1/products/{slug}
GET /api/v1/products/featured
GET /api/v1/products/best-sellers
GET /api/v1/products/new-arrivals
GET /api/v1/products/{id}/related
```

Hỗ trợ query parameter:

```text
keyword
category
minPrice
maxPrice
flowerType
color
inStock
sort
page
size
```

### Category API

```text
GET /api/v1/categories
GET /api/v1/categories/{slug}
```

### Cart API

```text
GET    /api/v1/cart
POST   /api/v1/cart/items
PUT    /api/v1/cart/items/{id}
DELETE /api/v1/cart/items/{id}
DELETE /api/v1/cart
```

### Order API

```text
POST  /api/v1/orders
GET   /api/v1/orders/my-orders
GET   /api/v1/orders/{orderCode}
PATCH /api/v1/orders/{orderCode}/cancel
```

### Address API

```text
GET    /api/v1/addresses
POST   /api/v1/addresses
PUT    /api/v1/addresses/{id}
DELETE /api/v1/addresses/{id}
PATCH  /api/v1/addresses/{id}/default
```

### Review API

```text
GET  /api/v1/products/{productId}/reviews
POST /api/v1/products/{productId}/reviews
PUT  /api/v1/reviews/{id}
DELETE /api/v1/reviews/{id}
```

### Admin Product API

```text
GET    /api/v1/admin/products
POST   /api/v1/admin/products
GET    /api/v1/admin/products/{id}
PUT    /api/v1/admin/products/{id}
DELETE /api/v1/admin/products/{id}
PATCH  /api/v1/admin/products/{id}/status
POST   /api/v1/admin/products/{id}/images
DELETE /api/v1/admin/products/{productId}/images/{imageId}
```

### Admin Order API

```text
GET   /api/v1/admin/orders
GET   /api/v1/admin/orders/{id}
PATCH /api/v1/admin/orders/{id}/status
PATCH /api/v1/admin/orders/{id}/assign
PATCH /api/v1/admin/orders/{id}/cancel
```

### Admin Dashboard API

```text
GET /api/v1/admin/dashboard/summary
GET /api/v1/admin/dashboard/revenue
GET /api/v1/admin/dashboard/top-products
GET /api/v1/admin/dashboard/recent-orders
GET /api/v1/admin/dashboard/low-stock-products
```

## 9. Chuẩn response API

Tất cả API sử dụng cấu trúc response thống nhất:

```json
{
  "success": true,
  "message": "Lấy dữ liệu thành công",
  "data": {},
  "timestamp": "2026-08-01T10:30:00"
}
```

Response phân trang:

```json
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": {
    "content": [],
    "page": 0,
    "size": 12,
    "totalElements": 100,
    "totalPages": 9,
    "first": true,
    "last": false
  }
}
```

Response lỗi:

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "email": "Email không đúng định dạng"
  },
  "timestamp": "2026-08-01T10:30:00"
}
```

Tạo Global Exception Handler để xử lý:

* ValidationException.
* ResourceNotFoundException.
* UnauthorizedException.
* ForbiddenException.
* DuplicateResourceException.
* BusinessException.
* MethodArgumentNotValidException.
* AccessDeniedException.
* JWT không hợp lệ.
* Lỗi hệ thống.

Không trả stack trace cho frontend.

## 10. Bảo mật

Sử dụng Spring Security và JWT.

Yêu cầu:

* Access Token có thời gian sống ngắn.
* Refresh Token có thời gian sống dài hơn.
* Refresh Token được lưu trong database.
* Có thể thu hồi Refresh Token khi đăng xuất.
* Mật khẩu được mã hóa bằng BCrypt.
* Phân quyền bằng role.
* API admin chỉ dành cho ADMIN.
* API xử lý đơn dành cho STAFF và ADMIN.
* API tài khoản cá nhân yêu cầu đăng nhập.
* Không để lộ password hash.
* Cấu hình CORS chỉ cho phép frontend hợp lệ.
* Validate toàn bộ dữ liệu đầu vào.
* Chống truy cập đơn hàng của người dùng khác.
* Không tin giá tiền gửi từ frontend.
* Backend phải tự tính lại giá sản phẩm, giảm giá, phí giao hàng và tổng tiền.
* Kiểm tra tồn kho trong transaction khi tạo đơn.
* Sử dụng database transaction cho thao tác tạo đơn và trừ kho.

Refresh Token nên được gửi bằng HttpOnly Cookie nếu frontend và backend được cấu hình cùng domain phù hợp.

## 11. Giao diện frontend

Thiết kế responsive theo hướng mobile-first.

Phong cách:

* Sang trọng.
* Tối giản.
* Nữ tính vừa phải.
* Nhiều khoảng trắng.
* Hình ảnh sản phẩm lớn.
* Không sử dụng quá nhiều màu hồng.
* Hiệu ứng nhẹ nhàng.
* Không làm giao diện quá rối.

Bảng màu:

```text
Background: #FAF7F1
Primary: #24483B
Secondary: #D8AAA5
Text: #3B322E
Muted: #857A73
White: #FFFFFF
Danger: #B42318
```

Font đề xuất:

* Tiêu đề: Playfair Display hoặc Cormorant Garamond.
* Nội dung: Be Vietnam Pro hoặc Inter.

Các component cần xây dựng:

```text
Header
Navigation
MobileMenu
SearchBar
HeroBanner
CategoryCard
ProductCard
ProductGrid
ProductGallery
PriceDisplay
QuantitySelector
VariantSelector
DeliveryDatePicker
DeliveryTimeSelector
CardMessageForm
RatingStars
ReviewList
CartDrawer
CartItem
CouponForm
CheckoutForm
OrderSummary
Pagination
Breadcrumb
LoadingSkeleton
EmptyState
ErrorState
ConfirmDialog
ToastNotification
AdminSidebar
AdminHeader
DataTable
StatusBadge
RevenueChart
OrderStatusTimeline
ImageUploader
```

## 12. Các trang frontend

### Trang công khai

```text
/
 /products
 /products/[slug]
 /categories/[slug]
 /search
 /cart
 /checkout
 /order-success
 /login
 /register
 /forgot-password
```

### Trang tài khoản

```text
/account
/account/profile
/account/addresses
/account/orders
/account/orders/[orderCode]
```

### Trang quản trị

```text
/admin
/admin/products
/admin/products/create
/admin/products/[id]/edit
/admin/categories
/admin/orders
/admin/orders/[id]
/admin/inventory
/admin/coupons
/admin/users
/admin/staff
/admin/reports
```

## 13. SEO

Sử dụng khả năng SEO của Next.js.

Yêu cầu:

* Metadata riêng cho từng trang.
* Dynamic metadata cho sản phẩm.
* Title và description cho danh mục.
* Open Graph metadata.
* Ảnh chia sẻ mạng xã hội.
* URL sử dụng slug.
* Sitemap.
* Robots.txt.
* Semantic HTML.
* Alt text cho ảnh.
* Structured data Product.
* Structured data BreadcrumbList.
* Structured data Organization.
* Structured data LocalBusiness nếu phù hợp.

Ví dụ URL:

```text
/products/bo-hoa-hong-do-tinh-yeu
/categories/hoa-sinh-nhat
```

## 14. Quản lý hình ảnh

Tạo abstraction cho dịch vụ lưu ảnh.

Có thể sử dụng:

* Cloudinary trong production.
* Lưu thư mục local trong môi trường development.

Backend cần có interface:

```java
public interface StorageService {
    String upload(MultipartFile file);
    void delete(String fileUrl);
}
```

Kiểm tra:

* Định dạng ảnh.
* Dung lượng tối đa.
* Tên file an toàn.
* Không cho tải file thực thi.
* Sinh URL ảnh sau khi tải lên.

## 15. Dữ liệu mẫu

Tạo dữ liệu mẫu cho:

* Một tài khoản ADMIN.
* Một tài khoản STAFF.
* Hai tài khoản CUSTOMER.
* Khoảng 8 danh mục.
* Khoảng 20 sản phẩm hoa.
* Mỗi sản phẩm có 2–4 biến thể.
* Một số mã giảm giá.
* Một số đơn hàng ở nhiều trạng thái khác nhau.
* Một số đánh giá sản phẩm.

Thông tin tài khoản mẫu phải được ghi trong README và chỉ dùng cho môi trường development.

## 16. Flyway migration

Không sử dụng Hibernate tự động tạo database trong production.

Cấu hình:

```text
spring.jpa.hibernate.ddl-auto=validate
```

Tạo các migration:

```text
V1__create_users_and_roles.sql
V2__create_categories_and_products.sql
V3__create_product_variants_and_images.sql
V4__create_carts.sql
V5__create_orders_and_payments.sql
V6__create_inventory_transactions.sql
V7__create_coupons.sql
V8__create_reviews.sql
V9__insert_seed_data.sql
```

Các migration phải tương thích với Microsoft SQL Server.

Chú ý kiểu dữ liệu SQL Server:

* Sử dụng BIGINT cho khóa chính.
* Sử dụng NVARCHAR cho nội dung tiếng Việt.
* Sử dụng DECIMAL(18,2) cho tiền.
* Sử dụng DATETIME2 cho thời gian.
* Sử dụng BIT cho boolean.
* Tạo index cho email, slug, SKU, order_code và các khóa ngoại quan trọng.
* Tạo unique constraint cho email, slug, SKU và order_code.

## 17. Quy tắc nghiệp vụ quan trọng

* Sản phẩm bị xóa phải dùng soft delete.
* Không cho đặt sản phẩm đã ngừng bán.
* Không cho đặt số lượng lớn hơn tồn kho.
* Giá đơn hàng được tính ở backend.
* Khi tạo đơn thành công, tồn kho phải giảm.
* Khi đơn bị hủy, tồn kho phải được hoàn lại.
* Không hoàn kho nhiều lần cho cùng một đơn.
* Mỗi thay đổi trạng thái đơn phải được lưu lịch sử.
* Khách hàng chỉ có thể hủy đơn PENDING.
* Staff hoặc Admin có thể xác nhận và xử lý đơn.
* Chỉ Admin được quản lý người dùng và sản phẩm.
* Coupon hết hạn không được sử dụng.
* Coupon vượt số lần sử dụng không được sử dụng.
* Coupon không đủ giá trị đơn tối thiểu không được áp dụng.
* Người dùng chỉ được đánh giá sản phẩm đã mua.
* Mỗi order item chỉ được đánh giá một lần.
* Không sử dụng kiểu dữ liệu float hoặc double cho tiền.

## 18. Kiểm thử

Backend cần có:

* Unit test cho Service.
* Integration test cho Controller.
* Test authentication.
* Test phân quyền.
* Test tạo đơn.
* Test kiểm tra tồn kho.
* Test áp dụng mã giảm giá.
* Test hoàn kho khi hủy đơn.

Sử dụng:

* JUnit 5.
* Mockito.
* Spring Boot Test.
* MockMvc.

Frontend cần kiểm tra:

* Form validation.
* Loading state.
* Error state.
* Empty state.
* Responsive trên mobile, tablet và desktop.
* Luồng thêm giỏ hàng.
* Luồng đăng nhập.
* Luồng đặt hàng.
* Luồng quản trị sản phẩm.

## 19. Docker

Tạo:

```text
frontend/Dockerfile
backend/Dockerfile
docker-compose.yml
nginx/default.conf
```

Docker Compose gồm:

* Frontend.
* Backend.
* SQL Server.
* Nginx.

Sử dụng biến môi trường cho:

* Database URL.
* Database username.
* Database password.
* JWT secret.
* Access Token expiration.
* Refresh Token expiration.
* Frontend URL.
* Backend URL.
* Cloudinary configuration.

Không hard-code thông tin nhạy cảm trong source code.

Tạo file:

```text
.env.example
```

Không commit file `.env` thật.

## 20. README

Viết README đầy đủ bằng tiếng Việt, bao gồm:

* Giới thiệu dự án.
* Kiến trúc hệ thống.
* Công nghệ sử dụng.
* Cấu trúc thư mục.
* Yêu cầu môi trường.
* Cách cài SQL Server.
* Cách cấu hình database.
* Cách chạy backend.
* Cách chạy frontend.
* Cách chạy bằng Docker.
* Cách chạy migration.
* Tài khoản mẫu.
* Đường dẫn Swagger.
* Các API chính.
* Ảnh chụp giao diện nếu có.
* Hướng dẫn triển khai.

## 21. Tiêu chuẩn code

Yêu cầu code:

* Rõ ràng.
* Dễ đọc.
* Có cấu trúc.
* Không viết toàn bộ nghiệp vụ trong Controller.
* Controller chỉ nhận request và trả response.
* Service xử lý nghiệp vụ.
* Repository xử lý database.
* Sử dụng DTO.
* Sử dụng Mapper.
* Sử dụng Enum cho trạng thái.
* Sử dụng constants khi phù hợp.
* Không lặp code.
* Không tạo class quá lớn.
* Không sử dụng biến tên khó hiểu.
* Có validation.
* Có error handling.
* Có logging.
* Không ghi token, password hoặc dữ liệu nhạy cảm vào log.
* Ưu tiên code có thể chạy thực tế, không viết pseudo-code.

## 22. Cách thực hiện yêu cầu

Không tạo toàn bộ dự án trong một câu trả lời duy nhất.

Hãy thực hiện theo từng giai đoạn:

### Giai đoạn 1: Phân tích và kiến trúc

Trình bày:

* Kiến trúc tổng thể.
* Cấu trúc frontend.
* Cấu trúc backend.
* Danh sách chức năng.
* Sơ đồ quan hệ database.
* Luồng đăng nhập.
* Luồng đặt hàng.
* Luồng cập nhật tồn kho.
* Danh sách API.

### Giai đoạn 2: Khởi tạo backend

Tạo:

* File `pom.xml`.
* File `application.yml`.
* Cấu hình SQL Server.
* Cấu hình Flyway.
* Entity.
* Enum.
* Repository.
* Migration SQL.

### Giai đoạn 3: Authentication và Security

Tạo:

* Đăng ký.
* Đăng nhập.
* JWT.
* Refresh Token.
* Spring Security configuration.
* Role authorization.
* Global exception handling.

### Giai đoạn 4: Product và Category

Tạo đầy đủ:

* Entity.
* DTO.
* Mapper.
* Repository.
* Service.
* Controller.
* Validation.
* Search.
* Filter.
* Pagination.
* Upload ảnh.

### Giai đoạn 5: Cart và Order

Tạo:

* Giỏ hàng.
* Đặt hàng.
* Tính tổng tiền.
* Coupon.
* Transaction.
* Trừ tồn kho.
* Hoàn tồn kho.
* Lịch sử trạng thái.

### Giai đoạn 6: Admin API

Tạo:

* Quản lý sản phẩm.
* Quản lý đơn hàng.
* Quản lý tồn kho.
* Dashboard.
* Báo cáo.

### Giai đoạn 7: Frontend khách hàng

Tạo:

* Layout.
* Trang chủ.
* Danh sách sản phẩm.
* Chi tiết sản phẩm.
* Giỏ hàng.
* Thanh toán.
* Đăng nhập.
* Đăng ký.
* Tài khoản.
* Lịch sử đơn hàng.

### Giai đoạn 8: Frontend admin

Tạo:

* Dashboard.
* Product management.
* Order management.
* Inventory management.
* Coupon management.
* User management.

### Giai đoạn 9: Kiểm thử và triển khai

Tạo:

* Unit test.
* Integration test.
* Docker.
* Docker Compose.
* Nginx.
* README.

Sau mỗi giai đoạn:

* Liệt kê các file đã tạo.
* Cung cấp đầy đủ nội dung từng file.
* Giải thích ngắn gọn vai trò của file.
* Chỉ rõ đường dẫn chính xác.
* Không bỏ qua import.
* Không dùng dấu `...` để thay thế code.
* Đảm bảo code giữa các file thống nhất.
* Kiểm tra lỗi compile trước khi chuyển sang bước tiếp theo.

Bắt đầu với Giai đoạn 1: phân tích kiến trúc, thiết kế database và danh sách REST API. Chưa viết code frontend hoặc backend cho đến khi hoàn thành phần thiết kế.
