package com.flowerstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AddToCartRequest {
    @NotNull(message = "Sản phẩm không được để trống")
    private Long productId;

    private Long variantId;

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng phải lớn hơn hoặc bằng 1")
    private Integer quantity = 1;

    private LocalDate deliveryDate;
    private String deliveryTimeSlot;
    private String cardMessage;
    private String sessionId;
}
