package com.sloweat.domain.comment.controller;

import com.sloweat.domain.comment.dto.CommentRequest;
import com.sloweat.domain.comment.dto.CommentResponse;
import com.sloweat.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{recipeId}/comments")
    public CommentResponse createComment(@PathVariable Integer recipeId, @RequestBody CommentRequest request) {
        return commentService.createComment(recipeId, request);
    }

    @GetMapping("/{recipeId}/comments")
    public List<CommentResponse> getComments(@PathVariable Integer recipeId) {
        return commentService.getComments(recipeId);
    }

    @PatchMapping("/comments/{commentId}")
    public CommentResponse updateComment(@PathVariable Integer commentId,
                                         @RequestParam Integer userId,
                                         @RequestBody CommentRequest request) {
        return commentService.updateComment(commentId, userId, request.getContent());
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Integer commentId, @RequestParam Integer userId) {
        commentService.deleteComment(commentId, userId);
    }
}
