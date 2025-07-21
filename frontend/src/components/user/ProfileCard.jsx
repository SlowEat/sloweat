import { useNavigate } from 'react-router-dom';
import '../../styles/user/ProfileCard.css';
import {logout} from '../../api/user/auth';
import {useEffect, useState} from "react";
import {getMyProfile} from "../../api/user/profile";
import {PROFILE_FILE_PATH} from "../../constants/Profile";

export default function ProfileCard({ profile }) {
  const [profileImage, setProfileImage] = useState();
  const navigate = useNavigate();

   useEffect(() => {
     const getProfileImage = async () => {
       const res = await getMyProfile();
       setProfileImage(PROFILE_FILE_PATH + res.data.profileImgPath);
     }

     getProfileImage();
  });

  const handleLogout = async (e) => {
    e.stopPropagation();

    const confirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!confirmed) return;

    try {
      await logout();
      alert('로그아웃 되었습니다.');

      localStorage.removeItem('accessToken');

      window.location.href = '/login';
    } catch (err) {
      console.error('로그아웃 실패', err);
      alert('로그아웃 실패');
    }
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
            src={profileImage}
            alt="Profile picture of Kim Cook"
          />
          <div className="profilecard-info">

            <h1 className="profilecard-name">{profile?.nickname}</h1>
            <p className="profilecard-username">@{profile?.id}</p>
          </div>

          <div className="profilecard-logout-wrapper">
            <button
              className="profilecard-action"
              aria-label="profilecard actions"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="profilecard-frame"
                src="https://c.animaapp.com/0RwLred6/img/frame.svg"
                alt="로그아웃 버튼"
              />
            </button>

            <div className="profilecard-logout-dropdown" onClick={(e) => e.stopPropagation()}>
              <button className="profilecard-logout-button" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
