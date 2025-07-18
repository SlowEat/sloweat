package com.sloweat.domain.user.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.user.dto.MyProfileRequestDTO;
import com.sloweat.domain.user.dto.MyProfileResponseDTO;
import com.sloweat.domain.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;
    
    //프로필 불러오기
    @GetMapping("/users/me/profile")
    public ResponseEntity<MyProfileResponseDTO> getMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
       MyProfileResponseDTO dto = profileService.getMyProfile(customUserDetails);
       return ResponseEntity.ok(dto);
    }
    
    //프로필 수정
    @PatchMapping("/users/me/profile")
    public ResponseEntity<Void> editMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                           @RequestBody MyProfileRequestDTO myProfileRequestDTO) {
        profileService.editMyProfile(customUserDetails,myProfileRequestDTO);
        return ResponseEntity.ok().build();
    }


}
