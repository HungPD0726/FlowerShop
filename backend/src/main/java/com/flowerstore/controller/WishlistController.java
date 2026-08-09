package com.flowerstore.controller;

import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.entity.User;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Long>>> getMyWishlist(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Long> productIds = wishlistService.getUserWishlistProductIds(user.getId());
        return ResponseEntity.ok(ApiResponse.success(productIds));
    }

    @PostMapping("/toggle/{productId}")
    public ResponseEntity<ApiResponse<Boolean>> toggleWishlist(
            Authentication authentication,
            @PathVariable Long productId
    ) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        boolean added = wishlistService.toggleWishlist(user.getId(), productId);
        String message = added ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích";
        return ResponseEntity.ok(ApiResponse.success(message, added));
    }
}
