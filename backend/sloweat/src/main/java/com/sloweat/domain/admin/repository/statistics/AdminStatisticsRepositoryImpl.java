package com.sloweat.domain.admin.repository.statistics;

import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse.MonthlySales;
import com.sloweat.domain.admin.dto.statistics.AdminStatisticsResponse.MonthlySignups;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

// date_format, interval, limit 같은 db 종속 함수를 사용하기 위해 NavtiveQuery  이용
// QueryDsl이나 JPQL 쓸 경우 오히려 복잡
@Repository
public class AdminStatisticsRepositoryImpl implements  AdminStatisticsRepository {

  @PersistenceContext
  private EntityManager em;   // SQL 직접 실행, DTO로 결과 매핑, 복잡한 통계 쿼리 실행

  @Override
  public Long getTotalSales() {
    // coalesce : 인자로 받은 값들 중에서 null이 아닌 첫 번째 값을 반환
    // 결제 상태가 PAID인 결제 금액의 총합을 구함. 결제가 없을 경우 0 반환.
    String sql = "select coalesce(sum(p.amount), 0)\n"
        + "from payment p\n"
        + "where p.status = 'PAID'";
    return ((Number) em.createNativeQuery(sql).getSingleResult()).longValue();
  }

  @Override
  public Long getPaidUserCount() {
    // 구독 테이블에서 구독 상태가 'ACTIVE'인 유저 수 카운트
    String sql = "select count(*)\n"
        + "from subscription s\n"
        + "where s.status='ACTIVE'";
    return ((Number) em.createNativeQuery(sql).getSingleResult()).longValue();
  }

  @Override
  public Long getTotalUserCount() {
    // 전체 사용자 수 카운트
    String sql = "select count(*)\n"
        + "from user";
    return ((Number) em.createNativeQuery(sql).getSingleResult()).longValue();
  }

  @Override
  public List<MonthlySales> getMonthlySales() {
    // 최근 6개월간 결제된 금액을 월별로 집계하여 가장 최근부터 6개월치 가져옴. 없으면 0 가져옴.
    // 이때, 현재 월은 포함X. 현재 2025년 7월이면 7월 제외하고 2025년 1월 ~ 6월 가져옴.
    String sql = "with recursive months as(\n"
        + "\tselect date_format(date_sub(curdate(), interval 6 month), '%Y-%m') as month\n"
        + "    union all\n"
        + "    select date_format(date_add(str_to_date(concat(month, '-01'), '%Y-%m-%d'), interval 1 month), '%Y-%m')\n"
        + "\tfrom months\n"
        + "    where month < date_format(date_sub(curdate(), interval 1 month), '%Y-%m')\n"
        + ")\n"
        + "select m.month, coalesce(sum(p.amount), 0) as totalSales\n"
        + "from months m\n"
        + "left join payment p\n"
        + "\ton date_format(p.pay_date, '%Y-%m') = m.month\n"
        + "    and p.status = 'PAID'\n"
        + "group by m.month\n"
        + "order by m.month desc";

    List<Object[]> resultList = em.createNativeQuery(sql).getResultList();

    return resultList.stream()
        .map(row -> new MonthlySales(
            (String) row[0],
            ((Number) row[1]).longValue()
        ))
        .toList();
  }

  @Override
  public List<MonthlySignups> getMonthlySignups() {
    // 최근 6개월간 사용자 가입 수를 월별로 집계하여 가장 최근부터 6개월치 가져옴. 없으면 0 가져옴.
    // 이때, 현재 월은 포함X. 현재 2025년 7월이면 7월 제외하고 2025년 1월 ~ 6월 가져옴.
    String sql = "with recursive months as(\n"
        + "\tselect date_format(date_sub(curdate(), interval 6 month), '%Y-%m') as month\n"
        + "    union all\n"
        + "    select date_format(date_add(str_to_date(concat(month, '-01'), '%Y-%m-%d'), interval 1 month), '%Y-%m')\n"
        + "\tfrom months\n"
        + "    where month < date_format(date_sub(curdate(), interval 1 month), '%Y-%m')\n"
        + ")\n"
        + "select m.month, coalesce(count(u.user_id), 0) as signupCount\n"
        + "from months m\n"
        + "left join user u\n"
        + "\ton date_format(u.created_at, '%Y-%m') = m.month\n"
        + "group by m.month\n"
        + "order by m.month desc";

    List<Object[]> resultList = em.createNativeQuery(sql).getResultList();

    return resultList.stream()
        .map(row -> new MonthlySignups(
            (String) row[0],
            ((Number) row[1]).longValue()
        ))
        .toList();
  }
}
