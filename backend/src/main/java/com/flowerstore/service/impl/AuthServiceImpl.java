package com.flowerstore.service.impl;

import com.flowerstore.dto.request.ChangePasswordRequest;
import com.flowerstore.dto.request.LoginRequest;
import com.flowerstore.dto.request.RefreshTokenRequest;
import com.flowerstore.dto.request.RegisterRequest;
import com.flowerstore.dto.response.JwtResponse;
import com.flowerstore.dto.response.UserResponse;
import com.flowerstore.entity.RefreshToken;
import com.flowerstore.entity.Role;
import com.flowerstore.entity.User;
import com.flowerstore.exception.BusinessException;
import com.flowerstore.exception.DuplicateResourceException;
import com.flowerstore.exception.ResourceNotFoundException;
import com.flowerstore.exception.UnauthorizedException;
import com.flowerstore.repository.RefreshTokenRepository;
import com.flowerstore.repository.RoleRepository;
import com.flowerstore.repository.UserRepository;
import com.flowerstore.security.JwtTokenProvider;
import com.flowerstore.security.UserDetailsImpl;
import com.flowerstore.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(request.getEmail()))) {
            throw new DuplicateResourceException("Email này đã được đăng ký trên hệ thống");
        }

        Role customerRole = roleRepository.findByName("ROLE_CUSTOMER")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_CUSTOMER").description("Khách hàng").build()));

        Set<Role> roles = new HashSet<>();
        roles.add(customerRole);

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .emailVerified(false)
                .roles(roles)
                .build();

        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    @Override
    @Transactional
    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtTokenProvider.generateToken(authentication);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        User user = userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        // Delete old refresh tokens and create new
        refreshTokenRepository.deleteByUser(user);
        String refreshTokenStr = UUID.randomUUID().toString();
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(refreshTokenStr)
                .expiryDate(LocalDateTime.now().plusNanos(refreshExpirationMs * 1_000_000))
                .revoked(false)
                .build();
        refreshTokenRepository.save(refreshToken);

        return JwtResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshTokenStr)
                .tokenType("Bearer")
                .id(userDetails.getId())
                .fullName(userDetails.getFullName())
                .email(userDetails.getEmail())
                .roles(roles)
                .build();
    }

    @Override
    @Transactional
    public JwtResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new UnauthorizedException("Refresh token không tồn tại"));

        if (Boolean.TRUE.equals(refreshToken.getRevoked()) || refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new UnauthorizedException("Refresh token đã hết hạn hoặc bị thu hồi. Vui lòng đăng nhập lại");
        }

        User user = refreshToken.getUser();
        String newAccessToken = jwtTokenProvider.generateTokenFromUsername(user.getEmail());

        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return JwtResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .roles(roles)
                .build();
    }

    @Override
    @Transactional
    public void logout(String email) {
        userRepository.findByEmail(email).ifPresent(refreshTokenRepository::deleteByUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin tài khoản"));
        return mapToUserResponse(user);
    }

    @Override
    @Transactional
    public void changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new BusinessException("Mật khẩu hiện tại không đúng");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private UserResponse mapToUserResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatarUrl(user.getAvatarUrl())
                .isActive(user.getIsActive())
                .emailVerified(user.getEmailVerified())
                .roles(roles)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
