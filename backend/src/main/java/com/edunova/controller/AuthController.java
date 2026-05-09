package com.edunova.controller;

import com.edunova.dto.request.LoginRequest;
import com.edunova.dto.request.RegisterRequest;
import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.AuthResponse;
import com.edunova.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", authService.register(registerRequest)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(ApiResponse.success("Login successful", authService.login(loginRequest)));
    }
}
