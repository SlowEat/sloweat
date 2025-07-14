package com.sloweat.domain.payment.repository;

import com.sloweat.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Integer> {


}
