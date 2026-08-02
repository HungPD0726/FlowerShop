package com.flowerstore.service.impl;

import com.flowerstore.dto.request.ProductRequest;
import com.flowerstore.dto.request.ProductVariantRequest;
import com.flowerstore.dto.response.*;
import com.flowerstore.entity.*;
import com.flowerstore.exception.DuplicateResourceException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.*;
import com.flowerstore.service.ProductService;
import com.flowerstore.service.StorageService;
import com.flowerstore.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository imageRepository;
    private final ProductVariantRepository variantRepository;
    private final StorageService storageService;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getProducts(
            String keyword,
            String categorySlug,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String flowerType,
            String color,
            Boolean inStock,
            String sort,
            Pageable pageable
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
        if (sort != null) {
            switch (sort.toLowerCase()) {
                case "price-asc" -> sortOrder = Sort.by(Sort.Direction.ASC, "basePrice");
                case "price-desc" -> sortOrder = Sort.by(Sort.Direction.DESC, "basePrice");
                case "bestseller" -> sortOrder = Sort.by(Sort.Direction.DESC, "soldCount");
                case "newest" -> sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
            }
        }

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortOrder);

        Specification<Product> spec = ProductSpecification.filterProducts(
                keyword, categorySlug, minPrice, maxPrice, flowerType, color, inStock, false
        );

        Page<Product> page = productRepository.findAll(spec, sortedPageable);
        return PageResponse.from(page.map(this::mapToResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndDeletedAtIsNull(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với slug: " + slug));
        return mapToResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + id));
        return mapToResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNull(PageRequest.of(0, 8)).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getBestSellers() {
        return productRepository.findByIsBestSellerTrueAndIsActiveTrueAndDeletedAtIsNull(PageRequest.of(0, 8)).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getNewArrivals() {
        return productRepository.findByIsNewTrueAndIsActiveTrueAndDeletedAtIsNull(PageRequest.of(0, 8)).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getRelatedProducts(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm"));

        return productRepository.findByCategoryIdAndIsActiveTrueAndDeletedAtIsNullAndIdNot(
                product.getCategory().getId(), id, PageRequest.of(0, 4)
        ).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getAdminProducts(String keyword, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.filterProducts(
                keyword, null, null, null, null, null, null, true
        );
        Page<Product> page = productRepository.findAll(spec, pageable);
        return PageResponse.from(page.map(this::mapToResponse));
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục id: " + request.getCategoryId()));

        String slug = (request.getSlug() != null && !request.getSlug().trim().isEmpty())
                ? request.getSlug().trim().toLowerCase()
                : generateSlug(request.getName());

        if (Boolean.TRUE.equals(productRepository.existsBySlug(slug))) {
            throw new DuplicateResourceException("Slug sản phẩm đã tồn tại: " + slug);
        }
        if (Boolean.TRUE.equals(productRepository.existsBySku(request.getSku()))) {
            throw new DuplicateResourceException("SKU sản phẩm đã tồn tại: " + request.getSku());
        }

        Product product = Product.builder()
                .category(category)
                .name(request.getName())
                .slug(slug)
                .sku(request.getSku())
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .basePrice(request.getBasePrice())
                .salePrice(request.getSalePrice())
                .mainImageUrl(request.getMainImageUrl())
                .flowerType(request.getFlowerType())
                .mainColor(request.getMainColor())
                .isFeatured(Boolean.TRUE.equals(request.getIsFeatured()))
                .isNew(request.getIsNew() != null ? request.getIsNew() : true)
                .isBestSeller(Boolean.TRUE.equals(request.getIsBestSeller()))
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .soldCount(0)
                .images(new ArrayList<>())
                .variants(new ArrayList<>())
                .build();

        Product savedProduct = productRepository.save(product);

        if (request.getVariants() != null && !request.getVariants().isEmpty()) {
            for (ProductVariantRequest vr : request.getVariants()) {
                ProductVariant variant = ProductVariant.builder()
                        .product(savedProduct)
                        .name(vr.getName())
                        .sku(vr.getSku())
                        .price(vr.getPrice())
                        .salePrice(vr.getSalePrice())
                        .stockQuantity(vr.getStockQuantity() != null ? vr.getStockQuantity() : 0)
                        .isActive(vr.getIsActive() != null ? vr.getIsActive() : true)
                        .build();
                variantRepository.save(variant);
                savedProduct.getVariants().add(variant);
            }
        }

        return mapToResponse(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục id: " + request.getCategoryId()));

        product.setCategory(category);
        product.setName(request.getName());
        product.setShortDescription(request.getShortDescription());
        product.setDescription(request.getDescription());
        product.setBasePrice(request.getBasePrice());
        product.setSalePrice(request.getSalePrice());
        if (request.getMainImageUrl() != null) product.setMainImageUrl(request.getMainImageUrl());
        product.setFlowerType(request.getFlowerType());
        product.setMainColor(request.getMainColor());
        if (request.getIsFeatured() != null) product.setIsFeatured(request.getIsFeatured());
        if (request.getIsNew() != null) product.setIsNew(request.getIsNew());
        if (request.getIsBestSeller() != null) product.setIsBestSeller(request.getIsBestSeller());
        if (request.getIsActive() != null) product.setIsActive(request.getIsActive());

        return mapToResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public void softDeleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + id));
        product.setDeletedAt(LocalDateTime.now());
        product.setIsActive(false);
        productRepository.save(product);
    }

    @Override
    @Transactional
    public ProductResponse restoreProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + id));
        product.setDeletedAt(null);
        product.setIsActive(true);
        return mapToResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductResponse toggleProductStatus(Long id, Boolean isActive) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + id));
        product.setIsActive(isActive);
        return mapToResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductImageResponse addProductImage(Long productId, MultipartFile file, Boolean isPrimary) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + productId));

        String imageUrl = storageService.storeFile(file);

        ProductImage image = ProductImage.builder()
                .product(product)
                .imageUrl(imageUrl)
                .altText(product.getName())
                .isPrimary(Boolean.TRUE.equals(isPrimary))
                .displayOrder(product.getImages().size() + 1)
                .build();

        ProductImage savedImage = imageRepository.save(image);
        if (Boolean.TRUE.equals(isPrimary) || product.getMainImageUrl() == null) {
            product.setMainImageUrl(imageUrl);
            productRepository.save(product);
        }

        return ProductImageResponse.builder()
                .id(savedImage.getId())
                .imageUrl(savedImage.getImageUrl())
                .altText(savedImage.getAltText())
                .displayOrder(savedImage.getDisplayOrder())
                .isPrimary(savedImage.getIsPrimary())
                .build();
    }

    @Override
    @Transactional
    public void deleteProductImage(Long productId, Long imageId) {
        ProductImage image = imageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ảnh id: " + imageId));

        storageService.deleteFile(image.getImageUrl());
        imageRepository.delete(image);
    }

    private ProductResponse mapToResponse(Product product) {
        CategoryResponse categoryResp = CategoryResponse.builder()
                .id(product.getCategory().getId())
                .name(product.getCategory().getName())
                .slug(product.getCategory().getSlug())
                .build();

        List<ProductImageResponse> images = product.getImages() != null ? product.getImages().stream()
                .map(img -> ProductImageResponse.builder()
                        .id(img.getId())
                        .imageUrl(img.getImageUrl())
                        .altText(img.getAltText())
                        .displayOrder(img.getDisplayOrder())
                        .isPrimary(img.getIsPrimary())
                        .build()).toList() : List.of();

        List<ProductVariantResponse> variants = product.getVariants() != null ? product.getVariants().stream()
                .map(v -> ProductVariantResponse.builder()
                        .id(v.getId())
                        .name(v.getName())
                        .sku(v.getSku())
                        .price(v.getPrice())
                        .salePrice(v.getSalePrice())
                        .stockQuantity(v.getStockQuantity())
                        .isActive(v.getIsActive())
                        .build()).toList() : List.of();

        return ProductResponse.builder()
                .id(product.getId())
                .category(categoryResp)
                .name(product.getName())
                .slug(product.getSlug())
                .sku(product.getSku())
                .shortDescription(product.getShortDescription())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .salePrice(product.getSalePrice())
                .mainImageUrl(product.getMainImageUrl())
                .flowerType(product.getFlowerType())
                .mainColor(product.getMainColor())
                .isFeatured(product.getIsFeatured())
                .isNew(product.getIsNew())
                .isBestSeller(product.getIsBestSeller())
                .isActive(product.getIsActive())
                .soldCount(product.getSoldCount())
                .averageRating(4.8) // Default base rating
                .reviewCount(12L)
                .createdAt(product.getCreatedAt())
                .images(images)
                .variants(variants)
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
