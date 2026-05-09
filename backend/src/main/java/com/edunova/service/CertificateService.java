package com.edunova.service;

import com.edunova.dto.response.CertificateResponse;

public interface CertificateService {
    CertificateResponse getCertificate(Long courseId, String email);
}
