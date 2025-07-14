package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReportRepository extends JpaRepository<CommentReport, Integer> {
}
