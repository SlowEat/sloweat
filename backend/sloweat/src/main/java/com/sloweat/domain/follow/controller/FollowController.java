package com.sloweat.domain.follow.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.follow.dto.FollowRecommendDto;
import com.sloweat.domain.follow.dto.FollowRequestDto;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.service.FollowService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FollowController {

  private final FollowService followService;

  // 팔로우 요청
  @PostMapping("/follow")
  public ResponseEntity<Void> follow(
      @RequestBody FollowRequestDto requestDto,
      @AuthenticationPrincipal CustomUserDetails userDetails) {

    Integer fromUserId = userDetails.getUserId();

    followService.follow(fromUserId, requestDto);
    return ResponseEntity.ok().build();
  }

  // 언팔로우 요청
  @DeleteMapping("/follow/{userId}")
  public ResponseEntity<Void> unfollow(
      @PathVariable Integer userId,
      @AuthenticationPrincipal CustomUserDetails userDetails) {

    Integer fromUserId = userDetails.getUserId();

    followService.unfollow(fromUserId, userId);
    return ResponseEntity.ok().build();
  }

  // 팔로워 목록
  @GetMapping("/followers")
  public ResponseEntity<List<FollowResponseDto>> getFollowers(
      @AuthenticationPrincipal CustomUserDetails userDetails) {

    Integer userId = userDetails.getUserId();
    return ResponseEntity.ok(followService.getFollowers(userId));
  }

  // 팔로잉 목록
  @GetMapping("/followings")
  public ResponseEntity<List<FollowResponseDto>> getFollowings(
      @AuthenticationPrincipal CustomUserDetails userDetails) {

    Integer userId = userDetails.getUserId();
    return ResponseEntity.ok(followService.getFollowings(userId));
  }

  // 팔로우 추천 3명
  @GetMapping("/follow/recommend")
  public ResponseEntity<List<FollowRecommendDto>> getFollowRecommend(
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    Integer loginUserId = userDetails.getUserId();
    List<FollowRecommendDto> recommendations =  followService.getFollowRecommend(loginUserId);
    return ResponseEntity.ok(recommendations);
  }
}
