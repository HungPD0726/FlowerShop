package com.flowerstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantRequest {
    @NotBlank(message = "Tên biến thể không được để trống")
    private String name;

    @NotBlank(message = "SKU biến thể không được để trống")
    private String sku;

    @NotNull(message = "Giá biến thể không được để trống")
    private BigDecimal price;

    private BigDecimal salePrice;
    private Integer stockQuantity = 0;
    private Boolean isActive = true;
}
