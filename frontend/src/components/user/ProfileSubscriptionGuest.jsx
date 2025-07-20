// src/components/user/ProfileSubscriptionGuest.jsx
import React, { useState, useEffect } from "react";
import { paymentService } from "../../api/payment/paymentService";
import { useSubscription } from "../../api/subscription/useSubscription";
import "../../styles/user/ProfileSubscription.css";

const ProfileSubscriptionGuest = ({ userId, userInfo }) => {
  console.log('userInfo:', userInfo);
  const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [subscriptionStep, setSubscriptionStep] = useState('ready'); // ready, processing, completed

  const { createSubscription, loading: subscriptionLoading } = useSubscription(userId, false);

  // 아임포트 초기화
  useEffect(() => {
    const initPayment = async () => {
      try {
        await paymentService.initializePayment();
        setIsPaymentInitialized(true);
      } catch (error) {
        console.error('결제 시스템 초기화 실패:', error);
        setPaymentError('결제 시스템을 초기화할 수 없습니다.');
      }
    };

    initPayment();
  }, []);

  // 구독 결제 처리
  const handleSubscribe = async () => {
    if (!isPaymentInitialized) {
      alert('결제 시스템이 아직 준비되지 않았습니다.');
      return;
    }

    if (!userInfo) {
      alert('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    try {
      setPaymentLoading(true);
      setPaymentError(null);
      setSubscriptionStep('processing');

      // 1. 빌링키 발급을 위한 카드 등록 데이터 생성
      const billingKeyData = paymentService.createBillingKeyData({
        userId: userId,
        email: userInfo.id,
        name: userInfo.nickname
      });

      console.log('빌링키 발급 데이터:', billingKeyData);

      // 2. 아임포트 결제 창 호출 (빌링키 발급)
      const billingKeyResponse = await paymentService.registerCard(billingKeyData);
      console.log('빌링키 발급 응답:', billingKeyResponse);
       debugger;
      // 3. 백엔드에 구독 생성 요청데이터
      const subscriptionData = {
        customerUid: billingKeyResponse.customer_uid, // 빌링키
        impUid: billingKeyResponse.imp_uid,
        merchantUid: billingKeyResponse.merchant_uid,
        amount: 9900, // 구독료
        orderName: 'SlowEat Premium 구독',
        paymentMethod: 'CARD',
        cardCompany: billingKeyResponse.card_name,
        cardNumberMasked:billingKeyResponse.card_number
      };

      console.log('구독 생성 요청 데이터:', subscriptionData);

      // 4. 구독 생성 API 호출
      const subscription = await createSubscription(subscriptionData);
      console.log('구독 생성 결과:', subscription);

      setSubscriptionStep('completed');
      alert('구독이 성공적으로 완료되었습니다!');

      // 페이지 새로고침 대신 상태 업데이트
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('구독 처리 중 오류:', error);
      setSubscriptionStep('ready');

      let errorMessage = '구독 처리 중 오류가 발생했습니다.';

      // 에러 메시지 상세 처리
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setPaymentError(errorMessage);

      // 사용자 친화적인 에러 메시지
      if (errorMessage.includes('카드')) {
        alert('카드 등록에 실패했습니다. 카드 정보를 다시 확인해주세요.');
      } else if (errorMessage.includes('결제')) {
        alert('결제 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('구독 처리 중 오류가 발생했습니다: ' + errorMessage);
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  // 에러 재시도
  const handleRetry = () => {
    setPaymentError(null);
    setSubscriptionStep('ready');
  };

  return (
    <div className="subscription-upgrade">
      <header className="upgrade-header">
        <h2>SlowEat Premium으로 업그레이드하세요</h2>
        <p>전문가 레시피와 독점 콘텐츠를 무제한으로 이용할 수 있습니다</p>
      </header>

      {paymentError && (
        <div className="error-message">
          <p>{paymentError}</p>
          <button
            className="retry-btn"
            onClick={handleRetry}
          >
            다시 시도
          </button>
        </div>
      )}

      {subscriptionStep === 'processing' && (
        <div className="processing-message">
          <p>구독을 처리 중입니다...</p>
          <p>결제 창이 열리면 카드 정보를 입력해주세요.</p>
        </div>
      )}

      <div className="premium-plan">
        <div className="plan-header">
          <h3>SlowEat Premium</h3>
          <div className="pricing">
            <span className="price">₩9,900</span>
            <span className="period">월</span>
          </div>
        </div>

        <ul className="features-list">
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>무제한 레시피 접근</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>전문가 요리 팁</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>우선 고객 지원</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>고급 필터링</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>오프라인 다운로드</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>개인 맞춤 추천</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>광고 없는 경험</span>
          </li>
        </ul>

        <button
          className="subscribe-btn"
          onClick={handleSubscribe}
          disabled={paymentLoading || subscriptionLoading || !isPaymentInitialized || subscriptionStep === 'processing'}
        >
          {subscriptionStep === 'processing' ? '처리 중...' :
           paymentLoading || subscriptionLoading ? '로딩 중...' : '구독하기'}
        </button>

        <p className="subscription-note">
          언제든지 취소 가능 • 안전한 결제 • 7일 무료 체험
        </p>
      </div>



      <div className="faq-section">
        <h3>자주 묻는 질문</h3>
        <details className="faq-item">
          <summary>빌링키란 무엇인가요?</summary>
          <p>빌링키는 매월 자동 결제를 위한 카드 등록 정보입니다. 카드 번호는 안전하게 암호화되어 저장됩니다.</p>
        </details>
        <details className="faq-item">
          <summary>결제는 어떻게 처리되나요?</summary>
          <p>안전한 PG사(이니시스)를 통해 결제가 처리되며, 카드 정보는 암호화되어 안전하게 보관됩니다.</p>
        </details>
        <details className="faq-item">
          <summary>공동인증서가 필요한가요?</summary>
          <p>아니요, 일반적인 카드 결제이므로 공동인증서는 필요하지 않습니다. 카드 정보만 입력하시면 됩니다.</p>
        </details>
        <details className="faq-item">
          <summary>언제든지 플랜을 변경할 수 있나요?</summary>
          <p>네, 언제든지 플랜을 변경하실 수 있습니다. 변경사항은 다음 결제 주기부터 적용됩니다.</p>
        </details>
        <details className="faq-item">
          <summary>구독을 취소하면 어떻게 되나요?</summary>
          <p>구독을 취소하시면 현재 결제 주기가 끝날 때까지 모든 프리미엄 기능을 계속 이용하실 수 있습니다.</p>
        </details>
      </div>
    </div>
  );
};

export default ProfileSubscriptionGuest;