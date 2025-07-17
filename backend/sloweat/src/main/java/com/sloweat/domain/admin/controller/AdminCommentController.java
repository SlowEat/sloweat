package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.comment.AdminCommentRequest;
import com.sloweat.domain.admin.dto.comment.AdminCommentResponse;
import com.sloweat.domain.admin.service.AdminCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 관리자 권한 체크 (PreAuthorize 적용 예정)
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminCommentController {
  private final AdminCommentService adminCommentService;

  @GetMapping("/comments")
  public Page<AdminCommentResponse> getComments(
      @RequestParam(required = false) String content,
      @RequestParam(required = false) String author,
      @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
  ){
    AdminCommentRequest request = new AdminCommentRequest(content, author);
    return adminCommentService.getComments(request, pageable);
  }

  // 댓글 삭제
  @DeleteMapping("/comments/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Integer commentId){
    adminCommentService.deleteComment(commentId);
    return ResponseEntity.noContent().build();
  }

  // 댓글 반려
  @PostMapping("/comments/{commentId}/reject")
  public ResponseEntity<Void> rejectReportComment(@PathVariable Integer commentId){
    adminCommentService.rejectReportComment(commentId);
    return ResponseEntity.noContent().build();
  }
}
