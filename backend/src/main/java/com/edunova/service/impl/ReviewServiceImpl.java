package com.edunova.service.impl;

import com.edunova.dto.request.ReviewRequest;
import com.edunova.dto.response.ReviewResponse;
import com.edunova.entity.Course;
import com.edunova.entity.Review;
import com.edunova.entity.User;
import com.edunova.exception.ApiException;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.ReviewRepository;
import com.edunova.repository.UserRepository;
import com.edunova.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ReviewResponse addReview(ReviewRequest reviewRequest, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Course course = courseRepository.findById(reviewRequest.getCourseId())
                .orElseThrow(() -> new ApiException("Course not found"));

        Review review = Review.builder()
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .user(user)
                .course(course)
                .build();

        return mapToResponse(reviewRepository.save(review));
    }

    @Override
    public List<ReviewResponse> getReviewsByCourseId(Long courseId) {
        return reviewRepository.findByCourseId(courseId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .userName(review.getUser().getFullName())
                .userAvatar(review.getUser().getProfileImage())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
