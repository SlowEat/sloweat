package com.sloweat.domain.follow.dto;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FollowResponseDto {
    private Integer followId;
    private Integer userId;
    private String nickname;
    private String profileImgPath;
    private String localEmail;
    private String kakaoEmail;
    private Long followerCount;
    private Boolean isFollowed;
}