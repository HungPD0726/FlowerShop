-- ==========================================================
-- DATABASE INITIALIZATION SCRIPT FOR MICROSOFT SQL SERVER
-- PROJECT: FLOWER SHOP E-COMMERCE ("LÁ & HOA")
-- ==========================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'flower_shop_db')
BEGIN
    CREATE DATABASE flower_shop_db;
END;
GO

USE flower_shop_db;
GO

-- 1. ROLES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'roles')
BEGIN
    CREATE TABLE roles (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50) NOT NULL UNIQUE,
        description NVARCHAR(255) NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME()
    );
END;
GO

-- 2. USERS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        phone NVARCHAR(20) NULL,
        password_hash NVARCHAR(255) NOT NULL,
        avatar_url NVARCHAR(500) NULL,
        is_active BIT DEFAULT 1,
        email_verified BIT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        deleted_at DATETIME2 NULL
    );
    CREATE INDEX idx_users_email ON users(email);
END;
GO

-- 3. USER_ROLES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_roles')
BEGIN
    CREATE TABLE user_roles (
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );
END;
GO

-- 4. REFRESH_TOKENS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'refresh_tokens')
BEGIN
    CREATE TABLE refresh_tokens (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        token NVARCHAR(500) NOT NULL UNIQUE,
        expiry_date DATETIME2 NOT NULL,
        revoked BIT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
END;
GO

-- 5. ADDRESSES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'addresses')
BEGIN
    CREATE TABLE addresses (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        recipient_name NVARCHAR(100) NOT NULL,
        phone NVARCHAR(20) NOT NULL,
        province NVARCHAR(100) NOT NULL,
        district NVARCHAR(100) NOT NULL,
        ward NVARCHAR(100) NOT NULL,
        detail_address NVARCHAR(255) NOT NULL,
        is_default BIT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END;
GO

-- 6. CATEGORIES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories')
BEGIN
    CREATE TABLE categories (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        slug NVARCHAR(120) NOT NULL UNIQUE,
        description NVARCHAR(500) NULL,
        image_url NVARCHAR(500) NULL,
        is_active BIT DEFAULT 1,
        display_order INT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME()
    );
    CREATE INDEX idx_categories_slug ON categories(slug);
END;
GO

-- 7. PRODUCTS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'products')
BEGIN
    CREATE TABLE products (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        category_id BIGINT NOT NULL,
        name NVARCHAR(200) NOT NULL,
        slug NVARCHAR(220) NOT NULL UNIQUE,
        sku NVARCHAR(50) NOT NULL UNIQUE,
        short_description NVARCHAR(500) NULL,
        description NVARCHAR(MAX) NULL,
        base_price DECIMAL(18,2) NOT NULL,
        sale_price DECIMAL(18,2) NULL,
        main_image_url NVARCHAR(500) NULL,
        flower_type NVARCHAR(100) NULL,
        main_color NVARCHAR(50) NULL,
        is_featured BIT DEFAULT 0,
        is_new BIT DEFAULT 1,
        is_best_seller BIT DEFAULT 0,
        is_active BIT DEFAULT 1,
        sold_count INT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        deleted_at DATETIME2 NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
    CREATE INDEX idx_products_slug ON products(slug);
    CREATE INDEX idx_products_sku ON products(sku);
    CREATE INDEX idx_products_category ON products(category_id);
END;
GO

-- 8. PRODUCT_IMAGES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'product_images')
BEGIN
    CREATE TABLE product_images (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        product_id BIGINT NOT NULL,
        image_url NVARCHAR(500) NOT NULL,
        alt_text NVARCHAR(255) NULL,
        display_order INT DEFAULT 0,
        is_primary BIT DEFAULT 0,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
END;
GO

-- 9. PRODUCT_VARIANTS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'product_variants')
BEGIN
    CREATE TABLE product_variants (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        product_id BIGINT NOT NULL,
        name NVARCHAR(100) NOT NULL, -- Nhỏ, Vừa, Lớn, Cao cấp
        sku NVARCHAR(50) NOT NULL UNIQUE,
        price DECIMAL(18,2) NOT NULL,
        sale_price DECIMAL(18,2) NULL,
        stock_quantity INT DEFAULT 0,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    CREATE INDEX idx_variants_sku ON product_variants(sku);
END;
GO

-- 10. CARTS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'carts')
BEGIN
    CREATE TABLE carts (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NULL UNIQUE,
        session_id NVARCHAR(100) NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END;
GO

-- 11. CART_ITEMS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'cart_items')
BEGIN
    CREATE TABLE cart_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        cart_id BIGINT NOT NULL,
        product_id BIGINT NOT NULL,
        variant_id BIGINT NULL,
        quantity INT NOT NULL DEFAULT 1,
        delivery_date DATE NULL,
        delivery_time_slot NVARCHAR(50) NULL,
        card_message NVARCHAR(500) NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (variant_id) REFERENCES product_variants(id)
    );
END;
GO

-- 12. COUPONS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'coupons')
BEGIN
    CREATE TABLE coupons (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        code NVARCHAR(50) NOT NULL UNIQUE,
        title NVARCHAR(150) NOT NULL,
        discount_type NVARCHAR(20) NOT NULL, -- PERCENTAGE, FIXED_AMOUNT
        discount_value DECIMAL(18,2) NOT NULL,
        min_order_amount DECIMAL(18,2) DEFAULT 0,
        max_discount_amount DECIMAL(18,2) NULL,
        start_date DATETIME2 NOT NULL,
        end_date DATETIME2 NOT NULL,
        usage_limit INT DEFAULT 100,
        usage_per_user INT DEFAULT 1,
        used_count INT DEFAULT 0,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME()
    );
    CREATE INDEX idx_coupons_code ON coupons(code);
