package com.edunova.controller;

import com.edunova.dto.response.ApiResponse;
import com.edunova.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/complete/{lessonId}")
    public ResponseEntity<ApiResponse<Void>> completeLesson(@PathVariable Long lessonId, Authentication authentication) {
        progressService.completeLesson(lessonId, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Lesson marked as completed", null));
    }
}
