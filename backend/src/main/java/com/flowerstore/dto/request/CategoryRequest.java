package com.flowerstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;

    private String slug;
    private String description;
    private String imageUrl;
    private Boolean isActive = true;
    private Integer displayOrder = 0;
}
