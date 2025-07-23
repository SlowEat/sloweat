package com.sloweat.domain.comment.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.comment.service.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    @PostMapping("/comments/{commentId}/like")
    public void likeComment(@PathVariable Integer commentId,
                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentLikeService.likeComment(commentId, userDetails.getUserId());
    }

    @DeleteMapping("/comments/{commentId}/like")
    public void unlikeComment(@PathVariable Integer commentId,
                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentLikeService.unlikeComment(commentId, userDetails.getUserId());
    }
}
