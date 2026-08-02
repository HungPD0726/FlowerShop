package com.flowerstore.controller;

import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.dto.response.ProductResponse;
import com.flowerstore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String flowerType,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) String sort,
            @PageableDefault(size = 12) Pageable pageable
    ) {
        PageResponse<ProductResponse> page = productService.getProducts(
                keyword, category, minPrice, maxPrice, flowerType, color, inStock, sort, pageable
        );
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getFeaturedProducts()));
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getBestSellers() {
        return ResponseEntity.ok(ApiResponse.success(productService.getBestSellers()));
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getNewArrivals() {
        return ResponseEntity.ok(ApiResponse.success(productService.getNewArrivals()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductBySlug(slug)));
    }

    @GetMapping("/{id}/related")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getRelatedProducts(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getRelatedProducts(id)));
    }
}
