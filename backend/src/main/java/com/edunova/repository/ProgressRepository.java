package com.edunova.repository;

import com.edunova.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUserIdAndLessonCourseId(Long userId, Long courseId);
    Optional<Progress> findByUserIdAndLessonId(Long userId, Long lessonId);
    long countByUserIdAndLessonCourseIdAndCompletedTrue(Long userId, Long courseId);
}
