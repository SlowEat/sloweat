package com.sloweat.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Interceptor 샘플 코드
 * */

//@Component
public class LoggingInterceptor implements HandlerInterceptor {

    //@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("[Interceptor] Request URI: " + request.getRequestURI());
        return true;
    }
}
