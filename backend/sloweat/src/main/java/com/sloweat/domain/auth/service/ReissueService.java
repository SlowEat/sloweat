package com.sloweat.domain.auth.service;

import com.sloweat.domain.auth.entity.Refresh;
import com.sloweat.domain.auth.jwt.JWTUtil;
import com.sloweat.domain.auth.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Value("${jwt.access-token-validity}")
    private long accessTokenValidity;

    @Value("${jwt.refresh-token-validity}")
    private long refreshTokenValidity;

    @Transactional
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){

        //1. 쿠키에서 refresh 토큰 추출
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refresh")){
                refreshToken = cookie.getValue();
            }
        }

        if(refreshToken==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token null");
        }
        
        //2. 만료 여부 확인
        try{
            jwtUtil.isExpired(refreshToken);
        }catch (ExpiredJwtException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token expired");
        }

        //3. DB 존재 확인
        Boolean isExist = refreshRepository.existsByRefreshToken(refreshToken);
        if(!isExist){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token non exists");
        }

        //4. 새 토큰 발급
        String localEmail = jwtUtil.getLocalEmail(refreshToken);
        String role = jwtUtil.getRole(refreshToken);
        String userId = jwtUtil.getUserId(refreshToken);

        String newAccess = jwtUtil.createJwt("access", localEmail, role, userId, accessTokenValidity);

        //5. 응답 설정
        response.setHeader("Authorization", "Bearer " + newAccess);

        return ResponseEntity.ok().body("access token reissued");
    }
}
