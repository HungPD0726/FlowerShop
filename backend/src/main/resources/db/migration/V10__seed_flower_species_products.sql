-- Additional flower-species catalog data.
-- Image pages and license notes are documented in db/seed/flower-image-sources.md.

DECLARE @flower_products TABLE (
    category_slug NVARCHAR(120) NOT NULL,
    name NVARCHAR(200) NOT NULL,
    slug NVARCHAR(220) NOT NULL,
    sku NVARCHAR(50) NOT NULL,
    short_description NVARCHAR(500) NULL,
    description NVARCHAR(MAX) NULL,
    base_price DECIMAL(18,2) NOT NULL,
    sale_price DECIMAL(18,2) NULL,
    main_image_url NVARCHAR(500) NOT NULL,
    flower_type NVARCHAR(100) NOT NULL,
    main_color NVARCHAR(50) NOT NULL,
    is_featured BIT NOT NULL,
    is_new BIT NOT NULL,
    is_best_seller BIT NOT NULL,
    is_active BIT NOT NULL
);

INSERT INTO @flower_products (
    category_slug, name, slug, sku, short_description, description,
    base_price, sale_price, main_image_url, flower_type, main_color,
    is_featured, is_new, is_best_seller, is_active
) VALUES
('hoa-tinh-yeu', N'Bó Hồng Garden Đỏ Crimson', 'bo-hong-garden-do-crimson', 'FLW-ROSE-CRIMSON-01',
 N'Bó hoa hồng đỏ với phom tròn cổ điển và sắc lá xanh tự nhiên.',
 N'Hoa hồng đỏ được phối theo phong cách tối giản, phù hợp làm quà tặng trong những dịp cần một sắc hoa ấm áp và trang trọng.',
 890000, 790000, 'https://images.pexels.com/photos/18010784/pexels-photo-18010784.png?cs=srgb&fm=jpg&w=1400',
 N'Hoa Hồng', N'Đỏ', 1, 1, 0, 1),

('hoa-bo', N'Bó Tulip Hồng Mùa Xuân', 'bo-tulip-hong-mua-xuan', 'FLW-TULIP-PINK-01',
 N'Bó tulip hồng có đường nét mềm và bảng màu trong trẻo.',
 N'Tulip hồng được bó thoáng để giữ vẻ tự nhiên của cánh và thân hoa, phù hợp với không gian hiện đại hoặc quà tặng nhẹ nhàng.',
 1150000, 990000, 'https://images.pexels.com/photos/7347619/pexels-photo-7347619.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Tulip', N'Hồng', 1, 1, 0, 1),

('hoa-chuc-mung', N'Bó Hướng Dương Nắng Mai', 'bo-huong-duong-nang-mai', 'FLW-SUNFLOWER-YELLOW-02',
 N'Hướng dương vàng rực với tâm nâu và lá xanh tương phản.',
 N'Bó hoa hướng dương mang bố cục phóng khoáng, tạo điểm nhấn tươi sáng cho lời chúc mừng, sinh nhật hoặc không gian làm việc.',
 650000, 590000, 'https://images.pexels.com/photos/5191322/pexels-photo-5191322.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Hướng Dương', N'Vàng', 1, 1, 1, 1),

('hoa-bo', N'Bó Mẫu Đơn Hồng Phấn', 'bo-mau-don-hong-phan', 'FLW-PEONY-BLUSH-01',
 N'Mẫu đơn hồng phấn với nhiều lớp cánh mềm mại.',
 N'Mẫu đơn được phối theo bảng màu hồng nhạt và kem, tạo cảm giác đầy đặn nhưng vẫn thanh thoát cho bàn tiệc hoặc quà tặng.',
 1650000, 1450000, 'https://images.pexels.com/photos/6407600/pexels-photo-6407600.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Mẫu Đơn', N'Hồng Phấn', 1, 1, 0, 1),

