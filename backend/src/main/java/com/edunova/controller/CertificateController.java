package com.edunova.controller;

import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.CertificateResponse;
import com.edunova.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping("/{courseId}")
    public ResponseEntity<ApiResponse<CertificateResponse>> getCertificate(@PathVariable Long courseId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Certificate fetched successfully", certificateService.getCertificate(courseId, authentication.getName())));
    }
}
