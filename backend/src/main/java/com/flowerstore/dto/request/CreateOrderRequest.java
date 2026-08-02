package com.flowerstore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreateOrderRequest {
    @NotBlank(message = "Tên người đặt không được để trống")
    private String customerName;

    @NotBlank(message = "Email người đặt không được để trống")
    @Email(message = "Email người đặt không hợp lệ")
    private String customerEmail;

    @NotBlank(message = "Số điện thoại người đặt không được để trống")
    private String customerPhone;

    @NotBlank(message = "Tên người nhận không được để trống")
    private String recipientName;

    @NotBlank(message = "Số điện thoại người nhận không được để trống")
    private String recipientPhone;

    @NotBlank(message = "Tỉnh/Thành phố không được để trống")
    private String province;

    @NotBlank(message = "Quận/Huyện không được để trống")
    private String district;

    @NotBlank(message = "Phường/Xã không được để trống")
    private String ward;

    @NotBlank(message = "Địa chỉ chi tiết không được để trống")
    private String deliveryAddress;

    @NotNull(message = "Ngày giao hoa không được để trống")
    private LocalDate deliveryDate;

    @NotBlank(message = "Khung giờ giao không được để trống")
    private String deliveryTimeSlot;

    private String senderName;
    private String cardMessage;
    private Boolean hideSenderName = false;
    private String customerNote;
    private String couponCode;

    @NotBlank(message = "Phương thức thanh toán không được để trống")
    private String paymentMethod; // COD, BANK_TRANSFER

    @NotNull(message = "Danh sách sản phẩm mua không được để trống")
    private List<AddToCartRequest> items;
}
