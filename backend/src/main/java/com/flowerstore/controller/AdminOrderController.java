package com.flowerstore.controller;

import com.flowerstore.dto.request.UpdateOrderStatusRequest;
import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.dto.response.OrderResponse;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/orders")
@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getAllOrders(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getAllOrdersForAdmin(keyword, status, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getOrderByIdForAdmin(id)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UpdateOrderStatusRequest request
    ) {
        String staffEmail = authentication != null ? authentication.getName() : null;
        OrderResponse order = orderService.updateOrderStatus(id, request, staffEmail);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái đơn hàng thành công", order));
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<ApiResponse<OrderResponse>> assignStaff(
            @PathVariable Long id,
            @RequestParam Long staffId
    ) {
        OrderResponse order = orderService.assignStaff(id, staffId);
        return ResponseEntity.ok(ApiResponse.success("Phân công nhân viên xử lý thành công", order));
    }
}
