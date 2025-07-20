package com.sloweat.domain.comment.service;

import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.comment.entity.CommentLike;
import com.sloweat.domain.comment.repository.CommentLikeRepository;
import com.sloweat.domain.comment.repository.CommentRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Transactional
    public void likeComment(Integer commentId, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        boolean alreadyLiked = commentLikeRepository.existsByCommentAndUser(comment, user);
        if (!alreadyLiked) {
            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .build();
            commentLikeRepository.save(commentLike);

            comment.setLikeCount(comment.getLikeCount() + 1);
            commentRepository.save(comment);
        }
    }

    @Transactional
    public void unlikeComment(Integer commentId, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        CommentLike commentLike = commentLikeRepository.findByCommentAndUser(comment, user)
                .orElseThrow(() -> new IllegalArgumentException("좋아요 기록 없음"));
        commentLikeRepository.delete(commentLike);

        comment.setLikeCount(comment.getLikeCount() - 1);
        commentRepository.save(comment);
    }
}
