package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.AdminCommentRequest;
import com.sloweat.domain.admin.dto.AdminCommentResponse;
import com.sloweat.domain.admin.repository.AdminCommentRepository;
import com.sloweat.domain.admin.repository.AdminRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminCommentService {

  private final AdminCommentRepository adminCommentRepository;

  public Page<AdminCommentResponse> getComments(AdminCommentRequest request, Pageable pageable) {
    return adminCommentRepository.getComments(request, pageable);
  }
}
