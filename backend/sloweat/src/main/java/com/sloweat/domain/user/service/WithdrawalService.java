package com.sloweat.domain.user.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.repository.RefreshRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class WithdrawalService {

    private final UserRepository userRepository;
    private final RefreshRepository refreshRepository;

    public void updateStatus(CustomUserDetails customUserDetails) {
        Integer userId = customUserDetails.getUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        user.setStatus(User.Status.WITHDRAWN);
        userRepository.save(user);

        refreshRepository.deleteByUsername(user.getLocalEmail());
    }
}