('hoa-khai-truong', N'Chậu Lan Hồng Thanh Nhã', 'chau-lan-hong-thanh-nha', 'FLW-ORCHID-PINK-01',
 N'Lan hồng với cánh hoa thanh mảnh và sắc màu dịu.',
 N'Chậu lan được tạo dáng gọn gàng, phù hợp làm điểm nhấn cho quầy tiếp khách, bàn làm việc hoặc món quà chúc mừng trang nhã.',
 1800000, 1590000, 'https://images.pexels.com/photos/17322281/pexels-photo-17322281.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Lan', N'Hồng', 1, 1, 0, 1),

('gio-hoa', N'Giỏ Cẩm Tú Cầu Pastel', 'gio-cam-tu-cau-pastel', 'FLW-HYDRANGEA-PASTEL-01',
 N'Cẩm tú cầu kết thành cụm tròn với sắc hồng pastel dịu mắt.',
 N'Giỏ hoa khai thác hình khối tự nhiên của cẩm tú cầu, phối cùng lá xanh để tạo bố cục mềm, đầy và dễ trưng bày.',
 1050000, 920000, 'https://images.pexels.com/photos/3977230/pexels-photo-3977230.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Cẩm Tú Cầu', N'Hồng Pastel', 0, 1, 0, 1),

('hoa-bo', N'Bó Hoa Ly Hồng Dịu Dàng', 'bo-hoa-ly-hong-diu-dang', 'FLW-LILY-PINK-01',
 N'Hoa ly hồng nổi bật với cánh mở rộng và đường nét thanh thoát.',
 N'Bó hoa ly được sắp theo chiều cao tự nhiên của cành, phù hợp làm quà tặng hoặc trang trí không gian có phong cách nhẹ nhàng.',
 900000, 820000, 'https://images.pexels.com/photos/7819730/pexels-photo-7819730.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Ly', N'Hồng', 0, 1, 0, 1),

('hoa-chuc-mung', N'Giỏ Cúc Đỏ Thu Ấm', 'gio-cuc-do-thu-am', 'FLW-CHRYSANTHEMUM-RED-01',
 N'Những cụm cúc đỏ tạo bề mặt hoa dày và giàu sắc độ.',
 N'Giỏ cúc đỏ được phối theo khối thấp, thích hợp đặt trên bàn, kệ hoặc dùng trong những dịp chúc mừng mang sắc màu ấm áp.',
 580000, 520000, 'https://images.pexels.com/photos/3215773/pexels-photo-3215773.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Cúc', N'Đỏ', 0, 1, 0, 1),

('hoa-sinh-nhat', N'Bó Cẩm Chướng Hồng Kem', 'bo-cam-chuong-hong-kem', 'FLW-CARNATION-CREAM-01',
 N'Cẩm chướng hồng kem có viền cánh gợn nhẹ và vẻ đẹp bền dáng.',
 N'Bó cẩm chướng được phối theo bảng màu trung tính ấm, phù hợp với quà sinh nhật, lời cảm ơn hoặc trang trí tại nhà.',
 720000, 650000, 'https://images.pexels.com/photos/5976300/pexels-photo-5976300.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Cẩm Chướng', N'Hồng Kem', 0, 1, 0, 1),

('hoa-chuc-mung', N'Giỏ Đồng Tiền Cam Rực Rỡ', 'gio-dong-tien-cam-ruc-ro', 'FLW-GERBERA-ORANGE-01',
 N'Hoa đồng tiền cam với cánh dài đều và tâm hoa tương phản.',
 N'Giỏ hoa mang sắc cam làm chủ đạo, kết hợp lá xanh để tạo cảm giác vui tươi cho sinh nhật, khai trương hoặc lời chúc mừng.',
 620000, 560000, 'https://images.pexels.com/photos/17504716/pexels-photo-17504716.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Đồng Tiền', N'Cam', 1, 1, 0, 1),

