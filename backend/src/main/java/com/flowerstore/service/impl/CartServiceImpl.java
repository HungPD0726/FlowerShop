package com.flowerstore.service.impl;

import com.flowerstore.dto.request.AddToCartRequest;
import com.flowerstore.dto.request.UpdateCartItemRequest;
import com.flowerstore.dto.response.CartItemResponse;
import com.flowerstore.dto.response.CartResponse;
import com.flowerstore.entity.*;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.*;
import com.flowerstore.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CartResponse getCart(String userEmail, String sessionId) {
        Cart cart = getOrCreateCart(userEmail, sessionId);
        return mapToCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addToCart(String userEmail, AddToCartRequest request) {
        Cart cart = getOrCreateCart(userEmail, request.getSessionId());

        Product product = productRepository.findByIdAndDeletedAtIsNull(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + request.getProductId()));

        ProductVariant variant = null;
        if (request.getVariantId() != null) {
            variant = variantRepository.findById(request.getVariantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy biến thể id: " + request.getVariantId()));
        }

        Long variantId = variant != null ? variant.getId() : null;
        CartItem cartItem = cartItemRepository.findByCartIdAndProductIdAndVariantId(cart.getId(), product.getId(), variantId)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            if (request.getDeliveryDate() != null) cartItem.setDeliveryDate(request.getDeliveryDate());
            if (request.getDeliveryTimeSlot() != null) cartItem.setDeliveryTimeSlot(request.getDeliveryTimeSlot());
            if (request.getCardMessage() != null) cartItem.setCardMessage(request.getCardMessage());
            cartItemRepository.save(cartItem);
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .variant(variant)
                    .quantity(request.getQuantity())
                    .deliveryDate(request.getDeliveryDate())
                    .deliveryTimeSlot(request.getDeliveryTimeSlot())
                    .cardMessage(request.getCardMessage())
                    .build();
            cartItemRepository.save(cartItem);
            cart.getItems().add(cartItem);
        }

        return mapToCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartResponse updateCartItem(String userEmail, Long itemId, UpdateCartItemRequest request) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy item giỏ hàng id: " + itemId));

        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        return mapToCartResponse(cartItem.getCart());
    }

    @Override
    @Transactional
    public CartResponse removeCartItem(String userEmail, Long itemId) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy item giỏ hàng id: " + itemId));
        Cart cart = cartItem.getCart();

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        return mapToCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public void clearCart(String userEmail, String sessionId) {
        Cart cart = getOrCreateCart(userEmail, sessionId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void syncCartOnLogin(String userEmail, String sessionId) {
        if (userEmail == null || sessionId == null) return;
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) return;

        Cart guestCart = cartRepository.findBySessionId(sessionId).orElse(null);
        if (guestCart == null || guestCart.getItems().isEmpty()) return;

        Cart userCart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).items(new ArrayList<>()).build()));

        for (CartItem guestItem : guestCart.getItems()) {
            Long variantId = guestItem.getVariant() != null ? guestItem.getVariant().getId() : null;
            CartItem userItem = cartItemRepository.findByCartIdAndProductIdAndVariantId(
                    userCart.getId(), guestItem.getProduct().getId(), variantId
            ).orElse(null);

            if (userItem != null) {
                userItem.setQuantity(userItem.getQuantity() + guestItem.getQuantity());
                cartItemRepository.save(userItem);
            } else {
                guestItem.setCart(userCart);
                cartItemRepository.save(guestItem);
                userCart.getItems().add(guestItem);
            }
        }

        cartRepository.delete(guestCart);
        cartRepository.save(userCart);
    }

    private Cart getOrCreateCart(String userEmail, String sessionId) {
        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user != null) {
                return cartRepository.findByUserId(user.getId())
                        .orElseGet(() -> cartRepository.save(Cart.builder().user(user).items(new ArrayList<>()).build()));
            }
        }
        if (sessionId != null) {
            return cartRepository.findBySessionId(sessionId)
                    .orElseGet(() -> cartRepository.save(Cart.builder().sessionId(sessionId).items(new ArrayList<>()).build()));
        }
        return cartRepository.save(Cart.builder().items(new ArrayList<>()).build());
    }

    private CartResponse mapToCartResponse(Cart cart) {
        BigDecimal subtotal = BigDecimal.ZERO;
        int totalItems = 0;
        List<CartItemResponse> itemsList = new ArrayList<>();

        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                BigDecimal unitPrice = item.getVariant() != null ?
                        (item.getVariant().getSalePrice() != null ? item.getVariant().getSalePrice() : item.getVariant().getPrice()) :
                        (item.getProduct().getSalePrice() != null ? item.getProduct().getSalePrice() : item.getProduct().getBasePrice());

                BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
                subtotal = subtotal.add(itemTotal);
                totalItems += item.getQuantity();

                itemsList.add(CartItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .productSlug(item.getProduct().getSlug())
                        .mainImageUrl(item.getProduct().getMainImageUrl())
                        .variantId(item.getVariant() != null ? item.getVariant().getId() : null)
                        .variantName(item.getVariant() != null ? item.getVariant().getName() : null)
                        .unitPrice(unitPrice)
                        .quantity(item.getQuantity())
                        .totalPrice(itemTotal)
                        .deliveryDate(item.getDeliveryDate())
                        .deliveryTimeSlot(item.getDeliveryTimeSlot())
                        .cardMessage(item.getCardMessage())
                        .stockQuantity(item.getVariant() != null ? item.getVariant().getStockQuantity() : 50)
                        .build());
            }
        }

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemsList)
                .subtotal(subtotal)
                .totalItems(totalItems)
                .build();
    }
}
