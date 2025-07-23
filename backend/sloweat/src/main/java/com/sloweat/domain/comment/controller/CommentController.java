package com.sloweat.domain.comment.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.comment.dto.CommentRequest;
import com.sloweat.domain.comment.dto.CommentResponse;
import com.sloweat.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{recipeId}/comments")
    public CommentResponse createComment(
            @PathVariable Integer recipeId,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return commentService.createComment(recipeId, userDetails.getUserId(), request);
    }

    @GetMapping("/{recipeId}/comments")
    public Page<CommentResponse> getComments(
            @PathVariable Integer recipeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return commentService.getComments(recipeId, pageable);
    }

    @PatchMapping("/comments/{commentId}")
    public CommentResponse updateComment(
            @PathVariable Integer commentId,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return commentService.updateComment(commentId, userDetails.getUserId(), request.getContent());
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(
            @PathVariable Integer commentId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        commentService.deleteComment(commentId, userDetails.getUserId());
    }
}
