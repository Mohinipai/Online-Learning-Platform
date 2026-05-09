package com.edunova.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsResponse {
    private long totalUsers;
    private long totalCourses;
    private long totalEnrollments;
    private double totalRevenue;
    private Map<String, Long> enrollmentStats; // e.g., Month -> Count
}
