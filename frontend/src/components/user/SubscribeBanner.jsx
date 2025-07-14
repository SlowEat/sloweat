import "../../styles/user/SubscribeBanner.css"; 

export default function SubscribeBanner() {
  return (
    <main className="subscribe-banner-box" data-model-id="141:152-frame">
      <div className="subscribe-banner-view">
        <header className="subscribe-banner-header">
          <img
            className="subscribe-banner-logo"
            src="https://c.animaapp.com/MFU05cEg/img/frame.svg"
            alt="SlowEat Premium logo"
          />
          <h1 className="subscribe-banner-title">SlowEat Premium</h1>
          <p className="subscribe-banner-description">
            프리미엄 레시피와 전문가 팁을<br></br>무제한으로 이용하세요
          </p>
        </header>
        <div className="subscribe-banner-cta-container">
          <button className="subscribe-banner-cta-button">
            <span className="subscribe-banner-cta-text">구독하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
