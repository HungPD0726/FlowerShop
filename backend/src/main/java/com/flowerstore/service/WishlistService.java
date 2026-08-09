package com.flowerstore.service;

import com.flowerstore.dto.response.ProductResponse;
import com.flowerstore.entity.Product;
import com.flowerstore.entity.User;
import com.flowerstore.entity.Wishlist;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.ProductRepository;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<Long> getUserWishlistProductIds(Long userId) {
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(w -> w.getProduct().getId())
                .toList();
    }

    @Transactional
    public boolean toggleWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với ID: " + productId));

        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            wishlistRepository.deleteByUserIdAndProductId(userId, productId);
            return false; // removed
        } else {
            Wishlist wishlist = Wishlist.builder()
                    .user(user)
                    .product(product)
                    .build();
            wishlistRepository.save(wishlist);
            return true; // added
        }
    }
}
