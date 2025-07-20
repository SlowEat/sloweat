package com.sloweat.domain.auth.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.entity.Refresh;
import com.sloweat.domain.auth.repository.RefreshRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

//todo : 명확한 에러 메세지 작성 -> 프론트 전달 고려
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;

    //로그인 인증 진입 메소드
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        
        //JSON 파싱
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> requestMap = objectMapper.readValue(request.getInputStream(), Map.class);

            String localEmail = requestMap.get("localEmail");
            String password = requestMap.get("password");

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(localEmail, password);

            return authenticationManager.authenticate(authToken);
        } catch (IOException e) {
            throw new RuntimeException("로그인 JSON 파싱 실패", e);
        }
    }


    //로그인 성공시
    //jwt 토큰(access,refresh) 발급
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        //Authentication -> 로그인한 사용자의 정보
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        //id
        String localEmail = customUserDetails.getUsername(); //customUserDetails에서 현재 getUsername()은 localEmail을 반환

        //role
        String role = customUserDetails.getAuthorities().iterator().next().toString();

        //userId
        String userId = customUserDetails.getUserId().toString();

        //직전 refresh 토큰 삭제
        if(refreshRepository.existsByRefreshToken(localEmail)){
            refreshRepository.deleteByRefreshToken(localEmail);
        }

        //토큰 생성
        String access = jwtUtil.createJwt("access",localEmail,role,userId,accessTokenValidity);
        String refresh = jwtUtil.createJwt("refresh",localEmail,role,userId,refreshTokenValidity);

        //refresh 토큰 저장
        addRefreshEntity(localEmail,refresh,refreshTokenValidity);

        //응답 설정
        response.addHeader("Authorization", "Bearer " + access); //access 토큰 -> header 저장
        response.addCookie(createCookie("refresh",refresh)); //refresh 토큰 -> 쿠키 저장
        response.setStatus(HttpStatus.OK.value()); //상태값

    }

    //로그인 실패시
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }

    //refresh 토큰 DB 저장
    private void addRefreshEntity(String localEmail,String refresh,Long expiredMs){

        //현재 시간 + 만료 일자
        Date date = new Date(System.currentTimeMillis()+expiredMs);

        Refresh refreshEntity = Refresh.builder()
                                       .username(localEmail)
                                       .refreshToken(refresh)
                                       .expiration(date.toString())
                                       .build();

        refreshRepository.save(refreshEntity);
    }

    //refresh 토큰 cookie 저장
    private Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key,value);
        cookie.setMaxAge((int)(refreshTokenValidity / 1000));
        cookie.setHttpOnly(true);

        return cookie;
    }

}
