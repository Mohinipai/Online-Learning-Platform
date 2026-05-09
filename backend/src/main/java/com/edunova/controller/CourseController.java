package com.edunova.controller;

import com.edunova.dto.request.CourseRequest;
import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.CourseResponse;
import com.edunova.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getAllCourses(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Courses fetched successfully", courseService.getAllCourses(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Course fetched successfully", courseService.getCourseById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(@Valid @RequestBody CourseRequest courseRequest, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Course created successfully", courseService.createCourse(courseRequest, authentication.getName())));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", courseService.updateCourse(id, courseRequest)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> searchCourses(@RequestParam String query, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Search results", courseService.searchCourses(query, pageable)));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getCoursesByCategory(@PathVariable String category, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Category results", courseService.getCoursesByCategory(category, pageable)));
    }
}
