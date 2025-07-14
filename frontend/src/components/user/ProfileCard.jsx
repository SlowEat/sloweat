import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user/ProfileCard.css';

export default function ProfileCard() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const toggleLogout = (e) => {
    e.stopPropagation(); // 부모 클릭 방지
    setShowLogout((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    alert('로그아웃 되었습니다.');
    setShowLogout(false);
  };

  const handleNavigate = () => {
    navigate('/mypage');
  };

  return (
    <div className="profilecard-link" onClick={handleNavigate}>
      <div className="profilecard-view">
        <div className="profilecard-content">
          <img
            className="profilecard-image"
            src="https://c.animaapp.com/0RwLred6/img/-----@2x.png"
            alt="Profile picture of Kim Cook"
          />
          <div className="profilecard-info">
            <h1 className="profilecard-name">김요리</h1>
            <p className="profilecard-username">@kimcook</p>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              className="profilecard-action"
              aria-label="profilecard actions"
              onClick={toggleLogout}
            >
              <img
                className="profilecard-frame"
                src="https://c.animaapp.com/0RwLred6/img/frame.svg"
                alt="로그아웃 버튼"
              />
            </button>

            {showLogout && (
              <div className="profilecard-logout-dropdown">
                <button className="profilecard-logout-button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
