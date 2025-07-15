package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.AdminCommentRequest;
import com.sloweat.domain.admin.dto.AdminCommentResponse;
import com.sloweat.domain.admin.service.AdminCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
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
}
