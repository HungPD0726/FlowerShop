package com.flowerstore.service.impl;

import com.flowerstore.dto.request.AddToCartRequest;
import com.flowerstore.dto.request.CreateOrderRequest;
import com.flowerstore.dto.request.UpdateOrderStatusRequest;
import com.flowerstore.dto.response.OrderItemResponse;
import com.flowerstore.dto.response.OrderResponse;
import com.flowerstore.dto.response.PageResponse;
import com.flowerstore.entity.*;
import com.flowerstore.exception.BusinessException;
import com.flowerstore.exception.ForbiddenException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.*;
import com.flowerstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository statusHistoryRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final CouponUsageRepository couponUsageRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(String userEmail, CreateOrderRequest request) {
        User user = userEmail != null ? userRepository.findByEmail(userEmail).orElse(null) : null;

        String orderCode = generateOrderCode();
        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = Order.builder()
                .orderCode(orderCode)
                .user(user)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .recipientName(request.getRecipientName())
                .recipientPhone(request.getRecipientPhone())
                .province(request.getProvince())
                .district(request.getDistrict())
                .ward(request.getWard())
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryDate(request.getDeliveryDate())
                .deliveryTimeSlot(request.getDeliveryTimeSlot())
                .senderName(request.getSenderName())
                .cardMessage(request.getCardMessage())
                .hideSenderName(Boolean.TRUE.equals(request.getHideSenderName()))
                .customerNote(request.getCustomerNote())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus("UNPAID")
                .orderStatus("PENDING")
                .shippingFee(new BigDecimal("30000")) // Fixed flat shipping fee
                .discountAmount(BigDecimal.ZERO)
                .items(new ArrayList<>())
                .statusHistory(new ArrayList<>())
                .build();

        for (AddToCartRequest itemReq : request.getItems()) {
            Product product = productRepository.findByIdAndDeletedAtIsNull(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm id: " + itemReq.getProductId()));

            if (Boolean.FALSE.equals(product.getIsActive())) {
                throw new BusinessException("Sản phẩm '" + product.getName() + "' hiện không khả dụng để đặt hàng");
            }

            ProductVariant variant = null;
            if (itemReq.getVariantId() != null) {
                variant = variantRepository.findById(itemReq.getVariantId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy biến thể id: " + itemReq.getVariantId()));

                if (variant.getStockQuantity() < itemReq.getQuantity()) {
                    throw new BusinessException("Sản phẩm '" + product.getName() + " (" + variant.getName() + ")' không đủ số lượng tồn kho");
                }
            }

            BigDecimal unitPrice = variant != null ?
                    (variant.getSalePrice() != null ? variant.getSalePrice() : variant.getPrice()) :
                    (product.getSalePrice() != null ? product.getSalePrice() : product.getBasePrice());

            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .variant(variant)
                    .productName(product.getName())
                    .variantName(variant != null ? variant.getName() : null)
                    .productSku(variant != null ? variant.getSku() : product.getSku())
                    .imageUrl(product.getMainImageUrl())
                    .unitPrice(unitPrice)
                    .quantity(itemReq.getQuantity())
                    .totalPrice(itemTotal)
                    .deliveryDate(itemReq.getDeliveryDate() != null ? itemReq.getDeliveryDate() : request.getDeliveryDate())
                    .deliveryTimeSlot(itemReq.getDeliveryTimeSlot() != null ? itemReq.getDeliveryTimeSlot() : request.getDeliveryTimeSlot())
                    .cardMessage(itemReq.getCardMessage() != null ? itemReq.getCardMessage() : request.getCardMessage())
                    .build();

            orderItems.add(orderItem);

            // Deduct stock & create InventoryTransaction
            if (variant != null) {
                int stockBefore = variant.getStockQuantity();
                int stockAfter = stockBefore - itemReq.getQuantity();
                variant.setStockQuantity(stockAfter);
                variantRepository.save(variant);

                inventoryTransactionRepository.save(InventoryTransaction.builder()
                        .product(product)
                        .variant(variant)
                        .quantityChange(-itemReq.getQuantity())
                        .transactionType("SALE")
                        .quantityBefore(stockBefore)
                        .quantityAfter(stockAfter)
                        .createdBy(user)
                        .order(order)
                        .note("Trừ kho khi tạo đơn hàng " + orderCode)
                        .build());
            }

            product.setSoldCount(product.getSoldCount() + itemReq.getQuantity());
            productRepository.save(product);
        }

        order.setSubtotal(subtotal);

        // Coupon calculation
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (request.getCouponCode() != null && !request.getCouponCode().trim().isEmpty()) {
            Coupon coupon = couponRepository.findByCode(request.getCouponCode().trim().toUpperCase())
                    .orElseThrow(() -> new BusinessException("Mã giảm giá không tồn tại"));

            if (Boolean.TRUE.equals(coupon.getIsActive()) &&
                coupon.getStartDate().isBefore(LocalDateTime.now()) &&
                coupon.getEndDate().isAfter(LocalDateTime.now()) &&
                subtotal.compareTo(coupon.getMinOrderAmount()) >= 0) {

                if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
                    discountAmount = subtotal.multiply(coupon.getDiscountValue()).divide(BigDecimal.valueOf(100));
                    if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                        discountAmount = coupon.getMaxDiscountAmount();
                    }
                } else {
                    discountAmount = coupon.getDiscountValue();
                }

                coupon.setUsedCount(coupon.getUsedCount() + 1);
                couponRepository.save(coupon);
                order.setCoupon(coupon);

                if (user != null) {
                    couponUsageRepository.save(CouponUsage.builder()
                            .coupon(coupon)
                            .user(user)
                            .order(order)
                            .build());
                }
            }
        }

        order.setDiscountAmount(discountAmount);
        BigDecimal total = subtotal.add(order.getShippingFee()).subtract(discountAmount);
        order.setTotalAmount(total.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : total);

        Order savedOrder = orderRepository.save(order);
        for (OrderItem oi : orderItems) {
            oi.setOrder(savedOrder);
            orderItemRepository.save(oi);
        }
        savedOrder.getItems().addAll(orderItems);

        // Create Status History
        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(savedOrder)
                .previousStatus(null)
                .newStatus("PENDING")
                .note("Đơn hàng mới được tạo thành công")
                .createdBy(user)
                .build();
        statusHistoryRepository.save(history);

        // Create Payment record
        Payment payment = Payment.builder()
                .order(savedOrder)
                .paymentMethod(request.getPaymentMethod())
                .amount(savedOrder.getTotalAmount())
                .status("PENDING")
                .build();
        paymentRepository.save(payment);

        return mapToOrderResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> getMyOrders(String userEmail, Pageable pageable) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));

        Page<Order> page = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), pageable);
        return PageResponse.from(page.map(this::mapToOrderResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderByCode(String userEmail, String orderCode) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng mã: " + orderCode));

        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user != null && order.getUser() != null && !order.getUser().getId().equals(user.getId())) {
                boolean isAdminOrStaff = user.getRoles().stream()
                        .anyMatch(r -> r.getName().equals("ROLE_ADMIN") || r.getName().equals("ROLE_STAFF"));
                if (!isAdminOrStaff) {
                    throw new ForbiddenException("Bạn không có quyền xem đơn hàng của người khác");
                }
            }
        }

        return mapToOrderResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(String userEmail, String orderCode, String reason) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng mã: " + orderCode));

        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user != null && order.getUser() != null && !order.getUser().getId().equals(user.getId())) {
            boolean isAdminOrStaff = user.getRoles().stream()
                    .anyMatch(r -> r.getName().equals("ROLE_ADMIN") || r.getName().equals("ROLE_STAFF"));
            if (!isAdminOrStaff) {
                throw new ForbiddenException("Bạn không có quyền hủy đơn hàng này");
            }
        }

        if (!"PENDING".equalsIgnoreCase(order.getOrderStatus())) {
            throw new BusinessException("Chỉ được hủy đơn hàng khi ở trạng thái PENDING (Chờ xử lý)");
        }

        String prevStatus = order.getOrderStatus();
        order.setOrderStatus("CANCELLED");
        order.setCancelledAt(LocalDateTime.now());

        // Stock Refund
        for (OrderItem item : order.getItems()) {
            if (item.getVariant() != null) {
                ProductVariant variant = item.getVariant();
                int before = variant.getStockQuantity();
                int after = before + item.getQuantity();
                variant.setStockQuantity(after);
                variantRepository.save(variant);

                inventoryTransactionRepository.save(InventoryTransaction.builder()
                        .product(item.getProduct())
                        .variant(variant)
                        .quantityChange(item.getQuantity())
                        .transactionType("CANCEL_REFUND")
                        .quantityBefore(before)
                        .quantityAfter(after)
                        .createdBy(user)
                        .order(order)
                        .note("Hoàn tồn kho do hủy đơn hàng " + orderCode)
                        .build());
            }
        }

        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .previousStatus(prevStatus)
                .newStatus("CANCELLED")
                .note("Hủy đơn hàng: " + (reason != null ? reason : "Khách hàng yêu cầu"))
                .createdBy(user)
                .build();
        statusHistoryRepository.save(history);

        return mapToOrderResponse(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> getAllOrdersForAdmin(String keyword, String status, Pageable pageable) {
        Page<Order> page = orderRepository.findAll(pageable);
        return PageResponse.from(page.map(this::mapToOrderResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderByIdForAdmin(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng id: " + id));
        return mapToOrderResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request, String staffEmail) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng id: " + id));

        User staff = staffEmail != null ? userRepository.findByEmail(staffEmail).orElse(null) : null;
        String prevStatus = order.getOrderStatus();
        String newStatus = request.getStatus().toUpperCase();

        order.setOrderStatus(newStatus);
        if ("COMPLETED".equalsIgnoreCase(newStatus)) {
            order.setCompletedAt(LocalDateTime.now());
            order.setPaymentStatus("PAID");
        } else if ("CANCELLED".equalsIgnoreCase(newStatus)) {
            order.setCancelledAt(LocalDateTime.now());
        }

        if (request.getAssignedStaffId() != null) {
            User assignedStaff = userRepository.findById(request.getAssignedStaffId()).orElse(null);
            order.setAssignedStaff(assignedStaff);
        }

        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .previousStatus(prevStatus)
                .newStatus(newStatus)
                .note(request.getNote())
                .createdBy(staff)
                .build();
        statusHistoryRepository.save(history);

        return mapToOrderResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse assignStaff(Long orderId, Long staffId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng id: " + orderId));
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhân viên id: " + staffId));

        order.setAssignedStaff(staff);
        return mapToOrderResponse(orderRepository.save(order));
    }

    private String generateOrderCode() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomNum = 1000 + new Random().nextInt(9000);
        return "FLW-" + datePart + "-" + randomNum;
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems() != null ? order.getItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .variantId(item.getVariant() != null ? item.getVariant().getId() : null)
                        .productName(item.getProductName())
                        .variantName(item.getVariantName())
                        .productSku(item.getProductSku())
                        .imageUrl(item.getImageUrl())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .totalPrice(item.getTotalPrice())
                        .deliveryDate(item.getDeliveryDate())
                        .deliveryTimeSlot(item.getDeliveryTimeSlot())
                        .cardMessage(item.getCardMessage())
                        .build()).toList() : List.of();

        return OrderResponse.builder()
                .id(order.getId())
                .orderCode(order.getOrderCode())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .recipientName(order.getRecipientName())
                .recipientPhone(order.getRecipientPhone())
                .province(order.getProvince())
                .district(order.getDistrict())
                .ward(order.getWard())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryDate(order.getDeliveryDate())
                .deliveryTimeSlot(order.getDeliveryTimeSlot())
                .senderName(order.getSenderName())
                .cardMessage(order.getCardMessage())
                .hideSenderName(order.getHideSenderName())
                .customerNote(order.getCustomerNote())
                .internalNote(order.getInternalNote())
                .subtotal(order.getSubtotal())
                .shippingFee(order.getShippingFee())
                .discountAmount(order.getDiscountAmount())
                .totalAmount(order.getTotalAmount())
                .couponCode(order.getCoupon() != null ? order.getCoupon().getCode() : null)
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .assignedStaffName(order.getAssignedStaff() != null ? order.getAssignedStaff().getFullName() : null)
                .createdAt(order.getCreatedAt())
                .completedAt(order.getCompletedAt())
                .items(itemResponses)
                .build();
    }
}
