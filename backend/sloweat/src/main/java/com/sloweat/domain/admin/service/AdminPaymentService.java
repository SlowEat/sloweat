package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.payment.AdminPaymentRequest;
import com.sloweat.domain.admin.dto.payment.AdminPaymentResponse;
import com.sloweat.domain.admin.repository.payment.AdminPaymentRepository;
import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.payment.entity.Payment.RefundStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminPaymentService {
  private final AdminPaymentRepository adminPaymentRepository;

  public Page<AdminPaymentResponse> getPayments(AdminPaymentRequest request, Pageable pageable) {
    return adminPaymentRepository.getPayments(request, pageable);
  }

  // 환불 요청 거절
  @Transactional
  public void rejectRefundBySubscriptionId(Integer subscriptionId){
    Payment payment = adminPaymentRepository.findLatestPayment(subscriptionId)
        .orElseThrow(()-> new EntityNotFoundException("해당 구독에 대한 결제 내역이 존재하지 않습니다."));

    if(payment.getRefundStatus() != RefundStatus.REQUEST){
      throw new IllegalArgumentException("환불 요청 상태가 아닙니다.");
    }

    payment.setRefundStatus(RefundStatus.REJECT);
  }
}
