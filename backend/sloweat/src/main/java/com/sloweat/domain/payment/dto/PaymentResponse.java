package com.sloweat.domain.payment.dto;

import com.sloweat.domain.payment.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private Integer paymentId;
    private Integer subscriptionId;
    private String impUid;
    private String merchantUid;
    private Integer amount;
    private String status;
    private String statusLabel;
    private String method;
    private String methodLabel;
    private LocalDateTime payDate;
    private String refundStatus;
    private String refundStatusLabel;
    private String refundReason;
    private LocalDateTime refundDate;
    private LocalDateTime createdAt;
    private String cardCompany;
    private String cardNumberMasked;

    public static PaymentResponse from(Payment payment) {
        return PaymentResponse.builder()
                .paymentId(payment.getPaymentId())
                .subscriptionId(payment.getSubscription().getSubscriptionId())
                .impUid(payment.getImpUid())
                .merchantUid(payment.getMerchantUid())
                .amount(payment.getAmount())
                .status(payment.getStatus().name())
                .statusLabel(payment.getStatus().getLabel())
                .method(payment.getMethod().name())
                .methodLabel(payment.getMethod().getLabel())
                .payDate(payment.getPayDate())
                .refundStatus(payment.getRefundStatus().name())
                .refundStatusLabel(payment.getRefundStatus().getLabel())
                .refundReason(payment.getRefundReason())
                .refundDate(payment.getRefundDate())
                .createdAt(payment.getCreatedAt())
                .cardCompany(payment.getCardCompany())
                .cardNumberMasked(payment.getCardNumberMasked())
                .build();
    }
}