package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.comment.AdminCommentRequest;
import com.sloweat.domain.admin.dto.comment.AdminCommentResponse;
import com.sloweat.domain.admin.repository.comment.AdminCommentRepository;
import com.sloweat.domain.admin.repository.comment_report.AdminCommentReportRepository;
import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.comment.entity.Comment.Status;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminCommentService {

  private final AdminCommentRepository adminCommentRepository;
  private final AdminCommentReportRepository adminCommentReportRepository;

  public Page<AdminCommentResponse> getComments(AdminCommentRequest request, Pageable pageable) {
    return adminCommentRepository.getComments(request, pageable);
  }

  @Transactional
  public void deleteComment(Integer commentId){
    Comment comment = adminCommentRepository.findById(commentId).orElseThrow(()-> new EntityNotFoundException("해당 댓글이 존재하지 않습니다."));

    adminCommentRepository.delete(comment);
  }

  @Transactional
  public void rejectReportComment(Integer commentId){
    Comment comment = adminCommentRepository.findById(commentId).orElseThrow(()-> new EntityNotFoundException("해당 댓글이 존재하지 않습니다."));

    // 신고 상태가 REQUEST일 경우에만 가능
    if(comment.getStatus() != Status.REQUEST){
      throw new IllegalStateException("댓글 신고 상태가 REQUEST일 경우에만 가능합니다.");
    }

    // REJECT로 상태 변경
    comment.setStatus(Status.REJECT);

    // 댓글 신고 테이블에서 지우기
    adminCommentReportRepository.deleteByComment(comment);

    // 저장
    adminCommentRepository.save(comment);
  }
}
