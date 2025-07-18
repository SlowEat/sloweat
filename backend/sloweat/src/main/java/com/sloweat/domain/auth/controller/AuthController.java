package com.sloweat.domain.auth.controller;

import com.sloweat.domain.auth.dto.LocalSignupRequestDto;
import com.sloweat.domain.auth.service.LocalSignupService;
import com.sloweat.domain.auth.service.ReissueService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LocalSignupService localSignupService;
    private final ReissueService reissueService;
    
    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody LocalSignupRequestDto dto){
        localSignupService.signup(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("회원가입이 완료되었습니다.");
    }

    //아이디 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam String email){
        boolean isDuplicate = localSignupService.isEmailDuplicate(email);
        return ResponseEntity.ok(isDuplicate);
    }

    //닉네임 중복 확인
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam String nickname){
        boolean isDuplicate = localSignupService.isNicknameDuplicate(nickname);
        return ResponseEntity.ok(isDuplicate);
    }


    //refresh -> access 토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){
        return reissueService.reissue(request,response);
    }

}
