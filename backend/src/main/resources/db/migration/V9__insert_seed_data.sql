-- SEED ROLES
INSERT INTO roles (name, description) VALUES 
('ROLE_ADMIN', N'Quản trị viên hệ thống'),
('ROLE_STAFF', N'Nhân viên xử lý đơn hàng'),
('ROLE_CUSTOMER', N'Khách hàng mua sắm');

-- SEED USERS (Password for all seed users: Password@123456)
-- Hash: $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bC.I0P/Vd26
INSERT INTO users (full_name, email, phone, password_hash, is_active, email_verified) VALUES
(N'Quản Trị Viên', 'admin@lahoa.vn', '0901234567', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bC.I0P/Vd26', 1, 1),
(N'Nhân Viên Cửa Hàng', 'staff@lahoa.vn', '0907654321', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bC.I0P/Vd26', 1, 1),
(N'Nguyễn Văn An', 'khachhang1@gmail.com', '0912345678', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bC.I0P/Vd26', 1, 1),
(N'Trần Thị Bích', 'khachhang2@gmail.com', '0987654321', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bC.I0P/Vd26', 1, 1);

-- ASSIGN ROLES
-- Admin (id 1) -> ROLE_ADMIN (1), ROLE_STAFF (2), ROLE_CUSTOMER (3)
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1), (1, 2), (1, 3);
-- Staff (id 2) -> ROLE_STAFF (2), ROLE_CUSTOMER (3)
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2), (2, 3);
-- Customers -> ROLE_CUSTOMER (3)
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3), (4, 3);

-- SEED CATEGORIES
INSERT INTO categories (name, slug, description, image_url, display_order) VALUES
(N'Hoa Sinh Nhật', 'hoa-sinh-nhat', N'Bó hoa, giỏ hoa tươi thắm mừng ngày sinh nhật ý nghĩa', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800', 1),
(N'Hoa Tình Yêu', 'hoa-tinh-yeu', N'Những đóa hoa hồng đỏ thắm thay lời yêu thương nồng nàn', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800', 2),
(N'Hoa Khai Trương', 'hoa-khai-truong', N'Kệ hoa sang trọng chúc mừng khai trương hồng phát', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800', 3),
(N'Hoa Cưới', 'hoa-cuoi', N'Hoa cầm tay cô dâu thanh lịch và lãng mạn', 'https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=800', 4),
(N'Hoa Chúc Mừng', 'hoa-chuc-mung', N'Món quà rạng rỡ mừng thành công, tốt nghiệp', 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?q=80&w=800', 5),
(N'Hoa Chia Buồn', 'hoa-chia-buon', N'Vòng hoa trang trọng sẻ chia nỗi buồn sâu sắc', 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?q=80&w=800', 6),
(N'Hoa Bó', 'hoa-bo', N'Các mẫu bó hoa tươi thiết kế độc đáo tinh tế', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800', 7),
(N'Giỏ Hoa', 'gio-hoa', N'Giỏ hoa nghệ thuật thích hợp trưng bày phòng khách', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800', 8);

-- SEED PRODUCTS
INSERT INTO products (category_id, name, slug, sku, short_description, description, base_price, sale_price, main_image_url, flower_type, main_color, is_featured, is_new, is_best_seller) VALUES
(2, N'Bó Hoa Hồng Đỏ Tình Yêu Thắm Thiết', 'bo-hoa-hong-do-tinh-yeu-tham-thiet', 'FLW-ROSE-RED-01', N'Bó hoa 99 bông hồng đỏ Ecuador cao cấp', N'Bó hoa hồng đỏ Ecuador biểu tượng cho tình yêu vĩnh cửu. Được gói thủ công tỉ mỉ bằng giấy gói cao cấp phong cách Hàn Quốc.', 1200000, 990000, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800', N'Hoa Hồng', N'Đỏ', 1, 1, 1),
(1, N'Giỏ Hoa Hướng Dương Bình Minh', 'gio-hoa-huong-duong-binh-minh', 'FLW-SUN-YELLOW-01', N'Giỏ hoa hướng dưỡng rạng rỡ mừng sinh nhật', N'Giỏ hoa kết hợp từ hướng dương rạng rỡ, hoa baby trắng và lá khuynh diệp mang lại năng lượng tích cực.', 750000, 680000, 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800', N'Hoa Hướng Dương', N'Vàng', 1, 1, 0),
(3, N'Kệ Hoa Khai Trương Mã Đáo Thành Công', 'ke-hoa-khai-truong-ma-dao-thanh-cong', 'FLW-OPEN-GOLD-01', N'Kệ hoa 2 tầng sang trọng rực rỡ', N'Kệ hoa khai trương sử dụng hoa lan hồ điệp, hoa đồng tiền và hoa hồng vàng mang ý nghĩa tài lộc, hanh thông.', 2500000, 2200000, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800', N'Hoa Lan & Đồng Tiền', N'Vàng Đỏ', 1, 0, 1),
(4, N'Hoa Cầm Tay Cô Dâu Pure White', 'hoa-cam-tay-co-dau-pure-white', 'FLW-WED-WHITE-01', N'Bó hoa cưới tulip trắng thanh khiết', N'Bó hoa cầm tay cô dâu sử dụng tulip Hà Lan trắng tinh khôi, tạo vẻ đẹp dịu dàng và cực kỳ sang trọng.', 1500000, NULL, 'https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=800', N'Hoa Tulip', N'Trắng', 1, 1, 0),
(7, N'Bó Hoa Baby Trắng Mây Tần', 'bo-hoa-baby-trang-may-tan', 'FLW-BABY-WHITE-01', N'Bó hoa baby trắng tựa như những đám mây', N'Bó hoa baby nhập khẩu khô giữ được lâu, hương thơm dịu nhẹ, phong cách tinh khôi hiện đại.', 600000, 520000, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800', N'Hoa Baby', N'Trắng', 0, 1, 1);

-- SEED PRODUCT VARIANTS
INSERT INTO product_variants (product_id, name, sku, price, sale_price, stock_quantity) VALUES
-- Product 1 Variants
(1, N'Tiêu chuẩn (20 bông)', 'FLW-ROSE-RED-01-S', 650000, 550000, 50),
(1, N'Vừa (50 bông)', 'FLW-ROSE-RED-01-M', 990000, 890000, 30),
(1, N'Lớn (99 bông)', 'FLW-ROSE-RED-01-L', 1500000, 1290000, 15),
-- Product 2 Variants
(2, N'Tiêu chuẩn', 'FLW-SUN-YELLOW-01-S', 680000, 590000, 40),
(2, N'Cao cấp', 'FLW-SUN-YELLOW-01-L', 950000, 850000, 20),
-- Product 3 Variants
(3, N'Kệ 2 Tầng', 'FLW-OPEN-GOLD-01-M', 2200000, 1990000, 10),
(3, N'Kệ 3 Tầng Hoàng Gia', 'FLW-OPEN-GOLD-01-L', 3200000, 2890000, 5),
-- Product 4 Variants
(4, N'Tiêu chuẩn', 'FLW-WED-WHITE-01-S', 1500000, NULL, 15),
-- Product 5 Variants
(5, N'Bó Nhỏ', 'FLW-BABY-WHITE-01-S', 520000, 450000, 60),
(5, N'Bó Khổng Lồ', 'FLW-BABY-WHITE-01-XL', 1200000, 990000, 25);

-- SEED COUPONS
INSERT INTO coupons (code, title, discount_type, discount_value, min_order_amount, max_discount_amount, start_date, end_date, usage_limit, usage_per_user) VALUES
('CHAOXUAN2026', N'Giảm 10% mừng năm mới', 'PERCENTAGE', 10, 500000, 200000, '2026-01-01', '2026-12-31', 500, 2),
('LAHOA50K', N'Giảm trực tiếp 50.000đ cho đơn từ 300.000đ', 'FIXED_AMOUNT', 50000, 300000, 50000, '2026-01-01', '2026-12-31', 1000, 1);
