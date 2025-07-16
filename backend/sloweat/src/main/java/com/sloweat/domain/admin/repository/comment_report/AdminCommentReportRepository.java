package com.sloweat.domain.admin.repository.comment_report;
import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.comment.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminCommentReportRepository extends JpaRepository<CommentReport,Integer> {
  public void deleteByComment(Comment comment);
}
