package com.sloweat.domain.auth.service;

import com.sloweat.domain.auth.dto.LocalSignupRequestDto;
import com.sloweat.domain.auth.repository.AuthUserRepository;
import com.sloweat.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LocalSignupService {

    private final AuthUserRepository authUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //이메일 중복 검사
    public boolean isEmailDuplicate(String email){
        return authUserRepository.existsBylocalEmail(email);
    }

    //닉네임 중복 검사
    public boolean isNicknameDuplicate(String nickname){
        return authUserRepository.existsBynickname(nickname);
    }

    //회원가입
    public void signup(LocalSignupRequestDto dto) {

        String email = dto.getEmail();
        String password = dto.getPassword();
        String passwordConfirm = dto.getPasswordConfirm();
        String nickname = dto.getNickname();
        
        //이메일 중복 검사
        if(authUserRepository.existsBylocalEmail(email)){
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        //닉네임 중복 검사
        if(authUserRepository.existsBynickname(nickname)){
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        //비밀번호 확인 일치 검사
        if(!password.equals(passwordConfirm)) {
            throw new IllegalArgumentException("비밀번호 확인이 일치하지 않습니다.");
        }

        //dto -> Entity
        User user = User.builder()
                .joinType(User.JoinType.LOCAL)
                .localEmail(email)
                .localPassword(bCryptPasswordEncoder.encode(password))
                .nickname(nickname)
                .role(User.Role.ROLE_USER)
                .status(User.Status.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();

        authUserRepository.save(user);
    }

}
