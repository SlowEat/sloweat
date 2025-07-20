package com.sloweat.domain.subscription.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.payment.repository.PaymentRepository;
import com.sloweat.domain.payment.service.IamportService;
import com.sloweat.domain.subscription.dto.PaymentMethodRequest;
import com.sloweat.domain.subscription.dto.SubscriptionRequest;
import com.sloweat.domain.subscription.dto.SubscriptionResponse;
import com.sloweat.domain.subscription.dto.SubscriptionUserResponse;
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
import java.util.NoSuchElementException;
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
     * 구독 상세 조회
     */
    public SubscriptionResponse getSubscription(CustomUserDetails customUserDetails) {
        Subscription subscription = subscriptionRepository
                .findByUserUserIdAndStatus(customUserDetails.getUserId(), Subscription.Status.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        return SubscriptionResponse.from(subscription);
    }

    /**
     * 구독 갱신 (수동)
     */
    @Transactional
    public SubscriptionResponse renewSubscription(Integer subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        if (subscription.getStatus() != Subscription.Status.ACTIVE) {
            throw new RuntimeException("Only active subscriptions can be renewed");
        }

        // 정기결제 요청
        JsonNode paymentResponse = iamportService.requestSubscriptionPayment(
                subscription.getCustomerUid(),
                100, // 구독료 (고정값 또는 설정에서 가져오기)
                "SlowEat 구독 갱신"
        );

        if (paymentResponse.get("code").asInt() != 0) {
            throw new RuntimeException("Payment failed: " + paymentResponse.get("message").asText());
        }

        // 구독 기간 연장
        subscription.setEndDate(subscription.getEndDate().plusMonths(1));
        subscription = subscriptionRepository.save(subscription);

        // 결제 기록 생성
        createPaymentRecord(subscription, paymentResponse, 100);

        return SubscriptionResponse.from(subscription);
    }

    /**
     * 구독 취소
     */
    @Transactional
    public SubscriptionResponse cancelSubscription(Integer subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        if (subscription.getStatus() != Subscription.Status.ACTIVE) {
            throw new RuntimeException("Only active subscriptions can be cancelled");
        }

        // 빌링키 삭제
        JsonNode deleteResponse = iamportService.deleteBillingKey(subscription.getCustomerUid());
        if (deleteResponse.get("code").asInt() != 0) {
            log.warn("Failed to delete billing key: {}", deleteResponse.get("message").asText());
        }

        // 구독 상태 변경
        subscription.setStatus(Subscription.Status.CANCEL);
        subscription = subscriptionRepository.save(subscription);

        return SubscriptionResponse.from(subscription);
    }
    /**
     * 유저정보 반환
     */
    public SubscriptionUserResponse getSubscriptionUser(CustomUserDetails customUserDetails) {

        Integer userId = customUserDetails.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        String id =  user.getLocalEmail();
        return  SubscriptionUserResponse.builder()
                .userId(userId)
                .nickname(user.getNickname())
                .id(id)
                .subscribed(subscriptionRepository.existsByUserUserIdAndStatus(userId, Subscription.Status.ACTIVE))
                .build();
    }

    /**
     * 자동 갱신 처리 (스케줄러에서  호출)
     */
    @Transactional
    public void processAutoRenewal() {
        LocalDateTime now = LocalDateTime.now();
        List<Subscription> subscriptionsToRenew = subscriptionRepository
                .findSubscriptionsForRenewal(Subscription.Status.ACTIVE, now);

        for (Subscription subscription : subscriptionsToRenew) {
            try {
                // 정기결제 요청
                JsonNode paymentResponse = iamportService.requestSubscriptionPayment(
                        subscription.getCustomerUid(),
                        100,
                        "SlowEat 구독 자동갱신"
                );

                if (paymentResponse.get("code").asInt() == 0) {
                    // 성공 시 기간 연장
                    subscription.setEndDate(subscription.getEndDate().plusMonths(1));
                    createPaymentRecord(subscription, paymentResponse, 10000);
                } else {
                    // 실패 시 구독 취소
                    subscription.setStatus(Subscription.Status.CANCEL);
                    log.error("Auto renewal failed for subscription {}: {}",
                            subscription.getSubscriptionId(),
                            paymentResponse.get("message").asText());
                }

                subscriptionRepository.save(subscription);

            } catch (Exception e) {
                log.error("Error processing auto renewal for subscription {}",
                        subscription.getSubscriptionId(), e);

                subscription.setStatus(Subscription.Status.CANCEL);
                subscriptionRepository.save(subscription);
            }
        }
    }

    /**
     * 만료된 구독 처리
     */
    @Transactional
    public void processExpiredSubscriptions() {
        LocalDateTime now = LocalDateTime.now();
        List<Subscription> expiredSubscriptions = subscriptionRepository
                .findExpiredSubscriptions(Subscription.Status.ACTIVE, now);

        for (Subscription subscription : expiredSubscriptions) {
            subscription.setStatus(Subscription.Status.EXPIRE);
            subscriptionRepository.save(subscription);
        }
    }

    /**
     * 결제 기록 생성
     */
    private void createPaymentRecord(Subscription subscription, JsonNode paymentResponse, Integer amount) {
        JsonNode response = paymentResponse.get("response");

        Payment payment = Payment.builder()
                .subscription(subscription)
                .impUid(response.get("imp_uid").asText())
                .merchantUid(response.get("merchant_uid").asText())
                .amount(amount)
                .status(Payment.Status.PAID)
                .method(Payment.Method.CARD)
                .payDate(LocalDateTime.now())
                .refundStatus(Payment.RefundStatus.NONE)
                .refundReason("")
                .createdAt(LocalDateTime.now())
                .cardCompany(response.get("card_name").asText())
                .cardNumberMasked(response.get("card_number").asText())
                .build();

        paymentRepository.save(payment);
    }

    /**
     * 결제수단 변경
     */
    @Transactional
    public SubscriptionResponse changePaymentMethod(Integer subscriptionId, PaymentMethodRequest request) {
        // 구독 정보 조회
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        if (subscription.getStatus() != Subscription.Status.ACTIVE) {
            throw new RuntimeException("Only active subscriptions can change payment method");
        }

        // 새 빌링키 유효성 확인 및 카드 정보 조회
        JsonNode newBillingKeyResponse = iamportService.getBillingKeyWithCardInfo(request.getNewCustomerUid());
        if (newBillingKeyResponse.get("code").asInt() != 0) {
            throw new RuntimeException("Invalid new billing key: " + newBillingKeyResponse.get("message").asText());
        }

        // 기존 빌링키 백업
        String oldCustomerUid = subscription.getCustomerUid();

        try {
            // 새 빌링키로 테스트 결제 (1원 결제 후 취소)
            JsonNode testPaymentResponse = iamportService.requestSubscriptionPayment(
                    request.getNewCustomerUid(),
                    1,
                    "SlowEat 결제수단 변경 테스트"
            );

            if (testPaymentResponse.get("code").asInt() != 0) {
                throw new RuntimeException("New payment method test failed: " + testPaymentResponse.get("message").asText());
            }

            // 테스트 결제 즉시 취소
            String testImpUid = testPaymentResponse.get("response").get("imp_uid").asText();
            iamportService.cancelPayment(testImpUid, 1, "결제수단 변경 테스트 취소");

            // 구독 정보 업데이트 (새 빌링키로 변경)
            subscription.setCustomerUid(request.getNewCustomerUid());
            subscription = subscriptionRepository.save(subscription);

            // 기존 빌링키 삭제 (선택적)
            if (oldCustomerUid != null && !oldCustomerUid.equals(request.getNewCustomerUid())) {
                JsonNode deleteResponse = iamportService.deleteBillingKey(oldCustomerUid);
                if (deleteResponse.get("code").asInt() != 0) {
                    log.warn("Failed to delete old billing key {}: {}", oldCustomerUid, deleteResponse.get("message").asText());
                } else {
                    log.info("Successfully deleted old billing key: {}", oldCustomerUid);
                }
            }

            // 새 카드 정보 추출
            JsonNode cardInfo = newBillingKeyResponse.get("response");
            String newCardCompany = cardInfo.has("card_name") ? cardInfo.get("card_name").asText() : null;
            String newCardNumber = cardInfo.has("card_number") ? cardInfo.get("card_number").asText() : null;

            // 해당 구독의 최근 결제 기록 업데이트
            List<Payment> recentPayments = paymentRepository
                    .findBySubscriptionSubscriptionIdOrderByCreatedAtDesc(subscriptionId);

            if (!recentPayments.isEmpty() && newCardCompany != null && newCardNumber != null) {
                // 가장 최근 결제 기록만 업데이트
                Payment latestPayment = recentPayments.get(0);
                latestPayment.updateCardInfo(newCardCompany, newCardNumber);
                paymentRepository.save(latestPayment);

                log.info("Updated card info for latest payment record: {}", latestPayment.getPaymentId());
            }

            log.info("Payment method changed successfully for subscription {}: {} -> {}",
                    subscriptionId, oldCustomerUid, request.getNewCustomerUid());

            return SubscriptionResponse.from(subscription);

        } catch (Exception e) {
            log.error("Failed to change payment method for subscription {}", subscriptionId, e);
            throw new RuntimeException("Payment method change failed: " + e.getMessage());
        }
    }
}