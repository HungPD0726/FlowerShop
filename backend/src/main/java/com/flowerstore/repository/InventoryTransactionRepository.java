package com.flowerstore.repository;

import com.flowerstore.entity.InventoryTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    Page<InventoryTransaction> findByProductIdOrderByCreatedAtDesc(Long productId, Pageable pageable);
    List<InventoryTransaction> findByOrderIdAndTransactionType(Long orderId, String transactionType);
    Page<InventoryTransaction> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
