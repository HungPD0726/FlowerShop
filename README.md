# Flower Shop E-Commerce Website ("Lá & Hoa")

> **Thông điệp thương hiệu**: *“Trao hoa – Gửi trọn yêu thương”*  
> **Phiên bản**: 1.0.0-RELEASE  
> **Kiến trúc**: Full-stack tách biệt Frontend & Backend, RESTful API, Micro-services ready.

---

## 1. Giới thiệu dự án

Website thương mại điện tử bán hoa tươi nghệ thuật cao cấp **"Lá & Hoa"** cung cấp giải pháp toàn diện cho trải nghiệm mua sắm trực tuyến và quản trị cửa hàng:

- **Storefront (Khách hàng)**:
  - Trang chủ giao diện sang trọng, nữ tính dịu nhẹ (Tone màu `#FAF7F1` Cream & `#24483B` Hunter Green).
  - Tìm kiếm & lọc hoa tươi đa tiêu chí (danh mục, mức giá, màu sắc chủ đạo, loại hoa, tình trạng tồn kho).
  - Chi tiết sản phẩm với biến thể kích thước (Nhỏ, Vừa, Lớn, Cao cấp), chọn ngày/khung giờ giao hàng & tùy chỉnh thiệp chúc mừng.
  - Giỏ hàng đồng bộ giữa Session ID và tài khoản cá nhân.
  - Quy trình thanh toán đơn hàng tự động tính toán lại giá từ Backend chống gian lận. Hỗ trợ COD và Chuyển khoản ngân hàng.
  - Theo dõi tiến trình đơn hàng & hủy đơn khi ở trạng thái `PENDING`.
  - Quản lý sổ địa chỉ nhận hàng & xem lịch sử đánh giá sản phẩm.

- **Admin & Staff Backoffice**:
  - Dashboard tổng quan doanh thu, thống kê số lượng đơn hàng, khách hàng & cảnh báo sản phẩm sắp hết hàng.
  - Quản lý danh mục & sản phẩm (soft delete khôi phục, tải lên nhiều ảnh, gán nhãn Best Seller, Featured, New).
  - Xử lý đơn hàng qua quy trình 7 trạng thái chuẩn (`PENDING` ➔ `CONFIRMED` ➔ `PREPARING` ➔ `DELIVERING` ➔ `COMPLETED` / `CANCELLED` / `REFUNDED`).
  - Lịch sử giao dịch tồn kho (Inventory Audit Trail) ghi vết chi tiết mọi biến động xuất/nhập kho.
  - Quản lý mã giảm giá coupon & phân quyền người dùng (ADMIN, STAFF, CUSTOMER).

---

## 2. Công nghệ sử dụng

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI & Logic**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Data Fetching & Cache**: TanStack Query (React Query v5)
- **HTTP Client**: Axios (với Request/Response Interceptor tự động Refresh Token)
- **Icons & Typography**: Lucide React, Playfair Display & Be Vietnam Pro

### Backend
- **Core**: Java 21, Spring Boot 3.2.5
- **Security**: Spring Security 6.x, JWT Authentication & Refresh Token storage
- **Data Access**: Spring Data JPA, Hibernate, Criteria API Specification
- **Database Migration**: Flyway Migration (V1 đến V9)
- **OpenAPI**: Springdoc OpenAPI / Swagger UI
- **Utilities**: Lombok, MapStruct

### Cơ sở dữ liệu & Triển khai
- **Database Engine**: Microsoft SQL Server 2022
- **Containerization**: Docker, Docker Compose, Dockerfile Multi-stage build
- **Reverse Proxy**: Nginx Alpine

---

## 3. Cấu trúc thư mục

```text
FlowerShop/
├── frontend/                     # Next.js 14 Frontend App Router
│   ├── public/                   # Static images & icons
│   ├── src/
│   │   ├── app/                  # App router pages (Storefront, Auth, Account, Admin)
│   │   ├── components/           # UI components, Layout, Cart Drawer, Product Card
│   │   ├── services/             # Axios API services
│   │   ├── stores/               # Zustand stores (Auth, Cart, UI)
│   │   ├── types/                # TypeScript interfaces
│   │   ├── utils/                # Format currency, dates, classnames
│   │   └── providers/            # React Query provider
│   ├── Dockerfile
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                      # Spring Boot REST API
│   ├── src/main/java/com/flowerstore/
│   │   ├── config/               # SecurityConfig, WebConfig, OpenApiConfig
│   │   ├── controller/           # Auth, Product, Cart, Order, Admin Controllers
│   │   ├── dto/                  # Requests & Responses
│   │   ├── entity/               # JPA Entities
│   │   ├── exception/            # GlobalExceptionHandler & Custom Exceptions
│   │   ├── repository/           # Spring Data Repositories
│   │   ├── security/             # JWT Provider, Filter & EntryPoint
│   │   ├── service/              # Core Services & Implementations
│   │   └── specification/        # Product JPA Specification
│   ├── src/main/resources/
│   │   ├── application.yml       # Cấu hình Spring Boot
│   │   └── db/migration/         # 9 file Flyway SQL Server migrations
│   ├── Dockerfile
│   └── pom.xml
│
├── database/
│   └── schema.sql                # SQL Server manual script
├── nginx/
│   └── default.conf              # Nginx Reverse Proxy config
├── docker-compose.yml            # Production environment
├── docker-compose.dev.yml        # Local development database
├── .env.example                  # File mẫu biến môi trường
├── Makefile                      # Command shortcuts
└── README.md
```

---

## 4. Hướng dẫn chạy dự án

### Cách 1: Chạy trực tiếp trên máy không dùng Docker (Khuyên dùng khi Dev)

