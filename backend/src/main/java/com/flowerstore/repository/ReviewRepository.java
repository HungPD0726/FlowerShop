package com.flowerstore.repository;

import com.flowerstore.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByProductIdAndIsApprovedTrueOrderByCreatedAtDesc(Long productId, Pageable pageable);
    Boolean existsByUserIdAndOrderItemId(Long userId, Long orderItemId);
    Optional<Review> findByIdAndUserId(Long id, Long userId);
}
