package com.sloweat.domain.payment.repository;

import com.sloweat.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Optional<Payment> findByImpUid(String impUid);

    Optional<Payment> findByMerchantUid(String merchantUid);

    List<Payment> findBySubscriptionSubscriptionIdOrderByCreatedAtDesc(Integer subscriptionId);

    @Query("SELECT p FROM Payment p WHERE p.subscription.user.userId = :userId ORDER BY p.createdAt DESC")
    List<Payment> findByUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId);

    List<Payment> findByStatusAndRefundStatus(Payment.Status status, Payment.RefundStatus refundStatus);

    Optional<Payment> findTopBySubscriptionSubscriptionIdOrderByCreatedAtDesc(Integer subscriptionId);
}