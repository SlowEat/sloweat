package com.sloweat.common.util;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityUtil {

    /**
     * 현재 로그인된 사용자의 userId를 Optional로 반환합니다.
     * 인증 정보가 없거나 인증되지 않은 경우 Optional.empty() 반환
     */
    public static Optional<Integer> getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return Optional.of(userDetails.getUserId());
        }

        return Optional.empty();
    }
}
