package com.edunova.service;

import com.edunova.dto.request.ReviewRequest;
import com.edunova.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    ReviewResponse addReview(ReviewRequest reviewRequest, String email);
    List<ReviewResponse> getReviewsByCourseId(Long courseId);
}
