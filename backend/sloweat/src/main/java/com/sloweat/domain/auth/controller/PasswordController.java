package com.sloweat.domain.auth.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.dto.EditPasswordRequestDTO;
import com.sloweat.domain.auth.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class PasswordController {

    private final PasswordService passwordService;

    //비밀번호 수정
    @PatchMapping("/me/password")
    public ResponseEntity<Void> editMyPassword(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                               @RequestBody EditPasswordRequestDTO editPasswordRequestDTO) {
        passwordService.editMyPassword(customUserDetails,editPasswordRequestDTO);

        return ResponseEntity.ok().build();
    }

}
