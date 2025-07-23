package com.sloweat.domain.admin.repository.comment;

import com.sloweat.domain.admin.dto.comment.AdminCommentRequest;
import com.sloweat.domain.admin.dto.comment.AdminCommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminCommentRepositoryCustom {
  Page<AdminCommentResponse> getComments(AdminCommentRequest request, Pageable pageable);
}
