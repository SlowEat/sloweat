import React, {useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";
import "./FollowCard.css";
import api from "../../api/axiosInstance";

export const FollowCard = ({
  followId,
  username,
  userId,
  followerCount,
  profileImg,
  isFollowed: initialFollowing = false,
  email
}) => {
  const [isFollowed, setIsFollowed] = useState(initialFollowing);

  const handleFollowToggle = () => {
    if(isFollowed) {
      setUnFollow();
    }else{
      setFollow();
    }
    setIsFollowed((prev) => !prev);
  };

  const setFollow = async () => {
    try {
      await api.post('api/follow', {toUserId : userId});
    } catch (error) {
      console.error('팔로우 설정 실패:', error);
    }
  };

  const setUnFollow = async () => {
    try {
      const response = await api.delete(`api/follow/${userId}`); //Unfollow 대상 userId

    } catch (error) {
      console.error('언팔로우 설정 실패:', error);
    }
  };

  const navigate = useNavigate();
  const handleProfileClick = () =>{
    navigate('/userpage'); //개개인의 유저 페이지로 이동할 수 있도록
  }

  return (
    <div className="follower-card">
      <div className="card-content">
        <div className="card-divider" onClick={handleProfileClick}/>

        <img className="profile-img" src={profileImg} alt="Profile" />

        <div className="username">{username}</div>
        <div className="user-id">{email}</div>
        <div className="follower-count-label">팔로워</div>
        <div className="follower-count">{followerCount}</div>

        <div className="follow-button-wrapper">
          <div
            className={`follow-button ${isFollowed ? "following" : "not-following"}`}
            onClick={handleFollowToggle}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </div>
        </div>
      </div>
    </div>
  );
};
