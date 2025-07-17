package com.sloweat.domain.subscription.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.payment.repository.PaymentRepository;
import com.sloweat.domain.payment.service.IamportService;
import com.sloweat.domain.subscription.dto.SubscriptionRequest;
import com.sloweat.domain.subscription.dto.SubscriptionResponse;
import com.sloweat.domain.subscription.entity.Subscription;
import com.sloweat.domain.subscription.repository.SubscriptionRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final IamportService iamportService;

    /**
     * 구독 생성 (결제 포함)
     */
    @Transactional
    public SubscriptionResponse createSubscription(Integer userId, SubscriptionRequest request) {
        // 유저 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 기존 활성 구독 확인
        Optional<Subscription> existingSubscription = subscriptionRepository
                .findByUserUserIdAndStatus(userId, Subscription.Status.ACTIVE);

        if (existingSubscription.isPresent()) {
            throw new RuntimeException("User already has an active subscription");
        }

        // 빌링키 유효성 확인
        JsonNode billingKeyResponse = iamportService.getBillingKey(request.getCustomerUid());
        if (billingKeyResponse.get("code").asInt() != 0) {
            throw new RuntimeException("Invalid billing key");
        }

        // 정기결제 요청
        JsonNode paymentResponse = iamportService.requestSubscriptionPayment(
                request.getCustomerUid(),
                request.getAmount(),
                request.getOrderName()
        );

        if (paymentResponse.get("code").asInt() != 0) {
            throw new RuntimeException("Payment failed: " + paymentResponse.get("message").asText());
        }

        // 구독 생성
        LocalDateTime now = LocalDateTime.now();
        Subscription subscription = Subscription.builder()
                .user(user)
                .customerUid(request.getCustomerUid())
                .startDate(now)
                .endDate(now.plusMonths(1))
                .status(Subscription.Status.ACTIVE)
                .createdAt(now)
                .build();

        subscription = subscriptionRepository.save(subscription);

        // 결제 기록 생성
        createPaymentRecord(subscription, paymentResponse, request.getAmount());

        return SubscriptionResponse.from(subscription);
    }

    /**
     * 결제 기록 생성
     */
    private void createPaymentRecord(Subscription subscription, JsonNode paymentResponse, Integer amount) {
        JsonNode response = paymentResponse.get("response");

        Payment payment = Payment.builder()
                .subscription(subscription)
                .amount(amount)
                .status(Payment.Status.PAID)
                .method(Payment.Method.CARD)
                .payDate(LocalDateTime.now())
                .refundStatus(Payment.RefundStatus.APPROVE)
                .refundReason("")
                .createdAt(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);
    }
}