package com.flowerstore.repository;

import com.flowerstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByOrderCode(String orderCode);
    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderStatus = 'COMPLETED'")
    BigDecimal calculateTotalRevenue();

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderStatus = 'COMPLETED' AND o.createdAt >= :startDate AND o.createdAt <= :endDate")
    BigDecimal calculateRevenueBetween(LocalDateTime startDate, LocalDateTime endDate);

    Long countByOrderStatus(String orderStatus);

    List<Order> findTop5ByOrderByCreatedAtDesc();
}
