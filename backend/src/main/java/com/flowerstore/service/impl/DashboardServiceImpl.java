package com.flowerstore.service.impl;

import com.flowerstore.dto.response.DashboardSummaryResponse;
import com.flowerstore.dto.response.OrderResponse;
import com.flowerstore.dto.response.ProductResponse;
import com.flowerstore.entity.Order;
import com.flowerstore.repository.OrderRepository;
import com.flowerstore.repository.ProductRepository;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.service.DashboardService;
import com.flowerstore.service.OrderService;
import com.flowerstore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final ProductService productService;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        if (totalRevenue == null) totalRevenue = BigDecimal.ZERO;

        Long totalOrders = orderRepository.count();
        Long pendingOrders = orderRepository.countByOrderStatus("PENDING");
        Long totalCustomers = userRepository.count();

        List<Order> recent = orderRepository.findTop5ByOrderByCreatedAtDesc();
        List<OrderResponse> recentOrderResponses = recent.stream()
                .map(o -> orderService.getOrderByCode(null, o.getOrderCode()))
                .toList();

        List<ProductResponse> lowStockProducts = productService.getAdminProducts("", PageRequest.of(0, 5)).getContent();

        return DashboardSummaryResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .totalCustomers(totalCustomers)
                .recentOrders(recentOrderResponses)
                .lowStockProducts(lowStockProducts)
                .build();
    }
}
