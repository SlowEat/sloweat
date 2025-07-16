package com.sloweat.domain.admin.dto.payment;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class AdminPaymentResponse {

  private Integer id;
  private String nickname;
  private LocalDateTime payDate;
  private Integer amount;
  private String subscriptionPeriod; // 지속적으로 구독하고 있는 기간
  private String status;

  @QueryProjection
  public AdminPaymentResponse(Integer id, String nickname, LocalDateTime payDate, Integer amount,
      String subscriptionPeriod, String status) {
    this.id = id;
    this.nickname = nickname;
    this.payDate = payDate;
    this.amount = amount;
    this.subscriptionPeriod = subscriptionPeriod;
    this.status = status;
  }
}
