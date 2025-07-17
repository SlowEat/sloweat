package com.sloweat.domain.subscription.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequest {
    private String customerUid;  // 빌링키 (아임포트에서 발급)
    private String impUid;       // 아임포트 결제 고유번호
    private Integer amount;      // 결제 금액
    private String orderName;    // 주문명
}