package com.sloweat.domain.auth.dto;

import com.sloweat.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

//로컬 로그인용
//todo:oauth2도 고려해야함
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;
    
    //권한 설정
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(user.getRole().name()));
    }

    //비밀번호 설정
    @Override
    public String getPassword() {
        return user.getLocalPassword();
    }
    
    //아이디 설정
    @Override
    public String getUsername() {
        return user.getLocalEmail();
    }

    //고유Id 설정
    public Integer getUserId(){
        return user.getUserId();
    }
    
    /// 로그인 가능여부 설정
    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }
    
    //Status=BANNED면 잠긴 계정으로 간주하고 false 반환
    @Override
    public boolean isAccountNonLocked() {
        return user.getStatus() != User.Status.BANNED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }
    
    //Status = ACTIVE 상태여야 로그인 가능
    @Override
    public boolean isEnabled() {
        return user.getStatus() == User.Status.ACTIVE;
    }
}