('hoa-bo', N'Bó Oải Hương Tím Bình Yên', 'bo-oai-huong-tim-binh-yen', 'FLW-LAVENDER-PURPLE-01',
 N'Những cành oải hương tím mảnh tạo nhịp điệu tự nhiên cho bó hoa.',
 N'Oải hương được bó gọn theo phong cách mộc, phù hợp làm quà nhỏ, trang trí góc đọc sách hoặc bổ sung sắc tím cho không gian.',
 880000, 790000, 'https://images.pexels.com/photos/3279849/pexels-photo-3279849.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Oải Hương', N'Tím', 0, 1, 0, 1),

('hoa-bo', N'Bó Sen Hồng An Nhiên', 'bo-sen-hong-an-nhien', 'FLW-LOTUS-PINK-01',
 N'Sen hồng kết hợp cùng lá xanh tạo bố cục giản dị và thanh thoát.',
 N'Bó sen giữ đường nét dài tự nhiên của cành, phù hợp với không gian Việt đương đại hoặc món quà mang tinh thần nhẹ nhàng.',
 990000, 890000, 'https://images.pexels.com/photos/12731076/pexels-photo-12731076.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Sen', N'Hồng', 1, 1, 0, 1),

('hoa-sinh-nhat', N'Bó Thược Dược Trắng Tinh Khôi', 'bo-thuoc-duoc-trang-tinh-khoi', 'FLW-DAHLIA-WHITE-01',
 N'Thược dược trắng với cấu trúc nhiều lớp cánh cân đối.',
 N'Bó thược dược khai thác hình khối tròn của hoa và bảng màu trắng xanh, phù hợp với sinh nhật hoặc không gian tối giản.',
 980000, 880000, 'https://images.pexels.com/photos/17180136/pexels-photo-17180136.jpeg?auto=compress&cs=tinysrgb&w=1400',
 N'Hoa Thược Dược', N'Trắng', 0, 1, 0, 1);

INSERT INTO products (
    category_id, name, slug, sku, short_description, description,
    base_price, sale_price, main_image_url, flower_type, main_color,
    is_featured, is_new, is_best_seller, is_active
)
SELECT
    c.id, fp.name, fp.slug, fp.sku, fp.short_description, fp.description,
    fp.base_price, fp.sale_price, fp.main_image_url, fp.flower_type, fp.main_color,
    fp.is_featured, fp.is_new, fp.is_best_seller, fp.is_active
FROM @flower_products fp
JOIN categories c ON c.slug = fp.category_slug
WHERE NOT EXISTS (
    SELECT 1 FROM products p WHERE p.slug = fp.slug OR p.sku = fp.sku
);

