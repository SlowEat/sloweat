package com.sloweat.global.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

/**
 * Filter 샘플 코드
 * */
public class RequestLoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        System.out.println("[Filter] Method: " + req.getMethod() + ", URI: " + req.getRequestURI());
        chain.doFilter(request, response);
    }
}
