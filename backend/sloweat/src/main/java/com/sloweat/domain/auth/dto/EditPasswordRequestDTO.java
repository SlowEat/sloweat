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
public class EditPasswordRequestDTO {

    @NotBlank(message="현재 비밀번호 입력은 필수입니다.")
    private String currentPassword;

    @NotBlank(message="비밀번호는 필수입니다.")
    @Size(max=20, message="비밀번호는 20자 이하로 입력해주세요.")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;\"'<>,.?/\\\\|]).{1,20}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 포함한 20자 이내로 설정해야합니다."
    )
    private String newPassword;

    @NotBlank(message="비밀번호 확인은 필수입니다.")
    private String confirmPassword;

}
