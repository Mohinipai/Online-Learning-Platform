package com.edunova.service;

import com.edunova.dto.request.LessonRequest;
import com.edunova.dto.response.LessonResponse;

import java.util.List;

public interface LessonService {
    LessonResponse createLesson(LessonRequest lessonRequest);
    LessonResponse updateLesson(Long id, LessonRequest lessonRequest);
    void deleteLesson(Long id);
    List<LessonResponse> getLessonsByCourseId(Long courseId);
}
