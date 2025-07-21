import React, {useEffect, useState} from 'react';
import api from "../../api/axiosInstance";
import {getMyProfile} from "../../api/user/profile";
import {DEFAULT_PROFILE_IMAGE, PROFILE_FILE_PATH} from "../../constants/Profile";

const ProfilePictureUploader = () => {
  const [profileImage, setProfileImage] = useState();
  const fileInputRef = React.useRef(null);

  const handleImageChange = () => {
    fileInputRef.current.click();
  };

  // 프로필 정보 조회
  const getProfile = async () => {
    const profile = await getMyProfile();

    if(profile.data.profileImgPath){
      setProfileImage(PROFILE_FILE_PATH + profile.data.profileImgPath);
    }
  }

  useEffect(() => {
    getProfile();
  });


  // 사진 변경 저장
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) { return }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/users/me/upload/profile-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('프로필 사진이 변경되었습니다.');
      const filename = response.data.filename;
      setProfileImage(PROFILE_FILE_PATH + filename);

    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleImageDelete = () => {
    setProfileImage("https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800");
    console.log('사진 삭제됨');
  };

  return (
    <div className="settings-profile-picture-section">
      <div className="settings-profile-picture-label">프로필 사진</div>
      <div className="settings-profile-picture-container">
        <img
          className="settings-profile-image"
          src={profileImage ? profileImage : DEFAULT_PROFILE_IMAGE}
          alt="프로필"
        />
        <div className="settings-profile-picture-buttons">
          <button
            className="settings-change-photo-button"
            onClick={handleImageChange}
          >
            사진 변경
          </button>
          <button
            className="settings-delete-photo-button"
            onClick={handleImageDelete}
          >
            사진 삭제
          </button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfilePictureUploader;
