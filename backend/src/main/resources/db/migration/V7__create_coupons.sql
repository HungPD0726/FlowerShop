CREATE TABLE coupon_usages (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    coupon_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    used_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_coupon_usages_coupon FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    CONSTRAINT fk_coupon_usages_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_coupon_usages_order FOREIGN KEY (order_id) REFERENCES orders(id)
);
