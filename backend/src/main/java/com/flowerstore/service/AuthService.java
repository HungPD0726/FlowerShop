package com.flowerstore.service;

import com.flowerstore.dto.request.ChangePasswordRequest;
import com.flowerstore.dto.request.LoginRequest;
import com.flowerstore.dto.request.RefreshTokenRequest;
import com.flowerstore.dto.request.RegisterRequest;
import com.flowerstore.dto.response.JwtResponse;
import com.flowerstore.dto.response.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);
    JwtResponse login(LoginRequest request);
    JwtResponse refreshToken(RefreshTokenRequest request);
    void logout(String email);
    UserResponse getCurrentUser(String email);
    void changePassword(String email, ChangePasswordRequest request);
}
