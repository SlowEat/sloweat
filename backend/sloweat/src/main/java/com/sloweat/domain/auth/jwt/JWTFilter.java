package com.sloweat.domain.auth.jwt;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.user.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//매 요청마다 토큰을 꺼내서 인증 처리하는 필터
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //요청 헤더의 access 토큰 확인
        String authorization = request.getHeader("Authorization");
        
        //없다면 다음 필터로 넘김
        if(authorization == null || !authorization.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        
        //있다면 순수한 토큰을 얻음
        String token = authorization.split(" ")[1]; //Bearer 접두사 제거

        //access 토큰의 소멸 시간을 검증하여 유효한지 확인
        try{
            jwtUtil.isExpired(token);
        }catch(ExpiredJwtException e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //소멸 시간 초과
            return;
        }

        //유효하다면 토큰이 access인지 확인
        String category = jwtUtil.getCategory(token);
        if(!category.equals("access")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //access 토큰 아님
            return;
        }

        //access 토큰이 맞다면 토큰에서 user 정보 획득
        String localEmail = jwtUtil.getLocalEmail(token);
        String role = jwtUtil.getRole(token);

        //임시 인증용 user Entity 생성
        User user = User.builder()
                .localEmail(localEmail)
                .localPassword("temppassword")
                .role(User.Role.ROLE_USER)
                .build();
        
        //시큐리티 인증
        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails,null,customUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);
        
        //다음 필터로 넘김
        filterChain.doFilter(request,response);


    }
}
