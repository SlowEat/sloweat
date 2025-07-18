package com.sloweat.domain.admin.repository.payment;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.admin.dto.payment.AdminPaymentRequest;
import com.sloweat.domain.admin.dto.payment.AdminPaymentResponse;
import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.payment.entity.QPayment;
import com.sloweat.domain.subscription.entity.QSubscription;
import com.sloweat.domain.subscription.entity.Subscription.Status;
import com.sloweat.domain.user.entity.QUser;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class AdminPaymentRepositoryCustomImpl implements AdminPaymentRepositoryCustom {
  private final JPAQueryFactory queryFactory;

  public AdminPaymentRepositoryCustomImpl(JPAQueryFactory queryFactory) {
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<AdminPaymentResponse> getPayments(AdminPaymentRequest request, Pageable pageable) {
    QUser user = QUser.user;
    QSubscription  subscription = QSubscription.subscription;
    QPayment payment = QPayment.payment;

    BooleanBuilder where = new BooleanBuilder();
    where.and(subscription.status.eq(Status.ACTIVE)); // 현재 구독중인 사용자만 조회
    where.and(payment.status.eq(Payment.Status.PAID));  // 성공적으로 결제된 내역만 조회

    // 닉네임 검색
    if (request.getNickname() != null && !request.getNickname().isBlank()) {
      where.and(user.nickname.containsIgnoreCase(request.getNickname()));
    }

    // 결제 로그 조회
    List<Tuple> result = queryFactory // Querydsl로 Tuple로 모든 결제 로그를 가져옴
        .select(
            subscription.subscriptionId,
            user.userId,
            user.nickname,
            payment.payDate,
            payment.amount,
            payment.refundStatus
        )
        .from(payment)
        .join(payment.subscription, subscription)
        .join(subscription.user, user)
        .where(where) // 위에서 설정한 구독 + 결제 완료 사용자
        .orderBy(user.userId.asc(), payment.payDate.asc())
        .fetch();

    // userId 기준으로 결제 월 모으기
    Map<Integer, List<LocalDate>> payMap = new HashMap<>();

    for (Tuple t : result) {
      Integer userId = t.get(user.userId);
      LocalDate payDate = t.get(payment.payDate).toLocalDate().withDayOfMonth(1);
      payMap.computeIfAbsent(userId, k -> new ArrayList<>()).add(payDate);
    }

    Map<Integer, Integer> continuousMonthsMap = new HashMap<>();

    // user별 지속 개월 수 계산
    for (Map.Entry<Integer, List<LocalDate>> entry : payMap.entrySet()) {
      // 결제일 오름차순 정렬
      List<LocalDate> sorted = entry.getValue().stream().distinct().sorted().toList();
      int count = 1;
      // 가장 최신 달부터 거꾸로 탐색
      for (int i = sorted.size() - 1; i > 0; i--) {
        if (sorted.get(i - 1).plusMonths(1).equals(sorted.get(i))) {
          count++;
        } else break;
      }
      continuousMonthsMap.put(entry.getKey(), count);
    }

    // 최신 결제 정보 (유저별 1건만 유지. 제일 최신 정보)
    Map<Integer, Tuple> latestPaymentMap = result.stream()
        .collect(Collectors.toMap(
            t -> t.get(user.userId),  // key: userId
            t -> t,                   // value: Tuple 객체 자체
            (oldVal, newVal) -> newVal  // 중복 키 발생 시 user 기준 최신 값 유지
        ));

    // DTO 변환 + 상태 필터링 여기에서 처리
    List<AdminPaymentResponse> responses = latestPaymentMap.entrySet().stream()
        .map(entry -> {
          Tuple t = entry.getValue();
          Integer uid = entry.getKey();

          Payment.RefundStatus refundStatus = t.get(payment.refundStatus);
          String status = (refundStatus != null) ? refundStatus.name() : "PAID";

          return new AdminPaymentResponse(
              t.get(subscription.subscriptionId),
              t.get(user.nickname),
              t.get(payment.payDate),
              t.get(payment.amount),
              continuousMonthsMap.getOrDefault(uid, 1) + "개월",
              status
          );
        })
        .filter(dto -> {
          String filter = request.getStatus();
          if(filter == null || filter.isBlank()) return true;
          return dto.getStatus().equals(filter);
        }).toList();

    int start = (int) pageable.getOffset();
    int end = Math.min(start + pageable.getPageSize(), responses.size());

    List<AdminPaymentResponse> pageList = responses.subList(start, end);
    return new PageImpl<>(pageList, pageable, responses.size());
  }

  @Override
  public Optional<Payment> findLatestPayment(Integer subscriptionId) {
    QPayment payment = QPayment.payment;

    return Optional.ofNullable(
        queryFactory
            .selectFrom(payment)
            .where(payment.subscription.subscriptionId.eq(subscriptionId))
            .orderBy(payment.payDate.desc())
            .fetchFirst()
    );
  }
}
