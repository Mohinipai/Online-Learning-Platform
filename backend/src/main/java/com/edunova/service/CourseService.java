package com.edunova.service;

import com.edunova.dto.request.CourseRequest;
import com.edunova.dto.response.CourseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    CourseResponse createCourse(CourseRequest courseRequest, String instructorEmail);
    CourseResponse updateCourse(Long id, CourseRequest courseRequest);
    void deleteCourse(Long id);
    CourseResponse getCourseById(Long id);
    Page<CourseResponse> getAllCourses(Pageable pageable);
    Page<CourseResponse> searchCourses(String query, Pageable pageable);
    Page<CourseResponse> getCoursesByCategory(String category, Pageable pageable);
}
