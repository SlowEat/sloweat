package com.sloweat.domain.comment.service;

import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.comment.entity.CommentReport;
import com.sloweat.domain.comment.repository.CommentReportRepository;
import com.sloweat.domain.comment.repository.CommentRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentReportService {
    private final CommentReportRepository commentReportRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Transactional
    public void reportComment(Integer commentId, Integer userId, String reason) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        commentReportRepository.findByCommentAndUser(comment, user)
                .ifPresent(r -> {throw new IllegalStateException("이미 신고함");});
        CommentReport report = CommentReport.builder()
                .comment(comment)
                .user(user)
                .reason(reason)
                .createdAt(LocalDateTime.now())
                .build();
        commentReportRepository.save(report);

        comment.setStatus(Comment.Status.REQUEST);
        commentRepository.save(comment);
    }
}
