package com.flowerstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CouponRequest {
    @NotBlank(message = "Mã coupon không được để trống")
    private String code;

    @NotBlank(message = "Tên chương trình không được để trống")
    private String title;

    @NotBlank(message = "Loại giảm giá không được để trống")
    private String discountType; // PERCENTAGE, FIXED_AMOUNT

    @NotNull(message = "Giá trị giảm không được để trống")
    private BigDecimal discountValue;

    private BigDecimal minOrderAmount = BigDecimal.ZERO;
    private BigDecimal maxDiscountAmount;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDateTime startDate;

    @NotNull(message = "Ngày kết thúc không được để trống")
    private LocalDateTime endDate;

    private Integer usageLimit = 100;
    private Integer usagePerUser = 1;
    private Boolean isActive = true;
}
