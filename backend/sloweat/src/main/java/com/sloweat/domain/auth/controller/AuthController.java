package com.sloweat.domain.auth.controller;

import com.sloweat.domain.auth.dto.LocalSignupRequestDto;
import com.sloweat.domain.auth.service.LocalSignupService;
import com.sloweat.domain.auth.service.ReissueService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    private final ReissueService reissueService;
    
    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody LocalSignupRequestDto dto){
        localSignupService.signup(dto);
        System.out.println("controller진입");
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    //refresh -> access 토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){
        return reissueService.reissue(request,response);
    }

}
