import React from "react";
import "../../styles/user/ProfileSubscriptionGuest.css";

const ProfileSubscriptionGuest = () => {
  return (
    <main className="box">
      <section className="view">
        <nav className="div">
          <h1 className="text-wrapper">프로필</h1>
          <button className="overlap-group-wrapper">
            <div className="overlap-group">
              <span className="text-wrapper-2">구독 관리</span>
            </div>
          </button>
          <button className="overlap-wrapper">
            <div className="overlap">
              <span className="text-wrapper-3">계정 설정</span>
            </div>
          </button>
        </nav>
        <section className="view-2">
          <header className="view-3">
            <h2 className="text-wrapper-4">
              SlowEat Premium으로 업그레이드하세요
            </h2>
            <p className="p">
              전문가 레시피와 독점 콘텐츠를 무제한으로 이용할 수 있습니다
            </p>
          </header>
          <div className="view-wrapper">
            <article className="view-4">
              <header className="view-5">
                <h3 className="text-wrapper-5">SlowEat Premium</h3>
                <div className="div-wrapper">
                  <div className="overlap-group-2">
                    <span className="text-wrapper-6">\9,900</span>
                    <span className="text-wrapper-7">월</span>
                  </div>
                </div>
              </header>
              <ul className="view-6">
                <li>
                  <img className="frame" src="img/frame.svg" alt="" />
                  <span className="text-wrapper-8">무제한 레시피 접근</span>
                </li>
                <li>
                  <img className="img" src="img/frame-3.svg" alt="" />
                  <span className="text-wrapper-9">전문가 요리 팁</span>
                </li>
                <li>
                  <img className="frame-2" src="img/image.svg" alt="" />
                  <span className="text-wrapper-10">우선 고객 지원</span>
                </li>
                <li>
                  <img className="frame-3" src="img/frame-5.svg" alt="" />
                  <span className="text-wrapper-11">고급 필터링</span>
                </li>
                <li>
                  <img className="frame-4" src="img/frame-6.svg" alt="" />
                  <span className="text-wrapper-12">오프라인 다운로드</span>
                </li>
                <li>
                  <img className="frame-5" src="img/frame-4.svg" alt="" />
                  <span className="text-wrapper-13">개인 맞춤 추천</span>
                </li>
                <li>
                  <img className="frame-6" src="img/frame-2.svg" alt="" />
                  <span className="text-wrapper-14">광고 없는 경험</span>
                </li>
              </ul>
              <div className="view-7">
                <button className="overlap-2">
                  <span className="text-wrapper-15">구독하기</span>
                </button>
              </div>
              <p className="text-wrapper-16">
                언제든지 취소 가능 • 7일 무료 체험
              </p>
            </article>
          </div>
        </section>
        <section className="view-8">
          <h2 className="text-wrapper-17">자주 묻는 질문</h2>
          <details className="overlap-3">
            <summary className="text-wrapper-18">
              언제든지 플랜을 변경할 수 있나요?
            </summary>
            <p className="text-wrapper-19">
              네, 어쩌고 저쩌고. 변경사항은 다음 결제 주기부터 적용됩니다.
            </p>
          </details>
          <details className="overlap-4">
            <summary className="text-wrapper-20">
              구독을 취소하면 어떻게 되나요?
            </summary>
            <p className="text-wrapper-21">
              구독을 취소하시면 현재 결제 주기가 끝날 때까지 모든 프리미엄 기능을
              계속 이용하실 수 있습니다.
            </p>
          </details>
          <details>
            <summary className="text-wrapper-22">
              환불 정책은 어떻게 되나요?
            </summary>
            <p className="element">
              구독 후 7일 이내에 취소하시면 전액 환불해드립니다. 그 이후에는 남은
              기간에 대해 비례 환불해드립니다.
            </p>
          </details>
        </section>
      </section>
    </main>
  );
};

export default ProfileSubscriptionGuest;
