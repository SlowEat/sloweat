package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.payment.AdminPaymentRequest;
import com.sloweat.domain.admin.dto.payment.AdminPaymentResponse;
import com.sloweat.domain.admin.repository.payment.AdminPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminPaymentService {
  private final AdminPaymentRepository adminPaymentRepository;

  public Page<AdminPaymentResponse> getPayments(AdminPaymentRequest request, Pageable pageable) {
    return adminPaymentRepository.getPayments(request, pageable);
  }
}
