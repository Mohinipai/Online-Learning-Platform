package com.edunova.controller;

import com.edunova.dto.request.ReviewRequest;
import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.ReviewResponse;
import com.edunova.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(@Valid @RequestBody ReviewRequest reviewRequest, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Review added successfully", reviewService.addReview(reviewRequest, authentication.getName())));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched successfully", reviewService.getReviewsByCourseId(courseId)));
    }
}
