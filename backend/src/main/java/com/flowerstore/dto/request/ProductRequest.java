package com.flowerstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    private String slug;

    @NotBlank(message = "SKU sản phẩm không được để trống")
    private String sku;

    private String shortDescription;
    private String description;

    @NotNull(message = "Giá gốc không được để trống")
    private BigDecimal basePrice;

    private BigDecimal salePrice;
    private String mainImageUrl;
    private String flowerType;
    private String mainColor;
    private Boolean isFeatured = false;
    private Boolean isNew = true;
    private Boolean isBestSeller = false;
    private Boolean isActive = true;

    private List<ProductVariantRequest> variants;
}
