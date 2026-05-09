package com.edunova.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String difficultyLevel;
    private String duration;
    private String thumbnail;
    private Double price;
    private String instructorName;
    private Long instructorId;
    private LocalDateTime createdAt;
}
