package com.flowerstore.service;

import com.flowerstore.dto.request.AddToCartRequest;
import com.flowerstore.dto.request.UpdateCartItemRequest;
import com.flowerstore.dto.response.CartResponse;

public interface CartService {
    CartResponse getCart(String userEmail, String sessionId);
    CartResponse addToCart(String userEmail, AddToCartRequest request);
    CartResponse updateCartItem(String userEmail, Long itemId, UpdateCartItemRequest request);
    CartResponse removeCartItem(String userEmail, Long itemId);
    void clearCart(String userEmail, String sessionId);
    void syncCartOnLogin(String userEmail, String sessionId);
}
