-- ==========================================================
-- SEED DATA SCRIPT FOR MICROSOFT SQL SERVER
-- PROJECT: FLOWER SHOP E-COMMERCE ("LÁ & HOA")
-- DATABASE: flower_shop_db
-- ==========================================================

USE flower_shop_db;
GO

-- 1. SEED ROLES
IF NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ROLE_ADMIN')
BEGIN
    INSERT INTO roles (name, description) VALUES
    ('ROLE_ADMIN', N'Quản trị viên hệ thống'),
    ('ROLE_STAFF', N'Nhân viên bán hàng & xử lý đơn'),
    ('ROLE_CUSTOMER', N'Khách hàng mua hoa');
END;
GO

-- 2. SEED USERS (Password: 123456 - BCrypt Encoded: $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy)
IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@flowershop.vn')
BEGIN
    INSERT INTO users (full_name, email, phone, password_hash, is_active, email_verified) VALUES
    (N'Quản Trị Viên', 'admin@flowershop.vn', '0901234567', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy', 1, 1),
    (N'Nguyễn Văn Staff', 'staff@flowershop.vn', '0912345678', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy', 1, 1),
    (N'Trần Ngọc Anh', 'ngocanh@gmail.com', '0987654321', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy', 1, 1),
    (N'Lê Minh Tuấn', 'minhtuan@gmail.com', '0976543210', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy', 1, 1),
    (N'Phạm Hương Giang', 'huonggiang@gmail.com', '0965432109', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9LqE3m.mF.E4Oiy', 1, 1);
END;
GO

-- ASSIGN ROLES
IF NOT EXISTS (SELECT 1 FROM user_roles)
BEGIN
    DECLARE @admin_id BIGINT = (SELECT id FROM users WHERE email = 'admin@flowershop.vn');
    DECLARE @staff_id BIGINT = (SELECT id FROM users WHERE email = 'staff@flowershop.vn');
    DECLARE @cust1_id BIGINT = (SELECT id FROM users WHERE email = 'ngocanh@gmail.com');
    DECLARE @cust2_id BIGINT = (SELECT id FROM users WHERE email = 'minhtuan@gmail.com');

    DECLARE @role_admin BIGINT = (SELECT id FROM roles WHERE name = 'ROLE_ADMIN');
    DECLARE @role_staff BIGINT = (SELECT id FROM roles WHERE name = 'ROLE_STAFF');
    DECLARE @role_cust BIGINT = (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER');

    INSERT INTO user_roles (user_id, role_id) VALUES
    (@admin_id, @role_admin),
    (@staff_id, @role_staff),
    (@cust1_id, @role_cust),
    (@cust2_id, @role_cust);
END;
GO

-- 3. SEED CATEGORIES
IF NOT EXISTS (SELECT 1 FROM categories)
BEGIN
    INSERT INTO categories (name, slug, description, image_url, is_active, display_order) VALUES
    (N'Hoa Sinh Nhật', 'hoa-sinh-nhat', N'Những bó hoa tươi rực rỡ, ngọt ngào dành tặng người thân, bạn bè dịp sinh nhật.', '/images/campaign/hero-blush.png', 1, 1),
    (N'Hoa Tình Yêu', 'hoa-tinh-yeu', N'Bó hoa hồng, lẵng hoa lãng mạn truyền tải thông điệp tình yêu nồng thắm.', '/images/campaign/hero-blush.png', 1, 2),
    (N'Hoa Khai Trương', 'hoa-khai-truong', N'Kệ hoa, lẵng hoa sang trọng mừng khai trương, phát tài phát lộc.', '/images/campaign/hero-blush.png', 1, 3),
    (N'Hoa Cảm Ơn & Tri Ân', 'hoa-cam-on', N'Mẫu hoa thanh lịch bày tỏ lòng biết ơn chân thành đến thầy cô, đối tác.', '/images/campaign/hero-blush.png', 1, 4),
    (N'Lẵng & Giỏ Hoa', 'lang-hoa-gio-hoa', N'Lẵng hoa để bàn, giỏ hoa mây tự nhiên trang trí không gian tinh tế.', '/images/campaign/hero-blush.png', 1, 5),
    (N'Hoa Tang Lễ', 'hoa-tang-le', N'Kệ hoa kính viếng trang trọng, tỏ lòng thành kính và chia buồn sâu sắc.', '/images/campaign/hero-blush.png', 1, 6);
END;
GO

-- 4. SEED PRODUCTS
IF NOT EXISTS (SELECT 1 FROM products)
BEGIN
    DECLARE @cat_sn BIGINT = (SELECT id FROM categories WHERE slug = 'hoa-sinh-nhat');
    DECLARE @cat_ty BIGINT = (SELECT id FROM categories WHERE slug = 'hoa-tinh-yeu');
    DECLARE @cat_kt BIGINT = (SELECT id FROM categories WHERE slug = 'hoa-khai-truong');
    DECLARE @cat_co BIGINT = (SELECT id FROM categories WHERE slug = 'hoa-cam-on');
    DECLARE @cat_lg BIGINT = (SELECT id FROM categories WHERE slug = 'lang-hoa-gio-hoa');

    INSERT INTO products (category_id, name, slug, sku, short_description, description, base_price, sale_price, main_image_url, flower_type, main_color, is_featured, is_new, is_best_seller, is_active, sold_count) VALUES
    (@cat_ty, N'Bó Hồng Pastel Phấn', 'bo-hong-pastel-phan', 'PROD-ROSE-01', N'Bó hoa hồng phấn nhập khẩu phối hoa baby trắng và lá khuynh diệp.', N'Bó Hồng Pastel Phấn mang vẻ đẹp ngọt ngào, tinh tế. Được tuyển chọn từ những bông hồng Ohara phấn nhập khẩu tươi đẹp nhất, phối cùng hoa baby nhẹ nhàng và lá khuynh diệp thơm dịu.', 850000, 599000, '/images/campaign/hero-blush.png', N'Hoa Hồng Ohara', N'Cam Hồng', 1, 1, 1, 1, 45),
    (@cat_lg, N'Lẵng Hoa Mẫu Đơn Trắng', 'lang-hoa-mau-don-trang', 'PROD-PEONY-02', N'Lẵng hoa mẫu đơn trắng kết hợp mao lương và hoa cẩm chướng.', N'Lẵng hoa thiết kế phong cách Châu Âu sang trọng, sử dụng mẫu đơn trắng kết hợp cùng hoa mao lương và các loại lá phụ nhập khẩu.', 1200000, 890000, '/images/campaign/hero-blush.png', N'Hoa Mẫu Đơn', N'Trắng Phấn', 1, 0, 1, 1, 32),
    (@cat_sn, N'Bó Hoa Hướng Dương Nắng Mới', 'bo-hoa-huong-duong-nang-moi', 'PROD-SUN-03', N'Bó hoa hướng dương rực rỡ tượng trưng cho niềm tin và năng lượng tích cực.', N'Bó hoa gồm 5 bông hướng dương đà lạt bông to, phối hoa thạch thảo và lá bạc mang lại vẻ rạng rỡ, ngập tràn năng lượng.', 680000, 450000, '/images/campaign/hero-blush.png', N'Hoa Hướng Dương', N'Vàng Cam', 0, 1, 1, 1, 58),
    (@cat_co, N'Giỏ Hoa Cẩm Chướng Hồng', 'gio-hoa-cam-chuong-hong', 'PROD-CARN-04', N'Giỏ hoa cẩm chướng hồng ngọt ngào dành tặng mẹ và người thân.', N'Giỏ hoa mây đan thủ công, cắm cẩm chướng hồng pastel cùng hoa cát tường và hoa baby xanh.', 750000, 520000, '/images/campaign/hero-blush.png', N'Hoa Cẩm Chướng', N'Hồng', 1, 1, 0, 1, 28),
    (@cat_ty, N'Bó Hồng Đỏ Classic Valentine', 'bo-hong-do-classic-valentine', 'PROD-ROSE-05', N'Bó 99 bông hồng đỏ Ecuador quyến rũ cho ngày lứa đôi.', N'Bó hoa hồng Ecuador đỏ thắm gói phong cách Hàn Quốc sang trọng, biểu tượng cho tình yêu vĩnh cữu.', 1500000, 1250000, '/images/campaign/hero-blush.png', N'Hoa Hồng Ecuador', N'Đỏ', 1, 0, 1, 1, 64),
    (@cat_kt, N'Kệ Hoa Khai Trương Phát Lộc', 'ke-hoa-khai-truong-phat-loc', 'PROD-OPEN-06', N'Kệ hoa 2 tầng phối hoa đồng tiền, hoa hồng vàng và lan hồ điệp.', N'Kệ hoa khai trương thiết kế hoành tráng, mang màu sắc tươi sáng tượng trưng cho hồng phát và thành công.', 2200000, 1850000, '/images/campaign/hero-blush.png', N'Lan Hồ Điệp & Hồng Vàng', N'Vàng Đỏ', 1, 1, 0, 1, 19),
    (@cat_sn, N'Lẵng Hoa Tulip Hà Lan Cam Hồng', 'lang-hoa-tulip-ha-lan-cam-hong', 'PROD-TULIP-07', N'Lẵng hoa Tulip Hà Lan tông cam hồng thanh lịch và quyến rũ.', N'Tulip Hà Lan tươi nhập mới trong ngày, cắm lẵng gỗ mộc mạc mang nét đẹp Châu Âu hiện đại.', 1350000, 1100000, '/images/campaign/hero-blush.png', N'Hoa Tulip', N'Cam Hồng', 1, 1, 1, 1, 37),
    (@cat_co, N'Bó Hoa Baby Trắng Tinh Khôi', 'bo-hoa-baby-trang-tinh-khoi', 'PROD-BABY-08', N'Bó hoa baby trắng khổng lồ bồng bềnh như mây.', N'Bó hoa baby trắng nhập khẩu phun sương, độ bền trên 10 ngày và có thể sấy khô làm hoa khô kỉ niệm.', 550000, 399000, '/images/campaign/hero-blush.png', N'Hoa Baby', N'Trắng', 0, 1, 0, 1, 41);
END;
GO

-- 5. SEED PRODUCT VARIANTS
IF NOT EXISTS (SELECT 1 FROM product_variants)
BEGIN
    DECLARE @p1 BIGINT = (SELECT id FROM products WHERE sku = 'PROD-ROSE-01');
    DECLARE @p2 BIGINT = (SELECT id FROM products WHERE sku = 'PROD-PEONY-02');
    DECLARE @p3 BIGINT = (SELECT id FROM products WHERE sku = 'PROD-SUN-03');

    INSERT INTO product_variants (product_id, name, sku, price, sale_price, stock_quantity, is_active) VALUES
    (@p1, N'Size Vừa (Standard)', 'VAR-ROSE-01-M', 850000, 599000, 50, 1),
    (@p1, N'Size Lớn (Large)', 'VAR-ROSE-01-L', 1150000, 899000, 30, 1),
    (@p1, N'Size Cao Cấp (Premium)', 'VAR-ROSE-01-XL', 1650000, 1350000, 15, 1),

    (@p2, N'Size Vừa (Standard)', 'VAR-PEONY-02-M', 1200000, 890000, 25, 1),
    (@p2, N'Size Lớn (Large)', 'VAR-PEONY-02-L', 1600000, 1290000, 10, 1),

    (@p3, N'Size Nhỏ (Small)', 'VAR-SUN-03-S', 480000, 350000, 40, 1),
    (@p3, N'Size Vừa (Standard)', 'VAR-SUN-03-M', 680000, 450000, 60, 1);
END;
GO

-- 6. SEED COUPONS
IF NOT EXISTS (SELECT 1 FROM coupons)
BEGIN
    INSERT INTO coupons (code, title, discount_type, discount_value, min_order_amount, max_discount_amount, start_date, end_date, usage_limit, is_active) VALUES
    ('FLOWERS10', N'Giảm 10% đơn hàng từ 500k', 'PERCENTAGE', 10, 500000, 100000, '2026-01-01', '2026-12-31', 500, 1),
    ('WELCOME50K', N'Giảm 50k cho khách hàng mới', 'FIXED_AMOUNT', 50000, 300000, 50000, '2026-01-01', '2026-12-31', 1000, 1),
    ('FREESHIP', N'Miễn phí vận chuyển nội thành', 'FIXED_AMOUNT', 30000, 400000, 30000, '2026-01-01', '2026-12-31', 2000, 1);
END;
GO

-- 7. SEED REVIEWS
IF NOT EXISTS (SELECT 1 FROM reviews)
BEGIN
    DECLARE @u1 BIGINT = (SELECT id FROM users WHERE email = 'ngocanh@gmail.com');
    DECLARE @u2 BIGINT = (SELECT id FROM users WHERE email = 'minhtuan@gmail.com');
    DECLARE @prod_rose BIGINT = (SELECT id FROM products WHERE sku = 'PROD-ROSE-01');
    DECLARE @prod_peony BIGINT = (SELECT id FROM products WHERE sku = 'PROD-PEONY-02');

    INSERT INTO reviews (user_id, product_id, rating, comment, is_approved) VALUES
    (@u1, @prod_rose, 5, N'Hoa rất tươi và gói đẹp giống hệt hình! Giao đúng 8h sáng bạn mình nhận rất thích.', 1),
    (@u2, @prod_peony, 5, N'Mẫu đơn cắm rất sang, giao hàng cẩn thận không bị dập nát bông nào. 10/10 điểm!', 1),
    (@u1, @prod_peony, 4, N'Lẵng hoa đẹp, thơm nhẹ nhàng. Shop hỗ trợ viết thiệp chúc mừng rất nắn nót.', 1);
END;
GO
