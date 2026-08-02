package com.flowerstore.service.impl;

import com.flowerstore.dto.request.CouponRequest;
import com.flowerstore.dto.response.CouponResponse;
import com.flowerstore.entity.Coupon;
import com.flowerstore.exception.BusinessException;
import com.flowerstore.exception.DuplicateResourceException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.CouponRepository;
import com.flowerstore.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Override
    @Transactional(readOnly = true)
    public CouponResponse validateCoupon(String code, Double orderSubtotal) {
        Coupon coupon = couponRepository.findByCode(code.trim().toUpperCase())
                .orElseThrow(() -> new BusinessException("Mã giảm giá không hợp lệ"));

        if (!Boolean.TRUE.equals(coupon.getIsActive())) {
            throw new BusinessException("Mã giảm giá đã ngừng kích hoạt");
        }
        if (coupon.getStartDate().isAfter(LocalDateTime.now())) {
            throw new BusinessException("Mã giảm giá chưa đến thời gian áp dụng");
        }
        if (coupon.getEndDate().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Mã giảm giá đã hết hạn sử dụng");
        }
        if (coupon.getUsedCount() >= coupon.getUsageLimit()) {
            throw new BusinessException("Mã giảm giá đã hết lượt sử dụng");
        }
        if (orderSubtotal != null && BigDecimal.valueOf(orderSubtotal).compareTo(coupon.getMinOrderAmount()) < 0) {
            throw new BusinessException("Đơn hàng chưa đạt giá trị tối thiểu " + coupon.getMinOrderAmount() + "đ để sử dụng mã này");
        }

        return mapToResponse(coupon);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CouponResponse> getAllCoupons() {
        return couponRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional
    public CouponResponse createCoupon(CouponRequest request) {
        String code = request.getCode().trim().toUpperCase();
        if (Boolean.TRUE.equals(couponRepository.existsByCode(code))) {
            throw new DuplicateResourceException("Mã coupon đã tồn tại: " + code);
        }

        Coupon coupon = Coupon.builder()
                .code(code)
                .title(request.getTitle())
                .discountType(request.getDiscountType())
                .discountValue(request.getDiscountValue())
                .minOrderAmount(request.getMinOrderAmount() != null ? request.getMinOrderAmount() : BigDecimal.ZERO)
                .maxDiscountAmount(request.getMaxDiscountAmount())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .usageLimit(request.getUsageLimit() != null ? request.getUsageLimit() : 100)
                .usagePerUser(request.getUsagePerUser() != null ? request.getUsagePerUser() : 1)
                .usedCount(0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        return mapToResponse(couponRepository.save(coupon));
    }

    @Override
    @Transactional
    public CouponResponse updateCoupon(Long id, CouponRequest request) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy coupon id: " + id));

        coupon.setTitle(request.getTitle());
        coupon.setDiscountType(request.getDiscountType());
        coupon.setDiscountValue(request.getDiscountValue());
        if (request.getMinOrderAmount() != null) coupon.setMinOrderAmount(request.getMinOrderAmount());
        coupon.setMaxDiscountAmount(request.getMaxDiscountAmount());
        coupon.setStartDate(request.getStartDate());
        coupon.setEndDate(request.getEndDate());
        if (request.getUsageLimit() != null) coupon.setUsageLimit(request.getUsageLimit());
        if (request.getUsagePerUser() != null) coupon.setUsagePerUser(request.getUsagePerUser());
        if (request.getIsActive() != null) coupon.setIsActive(request.getIsActive());

        return mapToResponse(couponRepository.save(coupon));
    }

    @Override
    @Transactional
    public void deleteCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy coupon id: " + id));
        couponRepository.delete(coupon);
    }

    private CouponResponse mapToResponse(Coupon coupon) {
        return CouponResponse.builder()
                .id(coupon.getId())
                .code(coupon.getCode())
                .title(coupon.getTitle())
                .discountType(coupon.getDiscountType())
                .discountValue(coupon.getDiscountValue())
                .minOrderAmount(coupon.getMinOrderAmount())
                .maxDiscountAmount(coupon.getMaxDiscountAmount())
                .startDate(coupon.getStartDate())
                .endDate(coupon.getEndDate())
                .usageLimit(coupon.getUsageLimit())
                .usagePerUser(coupon.getUsagePerUser())
                .usedCount(coupon.getUsedCount())
                .isActive(coupon.getIsActive())
                .build();
    }
}
