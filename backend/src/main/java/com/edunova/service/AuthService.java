package com.edunova.service;

import com.edunova.dto.request.LoginRequest;
import com.edunova.dto.request.RegisterRequest;
import com.edunova.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);
}
