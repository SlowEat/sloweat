package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.CommentReport;
import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentReportRepository extends JpaRepository<CommentReport, Integer> {
    Optional<CommentReport> findByCommentAndUser(Comment comment, User user);
}
