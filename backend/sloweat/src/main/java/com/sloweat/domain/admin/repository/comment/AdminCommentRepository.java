package com.sloweat.domain.admin.repository.comment;

import com.sloweat.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminCommentRepository extends JpaRepository<Comment, Integer>, AdminCommentRepositoryCustom{

}
