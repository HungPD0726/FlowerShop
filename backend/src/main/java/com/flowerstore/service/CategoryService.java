package com.flowerstore.service;

import com.flowerstore.dto.request.CategoryRequest;
import com.flowerstore.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllActiveCategories();
    List<CategoryResponse> getAllCategoriesForAdmin();
    CategoryResponse getCategoryBySlug(String slug);
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}
