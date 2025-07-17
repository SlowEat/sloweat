package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse;
import com.sloweat.domain.admin.service.AdminStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: 관리자 권한 체크 (PreAuthorize 적용 예정)
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminStatisticsController {
  private final AdminStatisticsService adminStatisticsService;

  @GetMapping("/statistics")
  public ResponseEntity<AdminStatisticsResponse> getStatistics() {
    AdminStatisticsResponse response = adminStatisticsService.getStatistics();
    return ResponseEntity.ok(response);
  }
}
