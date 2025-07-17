package com.sloweat.domain.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sloweat.domain.payment.dto.PaymentRequest;
import com.sloweat.domain.payment.dto.PaymentResponse;
import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final IamportService iamportService;

    /**
     * 결제 내역 상세 조회
     */
    public PaymentResponse getPayment(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        return PaymentResponse.from(payment);
    }



    /**
     * 사용자별 결제 내역 조회
     */
    public List<PaymentResponse> getPaymentsByUser(Integer userId) {
        List<Payment> payments = paymentRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return payments.stream()
                .map(PaymentResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 결제 환불 요청
     */
    @Transactional
    public PaymentResponse requestRefund(Integer paymentId, PaymentRequest request) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // 이미 환불된 결제인지 확인
        if (payment.getStatus() == Payment.Status.REFUND) {
            throw new RuntimeException("Payment already refunded");
        }

        // 환불 요청이 이미 승인된 경우
        if (payment.getRefundStatus() == Payment.RefundStatus.APPROVE) {
            throw new RuntimeException("Refund already approved");
        }

        // 환불 요청 상태로 변경
        payment.setRefundStatus(Payment.RefundStatus.REQUEST);
        payment.setRefundReason(request.getRefundReason());
        payment = paymentRepository.save(payment);

        return PaymentResponse.from(payment);
    }

    /**
     * 환불 승인 처리 (관리자용)
     */
    @Transactional
    public PaymentResponse approveRefund(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (payment.getRefundStatus() != Payment.RefundStatus.REQUEST) {
            throw new RuntimeException("No refund request found");
        }

        // 아임포트 환불 요청
        JsonNode cancelResponse = iamportService.cancelPayment(
                payment.getImpUid(),
                payment.getAmount(),
                payment.getRefundReason()
        );

        if (cancelResponse.get("code").asInt() != 0) {
            throw new RuntimeException("Refund failed: " + cancelResponse.get("message").asText());
        }

        // 환불 승인 처리
        payment.setStatus(Payment.Status.REFUND);
        payment.setRefundStatus(Payment.RefundStatus.APPROVE);
        payment.setRefundDate(LocalDateTime.now());
        payment = paymentRepository.save(payment);

        return PaymentResponse.from(payment);
    }

    /**
     * 환불 거부 처리 (관리자용)
     */
    @Transactional
    public PaymentResponse rejectRefund(Integer paymentId, String reason) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (payment.getRefundStatus() != Payment.RefundStatus.REQUEST) {
            throw new RuntimeException("No refund request found");
        }

        // 환불 거부 처리
        payment.setRefundStatus(Payment.RefundStatus.REJECT);
        payment.setRefundReason(reason);
        payment = paymentRepository.save(payment);

        return PaymentResponse.from(payment);
    }




}