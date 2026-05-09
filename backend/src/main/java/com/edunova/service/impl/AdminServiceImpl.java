package com.edunova.service.impl;

import com.edunova.dto.response.AdminStatsResponse;
import com.edunova.entity.Course;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.EnrollmentRepository;
import com.edunova.repository.UserRepository;
import com.edunova.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    public AdminStatsResponse getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalCourses = courseRepository.count();
        long totalEnrollments = enrollmentRepository.count();

        double totalRevenue = courseRepository.findAll().stream()
                .mapToDouble(Course::getPrice)
                .sum(); // This is a simple sum, real revenue would track per enrollment price

        return AdminStatsResponse.builder()
                .totalUsers(totalUsers)
                .totalCourses(totalCourses)
                .totalEnrollments(totalEnrollments)
                .totalRevenue(totalRevenue)
                .enrollmentStats(new HashMap<>()) // Placeholder
                .build();
    }
}
