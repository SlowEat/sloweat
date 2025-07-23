// src/components/user/ProfileSubscriptionMember.jsx
import React, { useState, useEffect } from "react";
import { useSubscription } from "../../api/subscription/useSubscription";
import { paymentApi } from "../../api/payment/paymentApi";
import { subscriptionApi } from "../../api/subscription/subscriptionApi";
import RefundModal from "./RefundModal";
import PaymentMethodChangeModal from './PaymentMethodChangeModal'
import "../../styles/user/ProfileSubscription.css";


const ProfileSubscriptionMember = ({ userId }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentChangeModalOpen, setIsPaymentChangeModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // RefundModal 관련 상태 추가
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundTargetPaymentId, setRefundTargetPaymentId] = useState(null);

  const {
    subscription,
    loading,
    error,
    isActive,
    cancelSubscription,
    getNextBillingDate,
    getStatusLabel,
    refreshSubscription
  } = useSubscription(userId);

  // 결제 내역 조회
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!userId) return;

      try {
        setPaymentLoading(true);
        const payments = await paymentApi.getPaymentsByUser(userId);
         console.log('결제 내역 raw data:', payments);
        setPaymentHistory(payments);
      } catch (err) {
        console.error('결제 내역 조회 실패:', err);
      } finally {
        setPaymentLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  // 구독 취소 처리
  const handleCancelSubscription = async () => {
    if (!subscription?.subscriptionId) return;

    const confirmed = window.confirm(
      '구독을 취소하시겠습니까?\n현재 결제 기간이 끝날 때까지 서비스를 이용할 수 있습니다.'
    );

    if (!confirmed) return;

    try {
      await cancelSubscription();
      alert('구독이 취소되었습니다.');
      await refreshSubscription();
    } catch (err) {
      console.error('구독 취소 실패:', err);
      alert('구독 취소에 실패했습니다: ' + err.message);
    }
  };

  // 환불 요청 버튼 클릭 - 모달 열기
  const handleRefundButtonClick = (paymentId) => {
    setRefundTargetPaymentId(paymentId);
    setIsRefundModalOpen(true);
  };

  // 환불 모달에서 제출
  const handleRefundSubmit = async (reason) => {
    if (!refundTargetPaymentId || !reason) return;

    try {
      setRefundLoading(true);
      await paymentApi.requestRefund(refundTargetPaymentId, reason);
      alert('환불 요청이 완료되었습니다.');

      // 결제 내역 새로고침
      const updatedPayments = await paymentApi.getPaymentsByUser(userId);
      setPaymentHistory(updatedPayments);
    } catch (err) {
      console.error('환불 요청 실패:', err);
      alert('환불 요청에 실패했습니다: ' + err.message);
    } finally {
      setRefundLoading(false);
      setRefundTargetPaymentId(null);
    }
  };

  // 환불 모달 닫기
  const handleRefundModalClose = () => {
    setIsRefundModalOpen(false);
    setRefundTargetPaymentId(null);
  };

  // 결제 수단 변경
  // 사용자 정보 조회 (결제 수단 변경에 필요)
      useEffect(() => {
          const fetchUserInfo = async () => {
              try {
                  const userData = await subscriptionApi.getSubscriptionUser();
                  setUserInfo(userData);
              } catch (err) {
                  console.error('사용자 정보 조회 실패:', err);
              }
          };

          if (userId) {
              fetchUserInfo();
          }
      }, [userId]);

      // 결제 수단 변경 버튼 클릭
      const handleChangePaymentMethod = () => {
          if (!userInfo) {
              alert('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
              return;
          }
          setIsPaymentChangeModalOpen(true);
      };

      // 결제 수단 변경 성공 처리
      const handlePaymentMethodChangeSuccess = async (newCustomerUid) => {
          try {
              console.log('결제 수단 변경 요청:', {
                  subscriptionId: subscription.subscriptionId,
                  newCustomerUid: newCustomerUid
              });

              // 백엔드 API 호출
              const updatedSubscription = await subscriptionApi.changePaymentMethod(
                  subscription.subscriptionId,
                  newCustomerUid
              );

              console.log('결제 수단 변경 성공:', updatedSubscription);

              // 구독 정보 및 결제 내역 새로고침
              await refreshSubscription();
              const updatedPayments = await paymentApi.getPaymentsByUser(userId);
              setPaymentHistory(updatedPayments);

              alert('결제 수단이 성공적으로 변경되었습니다!');

          } catch (err) {
              console.error('결제 수단 변경 API 호출 실패:', err);
              throw new Error(err.response?.data?.message || '결제 수단 변경에 실패했습니다.');
          }
      };

      // 결제 수단 변경 모달 닫기
      const handlePaymentChangeModalClose = () => {
          setIsPaymentChangeModalOpen(false);
      };


  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // 금액 포맷팅
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  if (loading) {
    return <div className="loading">구독 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">오류가 발생했습니다: {error}</div>;
  }

  if (!subscription) {
    return <div className="no-subscription">활성 구독이 없습니다.</div>;
  }

  // paymentHistory에서 가장 최근 결제된 건 필터링 (status === 'PAID'인 것 중에서 최신)
  const latestPaidPayment = paymentHistory
    .filter(p => p.status === 'PAID')
    .sort((a, b) => new Date(b.payDate) - new Date(a.payDate))[0];

  // 카드사, 카드 번호가 없으면 '정보 없음' 표시
  const cardCompany = latestPaidPayment?.cardCompany || '정보 없음';
  const cardNumber = latestPaidPayment?.cardNumberMasked || '정보 없음';

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
              <p className="status">상태: {getStatusLabel()}</p>
              <p className="price">월 {formatAmount(subscription.amount || 9900)}원</p>
              {isActive && (
                <p className="next-billing">
                  다음 결제일: {getNextBillingDate() || formatDate(subscription.endDate)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 결제 수단 */}
      <div className="payment-method">
        <div className="section-header">
          <h3>현재 결제 수단</h3>
          <button
            className="change-payment-btn"
            onClick={handleChangePaymentMethod}
          >
            결제 수단 변경
          </button>
        </div>
       <div className="payment-card">
             <span className="card-icon">💳</span>
             <div className="card-details">
               <h4>등록된 카드</h4>
               <p>카드사: {cardCompany} <br/> 카드 번호: {cardNumber} </p>

             </div>
           </div>
      </div>

      {/* 결제 내역 */}
      <div className="payment-history">
        <h3>결제 내역</h3>
        {paymentLoading ? (
          <div className="loading">결제 내역을 불러오는 중...</div>
        ) : paymentHistory.length === 0 ? (
          <div className="no-history">결제 내역이 없습니다.</div>
        ) : (
          paymentHistory.map((payment) => {
            const paymentDate = new Date(payment.payDate);
            const now = new Date();
            const diffInMs = now - paymentDate;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            const withinThreeDays = diffInDays <= 3;

            return (
              <div key={payment.paymentId} className="payment-record">
                <span className="receipt-icon">🧾</span>
                <div className="record-details">
                  <time>{formatDate(payment.payDate)}</time>
                  <p>{payment.methodLabel} ({payment.cardCompany})</p>
                  <p className="amount">{formatAmount(payment.amount)}원</p>
                  <p className="status">
                    {payment.statusLabel}
                    {payment.refundStatus === 'REQUEST' && ' (환불 요청 중)'}
                    {payment.refundStatus === 'APPROVE' && ' (환불 완료)'}
                    {payment.refundStatus === 'REJECT' && ' (환불 거부)'}
                  </p>
                </div>
                {payment.status === 'PAID' &&
                  payment.refundStatus !== 'REQUEST' &&
                  payment.refundStatus !== 'APPROVE' &&
                  withinThreeDays && (
                    <button
                      className="refund-btn"
                      onClick={() => handleRefundButtonClick(payment.paymentId)}
                      disabled={refundLoading}
                    >
                      {refundLoading ? '처리 중...' : '환불 요청'}
                    </button>
                  )}
              </div>
            );
          })
        )}
      </div>

      {/* 구독 취소 */}
      {isActive && (
        <div className="subscription-cancel">
          <h3>구독 취소</h3>
          <p>
            구독을 취소하시면 다음 결제일부터 요금이 청구되지 않으며,
            현재 결제 기간이 끝날 때까지 프리미엄 기능을 이용하실 수 있습니다.
          </p>
          <button
            className="cancel-btn"
            onClick={handleCancelSubscription}
            disabled={loading}
          >
            {loading ? '처리 중...' : '구독 취소'}
          </button>
        </div>
      )}

      {/* RefundModal 추가 */}
      <RefundModal
        isOpen={isRefundModalOpen}
        onClose={handleRefundModalClose}
        onSubmit={handleRefundSubmit}
      />

      {/* PaymentMethodChangeModal 추가 */}
       <PaymentMethodChangeModal
         isOpen={isPaymentChangeModalOpen}
         onClose={handlePaymentChangeModalClose}
         onSuccess={handlePaymentMethodChangeSuccess}
         userInfo={userInfo}
         urrentSubscription={subscription}
       />
    </div>
  );
};

export default ProfileSubscriptionMember;