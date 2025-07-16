package com.sloweat.domain.subscription.dto;

import com.sloweat.domain.subscription.entity.Subscription;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionResponse {
    private Integer subscriptionId;
    private Integer userId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private String statusLabel;
    private LocalDateTime createdAt;

    public static SubscriptionResponse from(Subscription subscription) {
        return SubscriptionResponse.builder()
                .subscriptionId(subscription.getSubscriptionId())
                .userId(subscription.getUser().getUserId())
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .status(subscription.getStatus().name())
                .statusLabel(subscription.getStatus().getLabel())
                .createdAt(subscription.getCreatedAt())
                .build();
    }
}