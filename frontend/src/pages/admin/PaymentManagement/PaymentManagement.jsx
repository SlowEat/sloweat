import React, { useEffect, useState } from "react";
import "./PaymentManagement.css";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const dummyPayments = [
      {
        id: 1,
        userId: 1,
        date: "2024-01-01",
        amount: "9,900원",
        period: "1개월",
        status: "결제완료",
      },
      {
        id: 2,
        userId: 2,
        date: "2024-01-05",
        amount: "9,900원",
        period: "1개월",
        status: "결제완료",
      },
      {
        id: 3,
        userId: 1,
        date: "2023-12-01",
        amount: "9,900원",
        period: "1개월",
        status: "환불완료",
      },
    ];
    setPayments(dummyPayments);
  }, []);

  return (
    <div className="payment-wrapper">
      <div className="payment-content-box">
        <div className="payment-page-header">
          <h1 className="payment-page-title">결제 관리</h1>
          <div className="payment-search">
            <input type="text" placeholder="검색..." className="payment-search-input" />
            <img
              src="https://c.animaapp.com/rgpZJ8Rs/img/frame-4.svg"
              alt="검색"
              className="payment-search-icon"
            />
          </div>
        </div>

        <div className="payment-section-title">결제 내역</div>

        <section className="payment-table">
          <div className="payment-table-header payment-grid">
            <span>결제 ID</span>
            <span>회원 ID</span>
            <span>결제일</span>
            <span>금액</span>
            <span>기간</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {payments.map((payment) => (
            <div className="payment-table-row payment-grid" key={payment.id}>
              <span>{payment.id}</span>
              <span>{payment.userId}</span>
              <span>{payment.date}</span>
              <span>{payment.amount}</span>
              <span>{payment.period}</span>
              <span>
                <span
                  className={`payment-badge ${
                    payment.status === "결제완료" ? "payment-complete" : "payment-refunded"
                  }`}
                >
                  {payment.status}
                </span>
              </span>
              <span>
                {payment.status === "결제완료" ? (
                  <button className="refund-btn">환불</button>
                ) : (
                  <span>-</span>
                )}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
export default PaymentManagement;