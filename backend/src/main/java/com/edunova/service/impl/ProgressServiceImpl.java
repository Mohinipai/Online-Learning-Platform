package com.edunova.service.impl;

import com.edunova.entity.*;
import com.edunova.exception.ApiException;
import com.edunova.repository.*;
import com.edunova.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {

    private final ProgressRepository progressRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    @Transactional
    public void completeLesson(Long lessonId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ApiException("Lesson not found"));

        Progress progress = progressRepository.findByUserIdAndLessonId(user.getId(), lessonId)
                .orElse(Progress.builder()
                        .user(user)
                        .lesson(lesson)
                        .build());

        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        progressRepository.save(progress);

        updateCourseProgress(user, lesson.getCourse());
    }

    private void updateCourseProgress(User user, Course course) {
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), course.getId())
                .orElseThrow(() -> new ApiException("User not enrolled in this course"));

        long totalLessons = course.getLessons().size();
        if (totalLessons == 0) return;

        long completedLessons = progressRepository.countByUserIdAndLessonCourseIdAndCompletedTrue(user.getId(), course.getId());

        double percentage = (double) completedLessons / totalLessons * 100;
        enrollment.setProgressPercentage(percentage);
        enrollmentRepository.save(enrollment);
    }
}
