package com.edunova.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LessonRequest {
    @NotBlank
    private String title;

    private String videoUrl;
    private String content;

    @NotNull
    private Integer lessonOrder;

    @NotNull
    private Long courseId;
}