#### Yêu cầu phần mềm trên máy của bạn:
- **Java 21** (JDK 21)
- **Node.js 18+** hoặc **20+**
- **Microsoft SQL Server** (Bản Developer, Express, hoặc SQL Server Management Studio SSMS)

---

#### 🛠️ Bước 1: Tạo Database trên SQL Server cục bộ
1. Mở **SQL Server Management Studio (SSMS)** hoặc `sqlcmd` và kết nối tới SQL Server của máy bạn.
2. Tạo mới cơ sở dữ liệu:
   ```sql
   CREATE DATABASE flower_shop_db;
   ```
3. Đảm bảo cổng SQL Server là `1433` (mặc định) và tài khoản `sa` đã được kích hoạt (hoặc điều chỉnh username/password phù hợp trong file `application.yml`).

---

#### ☕ Bước 2: Khởi chạy Backend (Spring Boot)
1. Mở cửa sổ Terminal/PowerShell tại thư mục `backend`:
   ```powershell
   cd d:\hungProject\FlowerShop\backend
   ```
2. Nếu username/password của SQL Server trên máy bạn khác với mặc định (`sa` / `YourStrong@Pass2026`), bạn mở file [`backend/src/main/resources/application.yml`](file:///d:/hungProject/FlowerShop/backend/src/main/resources/application.yml) để chỉnh lại cho khớp.
3. Chạy lệnh bắt đầu Backend:
   ```powershell
   mvn spring-boot:run
   ```
4. Khi Spring Boot khởi động, **Flyway Migration** sẽ tự động khởi tạo 18 bảng SQL Server và chèn dữ liệu mẫu (món hoa, tài khoản admin, khách hàng...).
5. Backend lắng nghe tại: **`http://localhost:8080`** (Swagger UI: `http://localhost:8080/swagger-ui.html`).

---

#### 🌸 Bước 3: Khởi chạy Frontend (Next.js)
1. Mở cửa sổ Terminal/PowerShell mới tại thư mục `frontend`:
   ```powershell
   cd d:\hungProject\FlowerShop\frontend
   ```
2. Cài đặt các thư viện (nếu chưa cài):
   ```powershell
   npm install
   ```
3. Khởi chạy server giao diện:
   ```powershell
   npm run dev
   ```
4. Mở trình duyệt và truy cập website: **`http://localhost:3000`**

---

### Cách 2: Chạy bằng Docker Compose (Nếu có cài Docker)


#### Bước 3: Chạy Frontend Next.js
```bash
cd frontend
npm install
npm run dev
```
Truy cập giao diện tại: [http://localhost:3000](http://localhost:3000)

---

## 5. Tài khoản mẫu (Seed Data)

Dữ liệu mẫu đã được tích hợp tự động qua Flyway migration `V9__insert_seed_data.sql`:

| Vai trò | Email | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@lahoa.vn` | `Password@123456` | Toàn quyền quản trị sản phẩm, đơn hàng, coupon & dashboard báo cáo |
| **STAFF** | `staff@lahoa.vn` | `Password@123456` | Quyền xem & cập nhật trạng thái đơn hàng, phân công giao hoa |
| **CUSTOMER** | `khachhang1@gmail.com` | `Password@123456` | Khách hàng mua sắm, quản lý đơn hàng & địa chỉ cá nhân |
| **CUSTOMER** | `khachhang2@gmail.com` | `Password@123456` | Khách hàng thử nghiệm |

---

## 6. Danh sách REST API chính

### Authenticaton API
- `POST /api/v1/auth/register`: Đăng ký tài khoản khách hàng
- `POST /api/v1/auth/login`: Đăng nhập & lấy Access Token + Refresh Token
- `POST /api/v1/auth/refresh-token`: Làm mới token khi hết hạn
- `GET /api/v1/auth/me`: Lấy thông tin tài khoản đang đăng nhập

### Public Catalog API
- `GET /api/v1/products`: Tìm kiếm, lọc sản phẩm theo nhiều tiêu chí & phân trang
- `GET /api/v1/products/{slug}`: Lấy chi tiết sản phẩm theo slug
- `GET /api/v1/products/featured`: Lấy danh sách sản phẩm nổi bật
- `GET /api/v1/categories`: Lấy danh sách danh mục hoa tươi active

### Cart & Order API
- `GET /api/v1/cart`: Lấy thông tin giỏ hàng
- `POST /api/v1/cart/items`: Thêm sản phẩm & tùy chỉnh khung giờ/thiệp vào giỏ hàng
- `POST /api/v1/orders`: Tạo đơn hàng mới & trừ tồn kho trong transaction
- `GET /api/v1/orders/my-orders`: Lịch sử đơn hàng của khách hàng
- `PATCH /api/v1/orders/{orderCode}/cancel`: Hủy đơn hàng PENDING & hoàn tồn kho

### Admin API
- `GET /api/v1/admin/dashboard/summary`: Báo cáo doanh thu & đơn hàng tổng quan
- `GET /api/v1/admin/products`: Quản lý danh sách sản phẩm admin
- `POST /api/v1/admin/products`: Tạo mới sản phẩm & biến thể
- `PATCH /api/v1/admin/orders/{id}/status`: Cập nhật trạng thái đơn hàng (7 trạng thái)
- `GET /api/v1/admin/coupons`: Quản lý mã giảm giá

---

## 7. Liên hệ & Hỗ trợ

- **Thương hiệu**: Lá & Hoa Florist
- **Hotline**: 1900 6789 / 0901 234 567
- **Email**: contact@lahoa.vn
- **Địa chỉ**: 123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh
