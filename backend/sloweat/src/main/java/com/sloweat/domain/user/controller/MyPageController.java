package com.sloweat.domain.user.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.user.dto.MyPageCommentResponseDto;
import com.sloweat.domain.user.dto.MyPageRecipeResponseDto;
import com.sloweat.domain.user.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mypage/")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    // 내가 쓴 게시글 조회
    @GetMapping("/recipes")
    public ResponseEntity<List<MyPageRecipeResponseDto>> getMyRecipes(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Integer userId = userDetails.getUserId();

        List<MyPageRecipeResponseDto> myRecipes = myPageService.getMyRecipes(userId);
        return ResponseEntity.ok(myRecipes);
    }

    // 내가 쓴 댓글 조회
    @GetMapping("/comments")
    public ResponseEntity<List<MyPageCommentResponseDto>> getMyComments(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Integer userId = userDetails.getUserId();

        List<MyPageCommentResponseDto> myComments = myPageService.getMyComments(userId);
        return ResponseEntity.ok(myComments);
    }

}
