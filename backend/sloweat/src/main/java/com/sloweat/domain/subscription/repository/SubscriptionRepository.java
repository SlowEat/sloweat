package com.sloweat.domain.subscription.repository;

import com.sloweat.domain.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
}
