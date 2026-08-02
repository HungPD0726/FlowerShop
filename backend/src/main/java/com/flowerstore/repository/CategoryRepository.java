package com.flowerstore.repository;

import com.flowerstore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    List<Category> findByIsActiveTrueOrderByDisplayOrderAsc();
    Boolean existsBySlug(String slug);
    Boolean existsByName(String name);
}
