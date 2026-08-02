package com.flowerstore.service.impl;

import com.flowerstore.dto.request.AddressRequest;
import com.flowerstore.dto.response.AddressResponse;
import com.flowerstore.entity.Address;
import com.flowerstore.entity.User;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.repository.AddressRepository;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AddressResponse> getMyAddresses(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));
        return addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(user.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public AddressResponse createAddress(String userEmail, AddressRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            unsetPreviousDefault(user.getId());
        }

        Address address = Address.builder()
                .user(user)
                .recipientName(request.getRecipientName())
                .phone(request.getPhone())
                .province(request.getProvince())
                .district(request.getDistrict())
                .ward(request.getWard())
                .detailAddress(request.getDetailAddress())
                .isDefault(Boolean.TRUE.equals(request.getIsDefault()))
                .build();

        return mapToResponse(addressRepository.save(address));
    }

    @Override
    @Transactional
    public AddressResponse updateAddress(String userEmail, Long id, AddressRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));

        Address address = addressRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ id: " + id));

        if (Boolean.TRUE.equals(request.getIsDefault()) && !Boolean.TRUE.equals(address.getIsDefault())) {
            unsetPreviousDefault(user.getId());
        }

        address.setRecipientName(request.getRecipientName());
        address.setPhone(request.getPhone());
        address.setProvince(request.getProvince());
        address.setDistrict(request.getDistrict());
        address.setWard(request.getWard());
        address.setDetailAddress(request.getDetailAddress());
        address.setIsDefault(Boolean.TRUE.equals(request.getIsDefault()));

        return mapToResponse(addressRepository.save(address));
    }

    @Override
    @Transactional
    public void deleteAddress(String userEmail, Long id) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));
        Address address = addressRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ id: " + id));
        addressRepository.delete(address);
    }

    @Override
    @Transactional
    public AddressResponse setDefaultAddress(String userEmail, Long id) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));
        Address address = addressRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ id: " + id));

        unsetPreviousDefault(user.getId());
        address.setIsDefault(true);
        return mapToResponse(addressRepository.save(address));
    }

    private void unsetPreviousDefault(Long userId) {
        List<Address> addresses = addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(userId);
        for (Address addr : addresses) {
            if (Boolean.TRUE.equals(addr.getIsDefault())) {
                addr.setIsDefault(false);
                addressRepository.save(addr);
            }
        }
    }

    private AddressResponse mapToResponse(Address address) {
        return AddressResponse.builder()
                .id(address.getId())
                .recipientName(address.getRecipientName())
                .phone(address.getPhone())
                .province(address.getProvince())
                .district(address.getDistrict())
                .ward(address.getWard())
                .detailAddress(address.getDetailAddress())
                .isDefault(address.getIsDefault())
                .build();
    }
}
