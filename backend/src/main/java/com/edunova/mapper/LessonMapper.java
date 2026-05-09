package com.edunova.mapper;

import com.edunova.dto.request.LessonRequest;
import com.edunova.dto.response.LessonResponse;
import com.edunova.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    @Mapping(target = "courseId", source = "course.id")
    LessonResponse toResponse(Lesson lesson);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    Lesson toEntity(LessonRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    void updateEntity(LessonRequest request, @MappingTarget Lesson lesson);
}
