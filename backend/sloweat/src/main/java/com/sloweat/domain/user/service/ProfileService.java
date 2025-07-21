package com.sloweat.domain.user.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.auth.dto.EditPasswordRequestDTO;
import com.sloweat.domain.follow.repository.FollowRepository;
import com.sloweat.domain.recipe.repository.RecipeRepository;
import com.sloweat.domain.subscription.entity.Subscription;
import com.sloweat.domain.subscription.repository.SubscriptionRepository;
import com.sloweat.domain.user.dto.MyProfileRequestDTO;
import com.sloweat.domain.user.dto.MyProfileResponseDTO;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final FollowRepository followRepository;
    private final RecipeRepository recipeRepository;

    public MyProfileResponseDTO getMyProfile(CustomUserDetails customUserDetails) {
        Integer userId = customUserDetails.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        String id =  user.getLocalEmail();

        long follower_cnt = followRepository.countByFollowing(user);
        long following_cnt = followRepository.countByFollower(user);

        long post_cnt = recipeRepository.countByUser(user);

        return  MyProfileResponseDTO.builder()
                .nickname(user.getNickname())
                .id(id)
                .profileImgPath(user.getProfileImgPath())
                .introduce(user.getIntroduce())
                .subscribed(subscriptionRepository.existsByUserUserIdAndStatus(userId, Subscription.Status.ACTIVE))
                .followerCnt(follower_cnt)
                .followingCnt(following_cnt)
                .postCnt(post_cnt)
                .build();
    }

    public void editMyProfile(CustomUserDetails customUserDetails, MyProfileRequestDTO myProfileRequestDTO) {
        Integer userId = customUserDetails.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        user.setNickname(myProfileRequestDTO.getNickname());
        user.setIntroduce(myProfileRequestDTO.getIntroduce());
        user.setProfileImgPath(myProfileRequestDTO.getProfileImgPath());

        userRepository.save(user);
    }


    public String uploadProfileImg(MultipartFile image, Integer loginUserId) {

        try {
            // 파일 저장 위치
            final String uploadDir = "C:/upload/profile";

            String originalFilename = image.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

            try {
                Files.createDirectories(Paths.get(uploadDir));
            } catch (IOException e) {
                e.printStackTrace();
            }

            String uuidFileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, uuidFileName);

            try {
                image.transferTo(filePath.toFile());
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            User user = userRepository.findById(loginUserId).orElseThrow();

            // TO-DO
            if(user.getProfileImgPath() != null || !user.getProfileImgPath().equals("")){
                // 기존에 저장된 profile 파일 삭제
                Path oldProfileFilePath = Paths.get(uploadDir, user.getProfileImgPath());
                Files.deleteIfExists(oldProfileFilePath);
            }

            user.setProfileImgPath(uuidFileName);
            userRepository.save(user);

            return uuidFileName;

        } catch (Exception e) {
            throw new RuntimeException("이미지 저장 실패", e);
        }
    }
}