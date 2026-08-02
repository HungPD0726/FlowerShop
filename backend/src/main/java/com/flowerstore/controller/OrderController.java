package com.flowerstore.controller;

import com.flowerstore.dto.request.CreateOrderRequest;
import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.dto.response.OrderResponse;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            Authentication authentication,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        String email = authentication != null ? authentication.getName() : null;
        OrderResponse order = orderService.createOrder(email, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đặt hàng thành công", order));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getMyOrders(
            Authentication authentication,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        PageResponse<OrderResponse> page = orderService.getMyOrders(authentication.getName(), pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/{orderCode}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderByCode(
            Authentication authentication,
            @PathVariable String orderCode
    ) {
        String email = authentication != null ? authentication.getName() : null;
        OrderResponse order = orderService.getOrderByCode(email, orderCode);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @PatchMapping("/{orderCode}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            Authentication authentication,
            @PathVariable String orderCode,
            @RequestParam(required = false) String reason
    ) {
        String email = authentication != null ? authentication.getName() : null;
        OrderResponse order = orderService.cancelOrder(email, orderCode, reason);
        return ResponseEntity.ok(ApiResponse.success("Hủy đơn hàng thành công", order));
    }
}
