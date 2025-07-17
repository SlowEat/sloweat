package com.sloweat.domain.auth.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.repository.AuthUserRepository;
import com.sloweat.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthUserRepository authUserRepository;

    @Override
    public UserDetails loadUserByUsername(String localEmail) throws UsernameNotFoundException {
        
        //아이디로 객체 찾기
        User user = authUserRepository.findByLocalEmail(localEmail);
        
        //존재한다면 CustomUserDetails 반환
        if(user!=null){
            return new CustomUserDetails(user);
        }
        
        //존재하지 않는다면 예외 반환
        throw new UsernameNotFoundException("이메일이 존재하지 않습니다: " + localEmail);
    }
}
