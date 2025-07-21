import { useState } from 'react';
import '../../styles/user/PremiumContentOverlay.css';

const PremiumContentOverlay = ({ children, isSubscribed = false, onSubscribe }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOverlayClick = () => {
    if (isSubscribed) {
      setShowConfirm(true);
    }
  };

  const handleConfirmSubscribe = () => {
    setShowConfirm(false);
    if (onSubscribe) {
      onSubscribe();
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // isSubscribed가 true면 그대로 보여주기
  if (!isSubscribed) {
    return children;
  }

  return (
    <div className="premium-content-container">
      <div className="premium-content-blur">
        {children}
      </div>

      <div className="premium-overlay" onClick={handleOverlayClick}>
        <div className="premium-badge">
          <span className="star-icon">★</span>
          <span className="premium-text">프리미엄으로 전체 보기</span>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal">
            <button className="close-btn" onClick={handleCancel}>
              ×
            </button>
            <h3>프리미엄 구독이 필요합니다</h3>
            <p>이 레시피의 전체 내용을 보려면<br />프리미엄 구독이 필요합니다.</p>
            <div className="confirm-buttons">
              <button className="subscribe-btn" onClick={handleConfirmSubscribe}>
                구독하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumContentOverlay;