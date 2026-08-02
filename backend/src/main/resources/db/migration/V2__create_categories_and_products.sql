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
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id)
);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category_id);
