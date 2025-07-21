package com.sloweat.domain.comment.service;

import com.sloweat.common.util.SecurityUtil;
import com.sloweat.domain.comment.dto.CommentRequest;
import com.sloweat.domain.comment.dto.CommentResponse;
import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.comment.repository.CommentRepository;
import com.sloweat.domain.recipe.repository.RecipeRepository;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    @Transactional
    public CommentResponse createComment(Integer recipeId, Integer userId, CommentRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피 없음"));
        Comment parent = null;
        if (request.getParentId() != null) {
            parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모댓글 없음"));
        }
        Comment comment = Comment.builder()
                .user(user)
                .recipe(recipe)
                .parent(parent)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .likeCount(0)
                .isDeleted(false)
                .build();
        Comment saved = commentRepository.save(comment);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<CommentResponse> getComments(Integer recipeId, Pageable pageable) {
        Page<Comment> comments = commentRepository.findByRecipe_RecipeIdAndIsDeletedFalse(recipeId, pageable);
        return comments.map(this::toResponse);
    }

    @Transactional
    public CommentResponse updateComment(Integer commentId, Integer userId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("작성자만 수정 가능");
        }
        comment.setContent(content);
        comment.setUpdatedAt(LocalDateTime.now());
        Comment saved = commentRepository.save(comment);
        return toResponse(saved);
    }

    @Transactional
    public void deleteComment(Integer commentId, Integer userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("작성자만 삭제 가능");
        }
        comment.setIsDeleted(true);
        commentRepository.save(comment);
    }

    private CommentResponse toResponse(Comment comment) {
        Integer currentUserId = SecurityUtil.getCurrentUserId().orElse(null);
        boolean isMine = currentUserId != null && currentUserId.equals(comment.getUser().getUserId());

        return CommentResponse.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .userId(comment.getUser().getUserId())
                .username(comment.getUser().getNickname())
                .parentId(comment.getParent() != null ? comment.getParent().getCommentId() : null)
                .likeCount(comment.getLikeCount())
                .createdAt(comment.getCreatedAt())
                .isDeleted(comment.getIsDeleted())
                .status(comment.getStatus().name())
                .isMine(isMine)
                .build();
    }
}
