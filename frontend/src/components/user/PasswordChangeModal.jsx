import { useState, useEffect } from 'react';
import '../../styles/user/PasswordChangeModal.css';
import { changePassword } from '../../api/user/profile';

const PasswordChangeModal = ({ onClose }) => {
  //비밀번호 숨김처리
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //비밀번호 변경
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //비밀번호 유효성 검사
  useEffect(() => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};:"\\|,.<>/?]).{8,20}$/.test(newPassword)
    ) {
      newErrors.newPassword = '비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자 이내여야 합니다.';
    }

    if(currentPassword===newPassword){
      newErrors.newPassword = '현재 비밀번호와 동일하게 작성할 수 없습니다.';
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [currentPassword, newPassword, confirmPassword]);

  //비밀번호 변경 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await changePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      onClose();
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message); // 예: "현재 비밀번호가 틀렸습니다."
      } else {
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <main className="password-change-modal-box">
      <section className="password-change-modal-view">
        <div className="password-change-modal-inner">
          <h1 className="password-change-modal-title">비밀번호 변경</h1>
          <button
            className="password-change-modal-close-button"
            aria-label="닫기"
            onClick={onClose}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgtaWNvbiBsdWNpZGUteCI+PHBhdGggZD0iTTE4IDYgNiAxOCIvPjxwYXRoIGQ9Im02IDYgMTIgMTIiLz48L3N2Zz4="
              alt="닫기버튼"
            />
          </button>

          <form onSubmit={handleSubmit}>
            <div className="password-change-modal-password-fields">

              {/* 현재 비밀번호 */}
              <div className="password-change-modal-section">
                <label htmlFor="current-password" className="password-change-modal-label">
                  현재 비밀번호
                </label>
                <div className="password-change-modal-input-wrapper">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="current-password"
                    placeholder="현재 비밀번호를 입력해주세요"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <img
                    className="signup-password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={toggleCurrentPasswordVisibility}
                  />
                </div>
                {errors.currentPassword && <p className="form-error">{errors.currentPassword}</p>}
              </div>

              {/* 새 비밀번호 */}
              <div className="password-change-modal-section">
                <label htmlFor="new-password" className="password-change-modal-label">
                  새 비밀번호
                </label>
                <div className="password-change-modal-input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="new-password"
                    placeholder="새 비밀번호를 입력해주세요"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <img
                    className="signup-password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={toggleNewPasswordVisibility}
                  />
                </div>
                {errors.newPassword && <p className="form-error">{errors.newPassword}</p>}
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="password-change-modal-section">
                <label htmlFor="confirm-password" className="password-change-modal-label">
                  새 비밀번호 확인
                </label>
                <div className="password-change-modal-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <img
                    className="signup-password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="password-change-modal-button-group">
              <button
                type="button"
                className="password-change-modal-cancel-button"
                onClick={onClose}
              >
                <span>취소</span>
              </button>
              <button
                type="submit"
                className="password-change-modal-submit-button"
                disabled={!isFormValid}
              >
                <span>비밀번호 변경</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PasswordChangeModal;
