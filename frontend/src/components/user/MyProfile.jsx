import React, { useEffect, useState } from 'react';
import '../../styles/user/Profile.css';
import { FollowModal } from '../follow_modal/FollowModal';
import { getMyProfile } from '../../api/user/profile';
import {DEFAULT_PROFILE_IMAGE, PROFILE_FILE_PATH} from "../../constants/Profile";

function Profile(){
  const [profile, setProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);     // 모달 열기
  const [activeTab, setActiveTab] = useState('followers');   // 탭 선택
  const [profileImage, setProfileImage] = useState();

  const getProfile = async()=>{
    try{
      const res = await getMyProfile();
      setProfile(res.data);
      setProfileImage(PROFILE_FILE_PATH + res.data.profileImgPath);
    }catch(err){
      console.error('프로필 불러오기 실패',err);
    }
  };

  useEffect(()=>{
    getProfile();
  },[]);


  const handleOpenModal = (tabName) => {
    setActiveTab(tabName);
    setIsModalOpen(true);
  };

  return (
    <div className="mypage-profile-box">
      <div className="mypage-profile-view">
        <div className="mypage-profile-layout">
          <img
            className="mypage-profile-image"
            src={profileImage ? profileImage : DEFAULT_PROFILE_IMAGE}
            alt="사용자 프로필 사진"
          />

          <div className="mypage-profile-info">
            <div className="mypage-profile-header">
              <h1 className="mypage-profile-name">{profile?.nickname}</h1>

              {profile?.isSubscribed && (
                <div className="mypage-profile-premium-badge">
                  <img
                    className="mypage-profile-premium-icon"
                    src="https://c.animaapp.com/Zjq86JVx/img/frame.svg"
                    alt="프리미엄 아이콘"
                  />
                  <span className="mypage-profile-premium-text">프리미엄</span>
                </div>
              )}
            </div>

            <p className="mypage-profile-username">@{profile?.id}</p>
            <p className="mypage-profile-description">
              {profile?.introduce}
            </p>

            {/* 팔로우/팔로워 */}
            <ul className="mypage-profile-stats">
              <li 
                className="mypage-profile-stat-item"
                onClick={() => handleOpenModal('followers')}>
                <span className="mypage-profile-stat-value">{profile?.followerCnt}</span>
                <span className="mypage-profile-stat-label">팔로워</span>
              </li>
              <li className="mypage-profile-stat-item"
                  onClick={() => handleOpenModal('followings')}>
                <span className="mypage-profile-stat-value">{profile?.followingCnt}</span>
                <span className="mypage-profile-stat-label">팔로잉</span>
              </li>
              <li className="mypage-profile-stat-item">
                <span className="mypage-profile-stat-value">{profile?.postCnt}</span>
                <span className="mypage-profile-stat-label">게시물</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* //팔로우 모달 */}
      <FollowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={activeTab}
        reloadProfile = {getProfile}
      />
    </div>
  );
}

export default Profile;
