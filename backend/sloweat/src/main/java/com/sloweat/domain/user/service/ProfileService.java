package com.sloweat.domain.user.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.follow.repository.FollowRepository;
import com.sloweat.domain.recipe.repository.RecipeRepository;
import com.sloweat.domain.subscription.entity.Subscription;
import com.sloweat.domain.subscription.repository.SubscriptionRepository;
import com.sloweat.domain.user.dto.MyProfileResponseDTO;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

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

        String id =  user.getLocalEmail() != null
                ? user.getLocalEmail()
                : user.getKakaoEmail().split("@")[0];

        long follower_cnt = followRepository.countByFollowing(user);
        long following_cnt = followRepository.countByFollower(user);

        long post_cnt = recipeRepository.countByUser(user);

        return  MyProfileResponseDTO.builder()
                .nickname(user.getNickname())
                .id(id)
                .profileImgPath(user.getProfileImgPath())
                .introduce(user.getIntroduce())
                .isSubscribed(subscriptionRepository.existsByUserUserIdAndStatus(userId, Subscription.Status.ACTIVE))
                .followerCnt(follower_cnt)
                .followingCnt(following_cnt)
                .postCnt(post_cnt)
                .build();
    }
}