import { useNavigate  } from "react-router-dom";
import "./FollowCard.css";
import useFollow from "../../utils/useFollow";

export const FollowCard = ({
  followId,
  username,
  userId,
  followerCount,
  profileImg,
  isFollowed: initialFollowing = false,
  email,
  reloadProfile
}) => {

  // Follow / UnFollow
  const { isFollowed, handleFollowToggle } = useFollow(initialFollowing, userId, reloadProfile);

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
        <div className="user-id">@{email}</div>
        <div className="follower-count-label">팔로워</div>
        <div className="follower-count">{followerCount}</div>
      </div>
    </div>
  );
};
