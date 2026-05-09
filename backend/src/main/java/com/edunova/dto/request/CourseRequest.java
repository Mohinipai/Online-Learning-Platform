package com.edunova.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CourseRequest {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String category;

    @NotBlank
    private String difficultyLevel;

    private String duration;
    private String thumbnail;

    @NotNull
    private Double price;
}
