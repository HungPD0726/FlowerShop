package com.flowerstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {
    private BigDecimal totalRevenue;
    private Long totalOrders;
    private Long pendingOrders;
    private Long totalCustomers;
    private List<OrderResponse> recentOrders;
    private List<ProductResponse> lowStockProducts;
}
