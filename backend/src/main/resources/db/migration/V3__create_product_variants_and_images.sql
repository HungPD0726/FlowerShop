CREATE TABLE product_images (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url NVARCHAR(500) NOT NULL,
    alt_text NVARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    is_primary BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_variants (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    product_id BIGINT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    sku NVARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(18,2) NOT NULL,
    sale_price DECIMAL(18,2) NULL,
    stock_quantity INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    updated_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX idx_variants_sku ON product_variants(sku);
