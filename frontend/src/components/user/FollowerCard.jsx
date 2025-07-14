import React, { useState } from 'react';
import '../../styles/user/FollowerCard.css'; // 위 CSS 저장된 파일

function FollowerCard() {
  const dummyFollowers = [
    {
      id: 1,
      name: '베이킹퀸',
      username: '@baking_queen',
      followers: '12.5K',
      image: 'https://c.animaapp.com/nGuwZSJg/img/----2@2x.png'
    },
    {
      id: 2,
      name: '요리왕',
      username: '@cooking_master',
      followers: '8.3K',
      image: 'https://c.animaapp.com/nGuwZSJg/img/----2@2x.png'
    },
    {
      id: 3,
      name: '디저트러버',
      username: '@dessert_lover',
      followers: '5.7K',
      image: 'https://c.animaapp.com/nGuwZSJg/img/----2@2x.png'
    }
  ];

  return (
    <div className="follower-card-box">
      <section className="follower-card-view">
        <div className="follower-card-overlap">
          <h1 className="follower-card-title">추천 팔로워</h1>
          <ul className="follower-card-list">
            {dummyFollowers.map((follower) => (
              <FollowerCardItem
                key={follower.id}
                name={follower.name}
                username={follower.username}
                followers={follower.followers}
                image={follower.image}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function FollowerCardItem({ name, username, followers, image }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <li className="follower-card-item">
      <img
        className="follower-card-profile-image"
        src={image}
        alt={`${name} 프로필 이미지`}
      />
      <div className="follower-card-info">
        <h2 className="follower-card-name">{name}</h2>
        <p className="follower-card-username">{username}</p>
        <p className="follower-card-stats">
          <span className="follower-card-count">{followers}</span>
          <span className="follower-card-label">팔로워</span>
        </p>
      </div>
      <button
        className={`follower-card-button ${isFollowing ? 'following' : ''}`}
        onClick={handleFollowClick}
      >
        <span className="follower-card-button-text">
          {isFollowing ? '팔로잉' : '팔로우'}
        </span>
      </button>
    </li>
  );
}

export default FollowerCard;
