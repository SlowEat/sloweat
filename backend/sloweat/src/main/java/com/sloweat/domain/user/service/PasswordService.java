package com.sloweat.domain.user.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.dto.EditPasswordRequestDTO;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void editMyPassword(CustomUserDetails customUserDetails, EditPasswordRequestDTO dto) {
        Integer userId = customUserDetails.getUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        if (!bCryptPasswordEncoder.matches(dto.getCurrentPassword(), user.getLocalPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 틀렸습니다.");
        }

        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

        user.setLocalPassword(bCryptPasswordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }
}