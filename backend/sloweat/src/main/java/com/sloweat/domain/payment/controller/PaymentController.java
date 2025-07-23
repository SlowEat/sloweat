package com.sloweat.domain.payment.controller;

import com.sloweat.domain.payment.dto.PaymentRequest;
import com.sloweat.domain.payment.dto.PaymentResponse;
import com.sloweat.domain.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// 임시로 payment로 넣어놓았습니다 맞게 수정하시면 될 것 같습니다
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * 결제 내역 상세 조회
     */
    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponse> getPayment(@PathVariable Integer paymentId) {
        PaymentResponse response = paymentService.getPayment(paymentId);
        return ResponseEntity.ok(response);
    }


    /**
     * 사용자별 결제 내역 조회
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByUser(@PathVariable Integer userId) {
        List<PaymentResponse> responses = paymentService.getPaymentsByUser(userId);
        return ResponseEntity.ok(responses);
    }

    /**
     * 결제 환불 요청
     */
    @PostMapping("/{paymentId}/refund")
    public ResponseEntity<PaymentResponse> requestRefund(
            @PathVariable Integer paymentId,
            @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.requestRefund(paymentId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 환불 승인 처리 (관리자용)
     */
    @PatchMapping("/{subscriptionId}/refund/approve")
    public ResponseEntity<PaymentResponse> approveRefund(@PathVariable Integer subscriptionId) {
        PaymentResponse response = paymentService.approveRefund(subscriptionId);
        return ResponseEntity.ok(response);
    }

}