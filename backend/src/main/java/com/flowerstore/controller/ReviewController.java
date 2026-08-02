package com.flowerstore.controller;

import com.flowerstore.dto.request.ReviewRequest;
import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.dto.response.ReviewResponse;
import com.flowerstore.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> getProductReviews(
            @PathVariable Long productId,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        PageResponse<ReviewResponse> page = reviewService.getProductReviews(productId, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            Authentication authentication,
            @PathVariable Long productId,
            @Valid @RequestBody ReviewRequest request
    ) {
        request.setProductId(productId);
        ReviewResponse review = reviewService.createReview(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đánh giá sản phẩm thành công", review));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            Authentication authentication,
            @PathVariable Long id
    ) {
        reviewService.deleteReview(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Xóa đánh giá thành công", null));
    }
}
