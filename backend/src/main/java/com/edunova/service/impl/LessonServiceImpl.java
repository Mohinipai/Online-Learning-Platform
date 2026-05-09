package com.edunova.service.impl;

import com.edunova.dto.request.LessonRequest;
import com.edunova.dto.response.LessonResponse;
import com.edunova.entity.Course;
import com.edunova.entity.Lesson;
import com.edunova.exception.ApiException;
import com.edunova.mapper.LessonMapper;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.LessonRepository;
import com.edunova.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final LessonMapper lessonMapper;

    @Override
    @Transactional
    public LessonResponse createLesson(LessonRequest lessonRequest) {
        Course course = courseRepository.findById(lessonRequest.getCourseId())
                .orElseThrow(() -> new ApiException("Course not found"));

        Lesson lesson = lessonMapper.toEntity(lessonRequest);
        lesson.setCourse(course);

        return lessonMapper.toResponse(lessonRepository.save(lesson));
    }

    @Override
    @Transactional
    public LessonResponse updateLesson(Long id, LessonRequest lessonRequest) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ApiException("Lesson not found"));

        lessonMapper.updateEntity(lessonRequest, lesson);
        return lessonMapper.toResponse(lessonRepository.save(lesson));
    }

    @Override
    @Transactional
    public void deleteLesson(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new ApiException("Lesson not found");
        }
        lessonRepository.deleteById(id);
    }

    @Override
    public List<LessonResponse> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseIdOrderByLessonOrderAsc(courseId).stream()
                .map(lessonMapper::toResponse)
                .collect(Collectors.toList());
    }
}
