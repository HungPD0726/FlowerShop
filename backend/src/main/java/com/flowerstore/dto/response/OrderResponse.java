package com.flowerstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderCode;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String recipientName;
    private String recipientPhone;
    private String province;
    private String district;
    private String ward;
    private String deliveryAddress;
    private LocalDate deliveryDate;
    private String deliveryTimeSlot;
    private String senderName;
    private String cardMessage;
    private Boolean hideSenderName;
    private String customerNote;
    private String internalNote;
    private BigDecimal subtotal;
    private BigDecimal shippingFee;
    private BigDecimal discountAmount;
    private BigDecimal totalAmount;
    private String couponCode;
    private String paymentMethod;
    private String paymentStatus;
    private String orderStatus;
    private String assignedStaffName;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private List<OrderItemResponse> items;
}
