import {useState, useEffect} from 'react';
import ProfilePictureUploader from './ProfilePictureUploader';
import { checkNickname } from '../../api/user/auth';
import { editMyProfile } from '../../api/user/profile';

const PersonalInfoEdit = ({profile : initialProfile, profileUpdated}) => {

  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const isSameNickname = profile.nickname === initialProfile?.nickname;
  const isSameIntroduce = profile.introduce === initialProfile?.introduce;
  const isChanged = !isSameNickname || !isSameIntroduce;

  //proile 초기 렌더링
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      setErrors({});
      setIsFormValid(false); 
      setIsNicknameChecked(false);
    }
    }, [initialProfile]);

  //개인정보 유효성 검사
  useEffect(() => {
    const newErrors = {};

    if (!/^.{2,15}$/.test(profile.nickname)) {
      newErrors.nickname = '닉네임은 2~15자 이내여야합니다.';
    }

    if (profile.introduce && profile.introduce.length > 100) {
      newErrors.introduce = '프로필 소개는 100자 이내여야합니다.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [profile.nickname, profile.introduce]);

  //닉네임 중복 확인
  const handleDuplicateCheck = async () => {
  try {
    const res = await checkNickname(profile.nickname);
    if (res.data === true) {
      setErrors(prev => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }));
      setIsNicknameChecked(false);
    } else{
      alert('사용 가능한 닉네임입니다!');
      setIsNicknameChecked(true);
    }
  } catch (err) {
    alert('닉네임 중복 확인 오류 발생');
    setIsNicknameChecked(false);
  }
  };

  //수정사항 저장
  const handleSave = async () => {
    try{
      const requestDTO = {
        nickname : profile.nickname,
        introduce : profile.introduce,
        profileImgPath : profile.profileImgPath
      };

      await editMyProfile(requestDTO);
      alert('수정되었습니다');
      profileUpdated();

    }catch(err){
      console.error('프로필 수정 실패',err);
      alert('프로필 수정 중 오류가 발생했습니다');
    }
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
          style={{pointerEvents:"none", backgroundColor:"#f3f3f3ff",color:"gray"}}
          value={profile?.id}
          readOnly
        />
      </div>

      <div className="settings-input-section">
        <div className="settings-input-label">닉네임</div>
        <div className="settings-nickname-container">
          <input
            type="text"
            className="settings-nickname-input"
            value={profile?.nickname || ''}
            onChange={(e) => {
              setProfile(prev => ({ ...prev, nickname: e.target.value }));
              setIsNicknameChecked(false); 
            }}
            placeholder="닉네임을 입력하세요"
          />
          <button
            className="settings-duplicate-check-button"
            onClick={handleDuplicateCheck}
            disabled={isSameNickname}
          >
            중복확인
          </button>
          {errors.nickname && <p className="form-error">{errors.nickname}</p>}
        </div>
      </div>

      <div className="settings-input-section">
        <div className="settings-input-label">프로필 소개</div>
        <textarea
          className="settings-textarea-field"
          value={profile?.introduce || ''}
          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            introduce: e.target.value
                            }))}
          placeholder="프로필 소개를 입력하세요"
        />
        {errors.introduce && <p className="form-error">{errors.introduce}</p>}
      </div>

      <div className="settings-action-buttons">
        <button
          className="settings-save-button"
          disabled={!isFormValid || (!isSameNickname && !isNicknameChecked) || !isChanged}
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
