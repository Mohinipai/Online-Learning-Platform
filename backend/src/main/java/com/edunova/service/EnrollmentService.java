package com.edunova.service;

import com.edunova.dto.response.EnrollmentResponse;

import java.util.List;

public interface EnrollmentService {
    EnrollmentResponse enrollUser(Long courseId, String email);
    List<EnrollmentResponse> getMyCourses(String email);
    Double getCourseProgress(Long courseId, String email);
}
