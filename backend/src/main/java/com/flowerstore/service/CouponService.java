package com.flowerstore.service;

import com.flowerstore.dto.request.CouponRequest;
import com.flowerstore.dto.response.CouponResponse;

import java.util.List;

public interface CouponService {
    CouponResponse validateCoupon(String code, Double orderSubtotal);
    List<CouponResponse> getAllCoupons();
    CouponResponse createCoupon(CouponRequest request);
    CouponResponse updateCoupon(Long id, CouponRequest request);
    void deleteCoupon(Long id);
}
