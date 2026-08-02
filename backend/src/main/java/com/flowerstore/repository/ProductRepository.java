package com.flowerstore.repository;

import com.flowerstore.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlugAndDeletedAtIsNull(String slug);
    Optional<Product> findByIdAndDeletedAtIsNull(Long id);
    Boolean existsBySlug(String slug);
    Boolean existsBySku(String sku);

    List<Product> findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNull(Pageable pageable);
    List<Product> findByIsBestSellerTrueAndIsActiveTrueAndDeletedAtIsNull(Pageable pageable);
    List<Product> findByIsNewTrueAndIsActiveTrueAndDeletedAtIsNull(Pageable pageable);
    List<Product> findByCategoryIdAndIsActiveTrueAndDeletedAtIsNullAndIdNot(Long categoryId, Long id, Pageable pageable);
}
