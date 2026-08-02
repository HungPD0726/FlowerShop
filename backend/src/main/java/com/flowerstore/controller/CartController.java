package com.flowerstore.controller;

import com.flowerstore.dto.request.AddToCartRequest;
import com.flowerstore.dto.request.UpdateCartItemRequest;
import com.flowerstore.dto.response.ApiResponse;
import com.flowerstore.dto.response.CartResponse;
import com.flowerstore.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            Authentication authentication,
            @RequestParam(required = false) String sessionId
    ) {
        String email = authentication != null ? authentication.getName() : null;
        CartResponse cart = cartService.getCart(email, sessionId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request
    ) {
        String email = authentication != null ? authentication.getName() : null;
        CartResponse cart = cartService.addToCart(email, request);
        return ResponseEntity.ok(ApiResponse.success("Thêm vào giỏ hàng thành công", cart));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        String email = authentication != null ? authentication.getName() : null;
        CartResponse cart = cartService.updateCartItem(email, id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật giỏ hàng thành công", cart));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<ApiResponse<CartResponse>> removeCartItem(
            Authentication authentication,
            @PathVariable Long id
    ) {
        String email = authentication != null ? authentication.getName() : null;
        CartResponse cart = cartService.removeCartItem(email, id);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa sản phẩm khỏi giỏ hàng", cart));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            Authentication authentication,
            @RequestParam(required = false) String sessionId
    ) {
        String email = authentication != null ? authentication.getName() : null;
        cartService.clearCart(email, sessionId);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa toàn bộ giỏ hàng", null));
    }
}
