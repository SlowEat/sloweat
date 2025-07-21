package com.sloweat.domain.user.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.user.dto.MyProfileRequestDTO;
import com.sloweat.domain.user.dto.MyProfileResponseDTO;
import com.sloweat.domain.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/me")
public class ProfileController {

    private final ProfileService profileService;
    
    //프로필 불러오기
    @GetMapping("/profile")
    public ResponseEntity<MyProfileResponseDTO> getMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
       MyProfileResponseDTO dto = profileService.getMyProfile(customUserDetails);
       return ResponseEntity.ok(dto);
    }
    
    //프로필 수정
    @PatchMapping("/profile")
    public ResponseEntity<Void> editMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                           @RequestBody MyProfileRequestDTO myProfileRequestDTO) {
        profileService.editMyProfile(customUserDetails,myProfileRequestDTO);
        return ResponseEntity.ok().build();
    }

    //프로필 사진 업로드
    @PostMapping("/upload/profile-img")
    public ResponseEntity<Map<String, String>> uploadProfileImg(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Integer loginUserId = customUserDetails.getUserId();
        String filename = profileService.uploadProfileImg(file, loginUserId);

        return ResponseEntity.ok(Map.of("filename", filename));
    }
}
