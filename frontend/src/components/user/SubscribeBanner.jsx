import "../../styles/user/SubscribeBanner.css"; 
import {useNavigate} from "react-router-dom"

export default function SubscribeBanner() {
  const navigate = useNavigate();

  //유료 구독 페이지 이동
  const handleAdClick = () => {
    const confirm = window.confirm('구독 페이지로 이동하시겠습니까?')
    if(confirm){
      navigate('/settings', { state: { tab: 'subscription' } });
    }
  }
  

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
            ✓ 전문가/셰프 프리미엄 영상 제공<br />
            ✓ 광고 없는 경험<br />
            ✓ 무제한 북마크 컬렉션<br />
            ✓ 전문가/셰프 프리미엄 영상 제공<br />
          </p>
        </header>
        <div className="subscribe-banner-cta-container">
          <button className="subscribe-banner-cta-button" onClick={handleAdClick}>
            <span className="subscribe-banner-cta-text">구독하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
