import React from "react";
import "../../styles/user/ProfileSubscription.css";



const  ProfileSubscriptionGuest = () => {
  return (
    <div className="subscription-upgrade">
      <header className="upgrade-header">
        <h2>SlowEat Premium으로 업그레이드하세요</h2>
        <p>전문가 레시피와 독점 콘텐츠를 무제한으로 이용할 수 있습니다</p>
      </header>

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

        <button className="subscribe-btn">구독하기</button>
        <p className="subscription-note">언제든지 취소 가능 • 7일 무료 체험</p>
      </div>

      <div className="faq-section">
        <h3>자주 묻는 질문</h3>
        <details className="faq-item">
          <summary>언제든지 플랜을 변경할 수 있나요?</summary>
          <p>네, 언제든지 플랜을 변경하실 수 있습니다. 변경사항은 다음 결제 주기부터 적용됩니다.</p>
        </details>
        <details className="faq-item">
          <summary>구독을 취소하면 어떻게 되나요?</summary>
          <p>구독을 취소하시면 현재 결제 주기가 끝날 때까지 모든 프리미엄 기능을 계속 이용하실 수 있습니다.</p>
        </details>
        <details className="faq-item">
          <summary>환불 정책은 어떻게 되나요?</summary>
          <p>구독 후 7일 이내에 취소하시면 전액 환불해드립니다. 그 이후에는 남은 기간에 대해 비례 환불해드립니다.</p>
        </details>
      </div>
    </div>
  );
};
export default ProfileSubscriptionGuest;
