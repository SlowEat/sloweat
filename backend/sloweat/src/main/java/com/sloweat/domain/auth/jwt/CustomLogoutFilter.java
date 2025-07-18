package com.sloweat.domain.auth.jwt;

import com.sloweat.domain.auth.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String requestURI = request.getRequestURI();

        //POST /logout일때만 filter 작동
        if(!requestURI.equals("/logout")){
            chain.doFilter(request,response);
            return;
        }

        String requestMethod = request.getMethod();
        if(!requestMethod.equals("POST")){
            chain.doFilter(request,response);
            return;
        }
        
        //refresh token 유효성 검사
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refresh")){
                refresh = cookie.getValue();
            }
        }

        if(refresh==null){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Refresh token not found in cookie");
            return;
        }

        try{
            jwtUtil.isExpired(refresh);
        }catch(ExpiredJwtException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh token expired");
            return;
        }

        String category = jwtUtil.getCategory(refresh);
        if(!category.equals("refresh")){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid token category (not refresh)");
            return;
        }

        Boolean isExist = refreshRepository.existsByRefreshToken(refresh);
        if(!isExist){
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Refresh token not found in DB");
            return;
        }

        //로그아웃
        //DB 제거
        refreshRepository.deleteByRefreshToken(refresh);

        //cookie 0으로 설정
        Cookie cookie = new Cookie("refresh",null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);

    }
}
