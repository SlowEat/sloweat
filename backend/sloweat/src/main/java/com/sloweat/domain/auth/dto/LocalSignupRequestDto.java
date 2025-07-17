package com.sloweat.domain.auth.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocalSignupRequestDto {
    //todo : 정확한 필드 검증, 이메일 인증로직, oauth2 추가
    private String email;
    private String password;
    private String passwordConfirm;
    private String nickname;
}
