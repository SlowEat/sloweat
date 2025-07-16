package com.sloweat.domain.subscription.controller;

import com.sloweat.domain.subscription.dto.SubscriptionRequest;
import com.sloweat.domain.subscription.dto.SubscriptionResponse;
import com.sloweat.domain.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
}