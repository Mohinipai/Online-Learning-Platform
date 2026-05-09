package com.edunova.service.impl;

import com.edunova.dto.response.EnrollmentResponse;
import com.edunova.entity.Course;
import com.edunova.entity.Enrollment;
import com.edunova.entity.User;
import com.edunova.exception.ApiException;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.EnrollmentRepository;
import com.edunova.repository.UserRepository;
import com.edunova.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public EnrollmentResponse enrollUser(Long courseId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ApiException("Course not found"));

        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
            throw new ApiException("User is already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .progressPercentage(0.0)
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        return mapToResponse(saved);
    }

    @Override
    public List<EnrollmentResponse> getMyCourses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        return enrollmentRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Double getCourseProgress(Long courseId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        return enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .map(Enrollment::getProgressPercentage)
                .orElseThrow(() -> new ApiException("User is not enrolled in this course"));
    }

    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        return EnrollmentResponse.builder()
                .id(enrollment.getId())
                .userId(enrollment.getUser().getId())
                .courseId(enrollment.getCourse().getId())
                .courseTitle(enrollment.getCourse().getTitle())
                .courseThumbnail(enrollment.getCourse().getThumbnail())
                .progressPercentage(enrollment.getProgressPercentage())
                .enrolledAt(enrollment.getEnrolledAt())
                .build();
    }
}
