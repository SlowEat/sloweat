package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {

}
