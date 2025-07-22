import React, { useState, useEffect } from "react";
import "../../styles/user/FollowerCard.css"; // 위 CSS 저장된 파일
import axiosInstance from "../../api/axiosInstance";

function FollowerCard() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchRecommendedFollowers = async () => {
      try {
        const response = await axiosInstance.get("api/follow/recommend");
        setFollowers(response.data);
      } catch (error) {
        console.error("팔로워 추천 가져오기 실패:", error);
      }
    };

    fetchRecommendedFollowers();
  }, []);

  // 팔로우/언팔로우 상태 업데이트 함수
  const updateFollowState = (userId, isFollowing) => {
    setFollowers((prev) =>
      prev.map((f) => (f.userId === userId ? { ...f, isFollowing } : f))
    );
  };

  return (
    <div className="follower-card-box">
      <section className="follower-card-view">
        <div className="follower-card-overlap">
          <h1 className="follower-card-title">추천 팔로워</h1>
          <ul className="follower-card-list">
            {followers.map((follower) => (
              <FollowerCardItem
                key={follower.userId}
                userId={follower.userId}
                name={follower.nickname}
                username={`@user${follower.userId}`}
                followers={follower.followerCount}
                image={follower.profileImgPath}
                isFollowing={follower.isFollowing}
                onFollowStateChange={updateFollowState}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function FollowerCardItem({
  userId,
  name,
  username,
  followers,
  image,
  isFollowing,
  onFollowStateChange,
}) {
  const [loading, setLoading] = useState(false);

  const handleFollowClick = async () => {
    try {
      setLoading(true);

      if (isFollowing) {
        await axiosInstance.delete(`/api/follow/${userId}`);
        onFollowStateChange(userId, false);
      } else {
        await axiosInstance.post("/api/follow", { toUserId: userId });
        onFollowStateChange(userId, true);
      }
    } catch (error) {
      console.error("팔로우/언팔로우 실패:", error);
      alert("요청을 처리할 수 없습니다.");
    } finally {
      setLoading(false);
    }
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
        className={`follower-card-button ${isFollowing ? "following" : ""}`}
        onClick={handleFollowClick}
        disabled={loading}
      >
        <span className="follower-card-button-text">
          {loading ? "처리 중..." : isFollowing ? "팔로잉" : "팔로우"}
        </span>
      </button>
    </li>
  );
}

export default FollowerCard;
