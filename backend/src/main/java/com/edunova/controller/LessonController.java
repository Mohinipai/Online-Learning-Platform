package com.edunova.controller;

import com.edunova.dto.request.LessonRequest;
import com.edunova.dto.response.ApiResponse;
import com.edunova.dto.response.LessonResponse;
import com.edunova.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getLessonsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.success("Lessons fetched successfully", lessonService.getLessonsByCourseId(courseId)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<LessonResponse>> createLesson(@Valid @RequestBody LessonRequest lessonRequest) {
        return ResponseEntity.ok(ApiResponse.success("Lesson created successfully", lessonService.createLesson(lessonRequest)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(@PathVariable Long id, @Valid @RequestBody LessonRequest lessonRequest) {
        return ResponseEntity.ok(ApiResponse.success("Lesson updated successfully", lessonService.updateLesson(id, lessonRequest)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(ApiResponse.success("Lesson deleted successfully", null));
    }
}