END;
GO

-- 13. ORDERS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'orders')
BEGIN
    CREATE TABLE orders (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_code NVARCHAR(50) NOT NULL UNIQUE,
        user_id BIGINT NULL,
        customer_name NVARCHAR(100) NOT NULL,
        customer_email NVARCHAR(100) NOT NULL,
        customer_phone NVARCHAR(20) NOT NULL,
        recipient_name NVARCHAR(100) NOT NULL,
        recipient_phone NVARCHAR(20) NOT NULL,
        province NVARCHAR(100) NOT NULL,
        district NVARCHAR(100) NOT NULL,
        ward NVARCHAR(100) NOT NULL,
        delivery_address NVARCHAR(255) NOT NULL,
        delivery_date DATE NOT NULL,
        delivery_time_slot NVARCHAR(50) NOT NULL,
        sender_name NVARCHAR(100) NULL,
        card_message NVARCHAR(500) NULL,
        hide_sender_name BIT DEFAULT 0,
        customer_note NVARCHAR(500) NULL,
        internal_note NVARCHAR(500) NULL,
        subtotal DECIMAL(18,2) NOT NULL,
        shipping_fee DECIMAL(18,2) DEFAULT 0,
        discount_amount DECIMAL(18,2) DEFAULT 0,
        total_amount DECIMAL(18,2) NOT NULL,
        coupon_id BIGINT NULL,
        payment_method NVARCHAR(50) NOT NULL, -- COD, BANK_TRANSFER
        payment_status NVARCHAR(30) NOT NULL DEFAULT 'UNPAID', -- UNPAID, PENDING, PAID, FAILED, REFUNDED
        order_status NVARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, PREPARING, DELIVERING, COMPLETED, CANCELLED, REFUNDED
        assigned_staff_id BIGINT NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        cancelled_at DATETIME2 NULL,
        completed_at DATETIME2 NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (assigned_staff_id) REFERENCES users(id),
        FOREIGN KEY (coupon_id) REFERENCES coupons(id)
    );
    CREATE INDEX idx_orders_code ON orders(order_code);
    CREATE INDEX idx_orders_user ON orders(user_id);
    CREATE INDEX idx_orders_status ON orders(order_status);
END;
GO

-- 14. ORDER_ITEMS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_items')
BEGIN
    CREATE TABLE order_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        product_id BIGINT NOT NULL,
        variant_id BIGINT NULL,
        product_name NVARCHAR(200) NOT NULL,
        variant_name NVARCHAR(100) NULL,
        product_sku NVARCHAR(50) NOT NULL,
        image_url NVARCHAR(500) NULL,
        unit_price DECIMAL(18,2) NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(18,2) NOT NULL,
        delivery_date DATE NULL,
        delivery_time_slot NVARCHAR(50) NULL,
        card_message NVARCHAR(500) NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (variant_id) REFERENCES product_variants(id)
    );
END;
GO

-- 15. ORDER_STATUS_HISTORY TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_status_history')
BEGIN
    CREATE TABLE order_status_history (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        previous_status NVARCHAR(30) NULL,
        new_status NVARCHAR(30) NOT NULL,
        note NVARCHAR(500) NULL,
        created_by_id BIGINT NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by_id) REFERENCES users(id)
    );
END;
GO

-- 16. PAYMENTS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'payments')
BEGIN
    CREATE TABLE payments (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        payment_method NVARCHAR(50) NOT NULL,
        transaction_code NVARCHAR(100) NULL,
        amount DECIMAL(18,2) NOT NULL,
        status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',
        paid_at DATETIME2 NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
END;
GO

-- 17. INVENTORY_TRANSACTIONS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'inventory_transactions')
BEGIN
    CREATE TABLE inventory_transactions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        product_id BIGINT NOT NULL,
        variant_id BIGINT NULL,
        quantity_change INT NOT NULL,
        transaction_type NVARCHAR(30) NOT NULL, -- IMPORT, SALE, CANCEL_REFUND, ADJUSTMENT_INCREASE, ADJUSTMENT_DECREASE
        quantity_before INT NOT NULL,
        quantity_after INT NOT NULL,
        created_by_id BIGINT NULL,
        order_id BIGINT NULL,
        note NVARCHAR(500) NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (variant_id) REFERENCES product_variants(id),
        FOREIGN KEY (created_by_id) REFERENCES users(id),
        FOREIGN KEY (order_id) REFERENCES orders(id)
    );
END;
GO

-- 18. COUPON_USAGES TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'coupon_usages')
BEGIN
    CREATE TABLE coupon_usages (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        coupon_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        order_id BIGINT NOT NULL,
        used_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (coupon_id) REFERENCES coupons(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (order_id) REFERENCES orders(id)
    );
END;
GO

-- 19. REVIEWS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reviews')
BEGIN
    CREATE TABLE reviews (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        product_id BIGINT NOT NULL,
        order_item_id BIGINT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment NVARCHAR(1000) NULL,
        is_approved BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (order_item_id) REFERENCES order_items(id)
    );
END;
GO

-- 20. WISHLISTS TABLE
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'wishlists')
BEGIN
    CREATE TABLE wishlists (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        product_id BIGINT NOT NULL,
        created_at DATETIME2 DEFAULT SYSDATETIME(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        CONSTRAINT uq_user_product UNIQUE (user_id, product_id)
    );
END;
GO
