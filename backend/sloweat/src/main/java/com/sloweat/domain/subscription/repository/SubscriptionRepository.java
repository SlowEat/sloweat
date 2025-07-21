package com.sloweat.domain.subscription.repository;

import com.sloweat.domain.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

    //Optional<Subscription> findByUserUserIdAndStatus(Integer userId, Subscription.Status status);
    Optional<Subscription> findByUserUserIdAndStatusIn(Integer userId, List<Subscription.Status> statuses);
    boolean existsByUserUserIdAndStatus(Integer userId, Subscription.Status status);

    boolean existsByUserUserIdAndStatusIn(Integer userId, List<Subscription.Status> statuses);

    Optional<Subscription> findByCustomerUid(String customerUid);

    @Query("SELECT s FROM Subscription s WHERE s.status = :status AND s.endDate <= :now")
    List<Subscription> findExpiredSubscriptions(@Param("status") Subscription.Status status, @Param("now") LocalDateTime now);

    @Query("SELECT s FROM Subscription s WHERE s.status = :status AND FUNCTION('DAY', s.endDate) = FUNCTION('DAY', :renewalDate)")
    List<Subscription> findSubscriptionsForRenewal(@Param("status") Subscription.Status status, @Param("renewalDate") LocalDateTime renewalDate);


}