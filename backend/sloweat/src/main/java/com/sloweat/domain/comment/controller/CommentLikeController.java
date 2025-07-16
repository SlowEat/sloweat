package com.sloweat.domain.comment.controller;

import com.sloweat.domain.comment.service.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    @PostMapping("/comments/{commentId}/like")
    public void likeComment(@PathVariable Integer commentId, @RequestParam Integer userId) {
        commentLikeService.likeComment(commentId, userId);
    }

    @DeleteMapping("/comments/{commentId}/like")
    public void unlikeComment(@PathVariable Integer commentId, @RequestParam Integer userId) {
        commentLikeService.unlikeComment(commentId, userId);
    }
}
