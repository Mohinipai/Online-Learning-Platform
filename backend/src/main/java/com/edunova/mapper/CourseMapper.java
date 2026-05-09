package com.edunova.mapper;

import com.edunova.dto.request.CourseRequest;
import com.edunova.dto.response.CourseResponse;
import com.edunova.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    @Mapping(target = "instructorName", source = "instructor.fullName")
    @Mapping(target = "instructorId", source = "instructor.id")
    CourseResponse toResponse(Course course);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "lessons", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Course toEntity(CourseRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "lessons", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntity(CourseRequest request, @MappingTarget Course course);
}
