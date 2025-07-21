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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        boolean alreadyReported = commentReportRepository.existsByCommentAndUser(comment, user);
        if (alreadyReported) {
            throw new IllegalStateException("이미 신고한 댓글입니다.");
        }

        CommentReport report = CommentReport.builder()
                .comment(comment)
                .user(user)
                .reason(reason)                      // ✅ 신고 사유 저장
                .createdAt(LocalDateTime.now())      // ✅ 생성일 저장 (null 방지)
                .build();

        commentReportRepository.save(report);
    }
}
