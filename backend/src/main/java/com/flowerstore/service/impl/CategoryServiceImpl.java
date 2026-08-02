package com.flowerstore.service.impl;

import com.flowerstore.dto.request.CategoryRequest;
import com.flowerstore.dto.response.CategoryResponse;
import com.flowerstore.entity.Category;
import com.flowerstore.exception.DuplicateResourceException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.CategoryRepository;
import com.flowerstore.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategoriesForAdmin() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục: " + slug));
        return mapToResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        String slug = (request.getSlug() != null && !request.getSlug().trim().isEmpty())
                ? request.getSlug().trim().toLowerCase()
                : generateSlug(request.getName());

        if (Boolean.TRUE.equals(categoryRepository.existsBySlug(slug))) {
            throw new DuplicateResourceException("Slug danh mục đã tồn tại: " + slug);
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .build();

        return mapToResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục id: " + id));

        if (request.getSlug() != null && !request.getSlug().equalsIgnoreCase(category.getSlug())) {
            if (Boolean.TRUE.equals(categoryRepository.existsBySlug(request.getSlug()))) {
                throw new DuplicateResourceException("Slug đã tồn tại: " + request.getSlug());
            }
            category.setSlug(request.getSlug().trim().toLowerCase());
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        if (request.getImageUrl() != null) category.setImageUrl(request.getImageUrl());
        if (request.getIsActive() != null) category.setIsActive(request.getIsActive());
        if (request.getDisplayOrder() != null) category.setDisplayOrder(request.getDisplayOrder());

        return mapToResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục id: " + id));
        categoryRepository.delete(category);
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .isActive(category.getIsActive())
                .displayOrder(category.getDisplayOrder())
                .createdAt(category.getCreatedAt())
                .build();
    }

    private String generateSlug(String input) {
        if (input == null) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String slug = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("đ", "d")
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
        return slug.startsWith("-") ? slug.substring(1) : slug;
    }
}
