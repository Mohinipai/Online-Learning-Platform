package com.edunova.utils;

import com.edunova.entity.Course;
import com.edunova.entity.Lesson;
import com.edunova.entity.User;
import com.edunova.enums.Role;
import com.edunova.repository.CourseRepository;
import com.edunova.repository.LessonRepository;
import com.edunova.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        // Admin
        User admin = User.builder()
                .fullName("Admin User")
                .email("admin@edunova.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);

        // Instructor
        User instructor = User.builder()
                .fullName("Sarah Connor")
                .email("sarah@edunova.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.INSTRUCTOR)
                .profileImage("https://i.pravatar.cc/150?u=sarah")
                .build();
        userRepository.save(instructor);

        // Student
        User student = User.builder()
                .fullName("John Doe")
                .email("john@example.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.STUDENT)
                .build();
        userRepository.save(student);

        // Course
        Course course = Course.builder()
                .title("The Complete Full-Stack Java Bootcamp")
                .description("Master Java, Spring Boot, React, and build enterprise-scale applications from scratch.")
                .category("Development")
                .difficultyLevel("Intermediate")
                .duration("45h 30m")
                .thumbnail("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")
                .price(89.99)
                .instructor(instructor)
                .build();
        courseRepository.save(course);

        // Lessons
        Lesson lesson1 = Lesson.builder()
                .title("Introduction to Spring Boot")
                .videoUrl("https://www.youtube.com/embed/watch?v=dQw4w9WgXcQ")
                .content("Learn the basics of Spring Boot framework.")
                .lessonOrder(1)
                .course(course)
                .build();

        Lesson lesson2 = Lesson.builder()
                .title("Building REST APIs")
                .videoUrl("https://www.youtube.com/embed/watch?v=dQw4w9WgXcQ")
                .content("Build powerful REST APIs with Spring Web.")
                .lessonOrder(2)
                .course(course)
                .build();

        lessonRepository.saveAll(Arrays.asList(lesson1, lesson2));
    }
}
