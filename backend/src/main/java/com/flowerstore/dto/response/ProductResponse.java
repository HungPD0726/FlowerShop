package com.flowerstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private CategoryResponse category;
    private String name;
    private String slug;
    private String sku;
    private String shortDescription;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private String mainImageUrl;
    private String flowerType;
    private String mainColor;
    private Boolean isFeatured;
    private Boolean isNew;
    private Boolean isBestSeller;
    private Boolean isActive;
    private Integer soldCount;
    private Double averageRating;
    private Long reviewCount;
    private LocalDateTime createdAt;
    private List<ProductImageResponse> images;
    private List<ProductVariantResponse> variants;
}
