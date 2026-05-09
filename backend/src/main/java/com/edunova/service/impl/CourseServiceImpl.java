package com.edunova.service.impl;

import com.edunova.dto.request.CourseRequest;
import com.edunova.dto.response.CourseResponse;
import com.edunova.entity.Course;
import com.edunova.entity.User;
import com.edunova.exception.ApiException;
import com.edunova.mapper.CourseMapper;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.UserRepository;
import com.edunova.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseMapper courseMapper;

    @Override
    @Transactional
    public CourseResponse createCourse(CourseRequest courseRequest, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new ApiException("Instructor not found"));

        Course course = courseMapper.toEntity(courseRequest);
        course.setInstructor(instructor);

        return courseMapper.toResponse(courseRepository.save(course));
    }

    @Override
    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException("Course not found"));

        courseMapper.updateEntity(courseRequest, course);
        return courseMapper.toResponse(courseRepository.save(course));
    }

    @Override
    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ApiException("Course not found");
        }
        courseRepository.deleteById(id);
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(courseMapper::toResponse)
                .orElseThrow(() -> new ApiException("Course not found"));
    }

    @Override
    public Page<CourseResponse> getAllCourses(Pageable pageable) {
        return courseRepository.findAll(pageable).map(courseMapper::toResponse);
    }

    @Override
    public Page<CourseResponse> searchCourses(String query, Pageable pageable) {
        return courseRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query, pageable)
                .map(courseMapper::toResponse);
    }

    @Override
    public Page<CourseResponse> getCoursesByCategory(String category, Pageable pageable) {
        return courseRepository.findByCategoryContainingIgnoreCase(category, pageable)
                .map(courseMapper::toResponse);
    }
}
