CREATE TABLE coupons (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE,
    title NVARCHAR(150) NOT NULL,
    discount_type NVARCHAR(20) NOT NULL,
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
    payment_method NVARCHAR(50) NOT NULL,
    payment_status NVARCHAR(30) NOT NULL DEFAULT 'UNPAID',
    order_status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',
    assigned_staff_id BIGINT NULL,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    updated_at DATETIME2 DEFAULT SYSDATETIME(),
    cancelled_at DATETIME2 NULL,
    completed_at DATETIME2 NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_orders_assigned_staff FOREIGN KEY (assigned_staff_id) REFERENCES users(id),
    CONSTRAINT fk_orders_coupon FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);
CREATE INDEX idx_orders_code ON orders(order_code);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);

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
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_order_items_variant FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

CREATE TABLE order_status_history (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    order_id BIGINT NOT NULL,
    previous_status NVARCHAR(30) NULL,
    new_status NVARCHAR(30) NOT NULL,
    note NVARCHAR(500) NULL,
    created_by_id BIGINT NULL,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_status_history_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_status_history_user FOREIGN KEY (created_by_id) REFERENCES users(id)
);

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
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
