package com.edunova.service.impl;

import com.edunova.dto.response.CertificateResponse;
import com.edunova.entity.Certificate;
import com.edunova.entity.Course;
import com.edunova.entity.Enrollment;
import com.edunova.entity.User;
import com.edunova.exception.ApiException;
import com.edunova.repository.CertificateRepository;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.EnrollmentRepository;
import com.edunova.repository.UserRepository;
import com.edunova.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    @Transactional
    public CertificateResponse getCertificate(Long courseId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ApiException("Course not found"));

        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new ApiException("User not enrolled in this course"));

        if (enrollment.getProgressPercentage() < 100.0) {
            throw new ApiException("Course not yet completed. Progress: " + enrollment.getProgressPercentage() + "%");
        }

        Certificate certificate = certificateRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseGet(() -> {
                    Certificate newCert = Certificate.builder()
                            .user(user)
                            .course(course)
                            .certificateCode("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                            .build();
                    return certificateRepository.save(newCert);
                });

        return CertificateResponse.builder()
                .certificateCode(certificate.getCertificateCode())
                .userName(user.getFullName())
                .courseTitle(course.getTitle())
                .issueDate(certificate.getIssueDate())
                .build();
    }
}
