import React, { useState } from 'react';
import '../../styles/user/Profile.css';

function Profile({ isMine = true, isPremium = false, initialFollowing = false }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="mypage-profile-box">
      <div className="mypage-profile-view">
        <div className="mypage-profile-layout">
          <img
            className="mypage-profile-image"
            src="https://c.animaapp.com/Zjq86JVx/img/image@2x.png"
            alt="김요리의 프로필 사진"
          />

          <div className="mypage-profile-info">
            <div className="mypage-profile-header">
              <h1 className="mypage-profile-name">김요리</h1>

              {isMine && isPremium && (
                <div className="mypage-profile-premium-badge">
                  <img
                    className="mypage-profile-premium-icon"
                    src="https://c.animaapp.com/Zjq86JVx/img/frame.svg"
                    alt="프리미엄 아이콘"
                  />
                  <span className="mypage-profile-premium-text">프리미엄</span>
                </div>
              )}

              {!isMine && (
                <button
                  className={`mypage-profile-follow-button ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </button>
              )}
            </div>

            <p className="mypage-profile-username">@kimcook</p>
            <p className="mypage-profile-description">
              집에서 만드는 건강한 요리를 사랑하는 요리사입니다.
            </p>

            <ul className="mypage-profile-stats">
              <li className="mypage-profile-stat-item">
                <span className="mypage-profile-stat-value">1,234</span>
                <span className="mypage-profile-stat-label">팔로워</span>
              </li>
              <li className="mypage-profile-stat-item">
                <span className="mypage-profile-stat-value">567</span>
                <span className="mypage-profile-stat-label">팔로잉</span>
              </li>
              <li className="mypage-profile-stat-item">
                <span className="mypage-profile-stat-value">89</span>
                <span className="mypage-profile-stat-label">게시물</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
