package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse;
import com.sloweat.domain.admin.repository.statistics.AdminStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminStatisticsService {
  private final AdminStatisticsRepository adminStatisticsRepository;

  // repository 결과를 하나로 모아서 하나의 dto로 통합하여 전달
  public AdminStatisticsResponse getStatistics(){
    return new AdminStatisticsResponse(
        adminStatisticsRepository.getTotalSales(),
        adminStatisticsRepository.getPaidUserCount(),
        adminStatisticsRepository.getTotalUserCount(),
        adminStatisticsRepository.getMonthlySales(),
        adminStatisticsRepository.getMonthlySignups()
    );
  }
}
