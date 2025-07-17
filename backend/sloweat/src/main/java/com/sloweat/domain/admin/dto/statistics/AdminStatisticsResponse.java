package com.sloweat.domain.admin.dto.statistics;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminStatisticsResponse {
  private Long totalSales;      // 총 매출
  private Long paidUserCount;   // 유료 회원 수
  private Long totalUserCount;  // 전체 회원 수

  private List<MonthlySales> monthlySales;      // 최근 6개월 매출
  private List<MonthlySignups> monthlySignups;  // 최근 6개월 가입 수

  @Getter
  @AllArgsConstructor
  public static class MonthlySales {
    private String month;
    private Long totalSales;
  }

  @Getter
  @AllArgsConstructor
  public static class MonthlySignups {
    private String month;
    private Long signupCount;
  }
}
