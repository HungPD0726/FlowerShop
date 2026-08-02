package com.flowerstore.service;

import com.flowerstore.dto.request.ProductRequest;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.dto.response.ProductImageResponse;
import com.flowerstore.dto.response.ProductResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    PageResponse<ProductResponse> getProducts(
            String keyword,
            String categorySlug,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String flowerType,
            String color,
            Boolean inStock,
            String sort,
            Pageable pageable
    );

    ProductResponse getProductBySlug(String slug);
    ProductResponse getProductById(Long id);
    List<ProductResponse> getFeaturedProducts();
    List<ProductResponse> getBestSellers();
    List<ProductResponse> getNewArrivals();
    List<ProductResponse> getRelatedProducts(Long id);

    // Admin APIs
    PageResponse<ProductResponse> getAdminProducts(String keyword, Pageable pageable);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void softDeleteProduct(Long id);
    ProductResponse restoreProduct(Long id);
    ProductResponse toggleProductStatus(Long id, Boolean isActive);
    ProductImageResponse addProductImage(Long productId, MultipartFile file, Boolean isPrimary);
    void deleteProductImage(Long productId, Long imageId);
}
