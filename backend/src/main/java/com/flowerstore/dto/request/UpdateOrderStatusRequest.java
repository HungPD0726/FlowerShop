package com.flowerstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    @NotBlank(message = "Trạng thái mới không được để trống")
    private String status;

    private String note;
    private Long assignedStaffId;
}
