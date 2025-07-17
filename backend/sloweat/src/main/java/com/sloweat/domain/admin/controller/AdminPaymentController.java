package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.payment.AdminPaymentRequest;
import com.sloweat.domain.admin.dto.payment.AdminPaymentResponse;
import com.sloweat.domain.admin.repository.payment.AdminPaymentRepository;
import com.sloweat.domain.admin.service.AdminPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 관리자 권한 체크 (PreAuthorize 적용 예정)
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminPaymentController {
  private final AdminPaymentService adminPaymentService;

  @GetMapping("/payments")
  public Page<AdminPaymentResponse> getPayments(@RequestParam(required = false) String nickname,
      @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable){
    AdminPaymentRequest request = new AdminPaymentRequest(nickname);
    return adminPaymentService.getPayments(request, pageable);
  }

  @PatchMapping("/payments/{subscriptionId}/reject")
  public ResponseEntity<Void> rejectRefundBySubscriptionId(
      @PathVariable Integer subscriptionId) {
    adminPaymentService.rejectRefundBySubscriptionId(subscriptionId);
    return ResponseEntity.noContent().build();
  }
}
