package com.sloweat.domain.admin.repository.payment;

import com.sloweat.domain.admin.dto.payment.AdminPaymentRequest;
import com.sloweat.domain.admin.dto.payment.AdminPaymentResponse;
import com.sloweat.domain.payment.entity.Payment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminPaymentRepositoryCustom {
  Page<AdminPaymentResponse> getPayments(AdminPaymentRequest request, Pageable pageable);
  Optional<Payment> findLatestPayment(Integer subscriptionId);
}
