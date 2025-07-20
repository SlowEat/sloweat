package com.sloweat.domain.subscription.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionUserResponse {
        private Integer userId;
        private String nickname;
        private String id;
        private boolean subscribed;

}
