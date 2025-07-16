package com.sloweat.domain.auth.controller;

import com.sloweat.domain.auth.dto.LocalSignupRequestDto;
import com.sloweat.domain.auth.service.LocalSignupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LocalSignupService localSignupService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody LocalSignupRequestDto dto){
        localSignupService.signup(dto);
        System.out.println("controller진입");
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }
}
