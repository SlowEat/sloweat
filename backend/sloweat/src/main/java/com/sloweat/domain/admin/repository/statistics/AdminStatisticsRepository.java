package com.sloweat.domain.admin.repository.statistics;

import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse.MonthlySales;
import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse.MonthlySignups;
import java.util.List;

public interface AdminStatisticsRepository {
  Long getTotalSales();
  Long getPaidUserCount();
  Long getTotalUserCount();
  List<MonthlySales> getMonthlySales();
  List<MonthlySignups> getMonthlySignups();
}