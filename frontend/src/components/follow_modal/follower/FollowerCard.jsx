import React, { useState } from "react";
import "./FollowerCard.css";

export const FollowerCard = ({
  username,
  userId,
  followerCount,
  profileImg,
  isFollowing: initialFollowing = false,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    // 여기서 API 요청도 함께 처리하면 됨 (예: follow/unfollow)
  };

  return (
    <div className="follower-card">
      <div className="card-content">
        <div className="card-divider" />

        <img className="profile-img" src={profileImg} alt="Profile" />

        <div className="username">{username}</div>
        <div className="user-id">{userId}</div>
        <div className="follower-count-label">팔로워</div>
        <div className="follower-count">{followerCount}</div>

        <div className="follow-button-wrapper">
          <div
            className={`follow-button ${isFollowing ? "following" : "not-following"}`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </div>
        </div>
      </div>
    </div>
  );
};
