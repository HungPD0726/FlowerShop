package com.flowerstore.service;

import com.flowerstore.dto.request.AddressRequest;
import com.flowerstore.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {
    List<AddressResponse> getMyAddresses(String userEmail);
    AddressResponse createAddress(String userEmail, AddressRequest request);
    AddressResponse updateAddress(String userEmail, Long id, AddressRequest request);
    void deleteAddress(String userEmail, Long id);
    AddressResponse setDefaultAddress(String userEmail, Long id);
}
