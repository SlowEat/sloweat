package com.sloweat.domain.admin.repository.payment;

import com.sloweat.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminPaymentRepository extends JpaRepository<Payment, Integer>, AdminPaymentRepositoryCustom {

}
