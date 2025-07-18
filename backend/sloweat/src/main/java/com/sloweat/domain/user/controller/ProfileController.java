package com.sloweat.domain.user.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.user.dto.MyProfileResponseDTO;
import com.sloweat.domain.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/users/me/profile")
    public ResponseEntity<MyProfileResponseDTO> getMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
       MyProfileResponseDTO dto = profileService.getMyProfile(customUserDetails);
       return ResponseEntity.ok(dto);
    }


}
