package com.sloweat.domain.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocalSignupRequestDto {

    @NotBlank(message="아이디는 필수입니다.")
    @Size(min=4, max=20, message="아이디는 4자 이상 20자 이하로 입력해주세요")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "아이디는 4자 이상 20자 이하 영문자와 숫자만 사용 할 수 있습니다.")
    private String email;


    @NotBlank(message="비밀번호는 필수입니다.")
    @Size(max=20, message="비밀번호는 20자 이하로 입력해주세요.")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;\"'<>,.?/\\\\|]).{1,20}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 포함한 20자 이내로 설정해야합니다."
    )
    private String password;

    @NotBlank(message="비밀번호 확인은 필수입니다.")
    private String passwordConfirm;

    @NotBlank(message="닉네임은 필수입니다.")
    @Size(max=15, message="닉네임은 15자 이하로 입력해주세요.")
    private String nickname;
}
