package com.edunova.controller;

import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.EnrollmentResponse;
import com.edunova.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/{courseId}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> enrollUser(@PathVariable Long courseId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Enrolled successfully", enrollmentService.enrollUser(courseId, authentication.getName())));
    }

    @GetMapping("/my-courses")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getMyCourses(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("My courses fetched successfully", enrollmentService.getMyCourses(authentication.getName())));
    }

    @GetMapping("/progress/{courseId}")
    public ResponseEntity<ApiResponse<Double>> getCourseProgress(@PathVariable Long courseId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Course progress", enrollmentService.getCourseProgress(courseId, authentication.getName())));
    }
}
