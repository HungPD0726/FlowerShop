CREATE TABLE inventory_transactions (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    product_id BIGINT NOT NULL,
    variant_id BIGINT NULL,
    quantity_change INT NOT NULL,
    transaction_type NVARCHAR(30) NOT NULL,
    quantity_before INT NOT NULL,
    quantity_after INT NOT NULL,
    created_by_id BIGINT NULL,
    order_id BIGINT NULL,
    note NVARCHAR(500) NULL,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_inv_tx_product FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_inv_tx_variant FOREIGN KEY (variant_id) REFERENCES product_variants(id),
    CONSTRAINT fk_inv_tx_user FOREIGN KEY (created_by_id) REFERENCES users(id),
    CONSTRAINT fk_inv_tx_order FOREIGN KEY (order_id) REFERENCES orders(id)
);
