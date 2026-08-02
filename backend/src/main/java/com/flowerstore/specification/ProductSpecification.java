package com.flowerstore.specification;

import com.flowerstore.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filterProducts(
            String keyword,
            String categorySlug,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String flowerType,
            String color,
            Boolean inStock,
            Boolean includeInactive
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Soft delete check
            predicates.add(criteriaBuilder.isNull(root.get("deletedAt")));

            if (Boolean.FALSE.equals(includeInactive)) {
                predicates.add(criteriaBuilder.equal(root.get("isActive"), true));
            }

            // Keyword search (name or shortDescription or sku)
            if (keyword != null && !keyword.trim().isEmpty()) {
                String searchPattern = "%" + keyword.trim().toLowerCase() + "%";
                Predicate nameLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), searchPattern);
                Predicate descLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("shortDescription")), searchPattern);
                Predicate skuLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("sku")), searchPattern);
                predicates.add(criteriaBuilder.or(nameLike, descLike, skuLike));
            }

            // Category filter
            if (categorySlug != null && !categorySlug.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("slug"), categorySlug));
            }

            // Price range filter
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("basePrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("basePrice"), maxPrice));
            }

            // Flower type filter
            if (flowerType != null && !flowerType.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get("flowerType")), flowerType.trim().toLowerCase()));
            }

            // Color filter
            if (color != null && !color.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get("mainColor")), color.trim().toLowerCase()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
