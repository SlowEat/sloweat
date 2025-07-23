package com.sloweat.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    private String impUid;          // 아임포트 결제 고유번호
    private String merchantUid;     // 가맹점 주문번호
    private String refundReason;    // 환불 사유
    private Integer refundAmount;   // 환불 금액
}