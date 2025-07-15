import React from "react";
import "../../styles/user/ProfileSubscriptionMember.css";

const ProfileSubscriptionMember = () => {
  return (
    <main className="box">
      <section className="view">
        <div className="div">
          <h1 className="text-wrapper-6">프로필</h1>
          <nav>
            <a href="#account-settings" className="view-3">
              <div className="overlap-3">
                <span className="text-wrapper-8">계정 설정</span>
              </div>
            </a>
            <a href="#subscription-management" className="view-2">
              <div className="overlap-2">
                <span className="text-wrapper-7">구독 관리</span>
              </div>
            </a>
          </nav>
          {/* 현재 구독 내용 */}
          <section id="current-subscription" className="view-4">
            <div className="overlap-4">
              <h2 className="text-wrapper-9">현재 구독 내용</h2>
              <div className="group">
                <div className="overlap-group-3">
                  <div className="group-2" style={{ display: "flex", alignItems: "center" }}>
                    <span
                      role="img"
                      aria-label="premium"
                      style={{ fontSize: 24, marginRight: 14 }}
                    >
                      💎
                    </span>
                    <div>
                      <h3 className="text-wrapper-10">SlowEat Premium</h3>
                      <p className="p">프리미엄 레시피와 전문가 팁을 무제한으로 이용하세요</p>
                      <p className="text-wrapper-11">월 9,900원</p>
                      <p className="text-wrapper-12">다음 결제일: 2024-02-15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 결제 수단 */}
          <section id="payment-method" className="view-7">
            <div className="overlap-6">
              <h2 className="text-wrapper-16">현재 결제 수단</h2>
              <button className="view-8">
                <div className="overlap-group-5">
                  <span className="text-wrapper-17">결제 수단 변경</span>
                </div>
              </button>
              <div className="group-wrapper">
                <div className="group-3" style={{ display: "flex", alignItems: "center" }}>
                  <span
                    role="img"
                    aria-label="credit-card"
                    style={{ fontSize: 24, marginRight: 14, marginLeft: 0 }}
                  >
                    💳
                  </span>
                  <div>
                    <h3 className="text-wrapper-18">신한카드</h3>
                    <p className="text-wrapper-19">**** **** **** 1234</p>
                    <p className="text-wrapper-20">유효기간: 12/26</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 결제 내역 */}
          <section id="payment-history" className="overlap-wrapper">
            <div className="overlap">
              <h2 className="text-wrapper-5">결제 내역</h2>
              <div className="overlap-group-wrapper">
                <div className="overlap-group" style={{ display: "flex", alignItems: "center" }}>
                  <span
                    role="img"
                    aria-label="receipt"
                    style={{ fontSize: 22, marginRight: 13 }}
                  >
                    🧾
                  </span>
                  <div>
                    <time className="text-wrapper">2024-01-15</time>
                    <p className="text-wrapper-2">신한카드 ****1234</p>
                    <p className="text-wrapper-3">9,900원</p>
                  </div>
                  <button className="div-wrapper">
                    <div className="overlap-group-2">
                      <span className="text-wrapper-4">환불 요청</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* 구독 취소 */}
          <section id="cancel-subscription" className="view-5">
            <div className="overlap-5">
              <h2 className="text-wrapper-13">구독 취소</h2>
              <p className="text-wrapper-14">
                구독을 취소하시면 다음 결제일부터 요금이 청구되지 않으며, 현재 결제 기간이 끝날 때까지 프리미엄 기능을
                이용하실 수 있습니다.
              </p>
              <button className="view-6">
                <div className="overlap-group-4">
                  <span className="text-wrapper-15">구독 취소</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProfileSubscriptionMember;
