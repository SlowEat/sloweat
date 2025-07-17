package com.sloweat.domain.follow.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FollowResponseDto {
    private Integer userId;
    private String localEmail;
    private String kakaoEmail;
    private String profileImagPath;
    private String nickname;
    private String username;
    private Integer followerCount;
}