DECLARE @flower_variants TABLE (
    product_slug NVARCHAR(220) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    sku NVARCHAR(50) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    sale_price DECIMAL(18,2) NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO @flower_variants (product_slug, name, sku, price, sale_price, stock_quantity) VALUES
('bo-hong-garden-do-crimson', N'Tiêu chuẩn', 'FLW-ROSE-CRIMSON-01-S', 890000, 790000, 36),
('bo-hong-garden-do-crimson', N'Cao cấp', 'FLW-ROSE-CRIMSON-01-L', 1290000, 1150000, 18),
('bo-tulip-hong-mua-xuan', N'Tiêu chuẩn', 'FLW-TULIP-PINK-01-S', 1150000, 990000, 24),
('bo-tulip-hong-mua-xuan', N'Cao cấp', 'FLW-TULIP-PINK-01-L', 1650000, 1490000, 12),
('bo-huong-duong-nang-mai', N'Tiêu chuẩn', 'FLW-SUNFLOWER-YELLOW-02-S', 650000, 590000, 40),
('bo-huong-duong-nang-mai', N'Cao cấp', 'FLW-SUNFLOWER-YELLOW-02-L', 950000, 850000, 20),
('bo-mau-don-hong-phan', N'Tiêu chuẩn', 'FLW-PEONY-BLUSH-01-S', 1650000, 1450000, 16),
('bo-mau-don-hong-phan', N'Cao cấp', 'FLW-PEONY-BLUSH-01-L', 2350000, 2150000, 8),
('chau-lan-hong-thanh-nha', N'Chậu 3 cành', 'FLW-ORCHID-PINK-01-S', 1800000, 1590000, 15),
('chau-lan-hong-thanh-nha', N'Chậu 5 cành', 'FLW-ORCHID-PINK-01-L', 2800000, 2490000, 8),
('gio-cam-tu-cau-pastel', N'Tiêu chuẩn', 'FLW-HYDRANGEA-PASTEL-01-S', 1050000, 920000, 22),
('gio-cam-tu-cau-pastel', N'Cao cấp', 'FLW-HYDRANGEA-PASTEL-01-L', 1550000, 1390000, 11),
('bo-hoa-ly-hong-diu-dang', N'Tiêu chuẩn', 'FLW-LILY-PINK-01-S', 900000, 820000, 28),
('bo-hoa-ly-hong-diu-dang', N'Cao cấp', 'FLW-LILY-PINK-01-L', 1300000, 1180000, 14),
('gio-cuc-do-thu-am', N'Tiêu chuẩn', 'FLW-CHRYSANTHEMUM-RED-01-S', 580000, 520000, 42),
('gio-cuc-do-thu-am', N'Cao cấp', 'FLW-CHRYSANTHEMUM-RED-01-L', 850000, 760000, 21),
('bo-cam-chuong-hong-kem', N'Tiêu chuẩn', 'FLW-CARNATION-CREAM-01-S', 720000, 650000, 34),
('bo-cam-chuong-hong-kem', N'Cao cấp', 'FLW-CARNATION-CREAM-01-L', 1050000, 950000, 17),
('gio-dong-tien-cam-ruc-ro', N'Tiêu chuẩn', 'FLW-GERBERA-ORANGE-01-S', 620000, 560000, 38),
('gio-dong-tien-cam-ruc-ro', N'Cao cấp', 'FLW-GERBERA-ORANGE-01-L', 920000, 830000, 19),
('bo-oai-huong-tim-binh-yen', N'Tiêu chuẩn', 'FLW-LAVENDER-PURPLE-01-S', 880000, 790000, 30),
('bo-oai-huong-tim-binh-yen', N'Cao cấp', 'FLW-LAVENDER-PURPLE-01-L', 1280000, 1150000, 15),
('bo-sen-hong-an-nhien', N'Tiêu chuẩn', 'FLW-LOTUS-PINK-01-S', 990000, 890000, 20),
('bo-sen-hong-an-nhien', N'Cao cấp', 'FLW-LOTUS-PINK-01-L', 1450000, 1290000, 10),
('bo-thuoc-duoc-trang-tinh-khoi', N'Tiêu chuẩn', 'FLW-DAHLIA-WHITE-01-S', 980000, 880000, 18),
('bo-thuoc-duoc-trang-tinh-khoi', N'Cao cấp', 'FLW-DAHLIA-WHITE-01-L', 1420000, 1280000, 9);

INSERT INTO product_variants (product_id, name, sku, price, sale_price, stock_quantity, is_active)
SELECT p.id, fv.name, fv.sku, fv.price, fv.sale_price, fv.stock_quantity, 1
FROM @flower_variants fv
JOIN products p ON p.slug = fv.product_slug
WHERE NOT EXISTS (SELECT 1 FROM product_variants v WHERE v.sku = fv.sku);

INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT p.id, fp.main_image_url, fp.name, 0, 1
FROM @flower_products fp
JOIN products p ON p.slug = fp.slug
WHERE NOT EXISTS (
    SELECT 1 FROM product_images pi
    WHERE pi.product_id = p.id AND pi.image_url = fp.main_image_url
);
