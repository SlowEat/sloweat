package com.sloweat.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyProfileRequestDTO {
    private String nickname;
    private String profileImgPath;
    private String introduce;
}
