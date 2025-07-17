package com.sloweat.domain.follow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowRequestDto {
    private Integer toUserId; // following 대상
}
