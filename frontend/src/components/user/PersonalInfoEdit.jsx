// PersonalInfoEdit.jsx
import React, { useState } from 'react';
import ProfilePictureUploader from './ProfilePictureUploader';

const PersonalInfoEdit = () => {
  const [userId, setUserId] = useState('kimcook');
  const [nickname, setNickname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');

  const handleDuplicateCheck = () => {
    console.log('중복 확인 버튼 클릭됨');
  };

  const handleSave = () => {
    console.log('저장하기 버튼 클릭됨');
  };

  const handlePasswordChange = () => {
    console.log('비밀번호 변경 버튼 클릭됨');
  };

  return (
    <div className="settings-personal-info-edit">
      <div className="settings-section-title">개인정보 수정</div>

      <ProfilePictureUploader />

      <div className="settings-input-section">
        <div className="settings-input-label">아이디</div>
        <input
          type="text"
          className="settings-input-field"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="kimcook"
        />
      </div>

      <div className="settings-input-section">
        <div className="settings-input-label">닉네임</div>
        <div className="settings-nickname-container">
          <input
            type="text"
            className="settings-nickname-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
          <button
            className="settings-duplicate-check-button"
            onClick={handleDuplicateCheck}
          >
            중복확인
          </button>
        </div>
      </div>

      <div className="settings-input-section">
        <div className="settings-input-label">프로필 소개</div>
        <textarea
          className="settings-textarea-field"
          value={profileIntro}
          onChange={(e) => setProfileIntro(e.target.value)}
          placeholder="자신을 소개해보세요"
        />
      </div>

      <div className="settings-action-buttons">
        <button
          className="settings-save-button"
          onClick={handleSave}
        >
          저장하기
        </button>
        <button
          className="settings-password-change-button"
          onClick={handlePasswordChange}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoEdit;
