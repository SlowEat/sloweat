import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user/ProfileCard.css';
import { getMyProfile } from '../../api/user/profile';

export default function ProfileCard() {
  const navigate = useNavigate();

  const [profile,setProfile] = useState(null);

  useEffect(()=>{
    const profile = async()=>{
      try{
        const res = await getMyProfile();
        setProfile(res.data);
      }catch(err){
        console.error('프로필 불러오기 실패',err);
      }
    };
    profile();
  },[]);


  const handleLogout = (e) => {
    e.stopPropagation();
    alert('로그아웃 되었습니다.');
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
