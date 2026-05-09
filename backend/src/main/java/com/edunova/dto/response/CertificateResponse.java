package com.edunova.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertificateResponse {
    private String certificateCode;
    private String userName;
    private String courseTitle;
    private LocalDateTime issueDate;
}
