package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.comment.entity.CommentReport;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReportRepository extends JpaRepository<CommentReport, Integer> {
    boolean existsByCommentAndUser(Comment comment, User user);
}
