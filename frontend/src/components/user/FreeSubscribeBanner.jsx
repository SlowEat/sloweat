import "../../styles/user/FreeSubscribeBanner.css";

export default function SubscribeBanner() {
  return (
    <main className="free-subscribe-box" data-model-id="141:152-frame">
      <div className="free-subscribe-banner-view">
        <header className="free-subscribe-header">
          <img
            className="free-subscribe-logo"
            src="https://c.animaapp.com/MFU05cEg/img/frame.svg"
            alt="SlowEat Premium logo"
          />
          <h1 className="free-subscribe-title">1개월 무료!!</h1>
          <p className="free-subscribe-description">
            ✓ 전문가/셰프 프리미엄 영상 제공<br />
            ✓ 광고 없는 경험<br />
            ✓ 무제한 북마크 컬렉션<br />
            ✓ 전문가/셰프 프리미엄 영상 제공<br />
          </p>
        </header>
        <div className="free-subscribe-cta-container">
          <button className="free-subscribe-cta-button">
            <span className="free-subscribe-cta-text">시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
