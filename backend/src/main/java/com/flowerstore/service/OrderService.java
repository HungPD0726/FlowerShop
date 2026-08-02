package com.flowerstore.service;

import com.flowerstore.dto.request.CreateOrderRequest;
import com.flowerstore.dto.request.UpdateOrderStatusRequest;
import com.flowerstore.dto.response.OrderResponse;
import com.flowerstore.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponse createOrder(String userEmail, CreateOrderRequest request);
    PageResponse<OrderResponse> getMyOrders(String userEmail, Pageable pageable);
    OrderResponse getOrderByCode(String userEmail, String orderCode);
    OrderResponse cancelOrder(String userEmail, String orderCode, String reason);

    // Admin & Staff APIs
    PageResponse<OrderResponse> getAllOrdersForAdmin(String keyword, String status, Pageable pageable);
    OrderResponse getOrderByIdForAdmin(Long id);
    OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request, String staffEmail);
    OrderResponse assignStaff(Long orderId, Long staffId);
}
