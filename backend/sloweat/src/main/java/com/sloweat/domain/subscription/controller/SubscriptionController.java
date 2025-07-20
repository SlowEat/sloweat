package com.sloweat.domain.subscription.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.subscription.dto.PaymentMethodRequest;
import com.sloweat.domain.subscription.dto.SubscriptionRequest;
import com.sloweat.domain.subscription.dto.SubscriptionResponse;
import com.sloweat.domain.subscription.dto.SubscriptionUserResponse;
import com.sloweat.domain.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    /**
     * 구독 생성 (결제 포함)
     */
    @PostMapping("/users/{userId}/subscription")
    public ResponseEntity<SubscriptionResponse> createSubscription(
            @PathVariable Integer userId,
            @RequestBody SubscriptionRequest request) {

        SubscriptionResponse response = subscriptionService.createSubscription(userId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 구독 상세 조회
     */
    @GetMapping("/subscription/active")
    public ResponseEntity<SubscriptionResponse> getSubscription(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        SubscriptionResponse response = subscriptionService.getSubscription(customUserDetails);
        return ResponseEntity.ok(response);
    }

    /**
     * 유저 정보 반환
     */
    @GetMapping("/subscription/me")
    public ResponseEntity <SubscriptionUserResponse>getSubscriptionUser(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        SubscriptionUserResponse response = subscriptionService.getSubscriptionUser(customUserDetails);
        return ResponseEntity.ok(response);

    }
    /**
     * 구독 갱신
     */
    @PatchMapping("/subscription/{id}/renew")
    public ResponseEntity<SubscriptionResponse> renewSubscription(@PathVariable Integer id) {
        SubscriptionResponse response = subscriptionService.renewSubscription(id);
        return ResponseEntity.ok(response);
    }

    /**
     * 구독 취소
     */
    @PatchMapping("/subscription/{id}/cancel")
    public ResponseEntity<SubscriptionResponse> cancelSubscription(@PathVariable Integer id) {
        SubscriptionResponse response = subscriptionService.cancelSubscription(id);
        return ResponseEntity.ok(response);
    }

    /**
     * 결제수단 변경
     */
    @PatchMapping("/subscription/{subscriptionId}/payment-method")
    public ResponseEntity<SubscriptionResponse> changePaymentMethod(
            @PathVariable Integer subscriptionId,
            @RequestBody PaymentMethodRequest request) {
        SubscriptionResponse response = subscriptionService.changePaymentMethod(subscriptionId, request);
        return ResponseEntity.ok(response);
    }



}