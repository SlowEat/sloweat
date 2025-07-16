package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.CommentLike;
import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);
    void deleteByCommentAndUser(Comment comment, User user);
}
