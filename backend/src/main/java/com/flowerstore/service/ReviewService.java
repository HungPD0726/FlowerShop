package com.flowerstore.service;

import com.flowerstore.dto.request.ReviewRequest;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    PageResponse<ReviewResponse> getProductReviews(Long productId, Pageable pageable);
    ReviewResponse createReview(String userEmail, ReviewRequest request);
    void deleteReview(String userEmail, Long reviewId);
}
