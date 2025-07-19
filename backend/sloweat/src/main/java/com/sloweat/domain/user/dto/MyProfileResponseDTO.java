package com.sloweat.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyProfileResponseDTO {
    private String nickname;
    private String id;
    private String profileImgPath;
    private String introduce;
    private boolean subscribed;
    private long followerCnt;
    private long followingCnt;
    private long postCnt;
}
