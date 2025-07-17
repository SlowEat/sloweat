package com.sloweat.domain.follow.controller;

import com.sloweat.domain.follow.dto.FollowRequestDto;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.service.FollowService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
            HttpSession session) {

        Integer fromUserId = 1;

        followService.follow(fromUserId, requestDto);
        return ResponseEntity.ok().build();
    }

    // 언팔로우 요청
    @DeleteMapping("/follow")
    public ResponseEntity<Void> unfollow(
            @RequestParam("toUserId") Integer toUserId,
            HttpSession session) {

        Integer fromUserId = 1;

        followService.unfollow(fromUserId, toUserId);
        return ResponseEntity.ok().build();
    }

    // 팔로워 목록
    @GetMapping("/followers")
    public ResponseEntity<List<FollowResponseDto>> getFollowers(
            HttpSession session) {

        Integer userId = 1;
        return ResponseEntity.ok(followService.getFollowers(userId));
    }

    // 팔로잉 목록
    @GetMapping("/followings")
    public ResponseEntity<List<FollowResponseDto>> getFollowings(
            HttpSession session) {
        Integer userId = 1;

        return ResponseEntity.ok(followService.getFollowings(userId));
    }
}
