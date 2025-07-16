import React from "react";
import "../../styles/user/ProfileSubscription.css";

const ProfileSubscriptionMember = () => {
  return (
    <div className="subscription-management">
      {/* 현재 구독 상태 */}
      <div className="subscription-status">
        <h3>현재 구독 내용</h3>
        <div className="subscription-card">
          <div className="subscription-info">
            <span className="premium-icon">💎</span>
            <div className="subscription-details">
              <h4>SlowEat Premium</h4>
              <p>프리미엄 레시피와 전문가 팁을 무제한으로 이용하세요</p>
              <p className="price">월 9,900원</p>
              <p className="next-billing">다음 결제일: 2024-02-15</p>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 수단 */}
      <div className="payment-method">
        <div className="section-header">
          <h3>현재 결제 수단</h3>
          <button className="change-payment-btn">결제 수단 변경</button>
        </div>
        <div className="payment-card">
          <span className="card-icon">💳</span>
          <div className="card-details">
            <h4>신한카드</h4>
            <p>**** **** **** 1234</p>
            <p>유효기간: 12/26</p>
          </div>
        </div>
      </div>

      {/* 결제 내역 */}
      <div className="payment-history">
        <h3>결제 내역</h3>
        <div className="payment-record">
          <span className="receipt-icon">🧾</span>
          <div className="record-details">
            <time>2024-01-15</time>
            <p>신한카드 ****1234</p>
            <p className="amount">9,900원</p>
          </div>
          <button className="refund-btn">환불 요청</button>
        </div>
      </div>

      {/* 구독 취소 */}
      <div className="subscription-cancel">
        <h3>구독 취소</h3>
        <p>
          구독을 취소하시면 다음 결제일부터 요금이 청구되지 않으며,
          현재 결제 기간이 끝날 때까지 프리미엄 기능을 이용하실 수 있습니다.
        </p>
        <button className="cancel-btn">구독 취소</button>
      </div>
    </div>
  );
};

export default ProfileSubscriptionMember;
