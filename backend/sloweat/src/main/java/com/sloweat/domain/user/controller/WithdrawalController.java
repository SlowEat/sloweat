package com.sloweat.domain.user.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.user.service.WithdrawalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WithdrawalController {

    private final WithdrawalService withdrawalService;

    @PatchMapping("/api/users/me")
    public ResponseEntity<Void> updateStatus(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        withdrawalService.updateStatus(customUserDetails);

        return ResponseEntity.ok().build();
    }


}
