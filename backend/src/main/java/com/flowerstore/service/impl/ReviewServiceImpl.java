package com.flowerstore.service.impl;

import com.flowerstore.dto.request.ReviewRequest;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.dto.response.ReviewResponse;
import com.flowerstore.entity.OrderItem;
import com.flowerstore.entity.Product;
import com.flowerstore.entity.Review;
import com.flowerstore.entity.User;
import com.flowerstore.exception.BusinessException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.OrderItemRepository;
import com.flowerstore.repository.ProductRepository;
import com.flowerstore.repository.ReviewRepository;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getProductReviews(Long productId, Pageable pageable) {
        Page<Review> page = reviewRepository.findByProductIdAndIsApprovedTrueOrderByCreatedAtDesc(productId, pageable);
        return PageResponse.from(page.map(this::mapToResponse));
    }

    @Override
    @Transactional
    public ReviewResponse createReview(String userEmail, ReviewRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));

        Product product = productRepository.findByIdAndDeletedAtIsNull(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + request.getProductId()));

        OrderItem orderItem = null;
        if (request.getOrderItemId() != null) {
            orderItem = orderItemRepository.findById(request.getOrderItemId()).orElse(null);
            if (Boolean.TRUE.equals(reviewRepository.existsByUserIdAndOrderItemId(user.getId(), request.getOrderItemId()))) {
                throw new BusinessException("Bạn đã đánh giá sản phẩm này cho đơn hàng tương ứng rồi");
            }
        }

        Review review = Review.builder()
                .user(user)
                .product(product)
                .orderItem(orderItem)
                .rating(request.getRating())
                .comment(request.getComment())
                .isApproved(true)
                .build();

        return mapToResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional
    public void deleteReview(String userEmail, Long reviewId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));

        Review review = reviewRepository.findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đánh giá id: " + reviewId));

        reviewRepository.delete(review);
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .userName(review.getUser().getFullName())
                .userAvatar(review.getUser().getAvatarUrl())
                .rating(review.getRating())
                .comment(review.getComment())
                .isApproved(review.getIsApproved())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
